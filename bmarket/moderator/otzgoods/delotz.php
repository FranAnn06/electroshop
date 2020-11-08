<?require_once ($_SERVER['DOCUMENT_ROOT']."/bitrix/modules/main/include.php");?>
<?php
if(CModule::IncludeModule("iblock")) {
    if ($_POST['id']) {
        $id = intval($_POST['id']);

    }
    CModule::IncludeModule("iblock");
    $el = new CIBlockElement;
    $arFilds = array(
        "IBLOCK_ID" => 3,
        "ACTIVE" => "N",
    );
    $PRODUCT_ID = $id;  // изменяем элемент с кодом (ID) 2
    $res = $el->Update($PRODUCT_ID, $arFilds);
}
?>