<?if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true) die();

?>

<?if(count($arResult["ERRORS"]) > 0):?>
	<?foreach($arResult["ERRORS"] as $strError):?>
		<p class="errortext"><?echo $strError?></p>
	<?endforeach?>
	<?$this->setFrameMode(false);?>
<?elseif(count($arResult["RUBRICS"]) <= 0):?>
	<p class="errortext"><?echo GetMessage("CT_BSS_NO_RUBRICS_FOUND")?></p>
	<?$this->setFrameMode(false);?>
<?else:?>
	<?$frame=$this->createFrame()->begin();?>
	<?if($arResult["MESSAGE"]):?>
		<p class="notetext"><?echo $arResult["MESSAGE"]?></p>
	<?endif?>

	<form method="POST" action="<?echo $arResult["FORM_ACTION"]?>">

					<?echo bitrix_sessid_post();?>
					<input type="submit" name="Update" value="<?echo GetMessage("CT_BSS_FORM_BUTTON")?>">




	</form>
	<?$frame->beginStub();?>
	<form method="POST" action="<?echo $arResult["FORM_ACTION"]?>">


			
					<input type="submit" name="Update" value="<?echo GetMessage("CT_BSS_FORM_BUTTON")?>">

	<?$frame->end();?>
<?endif?>
