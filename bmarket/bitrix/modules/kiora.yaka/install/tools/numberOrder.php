<?php

use \Bitrix\Main\Application;

define("STOP_STATISTICS", true);
define('NO_AGENT_CHECK', true);
define('NOT_CHECK_PERMISSIONS', true);
define("DisableEventsCheck", true);

require_once($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/main/include/prolog_before.php");

global $APPLICATION;

if (\CModule::IncludeModule("kiora.yaka")) {

    $context = Application::getInstance()->getContext();
    $request = $context->getRequest();
    $post_list = $request->getPostList();
    $form_data = $post_list->toArray();

    $shopId = $request->get('shopId');

    if (!$shopId) {
        \KIUtils::error('numberOrder.php', 'Bad $shopId number!');
        exit;
    }

    $api_type = \Bitrix\Main\Config\Option::get('kiora.yaka', "api_type_" . $shopId, "", 1);

    if ($api_type != 'api' && $api_type != 'http') {

        \KIUtils::error('numberOrder.php - BAD API_TYPE VALUE - (' . $api_type . ')');
        $APPLICATION->FinalActions();
        exit();
    }

    $form_data = \KIUtils::event('kiora.yaka', "KiYKValidFormBeforeOrderAdd", $form_data);

    if ($form_data['sum'] == '') {
        \KIUtils::error('numberOrder.php', 'Bad data array!');
        exit;
    }
    
    $form_data = \KIUtils::sanitizePostField($form_data);
    
    \KIUtils::log('$form_data2', $form_data);

    $form_data['orderNumber'] = \Kiora\Payments\OrdersHistoryTable::addOrderShop($form_data);

    $form_data['customerNumber'] = substr($form_data['user_email'], 0, 32);

    $form_data = \KIUtils::event('kiora.yaka', "KiYKBeforeGetOrderNumber", $form_data);

    $result_data = array(
        'orderNumber' => $form_data['orderNumber'],
        'customerNumber' => $form_data['customerNumber']
    );

    if (!$result_data['orderNumber']) {
        \KIUtils::error('numberOrder.php', 'Bad orderNumber!', $result_data);
        exit;
    }

    if ($api_type == 'api') {

        \KIUtils::log('numberOrder.php', 'Form data API type');

        $handler = new \Kiora\Payments\YandexCheckoutHandler($form_data);
        $resultRequestPayment = $handler->requestPayment($form_data);
        $result_data = array_merge($result_data, $resultRequestPayment);
        
    } elseif ($api_type == 'http') {
        \KIUtils::log('numberOrder.php', 'Form data HTTP type');
    }
    
    $responce = \KIUtils::jsonEncode($result_data);
    
    if($responce === false) {
        $error = '{"error": "Fail jsonEncode process"}';
        \KIUtils::error($error);
        echo $error;
    } elseif ($form_data['orderNumber'] === false) {
        $error = '{"error": "Not found orderNumber"}';
        \KIUtils::error($error);
        echo $error;
    } else {
        echo $responce;
    }
}

$APPLICATION->FinalActions();
exit();
