<?
error_reporting(E_ALL);

use Bitrix\Main\Config\Option;
use Bitrix\Main\Localization\Loc;

// подключим все необходимые файлы:
require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_admin_before.php"); // первый общий пролог

require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/courierserviceexpress.moduledost/include.php"); // инициализация модуля
//require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/subscribe/prolog.php"); // пролог модуля

// подключим языковой файл
IncludeModuleLangFile(__FILE__);

require($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_admin_after.php"); // второй общий пролог

	        $KCELogin = Option::get("courierserviceexpress.moduledost", "login");
	        $KCEPass = Option::get("courierserviceexpress.moduledost", "pass");

	if (extension_loaded('soap')&&extension_loaded('curl')) {
		if ($KCELogin) {
	
	// получим права доступа текущего пользователя на модуль
	$POST_RIGHT = $APPLICATION->GetGroupRight("courierserviceexpress.moduledost");
	// если нет прав - отправим к форме авторизации с сообщением об ошибке
	if ($POST_RIGHT == "D")
	    $APPLICATION->AuthForm(GetMessage("ACCESS_DENIED"));
	?>
	<?
	    //Получаем список заказов, для которых выбрана доставка КСЭ
	    if (CModule::IncludeModule("sale")):
	
	       $arFilter = Array();
	       $rsSales = CSaleOrder::GetList(array("DATE_INSERT" => "ASC"), $arFilter);
	       while ($arSales = $rsSales->Fetch())
	       {
	
	          //pr($arSales['DELIVERY_ID']);
	          //pr($arSales);
	          
	          
	          
	          //$arDeliv = \Bitrix\Sale\Delivery\Services\Manager::getById(23);
	          
	          //pr ($arDeliv);
	//            if ($arDeliv)
	//            {
	//               echo "Доставка \"".$arDeliv["NAME"]."\" стоит ".CurrencyFormat($arDeliv["PRICE"], $arDeliv["CURRENCY"]);
	//            }
	       }
	    endif;
	    

			//$dateFrom = '2019-11-15';
			$date = strtotime("-14 day");
			$dateFrom = cKCE::DateTimeFormat(date('Y-m-d', $date)); 
			$dateTo = cKCE::DateTimeFormat(date('Y-m-d'));
			$PrintName = Option::get("courierserviceexpress.moduledost", "PrintFormName");
	
	        $arOrderData = cKCE::GetOrders($KCELogin, $KCEPass, $dateFrom, $dateTo, $PrintName);
	          
//pr ($arOrderData);
	         // здесь будет вся серверная обработка и подготовка данных
	// здесь будет вывод страницы


		if ($arOrderData) {

			?>
			    <h1><?=Loc::getMessage('KSE_STAT_H1');?><h1>
			    <h2><?=Loc::getMessage('KSE_STAT_CLINFO');?></h2>
			    <ul>
			        <li><strong><?=Loc::getMessage('KSE_STAT_CLIENT');?></strong> <?=$arOrderData['client']['name'];?></li>
			        <li><strong><?=Loc::getMessage('KSE_STAT_DOGOVOR');?></strong> <?=$arOrderData['client']['contract'];?></li>
			        <li><strong><?=Loc::getMessage('KSE_STAT_DOGOVOR_CURR');?></strong> <?=$arOrderData['client']['currency'];?></li>
			    </ul>
<? if ($arOrderData['orders']) { ?>
			    <h2><?=Loc::getMessage('KSE_STAT_OPLZAK');?></h2>
			    <table width="100%" border="1" class="adm-list-table">
			        <thead>
			            <tr class="adm-list-table-header">
			                <td class="adm-list-table-cell"><?=Loc::getMessage('KSE_STAT_NUMZAK');?></td>
			                <td class="adm-list-table-cell"><?=Loc::getMessage('KSE_STAT_NUMNAKL');?></td>
			                <td class="adm-list-table-cell"><?=Loc::getMessage('KSE_STAT_DATEOFORM');?></td>
			                <td class="adm-list-table-cell"><?=Loc::getMessage('KSE_STAT_DATEZABORA');?></td>
			                <td class="adm-list-table-cell"><?=Loc::getMessage('KSE_STAT_POLUCHATEL');?></td>
			                <td class="adm-list-table-cell"><?=Loc::getMessage('KSE_STAT_NUMMEST');?></td>
			                <td class="adm-list-table-cell"><?=Loc::getMessage('KSE_STAT_VESFAKT');?></td>
			                <td class="adm-list-table-cell"><?=Loc::getMessage('KSE_STAT_VESOBJ');?></td>
			                <td class="adm-list-table-cell"><?=Loc::getMessage('KSE_STAT_STOIMZAK');?>, <?=$arOrderData['client']['currency'];?>.</td>
			                <td class="adm-list-table-cell"><?=Loc::getMessage('KSE_STAT_PLANDATEDOST');?></td>
			                <td class="adm-list-table-cell"><?=Loc::getMessage('KSE_STAT_NAKL');?></td>
			            </tr>
			        </thead>
			        <tbody style="background:#FFF">
			<? foreach ($arOrderData['orders'] as $order){ ?>     
			            <tr align="center" class="adm-list-table-row">
			                <td class="adm-list-table-cell"><?=$order['number'];?></td>
			                <td class="adm-list-table-cell"><?=$order['numberbill'];?></td>
			                <td class="adm-list-table-cell"><?=$order['date'];?></td>
			                <td class="adm-list-table-cell">--</td>
			                <td class="adm-list-table-cell"><?=$order['poluchatel'];?></td>
			                <td class="adm-list-table-cell"><?=$order['mesta'];?></td>
			                <td class="adm-list-table-cell"><?=$order['vesFakt'];?></td>
			                <td class="adm-list-table-cell">--</td>
			                <td class="adm-list-table-cell"><?=$order['cost'];?></td>
			                <td class="adm-list-table-cell"><?=$order['delivdate'];?></td>
			                <td class="adm-list-table-cell"><? if ($order['printBill']) {?> <a href="<?=$order['printBill'];?>" target="_blank"><?=Loc::getMessage('KSE_STAT_DOWNLOAD');?></a><? } ?></td>
			            </tr>
			<? } ?> 
			        </tbody>
			    </table>
			
			<?
}			
			//$OrderStatus = cKCE::GetDocumentStatus($KCELogin,$KCEPass,'666-0007857-00001214');
			
			//pr ($OrderStatus);
			/*
			
			// Меняем статус отгрузки для дальнейшего использования в обновлении статусов
			$OrderId = 12;
			//Получаем текущий статус заказа
			
			
			
			$order = \Bitrix\Sale\Order::load($OrderId); 
			$shipments = $order->getShipmentCollection();
			foreach ($shipments as $shipment){
			    if (!$shipment->isSystem()) {
			        
			        //Обновляем статус доставки
			        $NewStatus = $shipment->setField('STATUS_ID', 'DT');
			        
			        //Разрешаем заказ к отгрузке
			        $IsAllow = $shipment->allowDelivery();
			        $order->save();
			        
			//        pr ($statusId);
			//        pr ($NewStatus);
			    }
			}
		
	*/
		} else { ?>			<div class="adm-info-message-wrap adm-info-message-red">
				<div class="adm-info-message">
					<div class="adm-info-message-title"><?=Loc::getMessage('OPTIONS_NODATA');?></div>
					
					<div class="adm-info-message-icon"></div>
				</div>
			</div>
		<? }
	} else {
	echo Loc::getMessage("OPTIONS_NOLOGIN");}
 } else {
	echo Loc::getMessage("OPTIONS_NOSOAP");
} ?>

<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/epilog_admin.php");?>