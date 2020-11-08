<?php

namespace Kiora\Payments;

use Bitrix\Main\Entity,
    \Bitrix\Main\Type;

IncludeModuleLangFile(__FILE__);

if (!defined('KIYA_NAME_MOD'))
    define("KIYA_NAME_MOD", 'kiora.yaka');

class OrdersHistoryTable extends Entity\DataManager {

    const write_log = false;
    const PAYMENT_STATUS_PENDING = 0;
    const PAYMENT_STATUS_CHECK = 1;
    const PAYMENT_STATUS_SUCCEEDED = 2;
    const PAYMENT_STATUS_CANCELED = 3;

    public function __construct() {

        parent::__construct();
    }

    public static function getTableName() {
        return 'ki_orders_history';
    }

    public static function getMap() {
        return array(
            new Entity\IntegerField('ID', array(
                'primary' => true,
                'autocomplete' => true
                    )),
            new Entity\StringField('SITE_LID'),
            new Entity\StringField('ORDER_ID', array(
                'required' => true
                    )),
            new Entity\StringField('USER_EMAIL'),
            new Entity\StringField('USER_NAME'),
            new Entity\StringField('USER_PHONE'),
            new Entity\StringField('ORDER_CONTENT'),
            new Entity\DatetimeField('ORDER_DATE_TIME'),
            new Entity\FloatField('ORDER_AMOUNT'),
            new Entity\StringField('ORDER_COMMENT'),
            new Entity\IntegerField('PAYMENT_STATUS'),
            new Entity\TextField('RECEIPT'),
            new Entity\TextField('CUSTOM_FIELDS'),
            new Entity\StringField('ADDRESS'),
            new Entity\StringField('Y_ACTION'),
            new Entity\StringField('Y_INVOICE_ID'),
            new Entity\StringField('Y_BASE_INVOICE_ID'),
            new Entity\StringField('Y_SHOP_ID'),
            new Entity\StringField('Y_ORDER_NUMBER'),
            new Entity\FloatField('Y_ORDER_SUM_AMOUNT'),
            new Entity\FloatField('Y_SHOP_SUM_AMOUNT'),
            new Entity\StringField('Y_CUSTOMER_NUMBER'),
            new Entity\StringField('Y_REQUEST_DATETIME'),
            new Entity\StringField('Y_MD5'),
            new Entity\StringField('Y_PKCS7'),
            new Entity\StringField('Y_SHOP_ARTICLE_ID'),
            new Entity\StringField('Y_ORDER_CREATE_DATETIME'),
            new Entity\StringField('Y_ORDER_SUM_CURRENCY_PAYCASH'),
            new Entity\StringField('Y_ORDER_SUM_BANK_PAYCASH'),
            new Entity\StringField('Y_SHOP_SUM_CURRENCY_PAYCASH'),
            new Entity\StringField('Y_PAYMENT_PAYER_CODE'),
            new Entity\StringField('Y_PAYMENT_TYPE'),
            new Entity\StringField('Y_CDD_PAN_MASK'),
        );
    }

    public static function getArrStatus() {

        $arStatusText = array(
            self::PAYMENT_STATUS_PENDING => GetMessage('YAKA_STATUS_IN_PROCESS'),
            self::PAYMENT_STATUS_CHECK => GetMessage('YAKA_STATUS_CHECK'),
            self::PAYMENT_STATUS_SUCCEEDED => GetMessage('YAKA_STATUS_PAYMENT'),
            self::PAYMENT_STATUS_CANCELED => GetMessage('YAKA_STATUS_CANCEL'),
        );

        $arStatusText = \KIUtils::event(KIYA_NAME_MOD, "KiYKOrderStatusText", $arStatusText);

        return $arStatusText;
    }

    public static function mapApiStatus($status) {

        $apiStatus = array(
            'pending' => self::PAYMENT_STATUS_PENDING,
            'waiting_for_capture' => self::PAYMENT_STATUS_CHECK,
            'succeeded' => self::PAYMENT_STATUS_SUCCEEDED,
            'canceled' => self::PAYMENT_STATUS_CANCELED,
        );

        return $apiStatus[$status] ? $apiStatus[$status] : $status;
    }

    public static function statusText($status_int) {

        $arStatusText = self::getArrStatus();

        return $arStatusText[$status_int] ? $arStatusText[$status_int] : GetMessage('YAKA_STATUS_UNKNOWN') . '(' . $status_int . ')';
    }

