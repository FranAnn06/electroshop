<?php

namespace Kiora\Payments;

use Bitrix\Main\Localization;
use Bitrix\Main;
use Bitrix\Main\Request;
use Bitrix\Main\Web\HttpClient;
use Bitrix\Main\Config\Option;

if (!defined('KIYA_NAME_MOD'))
    define("KIYA_NAME_MOD", 'kiora.yaka');

class YandexCheckoutHandler {

    const TEST_URL = 'test';
    const ACTIVE_URL = 'active';
    const PAYMENT_STATUS_WAITING_FOR_CAPTURE = 'waiting_for_capture';
    const PAYMENT_STATUS_SUCCEEDED = 'succeeded';
    const PAYMENT_STATUS_CANCELED = 'canceled';
    const PAYMENT_STATUS_PENDING = 'pending';
    const PAYMENT_METHOD_SMART = '';
    const PAYMENT_METHOD_ALFABANK = 'alfabank';
    const PAYMENT_METHOD_BANK_CARD = 'bank_card';
    const PAYMENT_METHOD_YANDEX_MONEY = 'yandex_money';
    const PAYMENT_METHOD_SBERBANK = 'sberbank';
    const PAYMENT_METHOD_QIWI = 'qiwi';
    const PAYMENT_METHOD_WEBMONEY = 'webmoney';
    const PAYMENT_METHOD_CASH = 'cash';
    const PAYMENT_METHOD_MOBILE_BALANCE = 'mobile_balance';
    const URL = 'https://payment.yandex.net/api/v3';

    protected $businessValue = [];
    public $paymentType = '';

    public function __construct($formData) {
        $this->initBusinessValueByOptionsShop($formData['shopId']);
        $this->paymentType = $formData['paymentType'] ? $formData['paymentType'] : '';
        $this->businessValue['YANDEX_TWO_STAGE'] = $formData['YANDEX_TWO_STAGE'];
    }

    protected function initBusinessValueByOptionsShop($shop_id) {
        $this->businessValue['YANDEX_CHECKOUT_SHOP_ID'] = $shop_id;
        $this->businessValue['YANDEX_CHECKOUT_SECRET_KEY'] = Option::get(KIYA_NAME_MOD, "shop_password_" . $shop_id, "0", 1);
        $this->businessValue['YANDEX_CHECKOUT_RETURN_URL'] = Option::get(KIYA_NAME_MOD, "shop_back_url_" . $shop_id, $_SERVER['HTTP_HOST'], 1);
        $this->businessValue['YANDEX_CHECKOUT_CURRENCY'] = Option::get(KIYA_NAME_MOD, "shop_currency_" . $shop_id, 'RUB', 1);
        $this->businessValue['YANDEX_SEND_CHECK'] = Option::get(KIYA_NAME_MOD, "shop_send_check_data_" . $shop_id, "N", 1);
        $this->businessValue['PS_CHANGE_STATUS_PAY'] = 'Y'; //TODO: delete
    }

    public function getBusinessValue($valueName) {
        return $this->businessValue[$valueName];
    }

    public function requestPayment($form_data) {

        $payment = new Payment($form_data);

        $request_result = $this->initiatePay($payment);

        $result = array();

        if (!$request_result->isSuccess()) {

            $result['error'] = join('\n', $request_result->getErrorMessages());
            \KIUtils::error('Handler result error', 'orderNumber: ' . $form_data['orderNumber'], $result['error']);
        } else {


            $ps_data = $request_result->getPsData();

            if (is_array($ps_data) && $ps_data['confirmation'] && $ps_data['confirmation']['confirmation_url']) {
                OrdersHistoryTable::updateByShopID($form_data['orderNumber'], array('Y_INVOICE_ID' => $ps_data['id']));
                $result['confirmation_url'] = $ps_data['confirmation']['confirmation_url'];
                $form_data['confirmation_url'] = $ps_data['confirmation']['confirmation_url'];
                \KIUtils::event('kiora.yaka', "KiYKPaymentGetYInvoiceId", array('orderId' => $form_data['orderNumber'], 'REQUEST' => $form_data));
            }
        }

        return $result;
    }

