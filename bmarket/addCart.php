<? require_once ($_SERVER['DOCUMENT_ROOT']."/bitrix/modules/main/include.php");?>
<?php
if (CModule::IncludeModule("catalog") && CModule::IncludeModule("sale")) {

    // ADD TO CART
    if ($_POST['add'] == 'Y' && $_POST['good_id']) {
        $propArr = array();
        $count = 1;

        Add2BasketByProductID(
            $_POST['good_id'],
            $count,
            $propArr
        );
    }
}
?>
