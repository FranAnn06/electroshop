<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();
?>
<div style="border-top: 2px solid #E4E7ED;" >
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
    <div  class="container">
        <!-- row -->
        <div  class="row">
            <div class="col-md-12">
<div class="newsletter">
    <p   style="margin: revert">Sign Up for the <strong>NEWSLETTER</strong></p>
    <form method="POST" action="<?echo $arResult["FORM_ACTION"]?>">
        <?foreach($arResult["RUBRICS"] as $arRubric):?>
            <?$arRubric["CHECKED"] = "checked";?>
            <input name="RUB_ID[]" value="<?echo $arRubric["ID"]?>" id="RUB_<?echo $arRubric["ID"]?>" type="hidden"<?if($arRubric["CHECKED"]) echo "checked";?>>
        <?endforeach?>
        <br>
        <?echo bitrix_sessid_post();?>
        <input class="input" type="email" name="input" placeholder="Enter Your Email" value="<?=$arResult["EMAIL"]?>" title="<?=GetMessage("subscr_form_email_title")?>" />
<!--        <input id="newsletter-btn" class="newsletter-btn" type="submit" name="Update" value="Subscribe">-->
        <button name="Update" class="newsletter-btn"><i style="position: relative;
                                                        right: 5px;" class="fa fa-envelope"></i>Subscribe</button>
    </form>
</div>
            </div>
        </div>
    </div>
    <?$frame->beginStub();?>
    <div  class="container">
        <!-- row -->
        <div class="row">
            <div class="col-md-12">
                <div class="newsletter">
                    <p style="margin: revert">Sign Up for the <strong>NEWSLETTER</strong></p>
    <form method="POST" action="<?echo $arResult["FORM_ACTION"]?>">
        <?foreach($arResult["RUBRICS"] as $arRubric):?>
            <?$arRubric["CHECKED"] = "checked";?>
            <input name="RUB_ID[]" value="<?echo $arRubric["ID"]?>" id="RUB_<?echo $arRubric["ID"]?>" type="hidden" <?if($arRubric["CHECKED"]) echo "checked";?>>

        <?endforeach?>
        <input class="input" type="email" name="input" placeholder="Enter Your Email" value="<?=$arResult["EMAIL"]?>" title="<?=GetMessage("subscr_form_email_title")?>" />
<!--            <input id="newsletter-btn" class="newsletter-btn"  type="submit" name="Update" value="Subscribe">-->
        <button name="Update" class="newsletter-btn"><i style="position: relative;
                                                        right: 5px;"class="fa fa-envelope"></i>Subscribe</button>

    </form>
                </div>
            </div>
        </div>
    </div>
    <?$frame->end();?>
<?endif?>
</div>