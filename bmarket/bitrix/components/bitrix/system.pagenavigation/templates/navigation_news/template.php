<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();
/** @var array $arParams */
/** @var array $arResult */
/** @global CMain $APPLICATION */
/** @global CUser $USER */
/** @global CDatabase $DB */
/** @var CBitrixComponentTemplate $this */
/** @var string $templateName */
/** @var string $templateFile */
/** @var string $templateFolder */
/** @var string $componentPath */
/** @var CBitrixComponent $component */
$this->setFrameMode(true);


$strNavQueryString = ($arResult["NavQueryString"] != "" ? $arResult["NavQueryString"]."&amp;" : "");
$strNavQueryStringFull = ($arResult["NavQueryString"] != "" ? "?".$arResult["NavQueryString"] : "");
?>
<!-- SECTION -->
<div class="section">
    <!-- container -->
    <div class="container">
        <!-- row -->
        <div class="row">
<div id="store" class="col-md-9">
<div class="store-filter clearfix">
    <span class="store-qty">Showing <?=$arResult['NavFirstRecordShow']."-".$arResult['NavLastRecordShow']?> products</span>
    <ul class="store-pagination">

        <?for ($PAGE_NUMBER=$arResult['nStartPage']; $PAGE_NUMBER<=$arResult['nEndPage']; $PAGE_NUMBER++):?>
            <?if ($PAGE_NUMBER == $arResult['NavPageNomer']):?>
                <li class="active"><?=$PAGE_NUMBER?></li>
            <?else:?>
                <li><a href="<?=$arResult['sUrlPath']?>?<?=$strNavQueryString?>PAGEN_<?=$arResult["NavNum"]?>=<?=$PAGE_NUMBER?>"><?=$PAGE_NUMBER?></a></li>
            <?endif;?>
        <?endfor;?>


        <?if ($arResult['NavPageNomer'] < $arResult['NavPageCount']):?>
             <li><a href="<?=$arResult['sUrlPath']?>?<?=$strNavQueryString?>PAGEN_<?=$arResult["NavNum"]?>=<?=($arResult["NavPageNomer"]+1)?>"><i class="fa fa-angle-right"></i></a></li>

        <?else:?>
            <li><i class="fa fa-angle-right"></i></li>
        <?endif;?>

    </ul>
</div>
</div>
<!-- /STORE -->
</div>
<!-- /row -->
</div>
<!-- /container -->
</div>
<!-- /SECTION -->
