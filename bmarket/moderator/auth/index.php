<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("AUTH");?><?$APPLICATION->IncludeComponent(
	"bitrix:system.auth.form",
	"",
	Array(
		"FORGOT_PASSWORD_URL" => "/moderator/auth/fogotpassw.php",
		"PROFILE_URL" => "/moderator/",
		"REGISTER_URL" => "/moderator/auth/registration.php",
		"SHOW_ERRORS" => "Y"
	)
);?><?php
require($_SERVER['DOCUMENT_ROOT'] . '/bitrix/footer.php');?>