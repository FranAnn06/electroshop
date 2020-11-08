<?
include_once($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/main/include/urlrewrite.php');

CHTTP::SetStatus("404 Not Found");
@define("ERROR_404","Y");
define("HIDE_SIDEBAR", true);

require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");

$APPLICATION->SetTitle("РЎС‚СЂР°РЅРёС†Р° РЅРµ РЅР°Р№РґРµРЅР°");?>

	<div class="bx-404-container">
		<div class="bx-404-block"><img src="<?=SITE_DIR?>images/404.png" alt=""></div>
		<div class="bx-404-text-block">РќРµРїСЂР°РІРёР»СЊРЅРѕ РЅР°Р±СЂР°РЅ Р°РґСЂРµСЃ, <br>РёР»Рё С‚Р°РєРѕР№ СЃС‚СЂР°РЅРёС†С‹ РЅР° СЃР°Р№С‚Рµ Р±РѕР»СЊС€Рµ РЅРµ СЃСѓС‰РµСЃС‚РІСѓРµС‚.</div>
		<div class="">Р’РµСЂРЅРёС‚РµСЃСЊ РЅР° <a href="<?=SITE_DIR?>">РіР»Р°РІРЅСѓСЋ</a> РёР»Рё РІРѕСЃРїРѕР»СЊР·СѓР№С‚РµСЃСЊ РєР°СЂС‚РѕР№ СЃР°Р№С‚Р°.</div>
	</div>
	<div class="map-columns row">
		<div class="col-sm-10 col-sm-offset-1">
			<div class="bx-maps-title">РљР°СЂС‚Р° СЃР°Р№С‚Р°:</div>
		</div>
	</div>

	<div class="col-sm-offset-2 col-sm-4">
		<div class="bx-map-title"><i class="fa fa-leanpub"></i> РљР°С‚Р°Р»РѕРі</div>
		<?$APPLICATION->IncludeComponent(
			"bitrix:catalog.section.list",
			"tree",
			array(
				"COMPONENT_TEMPLATE" => "tree",
				"IBLOCK_TYPE" => "catalog",
				"IBLOCK_ID" => "2",
				"SECTION_ID" => $_REQUEST["SECTION_ID"],
				"SECTION_CODE" => "",
				"COUNT_ELEMENTS" => "Y",
				"TOP_DEPTH" => "2",
				"SECTION_FIELDS" => array(
					0 => "",
					1 => "",
				),
				"SECTION_USER_FIELDS" => array(
					0 => "",
					1 => "",
				),
				"SECTION_URL" => "",
				"CACHE_TYPE" => "A",
				"CACHE_TIME" => "36000000",
				"CACHE_GROUPS" => "Y",
				"ADD_SECTIONS_CHAIN" => "Y"
			),
			false
		);
		?>
	</div>

	<div class="col-sm-offset-1 col-sm-4">
		<div class="bx-map-title"><i class="fa fa-info-circle"></i> Рћ РјР°РіР°Р·РёРЅРµ</div>
		<?
		$APPLICATION->IncludeComponent(
			"bitrix:main.map",
			".default",
			array(
				"CACHE_TYPE" => "A",
				"CACHE_TIME" => "36000000",
				"SET_TITLE" => "N",
				"LEVEL" => "3",
				"COL_NUM" => "2",
				"SHOW_DESCRIPTION" => "Y",
				"COMPONENT_TEMPLATE" => ".default"
			),
			false
		);?>
	</div>
<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>