    public function initiatePay(Payment $payment, Request $request = null) {
        if ($request === null) {
            $request = Main\Context::getCurrent()->getRequest();
        }

        $result = $this->initiatePayInternal($payment, $request);
        if (!$result->isSuccess()) {
            $error = 'Yandex.Checkout: initiatePay: ' . join('\n', $result->getErrorMessages());
            Logger::addError($error);
        }

        return $result;
    }

    private function initiatePayInternal(Payment $payment, Request $request) {

        $result = new ServiceResult();

        $createResult = $this->createYandexPayment($payment, $request);
        if (!$createResult->isSuccess()) {
            $result->addErrors($createResult->getErrors());
            return $result;
        }

        $yandexPaymentData = $createResult->getData();
        if ($yandexPaymentData['status'] === static::PAYMENT_STATUS_CANCELED) {
            return $result->addError(
                            new Main\Error(
                                    Localization\Loc::getMessage('SALE_HPS_YANDEX_CHECKOUT_ERROR_PAYMENT_CANCELED')
                            )
            );
        }

        $result->setPsData($yandexPaymentData);

        return $result;
    }

    /**
     * @return bool
     */
    private function isSetExternalPaymentType() {
        $externalPayment = array(static::PAYMENT_METHOD_ALFABANK);

        return in_array($this->paymentType, $externalPayment);
    }

    private function createYandexPayment(Payment $payment, Request $request) {
        $result = new ServiceResult();

        $url = $this->getUrl($payment, 'pay');

        $params = $this->getYandexPaymentQueryParams($payment, $request);

        $headers = $this->getHeaders();
        $headers['Idempotence-Key'] = $this->getIdempotenceKey();

        $sendResult = $this->send($url, $headers, $params);
        if (!$sendResult->isSuccess()) {
            $result->addErrors($sendResult->getErrors());
            return $result;
        }

        $response = $sendResult->getData();
        $result->setData($response);

        return $result;
    }

