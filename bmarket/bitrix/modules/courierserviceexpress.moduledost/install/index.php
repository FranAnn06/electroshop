<?
use Bitrix\Main\Localization\Loc;
use Bitrix\Main\ModuleManager;
use Bitrix\Main\Config\Option;
use Bitrix\Main\EventManager;
use Bitrix\Main\Application;
use Bitrix\Main\IO\Directory;
use Bitrix\Main\IO\File;
use Bitrix\Main\Loader; 
use Bitrix\Highloadblock as HL; 
use Bitrix\Main\Entity;

//use SaleDeliveryButtonInstaller;

Loc::loadMessages(__FILE__);
Loader::includeModule("highloadblock");
Loader::includeModule("sale"); 

class courierserviceexpress_moduledost extends CModule{
	
	var $MODULE_ID = "courierserviceexpress.moduledost";
	var $MODULE_VERSION;
	var $MODULE_VERSION_DATE;
	var $MODULE_NAME;
	var $MODULE_DESCRIPTION;
	
	public function __construct(){
		if(file_exists(__DIR__."/version.php")){
	
			$arModuleVersion = array();
	
			include (__DIR__."/version.php");
	
		//	$this->MODULE_ID 		   = str_replace("_", ".", get_class($this));
			$this->MODULE_VERSION 	   = $arModuleVersion["VERSION"];
			$this->MODULE_VERSION_DATE = $arModuleVersion["VERSION_DATE"];
			$this->MODULE_NAME 		   = Loc::getMessage("MODULE_NAME");
			$this->MODULE_DESCRIPTION  = Loc::getMessage("MODULE_DESCRIPTION");
			$this->PARTNER_NAME 	   = Loc::getMessage("PARTNER_NAME");
			$this->PARTNER_URI  	   = Loc::getMessage("PARTNER_URI");
		}
	
		return false;
	}



	public function DoInstall(){
	
		global $APPLICATION;
	
		if(CheckVersion(ModuleManager::getVersion("main"), "14.00.00")){
	
			$this->InstallFiles();
		
	
			ModuleManager::registerModule($this->MODULE_ID);
  	         $this->InstallDB();
				
			$this->InstallEvents();
		}else{
	
			$APPLICATION->ThrowException(
				Loc::getMessage("INSTALL_ERROR_VERSION")
			);
		}
	
		$APPLICATION->IncludeAdminFile(
			Loc::getMessage("INSTALL_TITLE")." \"".Loc::getMessage("MODULE_NAME")."\"",
			__DIR__."/step.php"
		);
	
		return false;
	}


	public function InstallFiles(){
	
		CopyDirFiles(
			__DIR__."/assets/scripts",
			Application::getDocumentRoot()."/bitrix/js/".$this->MODULE_ID."/",
			true,
			true
		);
		
		CopyDirFiles(
			__DIR__."/assets/scripts",
			Application::getDocumentRoot()."/bitrix/js/".$this->MODULE_ID."/",
			true,
			true
		);
	
		CopyDirFiles(
			__DIR__."/kse.pdf",
			Application::getDocumentRoot()."/bitrix/admin/kse.pdf/",
			true,
			true
		);
        CopyDirFiles(
			__DIR__."/img",
			Application::getDocumentRoot()."/bitrix/modules/".$this->MODULE_ID."/img/",
			true,
			true
		);
        CopyDirFiles(
			__DIR__."/classes/general",
			Application::getDocumentRoot()."/bitrix/modules/".$this->MODULE_ID."/classes/general/",
			true,
			true
		);
        CopyDirFiles(
			__DIR__."/admin",
			Application::getDocumentRoot()."/bitrix/modules/".$this->MODULE_ID."/admin/",
			true,
			true
		);
        CopyDirFiles(
			__DIR__."/sale_delivery",
			Application::getDocumentRoot()."/local/php_interface/sale_delivery/",
			true,
			true
		);


	CopyDirFiles(
			Application::getDocumentRoot()."/bitrix/modules/courierserviceexpress.moduledost/lang/ru/local",
			Application::getDocumentRoot()."/local/php_interface/sale_delivery/kce/lang/ru/",
			true,
			true
		);


        CopyDirFiles(
			__DIR__."/bitrix-admin",
			Application::getDocumentRoot()."/bitrix/admin/",
			true,
			true
		);
	
		return false;
	}
	
