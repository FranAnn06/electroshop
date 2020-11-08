<?php

use Kiora\Payments as PS;

class KIYandexPaymentFormAPI extends CBitrixComponent {

    public $obSettings;

    public function __construct($component = null) {

        parent::__construct($component);

        if (!CModule::IncludeModule("kiora.yaka")) {
            ShowError(GetMessage("YAKA_COMP_MODULE_NOT_FOUND"));
            return;
        }

        if (\Bitrix\Main\Config\Option::get("kiora.yaka", "yk_shops_id", "0", 1) == '0') {
            ShowError(GetMessage("YAKA_COMP_MODULE_OPTIONS_NOT_FOUND"));
            return;
        }

        $this->obSettings = new \Kiora\Payments\Settings();
    }

    public function executeComponent() {
        if ($this->startResultCache()) {

            //get shop ID
            $shop_id = (int) $this->arParams['SHOP_ID'] > 0 ? (int) $this->arParams['SHOP_ID'] : $this->obSettings->getShopIdDefault();

            if ($shop_id < 1) {
                ShowError(GetMessage('YAKA_COMP_YSHOP_ID_NOT_FOUND'));
                return;
            }

            $api_type = $this->obSettings->OPTS[$shop_id]['API_TYPE'];

            if ($api_type != 'api') {
                ShowError(GetMessage('YAKA_COMP_NEED_API_PROTOCOL'));
                return;
            }

            if (!$this->arParams['ITEM_NAME']) {
                ShowError(GetMessage('YAKA_COMP_NEED_ITEM_NAME'));
                return;
            }

            $this->arResult = array_merge(array(
                'SHOP_ID' => $shop_id,
                'API_TYPE' => $api_type,
                'DEMO_MODE' => $this->obSettings->OPTS[$shop_id]['DEMO_MODE'],
                'SEND_CHECK' => $this->obSettings->OPTS[$shop_id]['send_check_data'] == 'Y' ? true : false,
                'CHECK_DATA' => $this->decodeCheckData($this->arParams['CHECK_DATA']),
                'CUSTOM_FIELDS' => $this->decodeCustomFields($this->arParams['CUSTOM_FIELDS']),
                    ), $this->getUserData());

            $this->arResult['TOTAL_AMOUNT'] = $this->floatFormat($this->getTotalAmount());

            $this->includeComponentTemplate();
        }
        return $this->arResult;
    }

    protected function getUserData() {
        global $USER;
        $rsUser = CUser::GetByID($USER->GetID());
        $arUser = $rsUser->Fetch();
        $user_data = array();

        $user_data['USER_NAME'] = ( $arUser['NAME'] ? $arUser['NAME'] : '' ) . ( $arUser['NAME'] && $arUser['LAST_NAME'] ? ' ' : '' ) . ( $arUser['LAST_NAME'] ? $arUser['LAST_NAME'] : '' );
        $user_data['USER_NAME'] = $this->arParams['USER_NAME'] ? $this->arParams['USER_NAME'] : $user_data['USER_NAME'];

        $user_data['USER_EMAIL'] = $arUser['EMAIL'] ? $arUser['EMAIL'] : '';
        $user_data['USER_EMAIL'] = $this->arParams['USER_EMAIL'] ? $this->arParams['USER_EMAIL'] : $user_data['USER_EMAIL'];

        $user_data["USER_PHONE"] = $arUser["PERSONAL_PHONE"] ? $arUser["PERSONAL_PHONE"] : '';
        $user_data['USER_PHONE'] = $this->arParams['USER_PHONE'] ? $this->arParams['USER_PHONE'] : $user_data['USER_PHONE'];

        return $user_data;
    }

    public function floatFormat($number) {
        return number_format(floatval($number), 2, '.', '');
    }

    public function floatPrintFormat($number) {
        return number_format(floatval($number), 2, '.', ' ');
    }

    protected function decodeJson($json_str) {
        $prepared_string = html_entity_decode($json_str);
        if (!defined("BX_UTF"))
            $prepared_string = mb_convert_encoding($prepared_string, 'UTF-8', 'CP1251');
        $json = \KIUtils::jsonDecode($prepared_string);
        return $json;
    }

    protected function decodeCheckData($json_str) {
        $json = $this->decodeJson($json_str);

        if (is_array($json)) {
            foreach ($json as $key => $item) {
                $json[$key]['quantity'] = floatval($item['quantity']);
                $json[$key]['amount'] = floatval($item['amount']);
            }
        }

        return $json;
    }

    protected function decodeCustomFields($json_str) {
        $json = $this->decodeJson($json_str);
        return $json;
    }

    protected function getTotalAmount() {
        $total = 0;
        $checkData = is_array($this->arResult['CHECK_DATA']) ? $this->arResult['CHECK_DATA'] : [];

        foreach ($checkData as $checkItem) {
            $total += $checkItem['quantity'] * $checkItem['amount'];
            //var_dump($checkItem['quantity'] . ' ' . $checkItem['amount']);
        }

        return $total;
    }

    protected function buildInputControl($field) {
        $control = array(
            '<input',
            'name="customFields[' . $field['name'] . ']"',
            'value=""',
            'maxlength="255"',
            'required' => $field['required'] ? 'required' : '',
            'type="' . $field['type'] . '"'
        );

        array_push($control, '/>');

        return implode(" ", $control);
    }

    protected function buildSelectControl($field) {
        $control = array(
            '<select',
            'name="customFields[' . $field['name'] . ']"',
            'required' => $field['required'] ? 'required' : '',
            '>',
        );
        
        foreach($field['options'] as $option) {
            $option_html = '<option value="' . $option . '">' . $option . '</option>';
            array_push($control, $option_html);
        }

        array_push($control, '</select>');

        return implode(" ", $control);
    }
    
    public function isRequiredHtml() {
        return '<i class="isRequiredField" title="' . GetMessage("YAKA_COMP_IS_REQUIRED_FIELD") . '">*</i>';
    }

    public function buildCustomField($field) {
        $field_html = '';

        switch ($field['type']) {
            case 'select':
                $field_html = $this->buildSelectControl($field);
                break;
            default: $field_html = $this->buildInputControl($field);
        }

        return $field_html;
    }

}
