<?php

use \Bitrix\Main;
use \Bitrix\Main\Application;
use \Kiora\Payments\OrdersHistoryTable;
use \Kiora\Payments\YandexCheckoutHandler as YKHandler;

define("STOP_STATISTICS", true);
define('NO_AGENT_CHECK', true);
define('NOT_CHECK_PERMISSIONS', true);
define("DisableEventsCheck", true);

require_once($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/main/include/prolog_before.php");

global $APPLICATION;

if (\CModule::IncludeModule("kiora.yaka")) {

    $context = Application::getInstance()->getContext();
    $response = $context->getRequest();
    $orderId = $response->get("id");


    if (!$orderId) {
        $APPLICATION->FinalActions();
        exit();
    }

    $order = OrdersHistoryTable::orderFindByShopID($orderId);

    if (!$order || !$order['Y_INVOICE_ID'] || !$order['Y_SHOP_ID']) {
        $APPLICATION->FinalActions();
        exit();
    }

    $data = array('shopId' => $order['Y_SHOP_ID']);
    $handler = new YKHandler($data);
    $response = $handler->requestPaymentData($order['Y_INVOICE_ID']);

    if (
            $response['status'] === YKHandler::PAYMENT_STATUS_SUCCEEDED ||
            $response['status'] === YKHandler::PAYMENT_STATUS_CANCELED ||
            $response['status'] === YKHandler::PAYMENT_STATUS_WAITING_FOR_CAPTURE
    ) {
        $status_int = OrdersHistoryTable::mapApiStatus($response['status']);

        if ($status_int != $order['PAYMENT_STATUS']) {

            OrdersHistoryTable::statusUpdate($order, $response, $status_int);
            if ($response['payment_method'])
                $result_update_order = OrdersHistoryTable::updateByShopID($order['ORDER_ID'], array('Y_PAYMENT_TYPE' => $response['payment_method']['type']));
        }
        
    } else {

        $event = new \Bitrix\Main\Event('kiora.yaka', 'KiOnGetUnknownStatus', array(array("ORDER" => $order, "RESPONSE" => $response)));
        $event->send();
        
        \KIUtils::log('UNKNOWN STATUS - ' . $response['status']);
    }

    sleep(3);
}

$APPLICATION->FinalActions();
exit();

