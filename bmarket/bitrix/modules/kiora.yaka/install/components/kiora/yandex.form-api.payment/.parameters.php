<?

if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true)
    die();

$arYShopIDs = array();
$send_check = false;

if (CModule::IncludeModule("kiora.yaka")) {

    $settings = new \Kiora\Payments\Settings();
    foreach (is_array($settings->OPTS) ? $settings->OPTS : array() as $shopId => $opts) {
        $arYShopIDs[$shopId] = $shopId . ' - ' . $opts['shop_name'];
    }

    $send_check = $settings->getOption('send_check_data', $arCurrentValues['SHOP_ID']) == 'Y';
}

$LANG_MESS = array(
    'CONTROL_CHECK_NAME_PLACEHOLDER' => GetMessage("CONTROL_CHECK_NAME_PLACEHOLDER"),
    'CONTROL_CHECK_NAME_TITLE' => GetMessage("CONTROL_CHECK_NAME_TITLE"),
    'CONTROL_CHECK_QUANTITY_PLACEHOLDER' => GetMessage("CONTROL_CHECK_QUANTITY_PLACEHOLDER"),
    'CONTROL_CHECK_QUANTITY_TITLE' => GetMessage("CONTROL_CHECK_QUANTITY_TITLE"),
    'CONTROL_CHECK_QUANTITY_TITLE_NOT_EMPTY' => GetMessage("CONTROL_CHECK_QUANTITY_TITLE_NOT_EMPTY"),
    'CONTROL_CHECK_AMOUNT_PLACEHOLDER' => GetMessage("CONTROL_CHECK_AMOUNT_PLACEHOLDER"),
    'CONTROL_CHECK_AMOUNT_TITLE' => GetMessage("CONTROL_CHECK_AMOUNT_TITLE"),
    'CONTROL_CHECK_TITLE_EMPTY' => GetMessage("CONTROL_CHECK_TITLE_EMPTY"),
    'CONTROL_CHECK_ITEM_DELETE' => GetMessage("CONTROL_CHECK_ITEM_DELETE"),
    'CONTROL_CHECK_ITEM_ADD' => GetMessage("CONTROL_CHECK_ITEM_ADD"),
    'CONTROL_CHECK_TOTAL' => GetMessage("CONTROL_CHECK_TOTAL"),
    
    'CONTROL_CUSTOM_FIELD_ADD' => GetMessage("CONTROL_CUSTOM_FIELD_ADD"),
    'CONTROL_CUSTOM_FIELD_DELETE' => GetMessage("CONTROL_CUSTOM_FIELD_DELETE"),
    'CONTROL_CUSTOM_FIELD_NAME_PLACEHOLDER' => GetMessage("CONTROL_CUSTOM_FIELD_NAME_PLACEHOLDER"),
    'CONTROL_CUSTOM_FIELD_NAME_TITLE' => GetMessage("CONTROL_CUSTOM_FIELD_NAME_TITLE"),
    'CONTROL_CUSTOM_FIELD_TYPE_TITLE' => GetMessage("CONTROL_CUSTOM_FIELD_TYPE_TITLE"),
    'CONTROL_CUSTOM_FIELD_OPTION_TITLE' => GetMessage("CONTROL_CUSTOM_FIELD_OPTION_TITLE"),
    'CONTROL_CUSTOM_FIELD_REQUIRED_TITLE' => GetMessage("CONTROL_CUSTOM_FIELD_REQUIRED_TITLE"),
    'CONTROL_CUSTOM_FIELD_OPTION_DELETE' => GetMessage("CONTROL_CUSTOM_FIELD_OPTION_DELETE"),
    'CONTROL_CUSTOM_FIELD_OPTION_ADD' => GetMessage("CONTROL_CUSTOM_FIELD_OPTION_ADD"),
    'CONTROL_CUSTOM_FIELD_REQUIRED' => GetMessage("CONTROL_CUSTOM_FIELD_REQUIRED"),
);

