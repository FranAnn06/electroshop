<?
defined('B_PROLOG_INCLUDED') and (B_PROLOG_INCLUDED === true) or die();
use Bitrix\Main\Localization\Loc;
Loc::loadMessages(__FILE__);
$aMenu = array(
    array(
        'parent_menu' => 'global_menu_store',
        'sort' => 1500,
        'text' => Loc::getMessage('KSE_MENU_PARENT_TEXT'),
        "icon" => "sale_menu_icon_statisti",
        'title' => Loc::getMessage('KSE_MENU_PARENT_TEXT'),
        'url' => 'kse-stat.php',
        'items_id' => 'menu_references'
    ),
    array(
        'parent_menu' => 'global_menu_store',
        'sort' => 1600,
        'text' => Loc::getMessage('KSE_MENU_PARENT_TEXT2'),
        "icon" => "sale_menu_icon_statisti",
        'title' => Loc::getMessage('KSE_MENU_PARENT_TEXT2'),
        'url' => 'kse-order.php',
        'items_id' => 'menu_references'
    )
);
return $aMenu;
?>