<?php

use Bitrix\Main\Loader;
use Bitrix\Main\Localization\Loc;
use Bitrix\Main\Config\Option;
use Bitrix\Main\Type\DateTime;
use Bitrix\Highloadblock as HL; 


require_once $_SERVER['DOCUMENT_ROOT'] . '/bitrix/modules/main/include/prolog_admin_before.php';

Loader::includeModule('sale');
Loader::includeModule('iblock');
Loader::includeModule('courierserviceexpress.moduledost');
Loader::includeModule("highloadblock"); 

$dataOrder = $_POST;

//AddMessage2Log($dataOrder);
//Получаем ID свойства АРТИКУЛ для товаров и торговых предложений

$TovarSku = Option::get("courierserviceexpress.moduledost", "TovarSku");
$TPSku = Option::get("courierserviceexpress.moduledost", "TPSku");

//Собираем данные для формирования накладной
$login = Option::get("courierserviceexpress.moduledost", "login");
$password = Option::get("courierserviceexpress.moduledost", "pass");
$RecepientName = $dataOrder['delivery_recipient_name'][0];
$GeoTo = 'postcode-'.$dataOrder['delivery_zip'][0];
$RecepientFullAddress = $dataOrder['delivery_address'][0];
$RecepientPhone = $dataOrder['delivery_recipient_phone'][0];
$Urgency = Option::get("courierserviceexpress.moduledost", "urgency");    //$dataOrder['Urgency'];
$CargoDescription = '';
$CargoPackageQty = $dataOrder['total_qty'];
$ClientName = $dataOrder['ClientName'];
$Weight = $dataOrder['total_weight_kg'];
//$GeoFrom = Option::get("courierserviceexpress.moduledost", "skladGUID");//$dataOrder['adres_zabora'];
$ZIP = KseService::GetZipCode($dataOrder['geodata']);
$GeoFrom = 'postcode-'.$ZIP;
$SenderAddress = $dataOrder['adres_zabora'];
$SenderComment = $dataOrder['delivery_note'][0];
$TakeDate = $dataOrder['pickup_date'].'T'.$dataOrder['pickup_finish_time'].':00';
$TypeOfCargo = Option::get("courierserviceexpress.moduledost", "TypeOfCargo");
$TypeOfPayer = Option::get("courierserviceexpress.moduledost", "PayerCode");
$WayOfPayment = Option::get("courierserviceexpress.moduledost", "PaymentMethod");
$BtrxOrderId = $dataOrder['delivery_client_order_id'][0];
$SenderPhone = $dataOrder['otprav_phone'];
$DeliveryOfCargo = Option::get("courierserviceexpress.moduledost", "kurierka");

//Получаем информацию о товарах из корзины
$res = CSaleBasket::GetList(array(), array("ORDER_ID" => $dataOrder['delivery_client_order_id'][0]));
$i=0;

//Get Recepient Email
$order = CSaleOrder::GetByID($delivery_client_order_id[0]);
$RecepientEmail = $order['USER_EMAIL'];
$orderProps = CSaleOrderPropsValue::GetOrderProps($delivery_client_order_id[0]);
$EmailID = Option::get("courierserviceexpress.moduledost", "inputEmail");
$GUIDPvzOptionsFiz = Option::get("courierserviceexpress.moduledost", "inputPVZFIZ");
$GUIDPvzOptionsUr = Option::get("courierserviceexpress.moduledost", "inputPVZUR");

while ($prop = $orderProps->Fetch()) {
    
    //Получаем Email
    if ($prop['PROP_ID'] == $EmailID) {
        $RecepientEmail = $prop['VALUE'];
    }
    //Получаем GUIDPVZ физиков (если он есть)
    if ($prop['PROP_ID'] == $GUIDPvzOptionsFiz) {
        $GUIDPvz = $prop['VALUE'];
        $DeliveryOfCargo = Option::get("courierserviceexpress.moduledost", "pvz");
    }
    
    //Получаем GUIDPVZ юриков (если он есть)
    if ($prop['PROP_ID'] == $GUIDPvzOptionsUr) {
        $GUIDPvz = $prop['VALUE'];
        $DeliveryOfCargo = Option::get("courierserviceexpress.moduledost", "pvz");
    }
}

while ($arItem = $res->Fetch()) {
    
    //Получаем артикул товара (торгового предложения) для добавления в накладнкую
    $arFilter2 = Array("ID"=>$arItem['PRODUCT_ID']);
    $res2 = CIBlockElement::GetList(Array(), $arFilter2);
    if ($ob2 = $res2->GetNextElement()){        
        $arProps2 = $ob2->GetProperties(); // свойства элемента
        
        //По умолчанию берем артикул как XML_ID товара (чтобы он был непустым в любом случае)
        $Items[$i]['SKU'] = $arItem['PRODUCT_XML_ID'];
        
        //Пробегаем по свойствам, отмеченным как АРТИКУЛ, и записываем значения в итоговый массив
        foreach ($arProps2 as $Prop2){
            if ($Prop2['ID'] == $TovarSku) $Items[$i]['SKU'] = $Prop2['VALUE'];
            if ($Prop2['ID'] == $TPSku) $Items[$i]['SKU'] = $Prop2['VALUE'];
        }
    }
       
    //Формируем массив с данынми по товару    
    $Items[$i]['NAME'] = $arItem['NAME'];
    $Items[$i]['PRICE'] = $arItem['PRICE'];
    $Items[$i]['CURR'] = $arItem['CURRENCY'];
    $Items[$i]['QTY'] = $arItem['QUANTITY'];
    $Items[$i]['ID'] = $arItem['PRODUCT_ID'];
    $Items[$i]['UNIT'] = $arItem['MEASURE_NAME'];
    $i++;
}