$arComponentParameters = array(
    "GROUPS" => array(
        "CHECK_DATA" => array(
            "NAME" => GetMessage("CHECK_DATA_PARAMS")
        ),
        "CHECK_PARAMS" => array(
            "NAME" => GetMessage("CHECK_PARAMS")
        ),
        "VISUAL_FORM_PARAMS" => array(
            "NAME" => GetMessage("VISUAL_FORM_PARAMS")
        ),
        "CUSTOM_FIELDS_PARAMS" => array(
            "NAME" => GetMessage("CUSTOM_FIELDS_PARAMS")
        ),
        "USER_PARAMS" => array(
            "NAME" => GetMessage("USER_PARAMS")
        ),
    ),
    "PARAMETERS" => array(
        "SHOP_ID" => array(
            "PARENT" => "BASE",
            "NAME" => GetMessage('YAKA_COMP_FORM_YSHOP_ID'),
            "TYPE" => "LIST",
            "ADDITIONAL_VALUES" => "N",
            "VALUES" => $arYShopIDs,
            "REFRESH" => "Y"
        ),
        "PAYMENT_TYPE" => array(
            "PARENT" => "BASE",
            "NAME" => GetMessage('YAKA_PS'),
            "TYPE" => "LIST",
            "VALUES" => array(
                "" => GetMessage('YAKA_PS_DEF'),
                "bank_card" => GetMessage('YAKA_PS_AC'),
                "yandex_money" => GetMessage('YAKA_PS_PC')
            ),
            "ADDITIONAL_VALUES" => "N",
            "MULTIPLE" => "N",
            "DEFAULT" => "",
            "REFRESH" => "Y"
        ),
        "YANDEX_TWO_STAGE" => array(
            "PARENT" => "BASE",
            "NAME" => GetMessage('YAKA_TWO_STAGE'),
            "TYPE" => "CHECKBOX",
            "DEFAULT" => "N"
        ),
        "FORM_TYPE" => array(
            "PARENT" => "BASE",
            "NAME" => GetMessage('YAKA_FORM_TYPE'),
            "TYPE" => "LIST",
            "VALUES" => array(
                "check" => GetMessage('YAKA_CHECK_FORM'),
                "simple" => GetMessage('YAKA_SIMPLE_FORM'),
            ),
            "ADDITIONAL_VALUES" => "N",
            "MULTIPLE" => "N",
            "DEFAULT" => "check",
            "REFRESH" => "Y"
        ),
        'CHECK_DATA' => array(
            'PARENT' => 'CHECK_DATA',
            'NAME' => GetMessage('YAKA_COMP_FORM_CHECK_DATA'),
            'TYPE' => 'CUSTOM',
            'JS_FILE' => '/bitrix/components/kiora/yandex.form-api.payment/custom-controls/check-data/check-data.js',
            'JS_EVENT' => 'JSCheckDataControl',
            'JS_DATA' => \KIUtils::jsonEncode(
                    array(
                        'FORM_TYPE' => $arCurrentValues['FORM_TYPE'] ? $arCurrentValues['FORM_TYPE'] : 'check',
                        'SUM_PRINT' => $arCurrentValues['SUM_PRINT'] ? $arCurrentValues['SUM_PRINT'] : GetMessage('YAKA_COMP_FORM_RUB'),
                        'LANG_MESS' => $LANG_MESS,
                    )
            ),
            'DEFAULT' => \KIUtils::jsonEncode(array(array('name' => '', 'quantity' => '', 'amount' => ''))),
        ),
        "CUSTOM_FIELDS_USE" => array(
            "PARENT" => "CUSTOM_FIELDS_PARAMS",
            "NAME" => GetMessage('YAKA_COMP_CUSTOM_FIELDS_USE'),
            "TYPE" => "CHECKBOX",
            "DEFAULT" => "N",
            "REFRESH" => "Y"
        ),
        "ITEM_NAME" => array(
            "PARENT" => "VISUAL_FORM_PARAMS",
            "NAME" => GetMessage('YAKA_COMP_FORM_FORM_NAME'),
            "MULTIPLE" => "N",
            "DEFAULT" => GetMessage('YAKA_COMP_FORM_FORM_NAME_DEF')
        ),
        "SUM_PRINT" => array(
            "PARENT" => "VISUAL_FORM_PARAMS",
            "NAME" => GetMessage('YAKA_COMP_FORM_SUM_PRINT'),
            "TYPE" => "STRING",
            "MULTIPLE" => "N",
            "DEFAULT" => GetMessage('YAKA_COMP_FORM_RUB')
        ),
        "SUBMIT_NAME" => array(
            "PARENT" => "VISUAL_FORM_PARAMS",
            "NAME" => GetMessage('YAKA_COMP_FORM_SUBMIT_NAME'),
            "MULTIPLE" => "N",
            "DEFAULT" => GetMessage('YAKA_COMP_FORM_SUBMIT_NAME_DEF')
        ),
        "MODAL_FORM" => array(
            "PARENT" => "VISUAL_FORM_PARAMS",
            "NAME" => GetMessage('YAKA_COMP_FORM_MODAL_FORM'),
            "TYPE" => "CHECKBOX",
            "DEFAULT" => "Y"
        ),
        "USER_NAME" => array(
            "PARENT" => "USER_PARAMS",
            "NAME" => GetMessage('YAKA_COMP_USER_NAME'),
            "TYPE" => "STRING",
            "MULTIPLE" => "N",
            "DEFAULT" => ""
        ),
        "USER_EMAIL" => array(
            "PARENT" => "USER_PARAMS",
            "NAME" => GetMessage('YAKA_COMP_USER_EMAIL'),
            "TYPE" => "STRING",
            "MULTIPLE" => "N",
            "DEFAULT" => ""
        ),
        "USER_PHONE" => array(
            "PARENT" => "USER_PARAMS",
            "NAME" => GetMessage('YAKA_COMP_USER_PHONE'),
            "TYPE" => "STRING",
            "MULTIPLE" => "N",
            "DEFAULT" => ""
        ),
    )
);