	public function InstallDB(){
		
		$result = HL\HighloadBlockTable::add(array("NAME"=>"DeliveryDays", "TABLE_NAME" => "kce_delivery_days"));
		
		$userTypeEntity    = new CUserTypeEntity();
 
		$HLid = $result->getId();
		
		Option::set("courierserviceexpress.moduledost", "hblockID", $HLid);
		
		$userTypeData    = array(
			'ENTITY_ID'         => 'HLBLOCK_'.$HLid,
			'FIELD_NAME'        => 'UF_ZIPTO',
			'USER_TYPE_ID'      => 'string',
		'XML_ID'            => '',
		'SORT'              => 500,
		'MULTIPLE'          => 'N',
			'MANDATORY'         => 'N',
			'SHOW_FILTER'       => 'N',
			'SHOW_IN_LIST'      => '',
			'EDIT_IN_LIST'      => '',
			'IS_SEARCHABLE'     => 'N',
			'SETTINGS'          => array(
				'DEFAULT_VALUE' => '',
				'SIZE'          => '20',
				'ROWS'          => '1',
				'MIN_LENGTH'    => '0',
				'MAX_LENGTH'    => '0',
				'REGEXP'        => '',
		),
			'EDIT_FORM_LABEL'   => array(
				'ru'    => 'ZipTo',
				'en'    => 'ZipTo',
			),
			'LIST_COLUMN_LABEL' => array(
				'ru'    => 'ZipTo',
				'en'    => 'ZipTo',
			),
			'LIST_FILTER_LABEL' => array(
				'ru'    => 'ZipTo',
		'en'    => 'ZipTo',
		),
			'ERROR_MESSAGE'     => array(
				'ru'    => 'Error ZipTo',
				'en'    => 'An error in completing the field ZipTo',
		),
			'HELP_MESSAGE'      => array(
				'ru'    => '',
		'en'    => '',
			),
		);
		 
		$userTypeData2    = array(
			'ENTITY_ID'         => 'HLBLOCK_'.$HLid,
			'FIELD_NAME'        => 'UF_DAYS',
			'USER_TYPE_ID'      => 'integer',
		'XML_ID'            => '',
		'SORT'              => 500,
		'MULTIPLE'          => 'N',
			'MANDATORY'         => 'N',
			'SHOW_FILTER'       => 'N',
			'SHOW_IN_LIST'      => '',
			'EDIT_IN_LIST'      => '',
			'IS_SEARCHABLE'     => 'N',
			'SETTINGS'          => array(
				'DEFAULT_VALUE' => '',
		),
			'EDIT_FORM_LABEL'   => array(
				'ru'    => 'Days',
				'en'    => 'Days',
			),
			'LIST_COLUMN_LABEL' => array(
				'ru'    => 'Days',
				'en'    => 'Days',
			),
			'LIST_FILTER_LABEL' => array(
				'ru'    => 'Days',
		'en'    => 'Days',
		),
			'ERROR_MESSAGE'     => array(
				'ru'    => 'Error Days',
				'en'    => 'An error in completing the ield Days',
		),
			'HELP_MESSAGE'      => array(
				'ru'    => '',
		'en'    => '',
			),
		);
		
		$userTypeData3    = array(
			'ENTITY_ID'         => 'HLBLOCK_'.$HLid,
			'FIELD_NAME'        => 'UF_KSEDATE',
			'USER_TYPE_ID'      => 'integer',
            'XML_ID'            => '',
            'SORT'              => 500,
            'MULTIPLE'          => 'N',
			'MANDATORY'         => 'N',
			'SHOW_FILTER'       => 'N',
			'SHOW_IN_LIST'      => '',
			'EDIT_IN_LIST'      => '',
			'IS_SEARCHABLE'     => 'N',
			'SETTINGS'          => array(
				'DEFAULT_VALUE' => '',
		),
			'EDIT_FORM_LABEL'   => array(
				'ru'    => 'TimeAdding',
				'en'    => 'TimeAdding',
			),
			'LIST_COLUMN_LABEL' => array(
				'ru'    => 'TimeAdding',
				'en'    => 'TimeAdding',
			),
			'LIST_FILTER_LABEL' => array(
				'ru'    => 'TimeAdding',
		'en'    => 'TimeAdding',
		),
			'ERROR_MESSAGE'     => array(
				'ru'    => 'Error TimeAdding',
				'en'    => 'An error in completing the field TimeAdding',
		),
			'HELP_MESSAGE'      => array(
				'ru'    => '',
		'en'    => '',
			),
		);
		 
		$userTypeId = $userTypeEntity->Add($userTypeData);
		$userTypeId2 = $userTypeEntity->Add($userTypeData2);
		$userTypeId3 = $userTypeEntity->Add($userTypeData3);
        
        //Создаем второй ИБ
        
        $result2 = HL\HighloadBlockTable::add(array("NAME"=>"KSEwaybills", "TABLE_NAME" => "ksewaybills"));
		
		$userTypeEntity2 = new CUserTypeEntity();
 
		$HLidWB = $result2->getId();
		
		Option::set("courierserviceexpress.moduledost", "WayBillshblockID", $HLidWB);
		
		$userTypeDataWB1    = array(
			'ENTITY_ID'         => 'HLBLOCK_'.$HLidWB,
			'FIELD_NAME'        => 'UF_WAYBILLID',
			'USER_TYPE_ID'      => 'string',
            'XML_ID'            => '',
            'SORT'              => 500,
            'MULTIPLE'          => 'N',
			'MANDATORY'         => 'N',
			'SHOW_FILTER'       => 'N',
			'SHOW_IN_LIST'      => '',
			'EDIT_IN_LIST'      => '',
			'IS_SEARCHABLE'     => 'N',
			'SETTINGS'          => array(
				'DEFAULT_VALUE' => '',
				'SIZE'          => '40',
				'ROWS'          => '1',
				'MIN_LENGTH'    => '0',
				'MAX_LENGTH'    => '0',
				'REGEXP'        => '',
		),
			'EDIT_FORM_LABEL'   => array(
				'ru'    => 'Waybillid',
				'en'    => 'Waybillid',
			),
			'LIST_COLUMN_LABEL' => array(
				'ru'    => 'Waybillid',
				'en'    => 'Waybillid',
			),
			'LIST_FILTER_LABEL' => array(
				'ru'    => 'Waybillid',
		'en'    => 'Waybillid',
		),
			'ERROR_MESSAGE' => array(
				'ru'    => 'Error Waybillid',
				'en'    => 'An error in completing the field Waybillid',
		),
			'HELP_MESSAGE'      => array('ru' => '','en' => ''),
		);
		 
		$userTypeDataWB2    = array(
			'ENTITY_ID'         => 'HLBLOCK_'.$HLidWB,
			'FIELD_NAME'        => 'UF_ORDERID',
			'USER_TYPE_ID'      => 'string',
            'XML_ID'            => '',
            'SORT'              => 500,
            'MULTIPLE'          => 'N',
			'MANDATORY'         => 'N',
			'SHOW_FILTER'       => 'N',
			'SHOW_IN_LIST'      => '',
			'EDIT_IN_LIST'      => '',
			'IS_SEARCHABLE'     => 'N',
			'SETTINGS'          => array(
				'DEFAULT_VALUE' => '',
				'SIZE'          => '40',
				'ROWS'          => '1',
				'MIN_LENGTH'    => '0',
				'MAX_LENGTH'    => '0',
				'REGEXP'        => '',
		),
			'EDIT_FORM_LABEL'   => array(
				'ru'    => 'OrderID',
				'en'    => 'OrderID',
			),
			'LIST_COLUMN_LABEL' => array(
				'ru'    => 'OrderID',
				'en'    => 'OrderID',
			),
			'LIST_FILTER_LABEL' => array(
				'ru'    => 'OrderID',
                'en'    => 'OrderID',
		),
			'ERROR_MESSAGE' => array(
				'ru'    => 'Error OrderID',
				'en'    => 'An error in completing the field OrderID',
		),
			'HELP_MESSAGE'      => array('ru' => '','en' => ''),
		);
        
       	$userTypeDataWB3    = array(
			'ENTITY_ID'         => 'HLBLOCK_'.$HLidWB,
			'FIELD_NAME'        => 'UF_WAYBILLSTATUS',
			'USER_TYPE_ID'      => 'string',
            'XML_ID'            => '',
            'SORT'              => 500,
            'MULTIPLE'          => 'N',
			'MANDATORY'         => 'N',
			'SHOW_FILTER'       => 'N',
			'SHOW_IN_LIST'      => '',
			'EDIT_IN_LIST'      => '',
			'IS_SEARCHABLE'     => 'N',
			'SETTINGS'          => array(
				'DEFAULT_VALUE' => '',
				'SIZE'          => '40',
				'ROWS'          => '1',
				'MIN_LENGTH'    => '0',
				'MAX_LENGTH'    => '0',
				'REGEXP'        => '',
		),
			'EDIT_FORM_LABEL'   => array(
				'ru'    => 'WayBillStatus',
				'en'    => 'WayBillStatus',
			),
			'LIST_COLUMN_LABEL' => array(
				'ru'    => 'WayBillStatus',
				'en'    => 'WayBillStatus',
			),
			'LIST_FILTER_LABEL' => array(
				'ru'    => 'WayBillStatus',
                'en'    => 'WayBillStatus',
		),
			'ERROR_MESSAGE' => array(
				'ru'    => 'Error WayBillStatus',
				'en'    => 'An error in completing the field WayBillStatus',
		),
			'HELP_MESSAGE'      => array('ru' => '','en' => ''),
		);
        
       	$userTypeDataWB4    = array(
			'ENTITY_ID'         => 'HLBLOCK_'.$HLidWB,
			'FIELD_NAME'        => 'UF_KSE_ORDERID',
			'USER_TYPE_ID'      => 'string',
            'XML_ID'            => '',
            'SORT'              => 500,
            'MULTIPLE'          => 'N',
			'MANDATORY'         => 'N',
			'SHOW_FILTER'       => 'N',
			'SHOW_IN_LIST'      => '',
			'EDIT_IN_LIST'      => '',
			'IS_SEARCHABLE'     => 'N',
			'SETTINGS'          => array(
				'DEFAULT_VALUE' => '',
				'SIZE'          => '40',
				'ROWS'          => '1',
				'MIN_LENGTH'    => '0',
				'MAX_LENGTH'    => '0',
				'REGEXP'        => '',
		),
			'EDIT_FORM_LABEL'   => array(
				'ru'    => 'KSEOrderId',
				'en'    => 'KSEOrderId',
			),
			'LIST_COLUMN_LABEL' => array(
				'ru'    => 'KSEOrderId',
				'en'    => 'KSEOrderId',
			),
			'LIST_FILTER_LABEL' => array(
				'ru'    => 'KSEOrderId',
                'en'    => 'KSEOrderId',
		),
			'ERROR_MESSAGE' => array(
				'ru'    => 'Error KSEOrderId',
				'en'    => 'An error in completing the field KSEOrderId',
		),
			'HELP_MESSAGE'      => array('ru' => '','en' => ''),
		);
        
        $userTypeDataWB5    = array(
			'ENTITY_ID'         => 'HLBLOCK_'.$HLidWB,
			'FIELD_NAME'        => 'UF_WAYBILL_DATE',
			'USER_TYPE_ID'      => 'date',
            'XML_ID'            => '',
            'SORT'              => 500,
            'MULTIPLE'          => 'N',
			'MANDATORY'         => 'N',
			'SHOW_FILTER'       => 'N',
			'SHOW_IN_LIST'      => '',
			'EDIT_IN_LIST'      => '',
			'IS_SEARCHABLE'     => 'N',
			'SETTINGS'          => array(
				'DEFAULT_VALUE' => '',
				'SIZE'          => '40',
				'ROWS'          => '1',
				'MIN_LENGTH'    => '0',
				'MAX_LENGTH'    => '0',
				'REGEXP'        => '',
		),
			'EDIT_FORM_LABEL'   => array(
				'ru'    => 'WayBillDate',
				'en'    => 'WayBillDate',
			),
			'LIST_COLUMN_LABEL' => array(
				'ru'    => 'WayBillDate',
				'en'    => 'WayBillDate',
			),
			'LIST_FILTER_LABEL' => array(
				'ru'    => 'WayBillDate',
                'en'    => 'WayBillDate',
		),
			'ERROR_MESSAGE' => array(
				'ru'    => 'Error WayBillDate',
				'en'    => 'An error in completing the field WayBillDate',
		),
			'HELP_MESSAGE'      => array('ru' => '','en' => ''),
		);
        
        $userTypeDataWB6    = array(
			'ENTITY_ID'         => 'HLBLOCK_'.$HLidWB,
			'FIELD_NAME'        => 'UF_ADR_OTPR',
			'USER_TYPE_ID'      => 'string',
            'XML_ID'            => '',
            'SORT'              => 500,
            'MULTIPLE'          => 'N',
			'MANDATORY'         => 'N',
			'SHOW_FILTER'       => 'N',
			'SHOW_IN_LIST'      => '',
			'EDIT_IN_LIST'      => '',
			'IS_SEARCHABLE'     => 'N',
			'SETTINGS'          => array(
				'DEFAULT_VALUE' => '',
				'SIZE'          => '40',
				'ROWS'          => '1',
				'MIN_LENGTH'    => '0',
				'MAX_LENGTH'    => '0',
				'REGEXP'        => '',
		),
			'EDIT_FORM_LABEL'   => array(
				'ru'    => 'SenderAddress',
				'en'    => 'SenderAddress',
			),
			'LIST_COLUMN_LABEL' => array(
				'ru'    => 'SenderAddress',
				'en'    => 'SenderAddress',
			),
			'LIST_FILTER_LABEL' => array(
				'ru'    => 'SenderAddress',
                'en'    => 'SenderAddress',
		),
			'ERROR_MESSAGE' => array(
				'ru'    => 'Error SenderAddress',
				'en'    => 'An error in completing the field SenderAddress',
		),
			'HELP_MESSAGE'      => array('ru' => '','en' => ''),
		);
        
        $userTypeDataWB7    = array(
			'ENTITY_ID'         => 'HLBLOCK_'.$HLidWB,
			'FIELD_NAME'        => 'UF_KSE_WEIGHT',
			'USER_TYPE_ID'      => 'double',
            'XML_ID'            => '',
            'SORT'              => 500,
            'MULTIPLE'          => 'N',
			'MANDATORY'         => 'N',
			'SHOW_FILTER'       => 'N',
			'SHOW_IN_LIST'      => '',
			'EDIT_IN_LIST'      => '',
			'IS_SEARCHABLE'     => 'N',
			'SETTINGS'          => array(
				'DEFAULT_VALUE' => '',
				'SIZE'          => '40',
				'ROWS'          => '1',
				'MIN_LENGTH'    => '0',
				'MAX_LENGTH'    => '0',
				'REGEXP'        => '',
		),
			'EDIT_FORM_LABEL'   => array(
				'ru'    => 'OrderWeight',
				'en'    => 'OrderWeight',
			),
			'LIST_COLUMN_LABEL' => array(
				'ru'    => 'OrderWeight',
				'en'    => 'OrderWeight',
			),
			'LIST_FILTER_LABEL' => array(
				'ru'    => 'OrderWeight',
                'en'    => 'OrderWeight',
		),
			'ERROR_MESSAGE' => array(
				'ru'    => 'Error OrderWeight',
				'en'    => 'An error in completing the field OrderWeight',
		),
			'HELP_MESSAGE'      => array('ru' => '','en' => ''),
		);        
		 
        $userTypeDataWB8    = array(
			'ENTITY_ID'         => 'HLBLOCK_'.$HLidWB,
			'FIELD_NAME'        => 'UF_KSE_QTY',
			'USER_TYPE_ID'      => 'integer',
            'XML_ID'            => '',
            'SORT'              => 500,
            'MULTIPLE'          => 'N',
			'MANDATORY'         => 'N',
			'SHOW_FILTER'       => 'N',
			'SHOW_IN_LIST'      => '',
			'EDIT_IN_LIST'      => '',
			'IS_SEARCHABLE'     => 'N',
			'SETTINGS'          => array(
				'DEFAULT_VALUE' => '',
				'SIZE'          => '40',
				'ROWS'          => '1',
				'MIN_LENGTH'    => '0',
				'MAX_LENGTH'    => '0',
				'REGEXP'        => '',
		),
			'EDIT_FORM_LABEL'   => array(
				'ru'    => 'OrderQuantity',
				'en'    => 'OrderQuantity',
			),
			'LIST_COLUMN_LABEL' => array(
				'ru'    => 'OrderQuantity',
				'en'    => 'OrderQuantity',
			),
			'LIST_FILTER_LABEL' => array(
				'ru'    => 'OrderQuantity',
                'en'    => 'OrderQuantity',
		),
			'ERROR_MESSAGE' => array(
				'ru'    => 'Error OrderQuantity',
				'en'    => 'An error in completing the field OrderQuantity',
		),
			'HELP_MESSAGE'      => array('ru' => '','en' => ''),
		);                         
        
		$userTypeIdWB1 = $userTypeEntity->Add($userTypeDataWB1);
		$userTypeIdWB2 = $userTypeEntity->Add($userTypeDataWB2);
		$userTypeIdWB3 = $userTypeEntity->Add($userTypeDataWB3);
		$userTypeIdWB4 = $userTypeEntity->Add($userTypeDataWB4);
		$userTypeIdWB5 = $userTypeEntity->Add($userTypeDataWB5);
		$userTypeIdWB6 = $userTypeEntity->Add($userTypeDataWB6);
		$userTypeIdWB7 = $userTypeEntity->Add($userTypeDataWB7);
		$userTypeIdWB8 = $userTypeEntity->Add($userTypeDataWB8);                
	
		return false;
	}


