<?require_once ($_SERVER['DOCUMENT_ROOT']."/bitrix/modules/main/include.php");?>
<?php
if(CModule::IncludeModule("iblock")) {
    if ($_POST['text'] && $_POST['id']&& $_POST['rating']&& $_POST['Elem_id']) {
        $id = intval($_POST['id']);
        $text = $_POST['text'];
        $rating=intval($_POST['rating']);
            $Elem_id=intval($_POST['Elem_id']);
    }
    CModule::IncludeModule("iblock");
    $el = new CIBlockElement;
    $arFilds = array(
        "IBLOCK_ID" => 3,
        "PROPERTY_VALUES" => array('Upd' => "Изменено модератором",'Rating'=>$rating,'ID_ELEMENT'=>$Elem_id),
        "ACTIVE" => "Y",
        "PREVIEW_TEXT" => $text


    );
    $PRODUCT_ID = $id;  // изменяем элемент с кодом (ID) 2
    $res = $el->Update($PRODUCT_ID, $arFilds);
}
?>