if ($arCurrentValues['CUSTOM_FIELDS_USE'] === 'Y') {
    $arComponentParameters["PARAMETERS"]['CUSTOM_FIELDS'] = array(
        'PARENT' => 'CUSTOM_FIELDS_PARAMS',
        'NAME' => GetMessage('CUSTOM_FIELDS_PARAMS'),
        'TYPE' => 'CUSTOM',
        'JS_FILE' => '/bitrix/components/kiora/yandex.form-api.payment/custom-controls/custom-fields/custom-fields.js',
        'JS_EVENT' => 'JSCustomFieldsControl',
        'JS_DATA' => \KIUtils::jsonEncode(
                array(
                    'LANG_MESS' => $LANG_MESS,
                )
        ),
        'DEFAULT' => \KIUtils::jsonEncode(array(array('name' => '', 'type' => 'text', 'required' => false, 'options' => array()))),
    );
}

if ($send_check) {

    $arComponentParameters["PARAMETERS"]["CHECK_TAX"] = array(
        "PARENT" => "CHECK_PARAMS",
        "NAME" => GetMessage('YAKA_check_tax'),
        "TYPE" => "LIST",
        "VALUES" => array(
            "0" => GetMessage('YAKA_TAX_0'),
            "1" => GetMessage('YAKA_TAX_1'),
            "2" => GetMessage('YAKA_TAX_2'),
            "3" => GetMessage('YAKA_TAX_3'),
            "4" => GetMessage('YAKA_TAX_4'),
            "5" => GetMessage('YAKA_TAX_5'),
            "6" => GetMessage('YAKA_TAX_6')
        ),
        "ADDITIONAL_VALUES" => "N",
        "MULTIPLE" => "N",
        "DEFAULT" => "0"
    );

    $arComponentParameters["PARAMETERS"]["CHECK_VAT"] = array(
        "PARENT" => "CHECK_PARAMS",
        "NAME" => GetMessage('YAKA_check_vat'),
        "TYPE" => "LIST",
        "VALUES" => array(
            "1" => GetMessage('YAKA_VAT_1'),
            "2" => GetMessage('YAKA_VAT_2'),
            "3" => GetMessage('YAKA_VAT_3'),
            "4" => GetMessage('YAKA_VAT_4'),
            "5" => GetMessage('YAKA_VAT_5'),
            "6" => GetMessage('YAKA_VAT_6')
        ),
        "ADDITIONAL_VALUES" => "N",
        "MULTIPLE" => "N",
        "DEFAULT" => "1"
    );

    $arComponentParameters["PARAMETERS"]["PAYMENT_METHOD_TYPE"] = array(
        "PARENT" => "CHECK_PARAMS",
        "NAME" => GetMessage('YAKA_PAYMENT_METHOD_TYPE'),
        "TYPE" => "LIST",
        "VALUES" => array(
            "full_prepayment" => GetMessage('YAKA_full_prepayment'),
            "partial_prepayment" => GetMessage('YAKA_partial_prepayment'),
            "advance" => GetMessage('YAKA_advance'),
            "full_payment" => GetMessage('YAKA_full_payment'),
            "partial_payment" => GetMessage('YAKA_partial_payment'),
            "credit" => GetMessage('YAKA_credit'),
            "credit_payment" => GetMessage('YAKA_credit_payment')
        ),
        "ADDITIONAL_VALUES" => "Y",
        "MULTIPLE" => "N",
        "DEFAULT" => "full_prepayment"
    );

    $arComponentParameters["PARAMETERS"]["PAYMENT_SUBJECT_TYPE"] = array(
        "PARENT" => "CHECK_PARAMS",
        "NAME" => GetMessage('YAKA_PAYMENT_SUBJECT_TYPE'),
        "TYPE" => "LIST",
        "VALUES" => array(
            "commodity" => GetMessage('YAKA_commodity'),
            "excise" => GetMessage('YAKA_excise'),
            "job" => GetMessage('YAKA_job'),
            "service" => GetMessage('YAKA_service'),
            "gambling_bet" => GetMessage('YAKA_gambling_bet'),
            "gambling_prize" => GetMessage('YAKA_gambling_prize'),
            "lottery" => GetMessage('YAKA_lottery'),
            "lottery_prize" => GetMessage('YAKA_lottery_prize'),
            "intellectual_activity" => GetMessage('YAKA_intellectual_activity'),
            "payment" => GetMessage('YAKA_payment'),
            "agent_commission" => GetMessage('YAKA_agent_commission'),
            "composite" => GetMessage('YAKA_composite'),
            "another" => GetMessage('YAKA_another')
        ),
        "ADDITIONAL_VALUES" => "Y",
        "MULTIPLE" => "N",
        "DEFAULT" => "commodity"
    );
}
