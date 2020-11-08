<?
use Bitrix\Main\Loader;
use Bitrix\Main\Config\Option;
use Bitrix\Highloadblock as HL; 
use Bitrix\Main\Type\DateTime;
use Bitrix\Main\Localization\Loc;
use Bitrix\Sale;
//use \Bitrix\Sale\Shipment;
//use KseService;




// подключим все необходимые файлы:
require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_admin_before.php"); // первый общий пролог

require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/courierserviceexpress.moduledost/include.php"); // инициализация модуля
//require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/subscribe/prolog.php"); // пролог модуля

// подключим языковой файл
IncludeModuleLangFile(__FILE__);

	require($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_admin_after.php"); // второй общий пролог

	    //Данные пользователя
	    $KCELogin = Option::get("courierserviceexpress.moduledost", "login");
	    $KCEPass = Option::get("courierserviceexpress.moduledost", "pass");

if (extension_loaded('soap')&&extension_loaded('curl')) {
	if ($KCELogin) {
	
	//подключаем нужные модули
	Loader::includeModule("highloadblock");
	Loader::includeModule("sale");
    \Bitrix\Main\Loader::IncludeModule("catalog");
	
	// получим права доступа текущего пользователя на модуль
	$POST_RIGHT = $APPLICATION->GetGroupRight("courierserviceexpress.moduledost");
	// если нет прав - отправим к форме авторизации с сообщением об ошибке
	if ($POST_RIGHT == "D")
	    $APPLICATION->AuthForm(GetMessage("ACCESS_DENIED"));
	?>
	<?

        //Получаем возможные типы груза
        $CargoTypes = cKCE::GetCargoTypes($KCELogin, $KCEPass);
        $TypeOfCargo = Option::get("courierserviceexpress.moduledost", "TypeOfCargo");

	if ($CargoTypes) {
		
		    $hlbl = COption::GetOptionString("courierserviceexpress.moduledost", "WayBillshblockID")*1;
		    $hlblock = HL\HighloadBlockTable::getById($hlbl)->fetch(); 
		    $entity = HL\HighloadBlockTable::compileEntity($hlblock); 
		    $entity_data_class = $entity->getDataClass();
		    
		        //Собираем данные из настроек модуля для оформления заказа
		        $SenderAddress = Option::get("courierserviceexpress.moduledost", "AdresZaboraGruza");
		        $SenderPhone = Option::get("courierserviceexpress.moduledost", "SenderContactPhone"); 
		        $SenderEmail = Option::get("courierserviceexpress.moduledost", "SenderContactEmail"); 
		        $CompanyName = htmlspecialchars(Option::get("courierserviceexpress.moduledost", "CompanyName")); 
                $SenderName = htmlspecialchars(Option::get("courierserviceexpress.moduledost", "SenderName"));
		        $SenderGeography = Option::get("courierserviceexpress.moduledost", "sklad-fias");
				$GorodZaboraGruza = Option::get("courierserviceexpress.moduledost", "GorodZaboraGruza");
		
		        
		        //Получаем возможные способы оплаты
		        $PayMethods = cKCE::GetPayMethods($KCELogin, $KCEPass);
		        $PaymentMethod = Option::get("courierserviceexpress.moduledost", "PaymentMethod");
		        
		        //Получаем возможные способы доставки
		        $ShippingMethods = cKCE::GetShippingMethods($KCELogin, $KCEPass);
		        $ShMethod = Option::get("courierserviceexpress.moduledost", "DeliveryMethod");
		        
		        //Получаем код плательщика
		        $PayerCodes = cKCE::GetPayerCode($KCELogin, $KCEPass);
		        $Payer = Option::get("courierserviceexpress.moduledost", "PayerCode");
		        
		        //Получаем типы срочностей доставки для пользователя
		        $arUrgencies = cKCE::GetUrgencies($KCELogin, $KCEPass);
		        $Urg = Option::get("courierserviceexpress.moduledost", "urgency");

		        //Формируем массив населенных пунктов
		        $arCitiesData=KseService::getGeoCodesArray();
		        $arCities = $arCitiesData['CITIES'];
		        $arCodes = $arCitiesData['CODES'];
				foreach ($arCodes as $Code) {
					$test = str_replace(array('"',','), '', $Code);
					$test = explode(":",$test);
					$Def = str_replace(' ', '', $test[1]);
					if ($Def == $GorodZaboraGruza) { $CityDefault = trim($test[0]); $CityDefaultCode = trim($test[1]);}
				}
				
				//Указываем дату забора груза по умолчанию
				$Tdate = strtotime("+1 day");
				$TakeDate = date ('Y-m-d',$Tdate);
		        
		    //ФОРМИРОВАНИЕ ЗАКАЗА
		    
		    if ($_GET['type'] == 1) {
		        
		        //Преобразуем дату к нужному формату
		        $DateFormat = strtotime($_POST['TakeDate']); // преобразование строки в  timestamp
		        $DateFormat = date('Y-m-d', $DateFormat); // преобразование  timestamp в строку нужного формата
                
                $TakeTime = $_REQUEST['TakeTime'];
                $SenderFIO = $_REQUEST['SenderFIO'];
		        
		        $ZIP = KseService::GetZipCode($_POST['SenderCity']);
		        $SenderGeography = 'postcode-'.$ZIP;
                
		        //Отправляем накладные в заказ
		       $OrderID = cKCE::SetOrder($KCELogin, $KCEPass, $arWaybill, $DateFormat, $TakeTime, $_POST['Sender'], $SenderFIO, $SenderGeography, $_POST['SenderAddress'], $_POST['SenderPhone'], $_POST['SenderEmail'], $_POST['SenderComment'], $_POST['Urgency'], $_POST['PayerCode'], $_POST['PaymentMethod'], $_POST['ShippingMethod'], $_POST['TypeOfCargo'], $_POST['Weight'], $_POST['CargoPackageQty']);

			if ($OrderID) {	
			       foreach ($arWaybill as $WayBill){
			            //Получаем ID накладных из заказа
			            $wbData = $entity_data_class::getList(array(
			               "select" => array("ID"),
			               "filter" => array("UF_WAYBILLID" => $WayBill)
			            ));
			            $wbData = $wbData->fetch();
			            $resUpdate = $entity_data_class::update($wbData['ID'], array('UF_KSE_ORDERID' => $OrderID)); //Записываем ID заказа в инфоблок
			       }
			} else { ?>

					<div class="adm-info-message-wrap adm-info-message-red">
						<div class="adm-info-message">
							<div class="adm-info-message-title"><?=Loc::getMessage('ORDER_NODATA');?></div>
							
							<div class="adm-info-message-icon"></div>
						</div>
					</div>
	
		<?	}
		    }    
   
			//Если по этой накладной уже оформлен заказ, то не пишем ее
		        $rsData = $entity_data_class::getList(array(
		           "select" => array("*"),
		           //"filter" => array ("UF_KSE_ORDERID" => ''),
		           "order" => array("ID" => "ASC")
		        ));
		        $Weight=0;
		        $Qty=0;
                $i=0;
		        while ($res1 = $rsData->fetch()){
		            $arWayBills[$i]=$res1;           
		            //Получаем накладные от КСЭ, если данные еще не были получены ранее, и суммируем данные по ним
		            //$DocInfo = cKCE::GetDocumentInfo($KCELogin, $KCEPass,'Waybill',$res1['UF_WAYBILLID']);
		            //if ($DocInfo):
		            //    $Weight += $DocInfo['WEIGHT'];
		            //    $Qty += $DocInfo['QTY'];
		            //endif;
                    
                    //GetStatuses for waybills
                    $wayBillID = $res1['UF_WAYBILLID'];
                    $orderID = $res1['UF_ORDERID'];
                    
		            $arWayBillStatus = cKCE::GetDocumentStatus($KCELogin,$KCEPass,'Waybill',$wayBillID);
 
                    if ($arWayBillStatus['NAME']) {
                        $arWayBills[$i]['UF_WAYBILLSTATUS'] = $arWayBillStatus['NAME'];
                        $resUpdate = $entity_data_class::update($res1['ID'], array('UF_WAYBILLSTATUS' => $arWayBillStatus['NAME'])); //Записываем ID заказа в инфоблок
                        
                        //обновляем статус отгрузки в магазине
                        $order = Sale\Order::load($orderID);
                        $orderStatus = Option::get("courierserviceexpress.moduledost", $arWayBillStatus['GUID']);
                        
                        $collection = $order->getShipmentCollection();
                        foreach ($collection as $ship) {
                            $System = $ship->getField('SYSTEM');
                            if ($System == 'N') {
                                $res = $ship->setField('STATUS_ID', $orderStatus);                                
                            }
                        }
                        $order->save();
                    }
                    $i++;
		        }; 
		?>
		    <script src="https://code.jquery.com/jquery-2.1.1.js"></script>
		    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
		    <link rel="stylesheet" href="http://ajax.aspnetcdn.com/ajax/jquery.ui/1.10.3/themes/flick/jquery-ui.css">
		    <script type="text/javascript">
		        $(function() {
		        	
		        	var cities = [<? foreach ($arCities as $city) echo $city;?>];
		        	var codes = {<? foreach ($arCodes as $code) echo $code;?>};
		                    
		            $('#acInput').autocomplete({
		                source: cities,
		                select: function(event, ui) {
		                    $('#code').val(codes[ui.item.value]);
		                }
		            })
		        });   
		    </script>
		    <h1><?=Loc::getMessage('KSE_ORDER_H1');?></h1>  
<? if ($arWayBills): ?>    
		<form method="POST" action="kse-order.php?type=1">  
		    <h2><?=Loc::getMessage('KSE_ORDER_H2');?></h2>
		    <h3 style="text-align: right;"><?=Loc::getMessage('KSE_ORDER_H3');?>&nbsp;<?=date('Y-m-d H:i:s')?></h3> 
		    <table width="100%" border="1" class="adm-list-table">
		        <thead>
		            <tr class="adm-list-table-header">
		                <td class="adm-list-table-cell"><?=Loc::getMessage('KSE_ORDER_NUMZAK');?></td>
		                <td class="adm-list-table-cell"><?=Loc::getMessage('KSE_ORDER_NUMNAKL');?></td>
		                <td class="adm-list-table-cell"><?=Loc::getMessage('KSE_ORDER_NUMDATE');?></td>
		                <td class="adm-list-table-cell"><?=Loc::getMessage('KSE_ORDER_NUMADDR');?></td>
		                <td class="adm-list-table-cell"><?=Loc::getMessage('KSE_ORDER_NUMZAKID');?></td>
		                <td class="adm-list-table-cell"><?=Loc::getMessage('KSE_ORDER_GRUZMASS');?></td>
		                <td class="adm-list-table-cell"><?=Loc::getMessage('KSE_ORDER_PLACES');?></td>
                        <td class="adm-list-table-cell"><?=Loc::getMessage('KSE_WAYBILL_STATUS');?></td>
		                <td class="adm-list-table-cell"><?=Loc::getMessage('KSE_ORDER_ADDZAK');?></td>
                        
		            </tr>
		        </thead>
		        <tbody style="background:#FFF">

		<? $i=0;foreach ($arWayBills as $WayBill){ ?>     
		            <tr align="center" class="adm-list-table-row">
		                <td class="adm-list-table-cell">
                            <? if ($WayBill['UF_KSE_ORDERID']) {?>
                                <?=$WayBill['UF_KSE_ORDERID'];?>
                                <a href="/local/getCSEpdf.php?type=order&numb=<?=$WayBill['UF_KSE_ORDERID'];?>" target="_blank">(pdf)</a>
                            <? } ?>
                        </td>
		                <td class="adm-list-table-cell">
                            <? if ($WayBill['UF_WAYBILLID']) { ?>
                                <?=$WayBill['UF_WAYBILLID'];?> 
                                <a href="/local/getCSEpdf.php?type=waybill&numb=<?=$WayBill['UF_WAYBILLID'];?>" target="_blank">(pdf)</a>
                            <? } ?>
                        </td>
		                <td class="adm-list-table-cell"><?=$WayBill['UF_WAYBILL_DATE']->toString();?></td>
		                <td class="adm-list-table-cell"><?=$WayBill['UF_ADR_OTPR'];?></td>
		                <td class="adm-list-table-cell"><a href="sale_order_view.php?ID=<?=$WayBill['UF_ORDERID'];?>" target="_blank"><?=$WayBill['UF_ORDERID'];?></a></td>
		                <td class="adm-list-table-cell"><span id="wei-<?=$WayBill['UF_WAYBILLID'];?>"><?=$WayBill['UF_KSE_WEIGHT'];?></span></td>
		                <td class="adm-list-table-cell"><span id="qty-<?=$WayBill['UF_WAYBILLID'];?>"><?=$WayBill['UF_KSE_QTY'];?></span></td>
                        <td class="adm-list-table-cell"><?=$WayBill['UF_WAYBILLSTATUS'];?></td>
		                <td class="adm-list-table-cell">
		<? //Если накладной ещё нет в заказах Курьер Сервиса, то делаем их доступными к добавлению
		    if (!$WayBill['UF_KSE_ORDERID']):?>                
		                    <input type="checkbox" name="arWaybill[<?=$i;?>]" id="wb-<?=$WayBill['UF_WAYBILLID'];?>" value="<?=$WayBill['UF_WAYBILLID'];?>" />
		<?  else: ?>
		                    <?=Loc::getMessage('KSE_ORDER_ZAKOFF');?>                    
		<? endif;?>                    
		                </td>
                        
		            </tr>
		<? $i++; } ?> 
		        </tbody>
		    </table> 
		<div class="adm-detail-block">
		<div class="adm-detail-content" id="edit1"><div class="adm-detail-title"><?=Loc::getMessage('KSE_ORDER_ZAKINFO');?></div>
			<div class="adm-detail-content-item-block">
		    
		    <table class="adm-detail-content-table edit-table" id="edit1_edit_table">
					<tbody>
					<tr>
						<td><?=Loc::getMessage('KSE_ORDER_DATEZAB');?></td>
		                <td>
		                    <div class="adm-input-wrap adm-input-wrap-calendar">
		                        <input class="adm-input adm-input-calendar" type="text" name="TakeDate" required="required" value="<?=$TakeDate?>"/>
		                        <span class="adm-calendar-icon" title="<?=Loc::getMessage('KSE_ORDER_DATEVYB');?>" onclick="BX.calendar({node:this, field:'TakeDate', form: '', bTime: false, bHideTime: false});"></span>
		                    </div>
		                </td>
		            </tr>
		            <tr>
		                <td><?=Loc::getMessage('KSE_ORDER_TIMEZAB');?></td>
		                <td><select name="TakeTime">
		<? for ($i = 0;$i <= 23;$i++){ 
			$selected = '';
			if ($i == 12) $selected='selected';
		 ?>              
		                        <option <?=$selected;?> value="<?=$i?>:00 - <?=$i+1?>:00"><?=$i?>:00 - <?=$i+1?>:00</option>
		<? } ?>                        
		                    </select>
		                </td>
		            </tr>
		            <tr>
		                <td><?=Loc::getMessage('KSE_ORDER_OTPRAV');?></td>
		                <td><input type="text" name="Sender" size="70" value="<?=$CompanyName?>"/></td>
		            </tr>
                    <tr>
		                <td><?=Loc::getMessage('KSE_ORDER_OTPRAV_FIO');?></td>
		                <td><input type="text" name="SenderFIO" size="70" value="<?=$SenderName?>"/></td>
		            </tr>
		            <tr>
		                <td><?=Loc::getMessage('KSE_ORDER_OTPRAVCITY');?></td>
		                <td>
		                    <div class="ui-widget">
		                        <input class="adm-input" value="<?=$CityDefault;?>" required="required" size="40" id="acInput"/><input type="hidden" value="<?=$CityDefaultCode;?>" name="SenderCity" size="70" id="code" value=""/>  
		                    </div>
		                </td>
		            </tr>
		            <tr>
		                <td><?=Loc::getMessage('KSE_ORDER_OTPRAVADDR');?></td>
		                <td><input type="text" name="SenderAddress" size="70" value="<?=$SenderAddress?>"/></td>
		            </tr>            
		            <tr>
		                <td><?=Loc::getMessage('KSE_ORDER_OTPRAVPHONE');?></td>
		                <td><input type="text" name="SenderPhone" size="30" value="<?=$SenderPhone?>"/></td>
		            </tr>
		            <tr>
		                <td><?=Loc::getMessage('KSE_ORDER_OTPRAVEMAIL');?></td>
		                <td><input type="text" name="SenderEmail" size="30" value="<?=$SenderEmail?>"/></td>
		            </tr>    
		            <tr>
		                <td><?=Loc::getMessage('KSE_ORDER_URG');?></td>
		                <td>
		                    <select name="Urgency">
		<?
		foreach ($arUrgencies as $Urgency) {
		    $selected = '';
		    if ($Urgency['mKey'] == $Urg) $selected = 'selected';
		    echo "<option ".$selected." value=".$Urgency['mKey'].">".$Urgency['mValue']."</option>";
		}
		
		?>                    
		                    </select>
		            </tr>      
		            <tr>
		                <td><?=Loc::getMessage('KSE_ORDER_PAYER');?></td>
		                <td>
		                    <select name="PayerCode">
		<?
		foreach ($PayerCodes as $Code) {
		    $selected = '';
		    if ($Code['mKey'] == $Payer) $selected = 'selected';
		    echo "<option ".$selected." value=".$Code['mKey'].">".$Code['mValue']."</option>";
		}
		?>                    
		                    </select>
		                </td>
		            </tr> 
		            <tr>
		                <td><?=Loc::getMessage('KSE_ORDER_PAYMETHOD');?></td>
		                <td>
		                    <select name="PaymentMethod">
		<?
		foreach ($PayMethods as $Method) {
		    $selected = '';
		    if ($Method['mKey'] == $PaymentMethod) $selected = 'selected';
		    echo "<option ".$selected." value=".$Method['mKey'].">".$Method['mValue']."</option>";
		} 
		?>                  </select>
		            </tr> 
		            <tr>
		                <td><?=Loc::getMessage('KSE_ORDER_DOSTMETHOD');?></td>
		                <td>
		                    <select name="ShippingMethod">
		<?
		foreach ($ShippingMethods as $SMethod) {
		    $selected = '';
		    if ($SMethod['mKey'] == $ShMethod) $selected = 'selected';
		    echo "<option ".$selected." value=".$SMethod['mKey'].">".$SMethod['mValue']."</option>";
		    $ShippingMethod[$SMethod['mKey']] = $SMethod['mValue'];
		}
		
		?>              
		                    </select>  
		                </td>
		            </tr>          
		            <tr>
		                <td><?=Loc::getMessage('KSE_ORDER_GRUZTYPE');?></td>
		                <td>
		                    <select name="TypeOfCargo">
		<? foreach ($CargoTypes as $Cargo) {
		    $selected = '';
		    if ($Cargo['mKey'] == $TypeOfCargo) $selected = 'selected';
		    echo "<option ".$selected." value=".$Cargo['mKey'].">".$Cargo['mValue']."</option>";
		}  
		?>                 
		                    </select>
		                </td>
		            </tr> 
		            <tr>
		                <td><?=Loc::getMessage('KSE_ORDER_MASSA');?></td>
		                <td><input type="text" name="Weight" id="Weight" value="0" style="font-size: 1.5em;" /></td>
		            </tr>   
		            <tr>
		                <td><?=Loc::getMessage('KSE_ORDER_MEST');?></td>
		                <td><input type="text" name="CargoPackageQty" id="CargoPackageQty" style="font-size: 1.5em;" value="0"/></td>
		            </tr>  
		            <tr>
		                <td><?=Loc::getMessage('KSE_ORDER_COMMENT');?></td>
		                <td><textarea cols="40" rows="5" name="SenderComment" value="<?=$SenderComment?>"></textarea></td>
		            </tr>                                                                                       
					</tbody>
				</table>
		        <div class="adm-detail-content-btns">
		            <input type="submit" name="save" disabled value="<?=Loc::getMessage('KSE_ORDER_BUTTON');?>" id="sendbutton" title="<?=Loc::getMessage('KSE_ORDER_BUTTON');?>" class="adm-btn-save"/>
		        </div>        
			</div>
		</div>
		</div>
		</form>
<? else: echo Loc::getMessage('NO_ORDERS'); endif;?>		
		    <script type="text/javascript">
		        
		        $(':checkbox').click(function(){
		            var Qty = $('#CargoPackageQty').val()*1;
		            var Weight = $('#Weight').val()*1; 
		            
		            if ($(this).is(':checked')){
		                    $('#sendbutton').removeAttr('disabled');
		                    var WBid = $(this).val();
		                    //Суммируем
		                    var QtyIdValue = $('#qty-'+WBid).html()*1;
		                    var WeightIdValue = $('#wei-'+WBid).html()*1;
		                    $('#CargoPackageQty').val(Qty + QtyIdValue);
		                    $('#Weight').val(Weight + WeightIdValue);
		            } else {
		                    
		                    var WBid = $(this).val();
		                    //Вычитаем лишнее
		                    var QtyIdValue = $('#qty-'+WBid).html()*1;
		                    var WeightIdValue = $('#wei-'+WBid).html()*1;
		                    $('#CargoPackageQty').val(Qty - QtyIdValue);
		                    $('#Weight').val(Weight - WeightIdValue);
		                    
		                   if ($(':checkbox').is(':checked')){
		                    	$('#sendbutton').removeAttr('disabled');
		                    } else {
		                    	$('#sendbutton').attr('disabled', 'disabled'); 
		                    } 
		            }
		        });    
		    </script>
		
		
		
		<?
				
		//$OrderStatus = cKCE::GetDocumentStatus($KCELogin,$KCEPass,'666-0007857-00001228');
		
		//pr ($OrderStatus);
		} else  { ?>			<div class="adm-info-message-wrap adm-info-message-red">
				<div class="adm-info-message">
					<div class="adm-info-message-title"><?=Loc::getMessage('ERROR_AUTH');?></div>
					
					<div class="adm-info-message-icon"></div>
				</div>
			</div>
		<? }
	
		} else { echo Loc::getMessage("OPTIONS_NOLOGIN");}
	} else {
		echo Loc::getMessage("OPTIONS_NOSOAP");
}?>
<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/epilog_admin.php");?>