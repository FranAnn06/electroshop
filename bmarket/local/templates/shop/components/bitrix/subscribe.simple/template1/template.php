<?if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true) die();

?>


	<form method="POST" action="<?echo $arResult["FORM_ACTION"]?>">
   <?foreach($arResult["RUBRICS"] as $arRubric):?>
                        <input name="RUB_ID[]" value="<?echo $arRubric["ID"]?>" id="RUB_<?echo $arRubric["ID"]?>" type="checkbox" <?if($arRubric["CHECKED"]) echo "checked";?>><label for="RUB_<?echo $arRubric["ID"]?>"><?echo $arRubric["NAME"]?></label><br>
                    <?endforeach?>
					<?echo bitrix_sessid_post();?>
					<input type="submit" name="Update" value="<?echo GetMessage("CT_BSS_FORM_BUTTON")?>">

	<?$frame->beginStub();?>
	<form method="POST" action="<?echo $arResult["FORM_ACTION"]?>">
 <?foreach($arResult["RUBRICS"] as $arRubric):?>
                        <input name="RUB_ID[]" value="<?echo $arRubric["ID"]?>" id="RUB_<?echo $arRubric["ID"]?>" type="checkbox"><label for="RUB_<?echo $arRubric["ID"]?>"><?echo $arRubric["NAME"]?></label><br>
                    <?endforeach?>

					<input type="submit" name="Update" value="<?echo GetMessage("CT_BSS_FORM_BUTTON")?>">
				
	<?$frame->end();?>
<?endif?>