    //::getRowById($ID)
    public static function orderFindByYID($invoice_id) {

        self::log(__FUNCTION__ . ": begin");

        $order = self::getRow(array(
                    'filter' => array('=Y_INVOICE_ID' => $invoice_id),
                    'order' => array('ID')
        ));

        self::log(__FUNCTION__ . ": end. Result: " . $order['ID']);

        return $order;
    }

    public static function orderFindByShopID($order_id, $filter_adv = null) {

        self::log(__FUNCTION__ . "(orderId:" . $order_id . "): begin");

        $filter = array(
            'filter' => array('=ORDER_ID' => $order_id),
            'order' => array('ID')
        );

        if (is_array($filter_adv)) {
            $filter['filter'] = array_merge($filter['filter'], $filter_adv);
        }

        $order = self::getRow($filter);

        self::log(__FUNCTION__ . ": end. Result: found rowID (" . $order['ID'] . ")");

        return $order;
    }

    public static function updateByShopID($shop_id, $row_data) {

        self::log(__FUNCTION__ . "(orderId:" . $shop_id . ", row_data:" . $row_data['Y_INVOICE_ID'] . "): begin");

        $order = self::getRow(array(
                    'filter' => array('=ORDER_ID' => $shop_id),
                    'order' => array('ID')
        ));

        //self::log(__FUNCTION__ . " get order: ".print_r($order,1)." !");

        if ($order === null) {
            self::log(__FUNCTION__ . ": Not found ID Order shop: (" . $shop_id . ")");
            return null;
        }

        $result = self::update($order['ID'], $row_data);

        /* @var $log type */
        $log = self::log(__FUNCTION__ . ": end.");

        return $result;
    }

    public static function orderFindByOrderContent($order_content) {

        self::log(__FUNCTION__ . ": begin");

        $order = self::getRow(array(
                    'filter' => array('=ORDER_CONTENT' => $order_content),
                    'order' => array('ID')
        ));

        return $order;
    }

    public static function generateOrderNumber($orderId) {

        $order_number['orderId'] = $orderId ? $orderId : date('y') . str_pad(date('z'), 3, "0", STR_PAD_LEFT) . str_pad(date('H') * 3600 + date('i') * 60 + date('s'), 5, "0", STR_PAD_LEFT);

        $order_number = \KIUtils::event(KIYA_NAME_MOD, "KiYKGenerateOrderNumber", $order_number);

        return $order_number['orderId'];
    }

    public static function statusUpdate($order, $request, $status_int) {

        if ($order['PAYMENT_STATUS'] == $status_int) {
            return true;
        }

        $data = \KIUtils::event(KIYA_NAME_MOD, "KiYKBeforeStatusUpdate", array('ORDER' => $order, 'REQUEST' => $request, 'status' => $status_int));
        $status_int = $data['status'];

        $result = self::update($order['ID'], array(
                    'PAYMENT_STATUS' => $status_int
        ));

        if (!$result->isSuccess()) {
            self::log(__FUNCTION__ . ": status order #" . $request['invoiceId'] . " update " . $status_int . " fail!");

            \KIUtils::event(KIYA_NAME_MOD, "KiStatusUpdateFail", array('ORDER' => $order, 'REQUEST' => $request));

            return false;
        } else {

            switch ($status_int) {

                case self::PAYMENT_STATUS_PENDING:
                    \KIUtils::event(KIYA_NAME_MOD, "KiYKStatusUpdateInProcess", array('ORDER' => $order, 'REQUEST' => $request));
                    break;
                case self::PAYMENT_STATUS_CHECK:
                    //for http - deprecated
                    \KIUtils::event(KIYA_NAME_MOD, "KiYKStatusUpdateChecked", array('ORDER' => $order, 'REQUEST' => $request));
                    //for api
                    \KIUtils::event(KIYA_NAME_MOD, "KiYKStatusUpdateWaiting", array('ORDER' => $order, 'REQUEST' => $request));
                    break;
                case self::PAYMENT_STATUS_SUCCEEDED:
                    \KIUtils::event(KIYA_NAME_MOD, "KiYKStatusUpdateAviso", array('ORDER' => $order, 'REQUEST' => $request));
                    break;
                case self::PAYMENT_STATUS_CANCELED:
                    \KIUtils::event(KIYA_NAME_MOD, "KiYKStatusUpdateCancel", array('ORDER' => $order, 'REQUEST' => $request));
                    break;
                default:
                    \KIUtils::event(KIYA_NAME_MOD, "KiYKStatusUpdateUnknown", array('ORDER' => $order, 'REQUEST' => $request));
            }

            self::log(__FUNCTION__ . ": status order #" . $order['ID'] . " update " . $status_int . " ok!");

            return true;
        }
    }

