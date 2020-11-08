<?php

use Bitrix\Main\Context;
use Bitrix\Main\EventManager;
use Bitrix\Main\Page\Asset;
use Bitrix\Main\Web\Uri;
//use CUtil;
use Bitrix\Main\Config\Option;
use Bitrix\Main\Localization\Loc;


//require_once __DIR__ . '/DvService.php';
//require_once __DIR__ . '/DvLoc.php';
\Bitrix\Main\Loader::includeModule('sale');
\Bitrix\Main\Loader::includeModule('courierserviceexpress.moduledost');

class SaleDeliveryButtonInstaller
{

    public static function saleAdminContextMenuShowHandler(&$items)
    {
       // DvLoc::includeGeneralLangFile();

//        $NeedButton = Option::get("courierserviceexpress.moduledost", "oforml-nakl");
        
	$data = CSaleOrder::GetByID($_REQUEST['ID']);
	$data = preg_replace('/[^0-9]/', '', $data['DELIVERY_ID']);
	if ($data) {
		$deliv = \Bitrix\Sale\Delivery\Services\Manager::getById($data);
		$NeedButton = strpos($deliv['CLASS_NAME'],'KCEDeliveryHandler');
	        
	        if ($NeedButton) {
	
		$data = CSaleOrder::GetByID($_REQUEST['ID']);
		$data = preg_replace('/[^0-9]/', '', $data['DELIVERY_ID']);
		$deliv = \Bitrix\Sale\Delivery\Services\Manager::getById($data);
		$NeedButton = strpos($deliv['CLASS_NAME'],'KCEDeliveryHandler');
	
	            /** @var array $items */
	            $request = Context::getCurrent()->getRequest();
	            $uri     = new Uri($request->getRequestUri());
	    
	            if (!$request->isPost() && $uri->getPath() == '/bitrix/admin/sale_order_view.php' && !empty($_REQUEST['ID'])) {
	                CUtil::InitJSCore(['jquery']);
	               //Asset::getInstance()->addJs('/bitrix/js/courierserviceexpress.moduledost/preloader.js');
	                Asset::getInstance()->addJs('/bitrix/js/courierserviceexpress.moduledost/order-dialog.js');
	                Asset::getInstance()->addJs('/bitrix/js/courierserviceexpress.moduledost/sale-order-view-utils.js');
	                Asset::getInstance()->addJs('https://code.jquery.com/ui/1.12.1/jquery-ui.js');
	                    
	                $items[] = [
	                    'TEXT'  => Loc::getMessage('KSE_SENDZAK'),
	                    'LINK'  => 'javascript:kse.saleOrderViewUtils.send('.(int)$_REQUEST['ID'].')',
	                    'TITLE' => Loc::getMessage('KSE_SENDZAK'),
	                    'ICON'  => Loc::getMessage('KSE_SENDZAK'),
	                ];
	           }
	        }
	}
    }
}