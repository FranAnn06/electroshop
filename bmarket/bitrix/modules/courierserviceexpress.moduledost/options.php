<?
use Bitrix\Main\Localization\Loc;
use Bitrix\Main\HttpApplication;
use Bitrix\Main\Loader;
use Bitrix\Main\Config\Option;


\Bitrix\Main\Loader::includeModule('sale');
\Bitrix\Main\Loader::includeModule('iblock');


Loc::loadMessages(__FILE__);

$request = HttpApplication::getInstance()->getContext()->getRequest();

$module_id = htmlspecialcharsbx($request["mid"] != "" ? $request["mid"] : $request["id"]);

Loader::includeModule($module_id);

if (extension_loaded('soap') && extension_loaded('curl')) {

	$AuthError = 0;

	$dlina = Option::get("courierserviceexpress.moduledost", "dlina");
	$visota = Option::get("courierserviceexpress.moduledost", "visota");
	$shirina = Option::get("courierserviceexpress.moduledost", "shirina");
	
	$KCELogin = Option::get("courierserviceexpress.moduledost", "login");
	$KCEPass = Option::get("courierserviceexpress.moduledost", "pass");
	
	$Coeff = 167;
	
	if (!$dlina) $dlina = 0;
	if (!$shirina) $shirina = 0;
	if (!$visota) $visota = 0;
	
	$ObjVes = $dlina/1000 * $shirina/1000 * $visota/1000 * $Coeff;
	
	Option::set("courierserviceexpress.moduledost", "objves", $ObjVes);
	
	//Get All statuses
	/*
	$statuses = CSaleStatus::GetList(array(),array("LID"=>SITE_ID));
	$i=0;
	
	while ($arst = $statuses->GetNext()):
		$arStatus[$arst['ID']] = htmlspecialcharsbx($arst['NAME']);
		$i++;
	endwhile;
	*/
	
	//Получаем типы срочностей доставки для пользователя

if ($KCELogin) {

	$arUrgencies = cKCE::GetUrgencies($KCELogin, $KCEPass);

	if ($arUrgencies) {
	   
       if ($arUrgencies['mKey']) {
            $key = $arUrgencies['mKey'];
            $arUrgency[$key] = $arUrgencies['mValue'];
       } else {
     		foreach ($arUrgencies as $Urgency) {
     		     $key = $Urgency['mKey'];
                  $arUrgency[$key] = $Urgency['mValue'];
	           }
        
       }
	

		
		//Получаем код плательщика
		$PayerCodes = cKCE::GetPayerCode($KCELogin, $KCEPass);
		
		foreach ($PayerCodes as $Code) {
			$key = $Code['mKey'];
		    $PayerCode[$key] = $Code['mValue'];
		}
		
		//Получаем возможные способы оплаты
		$PayMethods = cKCE::GetPayMethods($KCELogin, $KCEPass);
		
		foreach ($PayMethods as $Method) {
		    $PayMethod[$Method['mKey']] = $Method['mValue'];
		}
		
		//Получаем возможные способы доставки
		$ShippingMethods = cKCE::GetShippingMethods($KCELogin, $KCEPass);
		
		foreach ($ShippingMethods as $SMethod) {
		    $ShippingMethod[$SMethod['mKey']] = $SMethod['mValue'];
		}
		
		//Получаем возможные типы груза
		$CargoTypes = cKCE::GetCargoTypes($KCELogin, $KCEPass);
		
		foreach ($CargoTypes as $Cargo) {
		    $CargoType[$Cargo['mKey']] = $Cargo['mValue'];
		}
		
		//Формируем массив населенных пунктов
        $arCitiesData=KseService::getGeoCodesArray(1);
        $arCities = $arCitiesData;
		
		//Получаем склад пользователя		
		$skladGUID = cKCE::GetUserRepository($KCELogin, $KCEPass);
		COption::SetOptionString("courierserviceexpress.moduledost", "sklad-fias", $skladGUID);		
		
		//Получаем типы соответствий типов доставки для пользователя (курьерка)
		
		$arDelivTypes = cKCE::GetDeliveryMethods($KCELogin, $KCEPass);
		
		foreach ($arDelivTypes as $delivType) {
		    switch ($delivType->Value) {
		        case 0:
		            $arKurier[$delivType->Value] = $delivType->Fields[0]->Value;
		            break;
		        case 1:
		            $arKurier[$delivType->Value] = $delivType->Fields[0]->Value;
		            break;
		        case 2:
		            $arPVZ[$delivType->Value] = $delivType->Fields[0]->Value;
		            break;
		        case 3:
		            $arPVZ[$delivType->Value] = $delivType->Fields[0]->Value;
		            break;   
		        case 4:
		            $arKurier[$delivType->Value] = $delivType->Fields[0]->Value;
		            break;                     
		    }
		}
		
		// Получаем список статусов груза
		$arStatuses = cKCE::GetStatuses($KCELogin, $KCEPass);
		
		//Получаем список статусов доставки с сайта
		
		$statusResult = \Bitrix\Sale\Internals\StatusLangTable::getList(array(
		    'order' => array('STATUS.SORT'=>'ASC'),
		    'filter' => array('STATUS.TYPE'=>'D','LID'=>LANGUAGE_ID),
		    'select' => array('STATUS_ID','NAME','DESCRIPTION','NOTIFY'=>'STATUS.NOTIFY'),
		));
		
		$i=0;
		
		while ($status=$statusResult->fetch()):
			$arStatus[$status['STATUS_ID']] = htmlspecialcharsbx($status['NAME']);
			$i++;
		endwhile;
		
		 
		//Получаем список свойств товаров для получения привязки артикулов
		$properties = CIBlockProperty::GetList(Array("sort"=>"asc", "name"=>"asc"), Array("ACTIVE"=>"Y"));
		$arSku = array();
		while ($prop_fields = $properties->GetNext())
		{
		    $arSku[$prop_fields["ID"]]= $prop_fields["NAME"].' (ID:'.$prop_fields["ID"].')';
		}
	} else $AuthError = 1;
}

    //Skidka/natsenka (v 1.2.0)
    $arEdin = array (
        "persent" => Loc::getMessage("OPTIONS_PARAM_SKIDKA_PERSENT"),
        "fix" => Loc::getMessage("OPTIONS_PARAM_SKIDKA_FIX"),
        "fixprice" => Loc::getMessage("OPTIONS_PARAM_SKIDKA_FIXPRICE")
    );
    //преиодичность автообновления
    $periods = array(
    	"1" => Loc::getMessage("OPTIONS_ONEHOUR"),
    	"3" => Loc::getMessage("OPTIONS_THREEHOURS"),
    	"6" => Loc::getMessage("OPTIONS_SIXHOURS")
    );
    //Ставки НДС для услуги доставки
    $vatrates = array(
    	'2' => '10%',
    	'4' => '0%', 
    	'5' => 'Без НДС', 
    	'6' => '20%'
	);
	//статусы для автообновления накладной
	$statusesForAutoWaybill = array();
	$statuses = CSaleStatus::GetList(array(),array(),false,array());
    while ($arAutoStatuses = $statuses->Fetch()) {

		$statusesForAutoWaybill[$arAutoStatuses['ID']]=$arAutoStatuses['NAME'];
    }

    
    //Получаем соответствие полей заказа и накладной
    
    $arProps = CSaleOrderProps::GetList();
    
    while ($prop = $arProps->fetch()) {        
        $arOrderProps[$prop['ID']] = $prop['NAME'].' (ID: '.$prop['ID'].')';
    }

    $rsGroups = CGroup::GetList ($by = "id", $order = "asc",["ACTIVE"=>"Y","ID"=>"~1"],"N");
    while ($arGroups = $rsGroups->Fetch()) {
    	$arUsersGroups[$arGroups['ID']] = $arGroups['REFERENCE'];
    }
    //pr($arUsersGroups);
	
	$aTabs = array(
		array(
			"DIV" 	  => "edit",
			"TAB" 	  => Loc::getMessage("OPTIONS_TAB_NAME"),
			"TITLE"   => Loc::getMessage("OPTIONS_TAB_NAME"),
			"OPTIONS" => array(
	        
	      		Loc::getMessage("OPTIONS_TAB_AUTH"),
	            array(
					"kce1",
					"",
					Loc::getMessage("OPTIONS_START_MESSAGE"),
					array("statichtml", 15)
				),
				array(
					"login",
					Loc::getMessage("OPTIONS_PARAM_LOGIN"),
					"",
					array("text", 15)
				),
				array(
					"pass",
					Loc::getMessage("OPTIONS_PARAM_PASS"),
					"",
					array("password", 15)
				),
	            Loc::getMessage("OPTIONS_PRICE_DEFAULT"),
                array(
					"price",
					Loc::getMessage("OPTIONS_PARAM_PRICE"),
					"0",
					array("text", 5)
				),
                array(
					"price_edinitsa",
					Loc::getMessage("OPTIONS_PARAM_PRICE_EDINITSA"),
					"",
					array("selectbox", $arEdin)
				),
				Loc::getMessage("OPTIONS_MASS_DEFAULT"),
	/*			array(
					"dlina",
					Loc::getMessage("OPTIONS_PARAM_DLINA"),
					"100",
					array("text", 10)
				),
				array(
					"visota",
					Loc::getMessage("OPTIONS_PARAM_VISOTA"),
					"100",
					array("text", 10)
				),
				array(
					"shirina",
					Loc::getMessage("OPTIONS_PARAM_SHIRINA"),
					"100",
					array("text", 10)
				),
	*/            
				array(
					"massa",
					Loc::getMessage("OPTIONS_MASS_ORDER"),
					"2",
					array("text", 10)
				),
				array(
					"sum_default",
					Loc::getMessage("OPTIONS_SUM_ORDER_DEFAULT"),
					"500",
					array("text", 10)
				),
	/*            
				array(
					"objves",
					"Объемный вес (м<sup>3</sup>/кг):",
					$ObjVes,
					array("statichtml")
				),
	 
				array(
					"dostavka",
					Loc::getMessage("OPTIONS_PARAM_DOSTAVKA"),
					"dostavka1",
					array("selectbox", array(
						"dostavka1" => Loc::getMessage("OPTIONS_PARAM_DOSTAVKA_1"),
						"dostavka2" => Loc::getMessage("OPTIONS_PARAM_DOSTAVKA_2")
					))
				),
	*/            
	            Loc::getMessage("OPTIONS_KSE_DAYS"),
	            array(
					"days-to-sklad",
					Loc::getMessage("OPTIONS_KSE_DAYS_NAME"),
					"2",
					array("text", 5)
				),
	            
	            Loc::getMessage("OPTIONS_NAKL"),
	             array(
					"CompanyName",
					Loc::getMessage("OPTIONS_URNAME"),
	                "",
					array("text", 40)
				),
	             array(
					"SenderName",
					Loc::getMessage("OPTIONS_URNAME_FIO"),
	                "",
					array("text", 40)
				),

                Loc::getMessage("OPTIONS_NAKL"),
/*	             array(
					"oforml-nakl",
					Loc::getMessage("OPTIONS_NAKL_FORM"),
					"1",
					array("selectbox", array(
						"1" => Loc::getMessage("OPTIONS_NAKL_FORM_M"),
						"2" => Loc::getMessage("OPTIONS_NAKL_FORM_A")
					))
				),
*/
	            array(
					"TovarSku",
					Loc::getMessage("OPTIONS_TOV_SKU"),
					"1",
					array("selectbox", $arSku)
				),
	            array(
					"TPSku",
					Loc::getMessage("OPTIONS_TP_SKU"),
					"1",
					array("selectbox", $arSku)
				),
	            /*array(
					"sklad-fias",
					Loc::getMessage("OPTIONS_SKLAD_GUID"),
					$skladGUID,
					array("statichtml")
				),*/
				array(
					"GorodZaboraGruza",
					Loc::getMessage("OPTIONS_SKLAD_GOROD"),
					'',
					array("selectbox", $arCities)
				),
	            array(
					"AdresZaboraGruza",
					Loc::getMessage("OPTIONS_SKLAD_ADDR"),
					'',
					array("text", 60)
				),
	            array(
					"SenderContactPhone",
					Loc::getMessage("OPTIONS_PHONE"),
					"",
					array("text", 20)
				),
	            array(
					"SenderContactEmail",
					Loc::getMessage("OPTIONS_EMAIL"),
					Option::get("main", "email_from"),
					array("text", 20)
				),
	            array(
					"urgency",
					Loc::getMessage("OPTIONS_URGENCY"),
					"8bbab642-1df3-11de-bcd5-0015170f8c09",
					array("selectbox", $arUrgency)
				),
	            array(
					"PayerCode",
					Loc::getMessage("OPTIONS_PAYCODE"),
					"0",
					array("selectbox", $PayerCode)
				),  
	            array(
					"PaymentMethod",
					Loc::getMessage("OPTIONS_PAYMET"),
					"1",
					array("selectbox", $PayMethod)
				),  
	            array(
					"DeliveryMethod",
					Loc::getMessage("OPTIONS_DELIV_MET"),
					"e45b6d73-fd62-44da-82a6-44eb4d1d9490",
					array("selectbox", $ShippingMethod)
				),              
	            array(
					"TypeOfCargo",
					Loc::getMessage("OPTIONS_CARGOTYPE"),
					"4aab1fc6-fc2b-473a-8728-58bcd4ff79ba",
					array("selectbox", $CargoType)
				),              
	            array(
					"PrintFormName",
					Loc::getMessage("OPTIONS_PAYFORM_NAME"),
					Loc::getMessage("OPTIONS_PAYFORM_VALUE"),
					array("text", 60)
				),

				Loc::getMessage("OPTIONS_AUTOWAYBILL"),

				array(//24.06 добавление дополнительных дней
					"dateZaboraDays",
					Loc::getMessage("OPTIONS_DATEZABORADAYS"),
					'1',
					array("text", 60)
				),
				array(//25.06 добавление чекбокса
					"allowAutoSetWayBill",
					Loc::getMessage("OPTIONS_ALLOWAUTOSETWAYBILL"),
					Option::get("courierserviceexpress.moduledost", "allowAutoSetWayBill"),
					array("checkbox")
				),
				array(
					"AutoWayBillStatuses",
					Loc::getMessage("OPTIONS_SETWAYBILLSTATUSES"),
					"F",
					array("multiselectbox",$statusesForAutoWaybill)
				),
	                      
	            Loc::getMessage("OPTIONS_PARAMS_ZAK"),
	
	            array(
					"kurierka",
					Loc::getMessage("OPTIONS_KUR"),
					"0",
					array("selectbox", $arKurier)
				),
	            array(
					"pvz",
					Loc::getMessage("OPTIONS_PVZ"),
					"2",
					array("selectbox", $arPVZ)
				),	
                
                Loc::getMessage("OPTIONS_INTERFACETITILE"),
                array(
					"inputLocation",
					Loc::getMessage("OPTIONS_INPUTLOCATION"),
					'6',
					array("selectbox", $arOrderProps)
				),		
                array(
					"inputAddress",
					Loc::getMessage("OPTIONS_INPUTADDRESS"),
					"7",
					array("selectbox", $arOrderProps)
				),	
                array(
					"inputEmail",
					Loc::getMessage("OPTIONS_INPUTEMAIL"),
					"2",
					array("selectbox", $arOrderProps)
				),
                array(
					"inputPVZFIZ",
					Loc::getMessage("OPTIONS_INPUTPVZFIZ"),
					"2",
					array("selectbox", $arOrderProps)
				),
                array(
					"inputPVZUR",
					Loc::getMessage("OPTIONS_INPUTPVZUR"),
					"2",
					array("selectbox", $arOrderProps)
				),
/*           
				Loc::getMessage("OPTIONS_PERIODSTAT"),
				array(
					"pole1",
					Loc::getMessage("OPTIONS_TUPD"),
					"1",
					array("selectbox", array(
						"1" => Loc::getMessage("OPTIONS_ONEH"),
						"3" => Loc::getMessage("OPTIONS_THREEH"),
						"6" => Loc::getMessage("OPTIONS_SIXH"),
						"12" => Loc::getMessage("OPTIONS_TVEWEH")
					))
				),
*/				
				Loc::getMessage("OPTIONS_VAT_TITLE"),
				array(//20.07 настройки ндс
					"KCEVat",
					Loc::getMessage("OPTIONS_VAT_NAME"),
					'2',
					array("selectbox", $vatrates)
				),
				Loc::getMessage("OPTIONS_TAB_SOOTVETSTVIE_STATUSOV"),
				array(//25.06 периодичность авто обновления
					"periodAutoUpdateKCEOrders",
					Loc::getMessage("OPTIONS_PERIOD_AUTO_UPDATE_KCEORDERS"),
					'1',
					array("selectbox", $periods)
				),
				
				//array("status2",Loc::getMessage("OPTIONS_PARAM_STATUS_2"),"new_status2",array("selectbox", $arStatus)),
				///array("status3",Loc::getMessage("OPTIONS_PARAM_STATUS_3"),"new_status3",array("selectbox", $arStatus)),
			)
		),array(
			"DIV" 	  => "edit1",
			"TAB" 	  => Loc::getMessage("OPTIONS_TAB_NAME2"),
			"TITLE"   => Loc::getMessage("OPTIONS_TAB_NAME2"),
			"OPTIONS" => array(
                array(
					"user_permissions",
					Loc::getMessage("OPTIONS_TAB2_PERMISSIONS_GROUP"),
					"",
					array("multiselectbox", $arUsersGroups)
				)
			)
		)
	);

if ($KCELogin) {
	if ($arUrgencies) {
	
		foreach ($arStatuses as $Status)
		{
			$aTabs[0]["OPTIONS"][] = array($Status['KEY'],$Status['VALUE'],"new_status1",array("selectbox", $arStatus));
		}
	} else $AuthError = 1;
}	


if ($AuthError) { ?>
			<div class="adm-info-message-wrap adm-info-message-red">
				<div class="adm-info-message">
					<div class="adm-info-message-title"><?=Loc::getMessage("ERROR_AUTH");?></div>
					
					<div class="adm-info-message-icon"></div>
				</div>
			</div>
<? } 

	if($request->isPost() && check_bitrix_sessid()){
	
		foreach($aTabs as $aTab){
	
			foreach($aTab["OPTIONS"] as $arOption){

				
				if(!is_array($arOption)){
	
					continue;
				}
	
				if($arOption["note"]){
	
					continue;
				}
	
				if($request["apply"]){
	
					$optionValue = $request->getPost($arOption[0]);
	
					if($arOption[0] == "switch_on"){
	
						if($optionValue == ""){
	
							$optionValue = "N";
						}
					}
	
					Option::set($module_id, $arOption[0], is_array($optionValue) ? implode(",", $optionValue) : $optionValue);

					if ($arOption[0] == "periodAutoUpdateKCEOrders") {

						$hours = Option::get("courierserviceexpress.moduledost", "periodAutoUpdateKCEOrders")*3600;
						if (CAgent::RemoveAgent("cKCE::updateKCEOrders();", "courierserviceexpress.moduledost")) {
						CAgent::AddAgent(
	    					"cKCE::updateKCEOrders();",  // имя функции
	    					"courierserviceexpress.moduledost",                // идентификатор модуля
	    					"N",                      // агент не критичен к кол-ву запусков
	    					$hours,                   // интервал запуска - из настроек
	    					"",                       // дата первой проверки - текущее
	    					"Y",                      // агент активен
	    					"",                       // дата первого запуска - текущее
	    					30);
						}else{
						CAgent::AddAgent(
	    					"cKCE::updateKCEOrders();",  // имя функции
	    					"courierserviceexpress.moduledost",                // идентификатор модуля
	    					"N",                      // агент не критичен к кол-ву запусков
	    					$hours,                   // интервал запуска - из настроек
	    					"",                       // дата первой проверки - текущее
	    					"Y",                      // агент активен
	    					"",                       // дата первого запуска - текущее
	    					30);

						}
					}
					if ($arOption[0] == "user_permissions") {
						$perms = Option::get("courierserviceexpress.moduledost", "user_permissions");
						if (!empty($perms)) {
							$perms = explode(",", $perms);
						}
						
						if (empty($perms)) {
							$DB->Query("delete from b_module_group where MODULE_ID='courierserviceexpress.moduledost'");
						}else{
							$DB->Query("delete from b_module_group where MODULE_ID='courierserviceexpress.moduledost'");
							foreach ($perms as $perm) {
								CGroup::SetModulePermission($perm,"courierserviceexpress.moduledost",'W');
							}
						}
					}


				}elseif($request["default"]){
	
					Option::set($module_id, $arOption[0], $arOption[2]);
				}
			}
		}
	
		LocalRedirect($APPLICATION->GetCurPage()."?mid=".$module_id."&lang=".LANG);
	}
	//pr(Option::get("courierserviceexpress.moduledost", "periodAutoUpdateKCEOrders"));
	$tabControl = new CAdminTabControl(
		"tabControl",
		$aTabs
	);
	
	$tabControl->Begin();
	?>
	
	<form action="<? echo($APPLICATION->GetCurPage()); ?>?mid=<? echo($module_id); ?>&lang=<? echo(LANG); ?>" method="post">
	
		<?
		foreach($aTabs as $aTab){
	
			if($aTab["OPTIONS"]){
	
				$tabControl->BeginNextTab();
	
				__AdmSettingsDrawList($module_id, $aTab["OPTIONS"]);
			}
		}
	
		$tabControl->Buttons();
		?>
	
		<input type="submit" name="apply" value="<? echo(Loc::GetMessage("OPTIONS_INPUT_APPLY")); ?>" class="adm-btn-save" />
		<input type="submit" name="default" value="<? echo(Loc::GetMessage("OPTIONS_INPUT_DEFAULT")); ?>" />
	
		<?
		echo(bitrix_sessid_post());
		?>
	
	</form>
	
	<?
	
	$tabControl->End();
} else {
	echo Loc::getMessage("OPTIONS_NOSOAP");
}