    //for http
    public static function statusUpdateOk($order, $request) {
        return self::statusUpdate($order, $request, self::PAYMENT_STATUS_CHECK);
    }

    //for api
    public static function statusUpdateWaiting($order, $request) {
        return self::statusUpdate($order, $request, self::PAYMENT_STATUS_CHECK);
    }

    public static function statusUpdateAviso($order, $request) {
        self::log(__FUNCTION__ . ": request :" . print_r($request, 1));
        return self::statusUpdate($order, $request, self::PAYMENT_STATUS_SUCCEEDED);
    }

    public static function statusUpdateCancel($order, $request) {
        return self::statusUpdate($order, $request, self::PAYMENT_STATUS_CANCELED);
    }

    public static function addOrderShop($request) {

        $request['user_name'] = \KIUtils::convert_to_1251($request['user_name']);
        $request['order_content'] = \KIUtils::convert_to_1251($request['order_content']);
        $request['order_comment'] = \KIUtils::convert_to_1251($request['order_comment']);

        $request = \KIUtils::event(KIYA_NAME_MOD, "KiYKOrderShopBeforeAdd", $request);

        if (!$request['sum']) {
            self::log(__FUNCTION__ . ": ERROR, BAD SUM ORDER!!!", $request['sum']);
            return false;
        }

        self::log(__FUNCTION__ . ": begin add NEW ORDER!!! Sum: " . $request['sum']);


        $row_data = array(
            'SITE_LID' => is_null($request['SITE_LID']) ? SITE_ID : $request['SITE_LID'],
            'ORDER_ID' => self::generateOrderNumber($request['orderNumber']),
            'USER_NAME' => is_null($request['user_name']) ? '' : $request['user_name'],
            'USER_EMAIL' => is_null($request['user_email']) ? '' : $request['user_email'],
            'ORDER_CONTENT' => is_null($request['order_content']) ? '' : $request['order_content'],
            'ORDER_DATE_TIME' => new Type\DateTime(date('Y-m-d H:i'), 'Y-m-d H:i'),
            'ORDER_AMOUNT' => is_null($request['sum']) ? 0 : $request['sum'],
            'PAYMENT_STATUS' => self::PAYMENT_STATUS_PENDING,
            'Y_SHOP_ID' => $request['shopId'],
            'Y_INVOICE_ID' => is_null($request['Y_INVOICE_ID']) ? '' : $request['Y_INVOICE_ID'],
            'Y_BASE_INVOICE_ID' => is_null($request['Y_BASE_INVOICE_ID']) ? '' : $request['Y_BASE_INVOICE_ID'],
        );

        if ($request['receipt']) {
            $row_data['RECEIPT'] = self::preapareReceiptData($request);
        }

        if ($request['customFields']) {
            $row_data['CUSTOM_FIELDS'] = self::preapareCustomFields($request);
        }

        if ($request['user_phone'])
            $row_data['USER_PHONE'] = $request['user_phone'];
        if ($request['order_comment'])
            $row_data['ORDER_COMMENT'] = $request['order_comment'];
        if ($request['md5'])
            $row_data['Y_MD5'] = $request['md5'];

        self::log(__FUNCTION__ . ": new row " . print_r($row_data, 1)); //debug

        $result = self::add($row_data);

        if (!$result->isSuccess()) {
            self::log(__FUNCTION__ . ": order NEW row add fail!");

            \KIUtils::event(KIYA_NAME_MOD, "KiYKOrderShopAddfFail", $request);

            return false;
        } else {
            $orderId = $result->getId();

            self::log(__FUNCTION__ . ": order NEW (ID:$orderId) row add ok!");

            \KIUtils::event(KIYA_NAME_MOD, "KiYKOrderShopAddOk", array('orderId' => $row_data['ORDER_ID'], 'REQUEST' => $request));

            return $row_data['ORDER_ID'];
        }
    }

    protected static function preapareReceiptData($request) {
        $json_str = $request['receipt'];
        $json_str = html_entity_decode($json_str);
        $json = \KIUtils::jsonDecode($json_str);

        if (is_array($json)) {
            if ($request['order_content_input']) {
                $json[0]['name'] = mb_convert_encoding($request['order_content_input'], 'HTML-ENTITIES');
            }

            if (!$json[0]['amount'] || $json[0]['amount'] == "NaN") {
                $json[0]['amount'] = $request['sum'];
            }

            $encode_str = \KIUtils::jsonEncode($json);

            \KIUtils::log('preapareReceiptData', mb_detect_encoding($request['receipt']), $json_str, $json, $encode_str);

            return $encode_str;
        } else {
            \KIUtils::error('Error: wrong RECEIPT DATA', $request['receipt']);
        }
    }

