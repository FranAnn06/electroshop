<?if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die(); ?>

    <!-- aside Widget -->
    <div class="aside">
    <h3 class="aside-title">Top selling</h3>
<?foreach($arResult["ITEMS"] as $arItem):?>
    <div class="product-widget">
        <div class="product-img">
            <img src="<?=$arItem['PREVIEW_PICTURE'] ['SRC']?>" alt="">
        </div>
        <div class="product-body">
            <p class="product-category">Category</p>
            <h3 class="product-name"><a href="<?=$arItem['DETAIL_PAGE_URL']?>"><?=$arItem['PREVIEW_PICTURE'] ['TITLE']?></a></h3>
            <h4 class="product-price"><?=$arItem['PRICES'] ['Price'] ['VALUE']?><del class="product-old-price"><?=$arItem['PRICES'] ['Price'] ['VALUE']?></del></h4>
        </div>
    </div>
<?endforeach;?>
    </div>
