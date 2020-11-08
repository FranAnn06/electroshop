<?php
define('STOP_STATISTICS', true);
define('NO_KEEP_STATISTIC', 'Y');
define('NO_AGENT_STATISTIC','Y');
define('DisableEventsCheck', true);
define('BX_SECURITY_SHOW_MESSAGE', true);
define('NOT_CHECK_PERMISSIONS', true);

$siteId = isset($_REQUEST['SITE_ID']) && is_string($_REQUEST['SITE_ID']) ? $_REQUEST['SITE_ID'] : '';
$siteId = substr(preg_replace('/[^a-z0-9_]/i', '', $siteId), 0, 2);
if (!empty($siteId) && is_string($siteId))
{
	define('SITE_ID', $siteId);
}

require_once($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/main/include/prolog_before.php');

$request = Bitrix\Main\Application::getInstance()->getContext()->getRequest();
$request->addFilter(new \Bitrix\Main\Web\PostDecodeFilter);

if (!Bitrix\Main\Loader::includeModule('sale'))
	return;

Bitrix\Main\Localization\Loc::loadMessages(dirname(__FILE__).'/class.php');

$signer = new \Bitrix\Main\Security\Sign\Signer;
try
{
	$signedParamsString = $request->get('signedParamsString') ?: '';
	$params = $signer->unsign($signedParamsString, 'sale.order.ajax');
	$params = unserialize(base64_decode($params));
}
catch (\Bitrix\Main\Security\Sign\BadSignatureException $e)
{
	die();
}

$action = $request->get($params['ACTION_VARIABLE']);
if (empty($action))
	return;

global $APPLICATION;

$APPLICATION->IncludeComponent(
	'bitrix:sale.order.ajax',
	'.default',
	$params
);


AddEventHandler("sale", "OnOrderNewSendEmail", "bxModifySaleMails");

//-- Собственно обработчик события

function bxModifySaleMails($orderID, &$eventName, &$arEventFields)
{
    $arOrder = CSaleOrder::GetByID($orderID);

    //-- получаем телефоны и адрес
    $order_props = CSaleOrderPropsValue::GetOrderProps($orderID);
    $phone="";
    $index = "";
    $country_name = "";
    $city_name = "";
    $address = "";
    $fio = "";
    while ($arProps = $order_props->Fetch())
    {
        if ($arProps["CODE"] == "PHONE")
        {
            $phone = htmlspecialchars($arProps["VALUE"]);
        }
        if ($arProps["CODE"] == "FIO")
        {
            $fio = htmlspecialchars($arProps["VALUE"]);
        }
        if ($arProps["CODE"] == "EMAIL")
        {
            $email = htmlspecialchars($arProps["VALUE"]);
        }

        if ($arProps["CODE"] == "INDEX")
        {
            $index = $arProps["VALUE"];
        }

        if ($arProps["CODE"] == "ADDRESS")
        {
            $address = $arProps["VALUE"];
        }
    }

    $full_address = $address;

    //-- получаем название службы доставки
    $arDeliv = CSaleDelivery::GetByID($arOrder["DELIVERY_ID"]);
    $delivery_name = "";
    if ($arDeliv)
    {
        $delivery_name = $arDeliv["NAME"];
    }

    //-- получаем название платежной системы
    $arPaySystem = CSalePaySystem::GetByID($arOrder["PAY_SYSTEM_ID"]);
    $pay_system_name = "";
    if ($arPaySystem)
    {
        $pay_system_name = $arPaySystem["NAME"];
    }

    $arEventFields = array(
        "ORDER_DESCRIPTION" => $arOrder["USER_DESCRIPTION"],
        "EMAIL"=>$email,
        "PHONE" =>  $phone,
        "DELIVERY_NAME" =>  $delivery_name,
        "PAY_SYSTEM_NAME" =>  $pay_system_name,
        "FULL_ADDRESS" => $full_address,
        "FIO" => $fio);

     CEvent::Send("YAKA_ORDER_ADD", s1, $arEventFields);
}
?>