	public function InstallEvents(){
	
		EventManager::getInstance()->registerEventHandler(
			"sale",
			"onSaleDeliveryHandlersClassNamesBuildList",
			$this->MODULE_ID,
			"KCEDeliveryInclude",
			"addDeliveryServices",
			100
		);
		EventManager::getInstance()->registerEventHandler(
			"main",
			"OnAdminContextMenuShow",
			$this->MODULE_ID,
			SaleDeliveryButtonInstaller::class,
			'saleAdminContextMenuShowHandler'
	        );
		EventManager::getInstance()->registerEventHandler(
    		'sale',
    		'OnSaleStatusOrderChange',
    		//'OnSaleOrderSaved',
    		$this->MODULE_ID,
    		KCEWayBillFromOrder::class,
   			'KCEOnSaleOrderSavedHandler'
		);

		return false;
	}
	
	
	public function DoUninstall(){
	
		global $APPLICATION;

		CAgent::RemoveModuleAgents("courierserviceexpress.moduledost");
		$this->UnInstallFiles();
		$this->UnInstallEvents();
		$this->UnInstallDB();
	
		ModuleManager::unRegisterModule($this->MODULE_ID);
	
		$APPLICATION->IncludeAdminFile(
			Loc::getMessage("UNINSTALL_TITLE")." \"".Loc::getMessage("MODULE_NAME")."\"",
			__DIR__."/unstep.php"
		);
	
		return false;
	}
	

