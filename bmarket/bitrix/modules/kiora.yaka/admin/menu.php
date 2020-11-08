<?php
/* 
 * Bitrix Framework
 * @package    Bitrix
 * @subpackage kiora.yaka
 * @copyright  2016 Kiora
 */

IncludeModuleLangFile(__FILE__);

if($APPLICATION->GetGroupRight("kiora.yaka")>"D")
{
    $aMenu = array(
      "parent_menu" 	=> "global_menu_services",
      "sort"        	=> 100,
      "url"         	=> "ki_yaka_payments_history.php?lang=".LANGUAGE_ID,
      "text"        	=> GetMessage('YANDEX_KASSA'),
      "icon" 		=> "kiora_yaka_menu_icon",
      "page_icon" 	=> "kiora_yaka_page_icon",
      "items_id" 	=> "kiora_yaka_menu",
      "items"       	=> array()
    );

    CModule::AddAutoloadClasses( 'kiora.yaka', array( 'KIUtils' => 'lib/KIUtils.php', ) );

    if( class_exists('KIUtils') ){
        $aMenu = \KIUtils::event('kiora.yaka', "KiYKBeforeMenuAdd",$aMenu);
    }
    
    return $aMenu;
}

return false;