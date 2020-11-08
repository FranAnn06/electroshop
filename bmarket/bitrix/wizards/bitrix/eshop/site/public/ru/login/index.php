<?
define("NEED_AUTH", true);
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");

$userName = CUser::GetFullName();
if (!$userName)
	$userName = CUser::GetLogin();
?>
<script>
	<?if ($userName):?>
	BX.localStorage.set("eshop_user_name", "<?=CUtil::JSEscape($userName)?>", 604800);
	<?else:?>
	BX.localStorage.remove("eshop_user_name");
	<?endif?>

	<?if (isset($_REQUEST["backurl"]) && strlen($_REQUEST["backurl"])>0 && preg_match('#^/\w#', $_REQUEST["backurl"])):?>
	document.location.href = "<?=CUtil::JSEscape($_REQUEST["backurl"])?>";
	<?endif?>
</script>
<?
if (is_string($_REQUEST["backurl"]) && strpos($_REQUEST["backurl"], "/") === 0)
{
	LocalRedirect($_REQUEST["backurl"]);
}

$APPLICATION->SetTitle("Р’С…РѕРґ РЅР° СЃР°Р№С‚");
?>
<p class="notetext">Р’С‹ Р·Р°СЂРµРіРёСЃС‚СЂРёСЂРѕРІР°РЅС‹ Рё СѓСЃРїРµС€РЅРѕ Р°РІС‚РѕСЂРёР·РѕРІР°Р»РёСЃСЊ.</p>

<p><a href="#SITE_DIR#">Р’РµСЂРЅСѓС‚СЊСЃСЏ РЅР° РіР»Р°РІРЅСѓСЋ СЃС‚СЂР°РЅРёС†Сѓ</a></p>
<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>