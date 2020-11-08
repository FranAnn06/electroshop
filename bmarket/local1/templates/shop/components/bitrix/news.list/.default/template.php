<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();?>
<?php //$productID=intval ($_POST['ElemID']);
//echo $productID;?>
<?php //prent($arResult,1,1); ?>

<div class="col-md-8">
    <div id="reviews">
        <ul class="reviews">
            <?foreach ($arResult['ITEMS'] as $arItem):?>
<!--            --><?// if($arItem["PROPERTIES"]["ID_ELEMENT"]["VALUE"]==$productID): ?>
            <li>
                <div class="review-heading">
                    <h5 class="name"><?=$arItem['NAME']?></h5>
                    <p class="date"><?=$arItem['DISPLAY_ACTIVE_FROM']?></p>
                    <div class="review-rating">
                <? if($arItem['PROPERTIES']['Rating']['VALUE']==1):?>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star-o empty"></i>
                        <i class="fa fa-star-o empty"></i>
                        <i class="fa fa-star-o empty"></i>
                        <i class="fa fa-star-o empty"></i>
                        <?endif; ?>
                <? if($arItem['PROPERTIES']['Rating']['VALUE']==2):?>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star-o empty"></i>
                    <i class="fa fa-star-o empty"></i>
                    <i class="fa fa-star-o empty"></i>
                <?endif; ?>
                <? if($arItem['PROPERTIES']['Rating']['VALUE']==3):?>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star-o empty"></i>
                    <i class="fa fa-star-o empty"></i>
                <?endif; ?>
                <? if($arItem['PROPERTIES']['Rating']['VALUE']==4):?>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star-o empty"></i>
                <?endif; ?>
                <? if($arItem['PROPERTIES']['Rating']['VALUE']==5):?>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                <?endif; ?>
                    </div>
                </div>
                <div class="review-body">
                    <p><?=$arItem['PREVIEW_TEXT']?></p>
                </div>
                <p style="float: left; font-size: 8pt" ><?=$arItem['PROPERTIES']['Upd']['VALUE']?></p>
                <p style="float: left; margin-left: 20px; font-size: 8pt"><?=$arItem['TIMESTAMP_X']?></p>

            </li>
<!--                --><?// endif;?>
            <? endforeach;?>

        </ul>

    </div>
</div>
