<?require_once ($_SERVER['DOCUMENT_ROOT']."/bitrix/modules/main/include.php");?>
<?php
if(CModule::IncludeModule("iblock")) {
    if ($_POST['email'] && $_POST['text']  && $_POST['ElemID']) {
        $email = $_POST['email'];
        $text = $_POST['text'];

if(!empty($_POST['name'])){
    $name = $_POST['name'];
}
else{$name = 'NoName';}
        if($_POST['star1']){
            $rating=intval($_POST['star1']);
        }
        if($_POST['star2']){
            $rating=intval($_POST['star2']);
        }
        if($_POST['star3']){
            $rating=intval($_POST['star3']);
        }
        if($_POST['star4']){
            $rating=$_POST['star4'];
        }
if($_POST['star5']){
    $rating=intval($_POST['star5']);
}
        $productID=intval ($_POST['ElemID']);

        CModule::IncludeModule('iblock');
        $el = new CIBlockElement;

        $arFilds = array(
            "IBLOCK_ID" => 3,
            "ACTIVE_FROM" => date('d.m.Y'),
            "NAME" => $name,
            "ACTIVE" => "Y",
            "PROPERTY_VALUES"=>  Array('ID_ELEMENT' => $productID,'Rating' => $rating),
            "PREVIEW_TEXT" => $text


        );

        if ($addID = $el->Add($arFilds))
            echo $result['status'] = '<p class="alert alert-success">Ваш отзыв успешно добавлен<p>';
        else
            echo $result['status'] = $el->LAST_ERROR;
    }
}
?>
<?
$arEventFields = array(
    "NAME" => $name,
    "PREVIEW_TEXT" => $text,
    "EMAIL"=>$email
);
CEvent::Send("New_Comment", 's1', $arEventFields);
?>