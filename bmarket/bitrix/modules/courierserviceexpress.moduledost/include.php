<?
use Bitrix\Main\Loader;
use Bitrix\Main\EventManager;
//CModule::IncludeModule("courierserviceexpress.moduledost");

global $DBType;
$arClasses=array(
	'cKCE' => 'classes/general/KCEClass.php',
	'KseService' => 'classes/general/KseService.php',
	'KseOptions' => 'classes/general/KseOptions.php',
	'KseOrderProperties' => 'classes/general/KseOrderProperties.php',
	'KCEWayBillFromOrder' => 'classes/general/KCEWayBillFromOrder.php',
	'SaleDeliveryButtonInstaller' => 'classes/general/ButtonInstaller.php'
);
CModule::AddAutoloadClasses("courierserviceexpress.moduledost",$arClasses);

class KCEDeliveryInclude{
    function addDeliveryServices(\Bitrix\Main\Event $event)
	{
		$result = new \Bitrix\Main\EventResult(
			\Bitrix\Main\EventResult::SUCCESS, 
			array(
				'Sale\Handlers\Delivery\KCEDeliveryHandler' => '/local/php_interface/sale_delivery/kce/KCEDeliveryHandler.php',
		                'Sale\Handlers\Delivery\KCEDeliveryHandlerPVZ' => '/local/php_interface/sale_delivery/kce/KCEDeliveryHandlerPVZ.php'
		                //'Sale\Handlers\Delivery\KCEDeliveryProfile' => '/local/php_interface/sale_delivery/kce/KCEDeliveryProfile.php',
		                //'Sale\Handlers\Delivery\KCEDeliveryProfilePVZ' => '/local/php_interface/sale_delivery/kce/KCEDeliveryProfilePVZ.php'
			)
		);
		return $result;
	}
/*    
    function UpdateStatuses()
   {
      echo "Hello!";
      AddMessage2Log ('Working','courierserviceexpress.moduledost');
      return "KCEDeliveryInclude::UpdateStatuses();";
   }
*/
}

//CAgent::AddAgent("KCEDeliveryInclude::UpdateStatuses();","courierserviceexpress.moduledost","N",60,"","Y","");