    protected static function preapareCustomFields($request) {
        $json = $request['customFields'];

        if (is_array($json)) {

            $prepared_json = array();

            if (!defined("BX_UTF")) {
                foreach ($json as $key => $field) {
                    $prepared_json[mb_convert_encoding($key, 'CP1251')] = mb_convert_encoding($field, 'CP1251');
                }
            } else {
                $prepared_json = $json;
            }

            $encode_str = \KIUtils::jsonEncode($prepared_json);

            \KIUtils::log('preapareCustomFields', json_last_error_msg(), $json, $prepared_json, $encode_str);

            return $encode_str;
        } else {
            \KIUtils::error('Error: wrong CUSTOM FIELDS DATA', $request['customFields'], json_last_error_msg(), $json_str, $json);
        }
    }

    public static function updateOrderYData($order_id, $request) {

        $request = \KIUtils::event(KIYA_NAME_MOD, "KiYKBeforeUpdateOrderYData", $request);

        $row_data = array(
            'PAYMENT_STATUS' => self::PAYMENT_STATUS_CHECK,
            'ORDER_AMOUNT' => is_null($request['orderSumAmount']) ? 0 : $request['orderSumAmount'],
            'Y_INVOICE_ID' => $request['invoiceId'],
            'Y_BASE_INVOICE_ID' => $request['baseInvoiceId'],
            'Y_CDD_PAN_MASK' => $request['cdd_pan_mask'],
            'Y_REQUEST_DATETIME' => $request['requestDatetime'],
            'Y_ACTION' => $request['action'],
            'Y_SHOP_ID' => $request['shopId'],
            'Y_SHOP_ARTICLE_ID' => is_null($request['shopArticleId']) ? '' : $request['shopArticleId'],
            'Y_CUSTOMER_NUMBER' => is_null($request['customerNumber']) ? '' : $request['customerNumber'],
            'Y_ORDER_CREATE_DATETIME' => $request['orderCreatedDatetime'],
            'Y_ORDER_SUM_AMOUNT' => is_null($request['orderSumAmount']) ? 0 : $request['orderSumAmount'],
            'Y_ORDER_SUM_CURRENCY_PAYCASH' => is_null($request['orderSumCurrencyPaycash']) ? '' : $request['orderSumCurrencyPaycash'],
            'Y_ORDER_SUM_BANK_PAYCASH' => is_null($request['orderSumBankPaycash']) ? '' : $request['orderSumBankPaycash'],
            'Y_SHOP_SUM_AMOUNT' => is_null($request['shopSumAmount']) ? 0 : $request['shopSumAmount'],
            'Y_SHOP_SUM_CURRENCY_PAYCASH' => is_null($request['shopSumCurrencyPaycash']) ? '' : $request['shopSumCurrencyPaycash'],
            'Y_PAYMENT_PAYER_CODE' => is_null($request['paymentPayerCode']) ? '' : $request['paymentPayerCode'],
            'Y_PAYMENT_TYPE' => is_null($request['paymentType']) ? '' : $request['paymentType'],
        );

        if ($request['md5'])
            $row_data['Y_MD5'] = $request['md5'];

        self::log(__FUNCTION__ . ": update data: " . print_r($row_data, 1)); //debug

        $result = self::updateByShopID($order_id, $row_data);

        if (!$result->isSuccess()) {
            self::log(__FUNCTION__ . ": status order #" . $request['invoiceId'] . " update fail!");

            \KIUtils::event(KIYA_NAME_MOD, "KiOrderUpdateFail", array($order_id, $request));

            return FALSE;
        } else {

            \KIUtils::event(KIYA_NAME_MOD, "KiYKOrderUpdateCheckOK", array($order_id, $request));

            return true;
        }
    }