// 23.01.2020
// Добавляем данные по стоимости доставки и статусу оплаты заказа
$OrderData = CSaleOrder::GetByID($dataOrder['delivery_client_order_id'][0]);
$SumDost = number_format($OrderData['PRICE_DELIVERY'],2,'.','');
$SumPayZakaz = $OrderData['SUM_PAID'];
//$SumNeedPayZakaz = $OrderData['PRICE'] - $SumDost - $SumPayZakaz;

$SumNeedPayZakaz = $OrderData['PRICE'];

$DeliveryDate = $dataOrder['delivery_required_date'][0];
if (!empty($dataOrder['delivery_required_start_time'][0]) && !empty($dataOrder['delivery_required_finish_time'][0])) {
    $DeliveryTime = $dataOrder['delivery_required_start_time'][0].' - '.$dataOrder['delivery_required_finish_time'][0];
}else{
    $DeliveryTime = '';
}
$VATRate = Option::get("courierserviceexpress.moduledost", "KCEVat");
//убрал проверку на наличие $SenderComment
if (($login)&&($password)&&($BtrxOrderId)&&($RecepientName)&&($GeoTo)&&($RecepientFullAddress)&&($RecepientPhone)&&($Urgency)&&($CargoPackageQty)&&($Weight)&&($GeoFrom)&&($ClientName)&&($SenderPhone)&&($TypeOfCargo)&&($Items))
{
	//Формируем накладную и получаем ее номер для отслеживания статусов
	$WayBillID = cKCE::SetWaybill(
                        $login,
                        $password,
                        $BtrxOrderId,
                        $RecepientName,
                        $GeoTo,
                        $RecepientFullAddress,
                        $RecepientPhone,
                        $RecepientEmail,
                        $Urgency,
                        $CargoDescription,
                        $CargoPackageQty,
                        $Weight,
                        $GeoFrom,
                        $ClientName,
                        $ClientNameOfficial,
                        $SenderPhone,
                        $SenderAddress,
                        $SenderComment,
                        $TakeDate,
                        $TypeOfCargo,
                        $TypeOfPayer,
                        $WayOfPayment,
                        $Items,
                        $SumDost,
                        $SumPayZakaz,
                        $SumNeedPayZakaz,
                        $DeliveryOfCargo,
                        $GUIDPvz,
                        $DeliveryDate,
                        $DeliveryTime,
                        $VATRate
                );
	$result = $WayBillID;

    //AddMessage2Log("hi!");

	if ($WayBillID) {
	
	    $OrderData = CSaleOrder::getByID($dataOrder['delivery_client_order_id'][0]);
	    
	    $UpdTrack['TRACKING_NUMBER'] = $WayBillID;
	    $UpdTrack['DELIVERY_DOC_NUM'] = $WayBillID;
	    $UpdTrack['DELIVERY_DOC_DATE'] = new DateTime();
	    
	    $OrderUpd = CSaleOrder::Update($dataOrder['delivery_client_order_id'][0],$UpdTrack);
	    
	    //Записываем накладную в список
	    $hlbl = COption::GetOptionString("courierserviceexpress.moduledost", "WayBillshblockID")*1;
	    $hlblock = HL\HighloadBlockTable::getById($hlbl)->fetch(); 
	    $entity = HL\HighloadBlockTable::compileEntity($hlblock); 
	    $entity_data_class = $entity->getDataClass();
	
	    //Если такая накладная уже есть в базе, то не пишем её
	        $rsData = $entity_data_class::getList(array(
	           "select" => array("*"),
	           "order" => array("ID" => "ASC"),
	           "filter" => array("UF_WAYBILLID" => $WayBillID)
	        ));
	        $rsData = $rsData->fetch();
	        //pr ($rsData);
	        if (!$rsData) {
	            $HBLdata = array("UF_WAYBILLID" => $WayBillID, "UF_ORDERID" => $dataOrder['delivery_client_order_id'][0], "UF_WAYBILL_DATE" => $UpdTrack['DELIVERY_DOC_DATE'], "UF_ADR_OTPR" => $dataOrder['adres_zabora'], "UF_KSE_WEIGHT" => $Weight, "UF_KSE_QTY" =>$CargoPackageQty);
	            $HBLresult = $entity_data_class::add($HBLdata);
	        }
		$r1 = Loc::getMessage('KSE_ORDER_OK_1');
		$r2 = Loc::getMessage('KSE_ORDER_OK_2');
		$result = $r1.$WayBillID.$r2;
	} else {
		$result = Loc::getMessage('KSE_ORDER_ERROR_1');
	}
	
	
} else {
	$result = Loc::getMessage('KSE_ORDER_ERROR_2');
}
echo $result;

