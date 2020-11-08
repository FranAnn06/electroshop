<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();
?>
<div class="subscribe-form"  id="subscribe-form">
    <?
    $frame = $this->createFrame("subscribe-form", false)->begin();
    ?>
    <form action="<?=$arResult["FORM_ACTION"]?>">
            <input type="text" name="sf_EMAIL" size="20" value="<?=$arResult["EMAIL"]?>" title="<?=GetMessage("subscr_form_email_title")?>" />

    </form>
    <?
    $frame->beginStub();
    ?>
    <form action="<?=$arResult["FORM_ACTION"]?>">
              <input type="text" name="sf_EMAIL" size="20" value="" title="<?=GetMessage("subscr_form_email_title")?>" />

    </form>
    <?
    $frame->end();
    ?>
</div>

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
                    <?foreach($arResult["RUBRICS"] as $arRubric):?>
                        <?$arRubric["CHECKED"] = "checked";?>
                        <input name="RUB_ID[]" value="<?echo $arRubric["ID"]?>" id="RUB_<?echo $arRubric["ID"]?>" type="hidden"<?if($arRubric["CHECKED"]) echo "checked";?>>


                    <?endforeach?>
                    <br>
                    <?echo bitrix_sessid_post();?>
                    <input type="submit" name="Update" value="<?echo GetMessage("CT_BSS_FORM_BUTTON")?>">

    </form>
    <?$frame->beginStub();?>
    <form method="POST" action="<?echo $arResult["FORM_ACTION"]?>">
                    <?foreach($arResult["RUBRICS"] as $arRubric):?>
                        <?$arRubric["CHECKED"] = "checked";?>
                        <input name="RUB_ID[]" value="<?echo $arRubric["ID"]?>" id="RUB_<?echo $arRubric["ID"]?>" type="hidden" <?if($arRubric["CHECKED"]) echo "checked";?>>

                    <?endforeach?>
                    <input type="submit" name="Update" value="<?echo GetMessage("CT_BSS_FORM_BUTTON")?>">

    </form>
    <?$frame->end();?>
<?endif?>
