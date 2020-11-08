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
    $api_type = $settings->getOption('API_TYPE', $arCurrentValues['SHOP_ID']);
}

if ($api_type == 'api') {
    $payment_types = array(
        "" => GetMessage('YAKA_PS_DEF'),
        "bank_card" => GetMessage('YAKA_PS_AC'),
        "yandex_money" => GetMessage('YAKA_PS_PC')
    );
} else {
    $payment_types = array(
        "" => GetMessage('YAKA_PS_DEF'),
        "PC" => GetMessage('YAKA_PS_PC'),
        "AC" => GetMessage('YAKA_PS_AC'),
        "MC" => GetMessage('YAKA_PS_MC'),
        "GP" => GetMessage('YAKA_PS_GP'),
        "EP" => GetMessage('YAKA_PS_EP'),
        "WM" => GetMessage('YAKA_PS_WM'),
        "SB" => GetMessage('YAKA_PS_SB'),
        "MP" => GetMessage('YAKA_PS_MP'),
        "AB" => GetMessage('YAKA_PS_AB'),
        "MA" => GetMessage('YAKA_PS_MA'),
        "PB" => GetMessage('YAKA_PS_PB'),
        "QW" => GetMessage('YAKA_PS_QW'),
        "KV" => GetMessage('YAKA_PS_KV'),
        "QP" => GetMessage('YAKA_PS_QP')
    );
}

$arComponentParameters = array(
    "GROUPS" => array(
        "CHECK_PARAMS" => array(
            "NAME" => GetMessage("CHECK_PARAMS")
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
            "VALUES" => $payment_types,
            "ADDITIONAL_VALUES" => "N",
            "MULTIPLE" => "N",
            "DEFAULT" => "",
            "REFRESH" => "Y"
        ),
        "YANDEX_TWO_STAGE" => null,
        "ITEM_NAME" => array(
            "PARENT" => "BASE",
            "NAME" => GetMessage('YAKA_COMP_FORM_ITEM_NAME'),
            "MULTIPLE" => "N",
            "DEFAULT" => GetMessage('YAKA_COMP_FORM_ITEM_NAME_DEF')
        ),
        "SUM" => array(
            "PARENT" => "BASE",
            "NAME" => GetMessage('YAKA_COMP_FORM_SUM'),
            "TYPE" => "STRING",
            "MULTIPLE" => "N",
            "DEFAULT" => "100"
        ),
        "SUM_PRINT" => array(
            "PARENT" => "BASE",
            "NAME" => GetMessage('YAKA_COMP_FORM_SUM_PRINT'),
            "TYPE" => "STRING",
            "MULTIPLE" => "N",
            "DEFAULT" => GetMessage('YAKA_COMP_FORM_RUB')
        ),
        "SUBMIT_NAME" => array(
            "PARENT" => "BASE",
            "NAME" => GetMessage('YAKA_COMP_FORM_SUBMIT_NAME'),
            "MULTIPLE" => "N",
            "DEFAULT" => GetMessage('YAKA_COMP_FORM_SUBMIT_NAME_DEF')
        ),
        "MODAL_FORM" => array(
            "PARENT" => "BASE",
            "NAME" => GetMessage('YAKA_COMP_FORM_MODAL_FORM'),
            "TYPE" => "CHECKBOX",
            "DEFAULT" => "Y"
        )
    )
);

if ($api_type == 'api') {
    $arComponentParameters["PARAMETERS"]["YANDEX_TWO_STAGE"] = array(
        "PARENT" => "BASE",
            "NAME" => GetMessage('YAKA_TWO_STAGE'),
            "TYPE" => "CHECKBOX",
            "DEFAULT" => "N"
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
