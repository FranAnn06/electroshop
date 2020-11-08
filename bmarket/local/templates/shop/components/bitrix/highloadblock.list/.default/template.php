<?if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die(); ?>
<!-- SECTION -->
<div class="section">
    <!-- container -->
    <div class="container">
        <!-- row -->
        <? foreach ($arResult["rows"] as $arItem ): ?>
            <!-- shop -->
            <div class="col-md-4 col-xs-6">
                <div class="shop">
                    <div class="shop-img">
                        <img src="<?= $arItem['UF_PHOTO'] ?>" alt="">
                    </div>
                    <div class="shop-body">
                        <h3><?=$arItem['UF_NAME'] ?></h3>
                        <a href="<?=$arItem['UF_URL'] ?>" class="cta-btn">Shop now <i class="fa fa-arrow-circle-right"></i></a>
                    </div>
                </div>
            </div>
            <!-- </shop -->
            <? endforeach; ?>

        </div>
        <!-- /row -->
    </div>
    <!-- /container -->
</div>
<!-- /SECTION -->
<?// prent($arResult, 1,1);?>
