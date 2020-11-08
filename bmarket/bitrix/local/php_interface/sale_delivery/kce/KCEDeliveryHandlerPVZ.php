<?
namespace Sale\Handlers\Delivery;

use Bitrix\Sale\Delivery\CalculationResult;
use Bitrix\Sale\Delivery\Services\Base;
use Bitrix\Sale\Order;
use Bitrix\Sale\Result;
use Bitrix\Sale\Shipment;
use Bitrix\Main\Localization\Loc;
use Bitrix\Main\Page\Asset;

Loc::loadMessages(__FILE__);

require_once ($_SERVER["DOCUMENT_ROOT"].'/bitrix/modules/courierserviceexpress.moduledost/classes/general/KCEClass.php');

class KCEDeliveryHandlerPVZ extends Base
{    
	public static function getClassTitle()
	{
		return Loc::getMessage("KCE_TITLE_PVZ");
	}
	
	public static function getClassDescription()
	{
		return Loc::getMessage("KCE_DESCRIPTION_PVZ");
	}
        
    protected function calculateConcrete(\Bitrix\Sale\Shipment $shipment)
    {
			
        $result = new CalculationResult();
        $temp = new \cKCE();

		Asset::getInstance()->addString("<script>!function(e,t,n,c,s,a,i){e.CsePvzWidget=s,e[s]=e[s]||function(){(e[s].q=e[s].q||[]).push(arguments)},e[s].l=1*new Date,a=t.createElement(n),i=t.getElementsByTagName(n)[0],a.async=1,a.src=c,i.parentNode.insertBefore(a,i)}(window,document,'script','https://lk.cse.ru/dist/js/widget.js','csepvzwidget');csepvzwidget('init', '38a0abb7099ea700c597b17764ffe6a9');</script>",true);

		$CodePVZ .= "<div id='pvzcse'></div><button onclick='csepvzwidget(\"open\", {callback: function (params) { document.getElementById(\"soa-property-7\").value = params.geography_name + \", \" + params.name +\", \"+ params.address; alert(\"".Loc::getMessage("KCE_PVZ_DATASEND")."\");document.getElementById(\"pvzcse\").innerHTML =\"".Loc::getMessage("KCE_PVZ_DATASEND")."\"}});return false;'>".Loc::getMessage("KCE_PVZ_VIBOR")."</button>";

        //Собираем данные для расчета из настроек модуля        
		$KCElogin = \COption::GetOptionString("courierserviceexpress.moduledost", "login");

		$KCEpass = \COption::GetOptionString("courierserviceexpress.moduledost", "pass");
//if (!$KCELogin) { echo Loc::getMessage("KCE_MODULE_NOLOGIN_PVZ"); die();}
        $ZIPfrom = \COption::GetOptionString("courierserviceexpress.moduledost", "sklad-fias");

if (!$ZIPfrom) { 
	$message = "Connection Error"; 
	$result->setPeriodDescription($message);
	return $result;
}
		$Urgency = \COption::GetOptionString("courierserviceexpress.moduledost", "urgency");
		$DeliveryMethodPVZ = \COption::GetOptionString("courierserviceexpress.moduledost", "pvz");
		
		//данные по заказу
		$order = $shipment->getCollection()->getOrder(); //заказ
        $props = $order->getPropertyCollection(); 
		$basket = $order->getBasket();
		$priceBasket=$basket->getPrice();
		$WeightBasket = $basket -> GetWeight()/1000;
        
        if (!$WeightBasket) $WeightBasket = \COption::GetOptionString("courierserviceexpress.moduledost", "massa")*1;
        
        $ItemsBasket = sizeof($basket -> getQuantityList());	//Получаем число SKU в корзине для расчета количества мест
        
        //$basket = $basket->getList();
        
        		/** @var Order $order */
		$order = $shipment->getCollection()->getOrder();

		if(!$props = $order->getPropertyCollection())
			return '';

		if(!$locationProp = $props->getDeliveryLocation())
			return '';

		if(!$locationCode = $locationProp->getValue())
			return '';
         
         $res = \Bitrix\Sale\Location\LocationTable::getList(array(
            'filter' => array('CODE' => $locationCode),
            'select' => array('ID','NAME_RU' => 'NAME.NAME', 'TYPE_CODE' => 'TYPE.CODE')
            ));
        while($item = $res->fetch())
        {
            $CityID = $item['ID'];
        }
		$arLocs = \CSaleLocation::GetLocationZIP($CityID)->fetch();
        
                if (!$arLocs['ZIP']) {
            $arLocs = \Bitrix\Sale\Location\ExternalTable::getList(
            array(
                'filter' => array(
                                '=LOCATION_ID' => $CityID,
                                '=SERVICE.CODE' => 'ZIP_LOWER'
                            ),
                'select' => array('ID','ZIP_LOWER'=>'XML_ID')
                )
            )->fetch();
        }   
        
        $ZIPto = $arLocs['ZIP'];
        
        $arKCE = $temp ->GetDeliveryCost($KCElogin, $KCEpass, $ZIPfrom, $ZIPto, $WeightBasket, $ItemsBasket, $DeliveryMethodPVZ, $Urgency);
		//$arKCE = $temp ->GetDeliveryCost($KCElogin, $KCEpass, $ZIPfrom, $ZIPto, $WeightBasket, $ItemsBasket, '1', '1', '1', '1');
        $Cost = $arKCE['cost'];		
        
        if ($arKCE['mindays']) {
			$MinDays = $arKCE['mindays'] + \COption::GetOptionString("courierserviceexpress.moduledost", "days-to-sklad")*1;
			$MaxDays = $arKCE['days'] + \COption::GetOptionString("courierserviceexpress.moduledost", "days-to-sklad")*1;
			switch (substr($MaxDays, -1)) {
				case "1": $daysName = Loc::getMessage("KCE_DAY");  break;
				case "2": $daysName = Loc::getMessage("KCE_DAY2");  break;
				case "3": $daysName = Loc::getMessage("KCE_DAY2");  break;
				case "4": $daysName = Loc::getMessage("KCE_DAY2"); break;
				case "5": $daysName = Loc::getMessage("KCE_DAYS"); break;
				case "6": $daysName = Loc::getMessage("KCE_DAYS"); break;
				case "7": $daysName = Loc::getMessage("KCE_DAYS"); break;
				case "8": $daysName = Loc::getMessage("KCE_DAYS"); break;
				case "9": $daysName = Loc::getMessage("KCE_DAYS"); break;
			}
			
			$message = Loc::getMessage("KCE_TIME_TO_DAY").$MinDays."-".$MaxDays.' '.$daysName;//Loc::getMessage("KCE_DAYS");
			if ($MinDays == $MaxDays) $message = $MaxDays.' '.$daysName;//Loc::getMessage("KCE_DAYS");
		} else {
			$message = Loc::getMessage("KCE_UTOCH_PVZ");
		}
		
		//ставим цену
		if ($Cost) {
			$result->setDeliveryPrice($Cost);	
		} else {
			$result->setDeliveryPrice(Loc::getMessage("KCE_UTOCH_PVZ"));	
		}
		//минимальный срок
        $result->setPeriodFrom($MinDays);
		
		//максимальный срок
        $result->setPeriodTo($MaxDays);
		
		//доставка в днях
		$result->setPeriodType("D");
		
		//текстовое сообщение о доставке
        $result->setPeriodDescription($message);
        
        $result->setDescription($CodePVZ);
        
		return $result;
		
    }
        
