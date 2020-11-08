<?php
namespace Kiora\Payments;

if( !defined( 'KIYA_NAME_MOD' ) ) define("KIYA_NAME_MOD", 'kiora.yaka');

class Settings {    
    
    public $OPTS = array();
    public $arYKShops ;   

    public $payment_url = 'https://money.yandex.ru/eshop.xml';
    //public $payment_url_demo = 'https://demomoney.yandex.ru/eshop.xml'; //no longer used

    function __construct() {
	
        $this->arYKShops = explode( ',', \Bitrix\Main\Config\Option::get(KIYA_NAME_MOD, "yk_shops_id", "0", 1) );

        foreach( is_array( $this->arYKShops ) ? $this->arYKShops : array() as $keyId => $tempId ){
            $id = trim($tempId);
            $this->arYKShops[$keyId] = $id;
            
            $isApiType = \Bitrix\Main\Config\Option::get(KIYA_NAME_MOD, 'api_type_' . $id, "api", 1) == 'api' ? true : false;
            $shopPassword = \Bitrix\Main\Config\Option::get(KIYA_NAME_MOD, 'shop_password_' . $id, "", 1);
            $testPresent = strpos($shopPassword, 'test_') === 0;
            $isDemoOn = $isApiType ? $testPresent ? true  : false : \Bitrix\Main\Config\Option::get(KIYA_NAME_MOD, 'demo_mode_' . $id, "api", 1) == 'Y' ? true : false;
            
            $this->OPTS[$id] = array(
                'API_TYPE' => \Bitrix\Main\Config\Option::get(KIYA_NAME_MOD, "api_type_".$id, "", 1),
                'SHOP_PASSWORD' => $shopPassword,
                'SC_ID' => \Bitrix\Main\Config\Option::get(KIYA_NAME_MOD, "scid_".$id, "0", 1),
                'DEMO_MODE' => $isDemoOn,
                'SHOP_BACK_URL' => \Bitrix\Main\Config\Option::get(KIYA_NAME_MOD, "shop_back_url_".$id, "", 1),
                
                'send_check_data' => \Bitrix\Main\Config\Option::get(KIYA_NAME_MOD, "shop_send_check_data_".$id, "0", 1),
                
                'email_event_add' =>  \Bitrix\Main\Config\Option::get(KIYA_NAME_MOD, 'email_event_add_'.$id, "0", 1),
                'email_event_paid' =>  \Bitrix\Main\Config\Option::get(KIYA_NAME_MOD, 'email_event_paid_'.$id, "0", 1),
                'email_event_cancel' =>  \Bitrix\Main\Config\Option::get(KIYA_NAME_MOD, 'email_event_cancel_'.$id, "0", 1),
                'email_event_waiting' => \Bitrix\Main\Config\Option::get(KIYA_NAME_MOD, 'email_event_waiting_'.$id, "0", 1),
                
                'shop_name' =>  \Bitrix\Main\Config\Option::get(KIYA_NAME_MOD, 'shop_name_'.$id, "0", 1),
                'shop_email' =>  \Bitrix\Main\Config\Option::get(KIYA_NAME_MOD, 'shop_email_'.$id, "#DEFAULT_EMAIL_FROM#", 1),
                
                'mws_cert' =>  $_SERVER['DOCUMENT_ROOT'] . \Bitrix\Main\Config\Option::get(KIYA_NAME_MOD, 'mws_cert_'.$id, "0", 1),
                'mws_private_key' =>  $_SERVER['DOCUMENT_ROOT'] . \Bitrix\Main\Config\Option::get(KIYA_NAME_MOD, 'mws_private_key_'.$id, "0", 1),
                'mws_cert_password' =>  \Bitrix\Main\Config\Option::get(KIYA_NAME_MOD, 'mws_cert_password_'.$id, "0", 1),
                'mws_is_autopay' =>  \Bitrix\Main\Config\Option::get(KIYA_NAME_MOD, 'mws_is_autopay_'.$id, "0", 1),
                'mws_is_deferpay' =>  \Bitrix\Main\Config\Option::get(KIYA_NAME_MOD, 'mws_is_deferpay_'.$id, "0", 1),
                
                'SECURITY_TYPE' => 'MD5',  //PKCS7
                'request_source' => 'php://input',
            );
            
        }
        
        $GLOBALS['YKOPTS'] = $this->OPTS;
    }
    
    

    public function getPostURL($shop_id){
        return $this->OPTS[$shop_id]['DEMO_MODE'] ? $this->payment_url : $this->payment_url;
    }

    public function getSCID($shop_id){
        return $this->OPTS[$shop_id]['DEMO_MODE'] ? $this->OPTS[$shop_id]['SC_ID'] : $this->OPTS[$shop_id]['SC_ID'];
    }
    
    public static function getOption($option, $shop_id){
        
        if( empty( $GLOBALS['YKOPTS'] ) ){
            new Settings();
        }
        
        return $GLOBALS['YKOPTS'][$shop_id][$option];
        
    }
    
    public function getShopIdDefault(){
        
        $shopIDs = array_keys($this->OPTS);
        
        return $shopIDs[0] > 0 ? $shopIDs[0] : \Bitrix\Main\Config\Option::get(KIYA_NAME_MOD, "shop_id", "0", 1);
    }
}