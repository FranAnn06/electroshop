<?php

use Kiora\Payments as PS;

class KIYandexPaymentForm extends CBitrixComponent {

    public $obSettings;

    public function __construct($component = null) {

        parent::__construct($component);

        if (!CModule::IncludeModule("kiora.yaka")) {
            ShowError("Kiora.yaka module not found!");
            return;
        }

        if (\Bitrix\Main\Config\Option::get("kiora.yaka", "yk_shops_id", "0", 1) == '0') {
            ShowError('Yandex Kassa options not found!');
            return;
        }

        $this->obSettings = new \Kiora\Payments\Settings();
    }

    public function executeComponent() {
        if ($this->startResultCache()) {

            //get shop ID

            $shop_id = (int) $this->arParams['SHOP_ID'] > 0 ? (int) $this->arParams['SHOP_ID'] : $this->obSettings->getShopIdDefault();

            if ($shop_id < 1) {
                ShowError("Yandex Kassa SHOP ID not found!");
                return;
            }
            
            $api_type = $this->obSettings->OPTS[$shop_id]['API_TYPE'];

            if ($api_type === '') {
                ShowError('Yandex Kassa API type not set!');
                return;
            }

            $this->arResult = array(
                'SHOP_ID' => $shop_id,
                'API_TYPE' => $api_type,
                'SC_ID' => $this->obSettings->getSCID($shop_id),
                'DEMO_MODE' => $this->obSettings->OPTS[$shop_id]['DEMO_MODE'],
                'POST_URL' => $api_type == 'api' ? '' : $this->obSettings->getPostURL($shop_id),
                'SEND_CHECK' => $this->obSettings->OPTS[$shop_id]['send_check_data'] == 'Y' ? true : false
            );

            $this->includeComponentTemplate();
        }
        return $this->arResult;
    }

    public static function array_utf8_encode($dat) {
        if (is_string($dat))
            return utf8_encode($dat);
        if (!is_array($dat))
            return $dat;
        $ret = array();
        foreach ($dat as $i => $d)
            $ret[$i] = self::array_utf8_encode($d);
        return $ret;
    }

    public function price_format($num, $decimals = 0, $cur = ' <span class="b-rub">Р</span>') {
        return number_format($num, 0, ',', ' ') . $cur;
    }

    public function getTotalPayments($filter = array()) {

        if (!class_exists('\Kiora\Payments\OrdersHistoryTable')) {
            ShowError("Class '\Kiora\Payments\OrdersHistoryTable' not found!");
            return;
        }

        $result = array();
        $filter_def = array('PAYMENT_STATUS' => '2');

        $filter = array_merge($filter_def, $filter);

        $parameters = array(
            'select' => array('*'),
            'filter' => $filter,
                //'order' => array('ID'=>'asc'),
        );

        $cbResults = \Kiora\Payments\OrdersHistoryTable::getList($parameters);
        $result['COUNT'] = $cbResults->getSelectedRowsCount();

        //$arElements = array();
        $result['CURR_SUM'] = 0;

        while ($element = $cbResults->Fetch()) {
            $result['CURR_SUM'] += (int) $element['ORDER_AMOUNT'];
            //$arElements[$element['ID']] = $element;
        }

        return $result;
    }

}