    protected function getConfigStructure() 
    {
	   return array();
       
        /*return array(
            "MAIN" => array(
                "TITLE" =>Loc::getMessage("KCE_CODE_PVZ"),
                "DESCRIPTION" =>Loc::getMessage("KCE_CODE_PVZ"),
				"ITEMS" => array(
					"WPVZ" => array
					(
						"TYPE" => "STRING",
                        			"SIZE" => 60,
						"DEFAULT" => "",
						"NAME" => Loc::getMessage("KCE_CODE_PVZ")
					),					
				),
            )
        );*/
        
		
    }
        
    public function isCalculatePriceImmediately()
    {
        return true;
    }
    
   	public static function getChildrenClassNames()
	{
	    return array(
//	        'Sale\Handlers\Delivery\KCEDeliveryProfile',
//            'Sale\Handlers\Delivery\KCEDeliveryProfilePVZ'
	    );
	}
    
   	public function getProfilesList()
	{
	    //return array("Курьерская доставка службой Курьер Сервис Экспресс", "Доставка в ПВЗ службой Курьер Сервис Экспресс");
        return array();
	}
        
    public static function whetherAdminExtraServicesShow()
    {
        return true;
    }
	public static function getAdminFieldsList()
	{
		$result = parent::getAdminFieldsList();
		$result["STORES"] = true;
		return $result;
	}
	
}
?> 