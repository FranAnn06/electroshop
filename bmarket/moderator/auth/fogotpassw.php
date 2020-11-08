<?
define ("NEED_AUTH", true);
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("AUTH");?>

<?if(CUser::IsAuthorized()){
    echo "Вы авторизованы!";?>
<?php } else {?>
    <?$APPLICATION->IncludeComponent(
    "bitrix:system.auth.forgotpasswd",
    "",
    Array(
        "SHOW_ERRORS"=>"Y"
    )
);?>
    <?php } ?>

<?php
require($_SERVER['DOCUMENT_ROOT'] . '/bitrix/footer.php');?>