    public static function addOrderFull($request) {

        self::log(__FUNCTION__ . ": begin add " . $request['invoiceId']);

        $request['order_content'] = \KIUtils::convert_to_1251($request['order_content']);
        $request['user_name'] = \KIUtils::convert_to_1251($request['user_name']);

        $request = \KIUtils::event(KIYA_NAME_MOD, "KiYKOrderShopBeforeAddOrderFull", $request);

        $row_data = array(
            'SITE_LID' => is_null($request['SITE_LID']) ? SITE_ID : $request['SITE_LID'],
            'ORDER_ID' => self::generateOrderNumber($request['orderNumber']),
            'USER_NAME' => is_null($request['user_name']) ? '' : $request['user_name'],
            'USER_EMAIL' => is_null($request['user_email']) ? '' : $request['user_email'],
            'ORDER_CONTENT' => is_null($request['order_content']) ? '' : $request['order_content'],
            'ORDER_DATE_TIME' => new Type\DateTime(date('Y-m-d H:i'), 'Y-m-d H:i'),
            'ORDER_AMOUNT' => is_null($request['sum']) ? is_null($request['orderSumAmount']) ? 0 : $request['orderSumAmount'] : $request['sum'],
            'PAYMENT_STATUS' => self::PAYMENT_STATUS_CHECK,
            'Y_INVOICE_ID' => is_null($request['invoiceId']) ? '' : $request['invoiceId'],
            'Y_BASE_INVOICE_ID' => is_null($request['baseInvoiceId']) ? '' : $request['baseInvoiceId'],
            'Y_CDD_PAN_MASK' => is_null($request['cdd_pan_mask']) ? '' : $request['cdd_pan_mask'],
            'Y_REQUEST_DATETIME' => is_null($request['requestDatetime']) ? '' : $request['requestDatetime'],
            'Y_ACTION' => is_null($request['action']) ? '' : $request['action'],
            'Y_SHOP_ID' => is_null($request['shopId']) ? '' : $request['shopId'],
            'Y_SHOP_ARTICLE_ID' => is_null($request['shopArticleId']) ? '' : $request['shopArticleId'],
            'Y_CUSTOMER_NUMBER' => is_null($request['customerNumber']) ? '' : $request['customerNumber'],
            'Y_ORDER_CREATE_DATETIME' => is_null($request['orderCreatedDatetime']) ? '' : $request['orderCreatedDatetime'],
            'Y_ORDER_SUM_AMOUNT' => is_null($request['orderSumAmount']) ? 0 : $request['orderSumAmount'],
            'Y_ORDER_SUM_CURRENCY_PAYCASH' => is_null($request['orderSumCurrencyPaycash']) ? '' : $request['orderSumCurrencyPaycash'],
            'Y_ORDER_SUM_BANK_PAYCASH' => is_null($request['orderSumBankPaycash']) ? '' : $request['orderSumBankPaycash'],
            'Y_SHOP_SUM_AMOUNT' => is_null($request['shopSumAmount']) ? 0 : $request['shopSumAmount'],
            'Y_SHOP_SUM_CURRENCY_PAYCASH' => is_null($request['shopSumCurrencyPaycash']) ? '' : $request['shopSumCurrencyPaycash'],
            'Y_PAYMENT_PAYER_CODE' => is_null($request['paymentPayerCode']) ? '' : $request['paymentPayerCode'],
            'Y_PAYMENT_TYPE' => is_null($request['paymentType']) ? '' : $request['paymentType'],
        );

        if ($request['user_phone'])
            $row_data['USER_PHONE'] = $request['user_phone'];
        if ($request['order_comment'])
            $row_data['ORDER_COMMENT'] = $request['order_comment'];
        if ($request['md5'])
            $row_data['Y_MD5'] = $request['md5'];

        self::log(__FUNCTION__ . ": new row " . print_r($row_data, 1)); //debug

        $result = self::add($row_data);

        if (!$result->isSuccess()) {
            self::log(__FUNCTION__ . ": order row #" . $request['invoiceId'] . " add fail!");

            \KIUtils::event(KIYA_NAME_MOD, "KiYKOrderShopAddfFail", $request);

            return FALSE;
        } else {
            $orderId = $result->getId();

            self::log(__FUNCTION__ . ": order (ID:$orderId) row #" . $request['invoiceId'] . " add ok!");

            \KIUtils::event(KIYA_NAME_MOD, "KiYKOrderShopAddOk", array('orderId' => $row_data['ORDER_ID'], 'REQUEST' => $request));

            return $row_data['ORDER_ID'];
        }
    }

    public static function log($str) {

        if (!self::write_log)
            return;

        if (is_array($str) || is_object($str)) {
            $str = print_r($str, true);
        }
        $str = $str . PHP_EOL;
        file_put_contents($_SERVER["DOCUMENT_ROOT"] . "/bitrix/tools/" . KIYA_NAME_MOD . "/log.txt", '[' . date("Y-m-d H:i:s") . '] ' . $str, FILE_APPEND);
    }

}
