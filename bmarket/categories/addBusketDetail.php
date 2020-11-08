<? require_once ($_SERVER['DOCUMENT_ROOT']."/bitrix/modules/main/include.php");?>
<?php
if (CModule::IncludeModule("catalog") && CModule::IncludeModule("sale")) {

    // ADD TO CART
    if (isset($_POST['good_id'] ) && isset($_POST['countе'])){
        $productID=intval($_POST['good_id']);
        $count = intval($_POST['countе']);

        Add2BasketByProductID(
            $productID,
            $count
        );
    }
    else {echo "Нет параметров";}
}
else {echo "Не подключены модули";}?>
<?$APPLICATION->IncludeComponent(
    "bitrix:sale.basket.basket",
    "",
    Array(
        "ACTION_VARIABLE" => "basketAction",
        "ADDITIONAL_PICT_PROP_1" => "-",
        "ADDITIONAL_PICT_PROP_2" => "-",
        "AUTO_CALCULATION" => "Y",
        "BASKET_IMAGES_SCALING" => "adaptive",
        "COLUMNS_LIST_EXT" => array("PREVIEW_PICTURE","DELETE","DELAY","SUM"),
        "COLUMNS_LIST_MOBILE" => array(),
        "COMPATIBLE_MODE" => "Y",
        "CORRECT_RATIO" => "Y",
        "DEFERRED_REFRESH" => "N",
        "DISCOUNT_PERCENT_POSITION" => "bottom-right",
        "DISPLAY_MODE" => "extended",
        "EMPTY_BASKET_HINT_PATH" => "/",
        "GIFTS_BLOCK_TITLE" => "Выберите один из подарков",
        "GIFTS_CONVERT_CURRENCY" => "N",
        "GIFTS_HIDE_BLOCK_TITLE" => "N",
        "GIFTS_HIDE_NOT_AVAILABLE" => "N",
        "GIFTS_MESS_BTN_BUY" => "Выбрать",
        "GIFTS_MESS_BTN_DETAIL" => "Подробнее",
        "GIFTS_PAGE_ELEMENT_COUNT" => "4",
        "GIFTS_PLACE" => "BOTTOM",
        "GIFTS_PRODUCT_PROPS_VARIABLE" => "prop",
        "GIFTS_PRODUCT_QUANTITY_VARIABLE" => "quantity",
        "GIFTS_SHOW_DISCOUNT_PERCENT" => "Y",
        "GIFTS_SHOW_OLD_PRICE" => "N",
        "GIFTS_TEXT_LABEL_GIFT" => "Подарок",
        "HIDE_COUPON" => "N",
        "LABEL_PROP" => array(),
        "PATH_TO_ORDER" => "/personal/order/make/",
        "PRICE_DISPLAY_MODE" => "Y",
        "PRICE_VAT_SHOW_VALUE" => "N",
        "PRODUCT_BLOCKS_ORDER" => "props,sku,columns",
        "QUANTITY_FLOAT" => "Y",
        "SET_TITLE" => "Y",
        "SHOW_DISCOUNT_PERCENT" => "Y",
        "SHOW_FILTER" => "Y",
        "SHOW_RESTORE" => "Y",
        "TEMPLATE_THEME" => "blue",
        "TOTAL_BLOCK_DISPLAY" => array("top"),
        "USE_DYNAMIC_SCROLL" => "Y",
        "USE_ENHANCED_ECOMMERCE" => "N",
        "USE_GIFTS" => "Y",
        "USE_PREPAYMENT" => "N",
        "USE_PRICE_ANIMATION" => "Y"
    )
);?>