    /**
     * @return string
     */
    protected function getIdempotenceKey() {
        return sprintf('%04x%04x-%04x-%04x-%04x-%04x%04x%04x', mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0x0fff) | 0x4000, mt_rand(0, 0x3fff) | 0x8000, mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff)
        );
    }

    public function requestPaymentData($paymentId) {

        $result = new ServiceResult();
        $headers = $this->getHeaders();

        $httpClient = new HttpClient();
        foreach ($headers as $name => $value) {

            $httpClient->setHeader($name, $value);
        }

        $urlList = $this->getUrlList();
        $url = $urlList['pay'] . '/' . $paymentId;

        $response = $httpClient->get($url);

        if ($response === false) {
            $errors = $httpClient->getError();
            foreach ($errors as $code => $message) {
                $result->addError(new Main\Error($message, $code));
            }

            return $result;
        }

        $response = static::decode($response);

        return $response;
    }

    /**
     * @param $url
     * @param array $headers
     * @param array $params
     * @return PaySystem\ServiceResult
     * @throws Main\ArgumentException
     */
    protected function send($url, array $headers, array $params = array()) {
        $result = new ServiceResult();

        $httpClient = new HttpClient();
        foreach ($headers as $name => $value) {
            $httpClient->setHeader($name, $value);
        }

        $postData = null;
        if ($params) {
            $postData = static::encode($params);
        }

        Logger::addDebugInfo('Yandex.Checkout: request data: ' . $postData);

        $response = $httpClient->post($url, $postData);

        if ($response === false) {
            $errors = $httpClient->getError();
            foreach ($errors as $code => $message) {
                $result->addError(new Main\Error($message, $code));
            }

            return $result;
        }

        Logger::addDebugInfo('Yandex.Checkout: response data: ' . $response);

        $response = static::decode($response);

        $httpStatus = $httpClient->getStatus();
        if ($httpStatus === 200) {
            $result->setData($response);
        } elseif ($httpStatus === 202) {
            $secondsToSleep = ceil($response['retry_after'] / 1000);
            sleep($secondsToSleep);

            $result = $this->send($url, $headers, $params);
        } elseif ($httpStatus !== 201) {
            $error = Localization\Loc::getMessage('SALE_HPS_YANDEX_CHECKOUT_HTTP_STATUS_' . $httpStatus);
            if ($error) {
                $result->addError(new Main\Error($error));
            } else {
                if (isset($response['type']) && $response['type'] === 'error') {
                    $result->addError(new Main\Error($response['description']));
                }
            }
        }

        return $result;
    }

    private function getReturnUrl(Payment $payment) {

        $str_url = $this->getBusinessValue('YANDEX_CHECKOUT_RETURN_URL');

        if (substr($str_url, 0, 7) != 'http://' && substr($str_url, 0, 8) != 'https://')
            $str_url = "http://" . $_SERVER['HTTP_HOST'] . $str_url;


        $url_parts = explode('?', $str_url);

        $query_str = $url_parts[1];

        if ($query_str) {
            $query_str = '?' . $query_str . '&orderId=' . $payment->getField('orderNumber');
        } else {
            $query_str = '?orderId=' . $payment->getField('orderNumber');
        }

        $str_url = $url_parts[0] . $query_str;

        return $str_url;
    }

    private function decodeJson($json_str) {
        $prepared_string = html_entity_decode($json_str);
        if(!defined("BX_UTF")) $prepared_string = mb_convert_encoding($prepared_string, 'UTF-8', 'CP1251');
        $json = \KIUtils::jsonDecode($prepared_string);

        if (is_array($json)) {
            foreach ($json as $key => $item) {
                $json[$key]['quantity'] = floatval($item['quantity']);
                $json[$key]['amount'] = floatval($item['amount']);
            }
        }

        return $json;
    }

    /**
     * @param Payment $payment
     * @param Request $request
     * @return array
     * @throws Main\ArgumentNullException
     */
    private function getYandexPaymentQueryParams(Payment $payment, Request $request) {
        $description = Localization\Loc::getMessage('Payment #') . $payment->getId();
        $sum = (string) PriceMaths::roundPrecision($payment->getSum());

        $query = array(
            'description' => $description,
            'amount' => array(
                'value' => $sum,
                'currency' => $this->getBusinessValue('YANDEX_CHECKOUT_CURRENCY'),
            ),
            'capture' => true,
            'confirmation' => array(
                'type' => 'redirect',
                'return_url' => $this->getReturnUrl($payment)
            ),
            'metadata' => array(
                'BX_PAYMENT_NUMBER' => $payment->getId(),
                'BX_HANDLER' => 'YANDEX_CHECKOUT_KIORA',
                'cms_name' => 'api_1c-bitrix',
            )
        );

        if ($this->getBusinessValue('YANDEX_TWO_STAGE') == "Y") {
            $query['capture'] = false;
        }

        if ($this->getBusinessValue('YANDEX_SEND_CHECK') == "Y") {

            //for new form
            if ($payment->getField('receipt')) {

                $items = array();
                $receipt = $this->decodeJson($payment->getField('receipt'));


                if (is_array($receipt) || count($receipt) > 0) {

                    if (count($receipt) == 1 && !$receipt[0]['name'])
                        $receipt[0]['name'] = $payment->getField('order_content_input');

                    if (count($receipt) == 1 && !$receipt[0]['amount'])
                        $receipt[0]['amount'] = $payment->getField('sum');

                    foreach ($receipt as $item) {
                        $items[] = array(
                            "description" => \KIUtils::ConvertEncoding($item['name']),
                            "quantity" => $item['quantity'],
                            "amount" => array(
                                "value" => $item['amount'],
                                "currency" => $this->getBusinessValue('YANDEX_CHECKOUT_CURRENCY')
                            ),
                            "vat_code" => $payment->getField('f_vat') ? $payment->getField('f_vat') : 1,
                            "payment_mode" => $payment->getField('paymentMethodType') ? $payment->getField('paymentMethodType') : "full_prepayment",
                            "payment_subject" => $payment->getField('paymentSubjectType') ? $payment->getField('paymentSubjectType') : "commodity"
                        );
                    }

                    $query['receipt'] = array(
                        "items" => $items
                    );
                } else {
                    \KIUtils::error('Fail get RECEIPT DATA from string: (' . $payment->getField('receipt') . ')');
                }
            //for old form
            } else {

                $query['receipt'] = array(
                    "items" => array(
                        array(
                            "description" => \KIUtils::ConvertEncoding($payment->getField('order_content')),
                            "quantity" => $payment->getField('f_quantity') ? $payment->getField('f_quantity') : 1,
                            "amount" => array(
                                "value" => $sum,
                                "currency" => $this->getBusinessValue('YANDEX_CHECKOUT_CURRENCY')
                            ),
                            "vat_code" => $payment->getField('f_vat') ? $payment->getField('f_vat') : 1,
                            "payment_mode" => $payment->getField('paymentMethodType') ? $payment->getField('paymentMethodType') : "full_prepayment",
                            "payment_subject" => $payment->getField('paymentSubjectType') ? $payment->getField('paymentSubjectType') : "commodity"
                        )
                    )
                );
            }


            if ($payment->getField('f_tax') && $payment->getField('f_tax') != '0')
                $query['receipt']['tax_system_code'] = $payment->getField('f_tax');
            
            if ($payment->getField('user_email')) {
                $query['receipt']['customer']['email'] = $payment->getField('user_email');
            }
            elseif ($payment->getField('user_phone')) {
                $phone =  preg_replace("/[^,.0-9]/", '', $payment->getField('user_phone'));
                if(strlen($phone) == 11) {
                  $query['receipt']['customer']['phone'] = $phone;  
                }
                
            }
        }

//TODO: add ARTICLE_ID
//		$articleId = $this->getBusinessValue('YANDEX_CHECKOUT_SHOP_ARTICLE_ID');
//		if ($articleId)
//		{
//			$query['recipient'] = ['gateway_id' => $articleId];
//		}

        if ($this->paymentType !== static::PAYMENT_METHOD_SMART) {
            $query['payment_method_data'] = array(
                'type' => $this->paymentType
            );

            if ($this->isSetExternalPaymentType()) {
                $query['confirmation']['type'] = 'external';
            }

            if ($this->hasPaymentMethodFields()) {
                $fields = $this->getPaymentMethodFields();
                if ($fields) {
                    foreach ($fields as $field) {
                        $query['payment_method_data'][$field] = $request->get($field);
                    }
                }
            }
        }

        //DEPRECATED
        $query = \KIUtils::event(KIYA_NAME_MOD, "KiYKYandexPaymentQueryParams", $query);

        //NEW EVENT
        $resultData = \KIUtils::event(KIYA_NAME_MOD, "KiYKYandexPaymentPrepareQueryParams", array('QUERY' => $query, 'PAYMENT' => $payment));

        \KIUtils::log('YANDEX_SEND_QUERY', $this->getBusinessValue('YANDEX_SEND_CHECK'), $resultData['QUERY']);

        return $resultData['QUERY'];
    }

    /**
     * @param Payment $payment
     * @return string
     */
    private function getBasicAuthString() {

        return base64_encode(
                $this->getBusinessValue('YANDEX_CHECKOUT_SHOP_ID') .
                ':' .
                $this->getBusinessValue('YANDEX_CHECKOUT_SECRET_KEY')
        );
    }

    /**
     * @param array $data
     * @return mixed
     * @throws Main\ArgumentException
     */
    private static function encode(array $data) {
        return Main\Web\Json::encode($data, JSON_UNESCAPED_UNICODE);
    }

    /**
     * @param string $data
     * @return mixed
     */
    private static function decode($data) {
        try {
            return Main\Web\Json::decode($data);
        } catch (Main\ArgumentException $exception) {
            return false;
        }
    }

    /**
     * @return array
     */
    public function getCurrencyList() {
        return array('RUB');
    }

    /**
     * @param Payment $payment
     * @param $refundableSum
     * @return PaySystem\ServiceResult
     * @throws Main\ArgumentNullException
     * @throws \Exception
     */
    public function refund(Payment $payment, $refundableSum) {
        $result = new ServiceResult();

        $url = $this->getUrl($payment, 'refund');
        $params = $this->getRefundQueryParams($payment, $refundableSum);
        $headers = $this->getHeaders($payment);
        $headers['Idempotence-Key'] = $this->getIdempotenceKey();

        $sendResult = $this->send($url, $headers, $params);
        if (!$sendResult->isSuccess()) {
            $result->addErrors($sendResult->getErrors());

            $error = 'Yandex.Checkout: refund: ' . join('\n', $sendResult->getErrorMessages());
            Logger::addError($error);

            return $result;
        }

        $response = $sendResult->getData();

        if ($response['status'] === static::PAYMENT_STATUS_SUCCEEDED && PriceMaths::roundPrecision($response['amount']['value']) === PriceMaths::roundPrecision($refundableSum)
        ) {
            $result->setOperationType(PaySystem\ServiceResult::MONEY_LEAVING);
        }

        return $result;
    }

    /**
     * @param Payment $payment
     * @return PaySystem\ServiceResult
     * @throws \Exception
     */
    public function cancel(Payment $payment) {
        $url = $this->getUrl($payment, 'cancel');
        $headers = $this->getHeaders($payment);
        $headers['Idempotence-Key'] = $this->getIdempotenceKey();

        $sendResult = $this->send($url, $headers);

        if ($sendResult->isSuccess()) {
            $response = $sendResult->getData();

            $order = OrdersHistoryTable::getRowById($payment->getField('ORDER_ID'));

            if (!$order) {
                $error = 'Yandex.Checkout - cancel: ORDER #' . $payment->getField('ORDER_ID') . ' not found!';
                Logger::addError($error);
            } else {
                OrdersHistoryTable::statusUpdateCancel($order, $response);
            }
        } else {
            $error = 'Yandex.Checkout: cancel: ' . join('\n', $sendResult->getErrorMessages());
            Logger::addError($error);
        }

        return $sendResult;
    }

    /**
     * @param Payment $payment
     * @return PaySystem\ServiceResult
     * @throws Main\ArgumentNullException
     * @throws Main\ObjectException
     * @throws \Exception
     */
    public function confirm(Payment $payment) {
        $url = $this->getUrl($payment, 'confirm');
        $headers = $this->getHeaders($payment);
        $headers['Idempotence-Key'] = $this->getIdempotenceKey();
        $params = array(
            'amount' => array(
                'value' => (string) PriceMaths::roundPrecision($payment->getSum()),
                'currency' => $this->getBusinessValue('YANDEX_CHECKOUT_CURRENCY')
            )
        );

        $sendResult = $this->send($url, $headers, $params);

        if ($sendResult->isSuccess()) {
            $response = $sendResult->getData();

            $order = OrdersHistoryTable::getRowById($payment->getField('ORDER_ID'));

            if (!$order) {
                $error = 'Yandex.Checkout - confirm: ORDER #' . $payment->getField('ORDER_ID') . ' not found!';
                Logger::addError($error);
            } else {
                OrdersHistoryTable::statusUpdateAviso($order, $response);
            }
        } else {
            $error = 'Yandex.Checkout: confirm: ' . join('\n', $sendResult->getErrorMessages());
            Logger::addError($error);
        }

        return $sendResult;
    }

    /**
     * @param Payment $payment
     * @return array
     */
    protected function getHeaders() {
        return array(
            'Content-Type' => 'application/json',
            'Authorization' => 'Basic ' . $this->getBasicAuthString()
        );
    }

    /**
     * @param Payment $payment
     * @param $refundableSum
     * @return array
     * @throws Main\ArgumentNullException
     */
    private function getRefundQueryParams(Payment $payment, $refundableSum) {
        return array(
            'payment_id' => $payment->getField('PS_INVOICE_ID'),
            'amount' => array(
                'value' => (string) PriceMaths::roundPrecision($refundableSum),
                'currency' => $this->getBusinessValue('YANDEX_CHECKOUT_CURRENCY'),
            ),
        );
    }

    /**
     * @param Request $request
     * @return mixed
     */
    public function getPaymentIdFromRequest(Request $request) {
        $inputStream = static::readFromStream();

        if ($inputStream) {
            $data = static::decode($inputStream);
            if ($data === false) {
                return false;
            }

            return $data['object']['metadata']['BX_PAYMENT_NUMBER'];
        }

        return false;
    }

    /**
     * @return array
     */
    public static function getHandlerModeList() {
        return array(
            static::PAYMENT_METHOD_SMART => Localization\Loc::getMessage('SALE_HPS_YANDEX_CHECKOUT_SMART'),
            static::PAYMENT_METHOD_BANK_CARD => Localization\Loc::getMessage('SALE_HPS_YANDEX_CHECKOUT_BANK_CARDS'),
            static::PAYMENT_METHOD_YANDEX_MONEY => Localization\Loc::getMessage('SALE_HPS_YANDEX_CHECKOUT_YANDEX_MONEY'),
            static::PAYMENT_METHOD_SBERBANK => Localization\Loc::getMessage('SALE_HPS_YANDEX_CHECKOUT_SBERBANK'),
            static::PAYMENT_METHOD_QIWI => Localization\Loc::getMessage('SALE_HPS_YANDEX_CHECKOUT_QIWI'),
            static::PAYMENT_METHOD_WEBMONEY => Localization\Loc::getMessage('SALE_HPS_YANDEX_CHECKOUT_WEBMONEY'),
            static::PAYMENT_METHOD_ALFABANK => Localization\Loc::getMessage('SALE_HPS_YANDEX_CHECKOUT_ALFABANK'),
            static::PAYMENT_METHOD_CASH => Localization\Loc::getMessage('SALE_HPS_YANDEX_CHECKOUT_CASH')
        );
    }

    /**
     * @return array
     */
    protected function getUrlList() {
        return array(
            'pay' => static::URL . '/payments',
            'refund' => static::URL . '/refunds',
            'confirm' => static::URL . '/payments/#payment_id#/capture',
            'cancel' => static::URL . '/payments/#payment_id#/cancel'
        );
    }

    /**
     * @param Request $request
     * @param int $paySystemId
     * @return bool
     * @throws Main\ArgumentNullException
     * @throws Main\ArgumentOutOfRangeException
     * @throws Main\ArgumentTypeException
     * @throws Main\ObjectException
     */
    public static function isMyResponse(Request $request, $paySystemId) {
        $inputStream = static::readFromStream();

        if ($inputStream) {
            Logger::addDebugInfo('Yandex.Checkout: Check my response: paySystemId=' . $paySystemId . ' inputStream=' . $inputStream);

            $data = static::decode($inputStream);
            if ($data === false) {
                return false;
            }

            if (isset($data['object']['metadata']['BX_HANDLER']) && $data['object']['metadata']['BX_HANDLER'] === 'YANDEX_CHECKOUT' && isset($data['object']['metadata']['BX_PAYSYSTEM_CODE']) && (int) $data['object']['metadata']['BX_PAYSYSTEM_CODE'] === (int) $paySystemId
            ) {
                return true;
            }
        }

        return false;
    }

    /**
     * @return bool|string
     */
    private static function readFromStream() {
        return file_get_contents('php://input');
    }

    /**
     * @param Payment $payment
     * @return bool
     */
    protected function isTestMode(Payment $payment = null) {
        return false;
    }

    /**
     * @param Payment $payment
     * @param string $action
     * @return string
     */
    protected function getUrl(Payment $payment = null, $action) {

        $urlList = $this->getUrlList();
        if (isset($urlList[$action])) {
            $url = $urlList[$action];

            if (is_array($url)) {
                if ($this->isTestMode($payment) && isset($url[self::TEST_URL]))
                    return $url[self::TEST_URL];
                else
                    return $url[self::ACTIVE_URL];
            }
        } else {
            $url = '';
        }



        if ($payment !== null &&
                (
                $action === 'cancel' || $action === 'confirm'
                )
        ) {
            $url = str_replace('#payment_id#', $payment->getField('Y_INVOICE_ID'), $url);
        }

        return $url;
    }

    /**
     * @return array
     */
    private function getPaymentMethodFields() {
        $paymentMethodFields = array(
            static::PAYMENT_METHOD_ALFABANK => array('login'),
            static::PAYMENT_METHOD_QIWI => array('phone'),
            static::PAYMENT_METHOD_MOBILE_BALANCE => array('phone'),
        );

        if (isset($paymentMethodFields[$this->paymentType])) {
            return $paymentMethodFields[$this->paymentType];
        }

        return [];
    }

    /**
     * @param Request $request
     * @return bool
     */
    private function isFillPaymentMethodFields(Request $request) {
        $fields = $this->getPaymentMethodFields();
        if ($fields) {
            foreach ($fields as $field) {
                if (!$request->get($field)) {
                    return false;
                }
            }
        }

        return true;
    }

    /**
     * @return bool
     */
    private function hasPaymentMethodFields() {
        $fields = $this->getPaymentMethodFields();
        return (bool) $fields;
    }

}
