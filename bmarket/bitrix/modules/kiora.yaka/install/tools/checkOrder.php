<?php

use \Bitrix\Main\Application;

define("STOP_STATISTICS", true);
define('NO_AGENT_CHECK', true);
define('NOT_CHECK_PERMISSIONS', true);
define("DisableEventsCheck", true);

require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_before.php");

global $APPLICATION;

if ( \CModule::IncludeModule("kiora.yaka") ){
    
    
    $context = Application::getInstance()->getContext();
    $request = $context->getRequest();
    $request_data = $request->getPostList()->toArray();

    $yaMoneyCommonHttpProtocol = new YaMoneyCommonHttpProtocol();
    $yaMoneyCommonHttpProtocol->processRequest($request_data); // $_REQUEST

}

$APPLICATION->FinalActions();
exit();