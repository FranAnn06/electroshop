<?php

use Kiora\Payments as PS;

/*
 * Bitrix Framework
 * @package Bitrix
 * @subpackage kiora.yaka
 * @copyright 2016 Kiora
 */

$dir = dirname(__FILE__);

require_once($dir . "/../install/const.php");
require_once($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/main/include/prolog_admin_before.php"); // 

if (!CModule::IncludeModule("kiora.yaka")) {
    ShowError("Kiora.yaka module not found!");
} else {

    require_once($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/" . KIYA_NAME_MOD . "/include.php"); // 

    IncludeModuleLangFile(__FILE__);

    $STGS = new \Kiora\Payments\Settings();


    $POST_RIGHT = $APPLICATION->GetGroupRight(KIYA_NAME_MOD);

    if ($POST_RIGHT == "D")
        $APPLICATION->AuthForm(GetMessage("ACCESS_DENIED"));


    //run request?
    $requestType = filter_input(INPUT_GET, 'requestType');
    $paymentData = array(
        'ORDER_ID' => (int) filter_input(INPUT_GET, 'order_id'),
        'shopId' => filter_input(INPUT_GET, 'shopId'),
        'sum' => (float) filter_input(INPUT_GET, 'sum'),
        'Y_INVOICE_ID' => filter_input(INPUT_GET, 'Y_INVOICE_ID'),
    );

    if ($requestType && !in_array('', $paymentData)) {

        if ($requestType == 'confirmPayment') {
            $payment = new PS\Payment($paymentData);
            $handler = new PS\YandexCheckoutHandler($paymentData);
            $handler_result = $handler->confirm($payment);
        }

        if ($requestType == 'cancelPayment') {
            $payment = new PS\Payment($paymentData);
            $handler = new PS\YandexCheckoutHandler($paymentData);
            $handler_result = $handler->cancel($payment);
        }


        LocalRedirect("/bitrix/admin/ki_yaka_payments_history.php");
    }
    // end process request

    $sTableID = "tbl_history";
    $oSort = new CAdminSorting($sTableID, "ID", "desc");
    $lAdmin = new CAdminList($sTableID, $oSort); //CAdminUiList($sTableID, $oSort);

    function CheckFilter() {
        global $FilterArr, $lAdmin;
        foreach ($FilterArr as $f)
            global $$f;


        return count($lAdmin->arFilterErrors) == 0;
    }

    // *********************** /CheckFilter ******************************* //

    $FilterArr = Array(
        "find_id",
        "find_shop_order_id",
        "find_status",
        "find_shop_id",
        "find_invoice_id",
        "find_email",
        "find_name",
        "find_phone",
        "filter_sum_order_from",
        "filter_sum_order_to",
        "filter_time_order_from",
        "filter_time_order_to",
        "find_content",
    );

    $lAdmin->InitFilter($FilterArr);


    if (CheckFilter()) {

        $arFilter = array();
        if ($find_id)
            $arFilter['=ID'] = $find_id;

        if ($find_shop_order_id)
            $arFilter['=ORDER_ID'] = $find_shop_order_id;
        if ($find_status)
            $arFilter['=PAYMENT_STATUS'] = $find_status;
        if ($find_shop_id)
            $arFilter['=Y_SHOP_ID'] = $find_shop_id;

        if ($find_invoice_id)
            $arFilter['=Y_INVOICE_ID'] = $find_invoice_id;
        if ($find_email)
            $arFilter['%USER_EMAIL'] = $find_email;
        if ($find_name)
            $arFilter['%USER_NAME'] = $find_name;
        if ($find_phone)
            $arFilter['%USER_PHONE'] = $find_phone;
        if ($find_content)
            $arFilter['%ORDER_CONTENT'] = $find_content;

        if (intval($filter_sum_order_from) > 0)
            $arFilter['>=ORDER_AMOUNT'] = $filter_sum_order_from;
        if (intval($filter_sum_order_to) > 0)
            $arFilter['<=ORDER_AMOUNT'] = $filter_sum_order_to;

        if (strlen($filter_time_order_from) > 0)
            $arFilter[">=ORDER_DATE_TIME"] = trim($filter_time_order_from);
        if (strlen($filter_time_order_to) > 0) {
            if ($arDate = ParseDateTime($filter_time_order_to, CSite::GetDateFormat("FULL", $siteId))) {
                if (strlen($filter_time_order_to) < 11) {
                    $arDate["HH"] = 23;
                    $arDate["MI"] = 59;
                    $arDate["SS"] = 59;
                }

                $filter_time_order_to = date($DB->DateFormatToPHP(CSite::GetDateFormat("FULL", $siteId)), mktime($arDate["HH"], $arDate["MI"], $arDate["SS"], $arDate["MM"], $arDate["DD"], $arDate["YYYY"]));
                $arFilter["<=ORDER_DATE_TIME"] = $filter_time_order_to;
            } else {
                $filter_time_order_to = "";
            }
        }
    }

    if ($lAdmin->EditAction() && $POST_RIGHT == "W") {

        foreach ($FIELDS as $ID => $arFields) {

            if (!$lAdmin->IsUpdated($ID))
                continue;

            $DB->StartTransaction();
            $ID = IntVal($ID);

            if (($rsData = PS\OrdersHistoryTable::getById($ID)) && ($arData = $rsData->Fetch())) {

                foreach ($arFields as $key => $value)
                    $arData[$key] = $value;

                if (!PS\OrdersHistoryTable::update($ID, $arData)) {

                    $lAdmin->AddGroupError("ERROR: " . $cData->LAST_ERROR, $ID);
                    $DB->Rollback();
                }
            } else {
                $lAdmin->AddGroupError("Order not found: " . $ID, $ID);
                $DB->Rollback();
            }
            $DB->Commit();
        }
    }

    $rsData = PS\OrdersHistoryTable::getList(array(
                'order' => array($by => $order),
                'select' => array('*'),
                'filter' => $arFilter
                    )
    );

    $rsData = new CAdminResult($rsData, $sTableID);

    $rsData->NavStart();

    $lAdmin->NavText($rsData->GetNavPrint(GetMessage("rub_nav")));


    $table_columns = array(
        array("id" => "ID",
            "content" => "ID",
            "sort" => "ID",
            "align" => "right",
            "default" => true,
        ),
        array("id" => "ORDER_ID",
            "content" => GetMessage("ORDER_ID"),
            "sort" => "ORDER_ID",
            "default" => true,
        ),
        array("id" => "Y_SHOP_ID",
            "content" => GetMessage("Y_SHOP_ID"),
            "sort" => "Y_SHOP_ID",
            "default" => true,
        ),
        array("id" => "Y_INVOICE_ID",
            "content" => GetMessage("num_order_yk"),
            "sort" => "Y_INVOICE_ID",
            "align" => "right",
            "default" => true,
        ),
        array("id" => "USER_NAME",
            "content" => GetMessage("user_name"),
            "sort" => "USER_NAME",
            "default" => true,
        ),
        array("id" => "USER_EMAIL",
            "content" => 'e-mail',
            "sort" => "USER_EMAIL",
            "default" => true,
        ),
        array("id" => "USER_PHONE",
            "content" => GetMessage("user_phone"),
            "sort" => "USER_PHONE",
            "default" => true,
        ),
        array("id" => "ORDER_CONTENT",
            "content" => GetMessage("order_content"),
            "sort" => "ORDER_CONTENT",
            "align" => "right",
            "default" => true,
        ),
        array("id" => "ORDER_DATE_TIME",
            "content" => GetMessage("order_date_time"),
            "sort" => "ORDER_DATE_TIME",
            "default" => true,
        ),
        array("id" => "ORDER_AMOUNT",
            "content" => GetMessage("order_amount"),
            "sort" => "ORDER_AMOUNT",
            "default" => true,
        ),
        array("id" => "PAYMENT_STATUS",
            "content" => GetMessage("order_status"),
            "sort" => "PAYMENT_STATUS",
            "default" => true,
        ),
        array("id" => "Y_SHOP_SUM_AMOUNT",
            "content" => GetMessage("sum_for_shop"),
            "sort" => "Y_SHOP_SUM_AMOUNT",
            "default" => false,
        ),
        array("id" => "RECEIPT",
            "content" => GetMessage("RECEIPT"),
            "default" => true,
        ),
        array("id" => "CUSTOM_FIELDS",
            "content" => GetMessage("CUSTOM_FIELDS"),
            "default" => false,
        ),
        array("id" => "Y_PAYMENT_TYPE",
            "content" => GetMessage("payment_type"),
            "sort" => "Y_PAYMENT_TYPE",
            "default" => false,
        ),
        array("id" => "Y_REQUEST_DATETIME",
            "content" => GetMessage("time_yandex"),
            "sort" => "Y_REQUEST_DATETIME",
            "align" => "right",
            "default" => false,
        ),
        array("id" => "Y_ACTION",
            "content" => "Y_ACTION",
            "sort" => "Y_ACTION",
            "align" => "right",
            "default" => false,
        ),
        array("id" => "Y_SHOP_ARTICLE_ID",
            "content" => 'Y_SHOP_ARTICLE_ID',
            "sort" => "Y_SHOP_ARTICLE_ID",
            "default" => false,
        ),
        array("id" => "Y_CUSTOMER_NUMBER",
            "content" => 'Y_CUSTOMER_NUMBER',
            "sort" => "Y_CUSTOMER_NUMBER",
            "default" => false,
        ),
        array("id" => "Y_ORDER_CREATE_DATETIME",
            "content" => 'Y_ORDER_CREATE_DATETIME',
            "sort" => "Y_ORDER_CREATE_DATETIME",
            "align" => "right",
            "default" => false,
        ),
        array("id" => "Y_ORDER_SUM_AMOUNT",
            "content" => 'Y_ORDER_SUM_AMOUNT',
            "sort" => "Y_ORDER_SUM_AMOUNT",
            "default" => false,
        ),
        array("id" => "Y_ORDER_SUM_CURRENCY_PAYCASH",
            "content" => 'Y_ORDER_SUM_CURRENCY_PAYCASH',
            "sort" => "Y_ORDER_SUM_CURRENCY_PAYCASH",
            "default" => false,
        ),
        array("id" => "Y_ORDER_SUM_BANK_PAYCASH",
            "content" => 'Y_ORDER_SUM_BANK_PAYCASH',
            "sort" => "Y_ORDER_SUM_BANK_PAYCASH",
            "default" => false,
        ),
        array("id" => "Y_SHOP_SUM_CURRENCY_PAYCASH",
            "content" => "Y_SHOP_SUM_CURRENCY_PAYCASH",
            "sort" => "Y_SHOP_SUM_CURRENCY_PAYCASH",
            "default" => false,
        ),
        array("id" => "Y_PAYMENT_PAYER_CODE",
            "content" => "Y_PAYMENT_PAYER_CODE",
            "sort" => "Y_PAYMENT_PAYER_CODE",
            "default" => false,
        ),
    );

    $lAdmin->AddHeaders($table_columns);

    $total_sum = 0;

    function prepareReceiptStr($json_str) {
        $json_str = html_entity_decode($json_str);
        $json = \KIUtils::jsonDecode($json_str);

        if (is_array($json)) {
            $receipt_str = "";
            foreach ($json as $key => $item) {
                $item['name'] = str_replace(' ', '&nbsp;', $item['name']);
                $receipt_str .= ($key + 1) . ')&nbsp;<strong>' . $item['name'] . "</strong>&nbsp;-&nbsp;" . $item['quantity'] . "&nbsp;&times;&nbsp;" . $item['amount'] . GetMessage('RUB_PRINT') ."<br />";
            }
        }
        return $receipt_str;
    }

    function prepareCFieldsStr($json_str) {
        $json_str = html_entity_decode($json_str);
        $json = \KIUtils::jsonDecode($json_str);

        if (is_array($json)) {
            $cfield_str = "";
            foreach ($json as $key => $item) {
                $key = str_replace(' ', '&nbsp;', $key);
                $item = str_replace(' ', '&nbsp;', $item);
                $cfield_str .= '<strong>' . $key . ":</strong>&nbsp;" . $item . "<br />";
            }
        }
        return $cfield_str;
    }

    while ($arRes = $rsData->NavNext(true, "f_")) {
        $row = & $lAdmin->AddRow($f_ID, $arRes);

        $total_sum += $f_ORDER_AMOUNT;

        $row->AddViewField("PAYMENT_STATUS", PS\OrdersHistoryTable::statusText($f_PAYMENT_STATUS));
        $row->AddViewField("RECEIPT", prepareReceiptStr($f_RECEIPT));
        $row->AddViewField("CUSTOM_FIELDS", prepareCFieldsStr($f_CUSTOM_FIELDS));
        $row->AddViewField("ORDER_AMOUNT", "<strong>" . number_format(floatval($f_ORDER_AMOUNT), 2, '.', '&nbsp;') . "</strong>");

        $api_type = \Bitrix\Main\Config\Option::get('kiora.yaka', "api_type_" . $f_Y_SHOP_ID, "", 1);

        //build actions
        $aActions = array();

        if ($api_type == "api") {
            if ($arRes['Y_INVOICE_ID'] && $arRes['PAYMENT_STATUS'] != PS\OrdersHistoryTable::PAYMENT_STATUS_SUCCEEDED && $arRes['PAYMENT_STATUS'] != PS\OrdersHistoryTable::PAYMENT_STATUS_CANCELED) {
                $aActions["YAKA_CHECK_STATUS_PAY"] = array(
                    "DEFAULT" => "N",
                    "TEXT" => GetMessage("Check status"),
                    "ACTION" => 'BX.addClass(tbl_history.TABLE, "pending");' . $lAdmin->ActionAjaxReload('/bitrix/tools/kiora.yaka/checkStatus.php?id=' . $arRes['ORDER_ID']) . $lAdmin->ActionAjaxReload('ki_yaka_payments_history.php') . ' return false;',
                );
            }

            if ($arRes['PAYMENT_STATUS'] == PS\OrdersHistoryTable::PAYMENT_STATUS_CHECK) {
                $aActions["YAKA_CONFIRM_PAY"] = array(
                    "DEFAULT" => "Y",
                    "TEXT" => GetMessage('YAKA_CONFIRM_PAY'),
                    "ACTION" => 'if(confirm("' . GetMessage("YAKA_CONFIRM_PAY?") . '")){BX.addClass(tbl_history.TABLE, "pending");' . $lAdmin->ActionRedirect("/bitrix/admin/ki_yaka_payments_history.php?requestType=confirmPayment&order_id=" . $f_ID . "&sum=" . $f_ORDER_AMOUNT . "&shopId=" . $f_Y_SHOP_ID . "&Y_INVOICE_ID=" . $f_Y_INVOICE_ID) . '} else { return false; }'
                );

                $aActions["YAKA_CANCEL_PAY"] = array(
                    "DEFAULT" => "Y",
                    "TEXT" => GetMessage('YAKA_CANCEL_PAY'),
                    "ACTION" => 'if(confirm("' . GetMessage("YAKA_CANCEL_PAY?") . '")){BX.addClass(tbl_history.TABLE, "pending");' . $lAdmin->ActionRedirect("/bitrix/admin/ki_yaka_payments_history.php?requestType=cancelPayment&order_id=" . $f_ID . "&sum=" . $f_ORDER_AMOUNT . "&shopId=" . $f_Y_SHOP_ID . "&Y_INVOICE_ID=" . $f_Y_INVOICE_ID) . '} else { return false; }'
                );
            }
        }

        if (class_exists('KIUtils')) {
            $aNewActions = \KIUtils::event('kiora.yaka', "KiYKBeforeAddActionsTableOrders", array('ADMIN' => $lAdmin, 'RES' => $arRes, 'ACTIONS' => $aActions));
        }

        //add select action
        $row->AddActions($aNewActions['ACTIONS']);
    }

    $lAdmin->AddRow("total_sum", array("ORDER_CONTENT" => GetMessage("Total") . ":", "ORDER_AMOUNT" => number_format(floatval($total_sum), 2, '.', '&nbsp;')));

    $lAdmin->AddFooter(
            array(
                array("title" => GetMessage("MAIN_ADMIN_LIST_SELECTED"), "value" => $rsData->SelectedRowsCount()),
                array("counter" => true, "title" => GetMessage("MAIN_ADMIN_LIST_CHECKED"), "value" => "0"),
            )
    );

    $lAdmin->AddAdminContextMenu(array());

    $lAdmin->CheckListMode();

    $APPLICATION->SetTitle(GetMessage("rub_title"));


    require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/main/include/prolog_admin_after.php");


    $oFilter = new CAdminFilter(
            $sTableID . "_filter",
            array(
        "E-mail",
        GetMessage("user_name"),
        GetMessage("user_phone"),
        GetMessage("order_date_time"),
        GetMessage("order_amount"),
        GetMessage("order_content"),
            )
    );
    ?>

    <style>    
        #tbl_history.pending {
            position: relative
        }
        #tbl_history.pending:before {
            content: '';
            position: absolute;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
            background-color: rgba(255,255,255,1);
            z-index: 5;
            animation-duration: 1.5s;
            animation-iteration-count: infinite;
            animation-timing-function: linear;
            animation-name: fade-1;
            cursor: not-allowed !important;
        }

        @keyframes fade-1 {
            0% {
                opacity: .7;
            }
            50% {
                opacity: .3;
            }
            100% {
                opacity: .7;
            }
        }
    </style>
    <div class="form-filter-wrap">
        <form name="find_form" method="get" action="<? echo $APPLICATION->GetCurPage(); ?>">
            <? $oFilter->Begin(); ?>

            <tr>
                <td><?= "ID" ?>:</td>
                <td>
                    <input type="text" name="find_id" size="47" value="<? echo htmlspecialchars($find_id) ?>">
                </td>
            </tr>

            <tr>
                <td><?= GetMessage("ORDER_ID") ?>:</td>
                <td>
                    <input type="text" name="find_shop_order_id" size="47" value="<? echo htmlspecialchars($find_shop_order_id) ?>">
                </td>
            </tr>

            <tr>
                <td><?= GetMessage("order_status") ?>:</td>
                <td>
                    <? \KIUtils::getDropDownList(PS\OrdersHistoryTable::getArrStatus(), "find_status", htmlspecialchars($find_status)); ?>
                </td>
            </tr>

            <tr>
                <td><?= GetMessage("Y_SHOP_ID") ?>:</td>
                <td>
                    <input type="text" name="find_shop_id" size="47" value="<? echo htmlspecialchars($find_shop_id) ?>">
                </td>
            </tr>

            <tr>
                <td><?= GetMessage("num_order_yk") ?>:</td>
                <td>
                    <input type="text" name="find_invoice_id" size="47" value="<? echo htmlspecialchars($find_invoice_id) ?>">
                </td>
            </tr>
            <tr>
                <td>E-mail:</td>
                <td><input type="text" name="find_email" size="47" value="<? echo htmlspecialchars($find_email) ?>"></td>
            </tr>
            <tr>
                <td><?= GetMessage("user_name") ?>:</td>
                <td><input type="text" name="find_name" size="47" value="<? echo htmlspecialchars($find_name) ?>"></td>
            </tr>
            <tr>
                <td><?= GetMessage("user_phone") ?>:</td>
                <td><input type="text" name="find_phone" size="47" value="<? echo htmlspecialchars($find_phone) ?>"></td>
            </tr>
            <tr>
                <td><?= GetMessage("order_date_time") ?>:</td>
                <td><?=
                    CalendarPeriod("filter_time_order_from", htmlspecialcharsbx($filter_time_order_from), "filter_time_order_to",
                            htmlspecialcharsbx($filter_time_order_to), "find_form", "Y")
                    ?></td> 
            </tr>
            <tr>
                <td><?= GetMessage("order_amount") ?>:</td>
                <td>
                    <? echo GetMessage("from"); ?>
                    <input type="text" name="filter_sum_order_from" value="<?= ($filter_sum_order_from != 0) ? htmlspecialcharsbx($filter_sum_order_from) : ''; ?>" size="3">
                    <? echo GetMessage("to"); ?>
                    <input type="text" name="filter_sum_order_to" value="<?= ($filter_sum_order_to != 0) ? htmlspecialcharsbx($filter_sum_order_to) : ''; ?>" size="3">
                </td>
            </tr><tr>
                <td><?= GetMessage("order_content") ?>:</td>
                <td><input type="text" name="find_content" size="47" value="<? echo htmlspecialchars($find_content) ?>"></td>
            </tr>
            <?
            $oFilter->Buttons(array("table_id" => $sTableID, "url" => $APPLICATION->GetCurPage(), "form" => "find_form"));
            $oFilter->End();
            ?>
        </form>
    </div><!-- /.form-filter-wrap -->

    <? $lAdmin->DisplayList(); ?>

    <?
} //if module exist

require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/main/include/epilog_admin.php");