	public function UnInstallFiles(){
	
		Directory::deleteDirectory(
			Application::getDocumentRoot()."/bitrix/js/".$this->MODULE_ID
		);
	
		Directory::deleteDirectory(
			Application::getDocumentRoot()."/bitrix/css/".$this->MODULE_ID
		);
        
        Directory::deleteDirectory(
			Application::getDocumentRoot()."/local/php_interface/sale_delivery/kce"
		);
        
       /*	Directory::deleteDirectory(
			Application::getDocumentRoot()."/bitrix/modules/".$this->MODULE_ID
		);*/
        Directory::deleteDirectory(
			Application::getDocumentRoot()."/bitrix/admin/kse.pdf/"
		);
        
        File::deleteFile(Application::getDocumentRoot()."/bitrix/admin/kse-order.php");
        File::deleteFile(Application::getDocumentRoot()."/bitrix/admin/kse-stat.php");
        File::deleteFile(Application::getDocumentRoot()."/bitrix/admin/kse_business_order_dialog_ajax.php");
        File::deleteFile(Application::getDocumentRoot()."/bitrix/admin/kse_business_order_dialog_create_ajax.php");
	
		return false;
	}

	public function UnInstallDB(){
	
		HL\HighloadBlockTable::delete(COption::GetOptionString("courierserviceexpress.moduledost", "hblockID"));
        HL\HighloadBlockTable::delete(COption::GetOptionString("courierserviceexpress.moduledost", "WayBillshblockID"));
		Option::delete($this->MODULE_ID);
		return false;
	}
	
	public function UnInstallEvents(){
	
        EventManager::getInstance()->unregisterEventHandler(
			"sale",
			"onSaleDeliveryHandlersClassNamesBuildList",
			$this->MODULE_ID,
			"KCEDeliveryInclude",
			"addDeliveryServices",
			100
		);
		EventManager::getInstance()->unregisterEventHandler(
            'main',
            'OnAdminContextMenuShow',
			$this->MODULE_ID,
            SaleDeliveryButtonInstaller::class,
            'saleAdminContextMenuShowHandler'
        );
        EventManager::getInstance()->unregisterEventHandler(
    		'sale',
    		'OnSaleStatusOrderChange',
    		$this->MODULE_ID,
    		KCEWayBillFromOrder::class,
   			'KCEOnSaleOrderSavedHandler'
		);
	
		return false;
	}
}