<?
//добавлене накладной после оформления заказа
use Bitrix\Main;
use Bitrix\Main\Loader;
use Bitrix\Main\Localization\Loc;
use Bitrix\Main\Config\Option;
use Bitrix\Sale\Order;
use Bitrix\Main\Type\DateTime;
use Bitrix\Main\Context;
use Bitrix\Main\EventManager;
use Bitrix\Highloadblock as HL;

Loader::includeModule('sale');
Loader::includeModule('iblock');
Loader::includeModule('courierserviceexpress.moduledost');

class KCEWayBillFromOrder
{

	public function KCEOnSaleOrderSavedHandler(Main\Event $event)
		{
			$allow = Option::get("courierserviceexpress.moduledost", "allowAutoSetWayBill");
			$order = $event->getParameter("ENTITY");
			$orderId = $order->getId();
			$order = Order::load($orderId);
			
			$waybill = $order->getField('TRACKING_NUMBER');

			//AddMessage2Log($waybill);

			$isnew=$event->getParameter("IS_NEW");

			if (($allow=='Y')&&(empty($waybill))) {
				//AddMessage2Log("yes2");
			
			$orderstatus = $event->getParameter("VALUE");
			//AddMessage2Log($orderstatus);
			$autostatuses = Option::get("courierserviceexpress.moduledost", "AutoWayBillStatuses");
			$autostatuses = explode(',',$autostatuses);
			//AddMessage2Log($autostatuses);

			if (in_array($orderstatus, $autostatuses)) {
			
			//AddMessage2Log("yes3");



			
			
				/** @var Order $order */
				$moduleId = 'courierserviceexpress.moduledost';

				$orderProps = new KseOrderProperties($order);
				$TotalQty = 1;//?????
			    $ordersTotalSum        = $order->getPrice() - $order->getDeliveryPrice();
			    $ordersTotalWeight     = $orderProps->getTotalWeight();
			    if (empty($ordersTotalWeight)) {
			    	 $ordersTotalWeight = Option::get("courierserviceexpress.moduledost", "massa");
			    }
			    $ordersTakingAmountSum = $orderProps->getTakingAmount();
			    $orderZIP = $orderProps->propertiesByCode['ZIP'];
			    $matterCategoryList[] = $orderProps->getMatter();
			    $delivery_address = $orderProps->getDeliveryAddressWithCityPrefix();
			    $delivery_required_date = date('Y-m-d',strtotime('+'.Option::get($moduleId, "dateZaboraDays").' day'));//дата доставки 
			    //$delivery_required_date = date('Y-m-d', strtotime($orderProps->getRequiredFinishDatetime()));
			    $delivery_required_start_time = date('H:i', strtotime($orderProps->getRequiredStartDatetime()));
			    $delivery_required_finish_time = date('H:i', strtotime($orderProps->getRequiredFinishDatetime()));
			    $delivery_recipient_name = $orderProps->getRecipientName();
			    $delivery_recipient_phone = $orderProps->getRecipientPhone();
			    $delivery_note = $orderProps->getNoteWithPrefix();
			    $pickup_date = date('Y-m-d',strtotime('+'.Option::get($moduleId, "dateZaboraDays").' day'));

			    $TovarSku = Option::get("courierserviceexpress.moduledost", "TovarSku");
				$TPSku = Option::get("courierserviceexpress.moduledost", "TPSku");

				//Собираем данные для формирования накладной
				$login = Option::get("courierserviceexpress.moduledost", "login");
				$password = Option::get("courierserviceexpress.moduledost", "pass");
				$RecepientName = $delivery_recipient_name;
				$GeoTo = 'postcode-'.$orderZIP;
				$RecepientFullAddress = $delivery_address;
				$RecepientPhone = $delivery_recipient_phone;
				$Urgency = Option::get("courierserviceexpress.moduledost", "urgency");
				$CargoDescription = '';
				$CargoPackageQty = $TotalQty;
				$ClientName = htmlspecialchars(Option::get($moduleId, "CompanyName"),ENT_NOQUOTES);
				$ClientNameOfficial = htmlspecialchars(Option::get($moduleId, "SenderName"),ENT_NOQUOTES);
				$Weight = $ordersTotalWeight;
				$ZIP = KseService::GetZipCode(Option::get("courierserviceexpress.moduledost", "GorodZaboraGruza"));
				$GeoFrom = 'postcode-'.$ZIP;
				$SenderAddress = Option::get($moduleId, "AdresZaboraGruza");
				$SenderComment = $delivery_note;
				$TakeDate = $pickup_date.'T'.'00:00:00';//по умолчанию!
				$TypeOfCargo = Option::get("courierserviceexpress.moduledost", "TypeOfCargo");
				$TypeOfPayer = Option::get("courierserviceexpress.moduledost", "PayerCode");
				$WayOfPayment = Option::get("courierserviceexpress.moduledost", "PaymentMethod");
				$BtrxOrderId = $orderId;
				$SenderPhone = Option::get($moduleId, "SenderContactPhone");
				$DeliveryOfCargo = Option::get("courierserviceexpress.moduledost", "kurierka");

				//Получаем информацию о товарах из корзины
				$res = CSaleBasket::GetList(array(), array("ORDER_ID" => $orderId));
				$i=0;

				//Get Recepient Email
				$order = CSaleOrder::GetByID($orderId);
				$RecepientEmail = $order['USER_EMAIL'];
				$orderProps = CSaleOrderPropsValue::GetOrderProps($orderId);
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

				$OrderData = CSaleOrder::GetByID($orderId);
				$SumDost = number_format($OrderData['PRICE_DELIVERY'],2,'.','');
				$SumPayZakaz = $OrderData['SUM_PAID'];

				$SumNeedPayZakaz = $OrderData['PRICE'];

				$DeliveryDate = '';//$delivery_required_date;
				$DeliveryTime = '';//$delivery_required_start_time.' - '.$delivery_required_finish_time;
				$VATRate = Option::get("courierserviceexpress.moduledost", "KCEVat");

				if (($login)&&($password)&&($BtrxOrderId)&&($RecepientName)&&($GeoTo)&&($RecepientFullAddress)&&($RecepientPhone)&&($Urgency)&&($CargoPackageQty)&&($Weight)&&($GeoFrom)&&($ClientName)&&($SenderPhone)&&($TakeDate)&&($TypeOfCargo)&&($Items))
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

				    //AddMessage2Log($result);

					if ($WayBillID) {
					
					    $OrderData = CSaleOrder::getByID($orderId);
					    
					    $UpdTrack['TRACKING_NUMBER'] = $WayBillID;
					    $UpdTrack['DELIVERY_DOC_NUM'] = $WayBillID;
					    $UpdTrack['DELIVERY_DOC_DATE'] = new DateTime();
					    
					    $OrderUpd = CSaleOrder::Update($orderId,$UpdTrack);
					    
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
					            $HBLdata = array("UF_WAYBILLID" => $WayBillID, "UF_ORDERID" => $orderId, "UF_WAYBILL_DATE" => $UpdTrack['DELIVERY_DOC_DATE'], "UF_ADR_OTPR" => Option::get($moduleId, "AdresZaboraGruza"), "UF_KSE_WEIGHT" => $Weight, "UF_KSE_QTY" =>$CargoPackageQty);
					            $HBLresult = $entity_data_class::add($HBLdata);
					        }

						$result = $WayBillID;
						//AddMessage2Log($result);
					} else {
						//AddMessage2Log('KSE_ORDER_ERROR_1');
					}
					
					
				} else {
					//AddMessage2Log('KSE_ORDER_ERROR_2');
				}
			}else{
				//AddMessage2Log('checked=NO!');
			}
			}
		}
}

?>