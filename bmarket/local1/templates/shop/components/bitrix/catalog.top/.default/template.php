<?if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die(); ?>
<?php if($arResult['ORIGINAL_PARAMETERS']['FILTER_NAME'] =="New"):?>
    <!-- SECTION -->
    <div class="section">
        <!-- container -->
        <div class="container">
            <!-- row -->
            <div class="row">

                <!-- section title -->
                <div class="col-md-12">
                    <div class="section-title">
                        <h3 class="title">New Products</h3>
                    </div>
                </div>
                <!-- /section title -->

                <!-- Products tab & slick -->
                <div class="col-md-12">
                    <div class="row">
                        <div class="products-tabs">
                            <!-- tab -->
                            <div id="tab1" class="tab-pane active">
                                <div class="products-slick" data-nav="#slick-nav-1">
                                    <!-- product -->
                                    <?foreach($arResult["ITEMS"] as $arItem):?>
                                    <div class="product">
                                        <div class="product-img">
                                            <img src="<?=$arItem['PREVIEW_PICTURE'] ['SRC']?>"alt="">
                                        </div>
                                        <div class="product-body">
                                            <p class="product-category">Category</p>
                                            <h3 class="product-name"><a href="#"><?=$arItem['PREVIEW_PICTURE'] ['TITLE']?></a></h3>
                                            <h4 class="product-price"><?=$arItem['PRICES'] ['Price'] ['VALUE']?><del class="product-old-price"><?=$arItem['PRICES'] ['Price'] ['VALUE']?></del></h4>
                                            <div class="product-rating">
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                            </div>
                                        </div>
                                        <div class="add-to-cart">
                                            <button id="<?$arItem['ID']?>" type="submit" class="add-to-cart-btn"><i class="fa fa-shopping-cart"></i>add to cart</button>
                                        </div>
                                    </div>
                                    <!-- /product -->
                                    <?endforeach;?>
                                </div>
                                <div id="slick-nav-1" class="products-slick-nav"></div>
                            </div>
                            <!-- /tab -->
                        </div>
                    </div>
                </div>
                <!-- Products tab & slick -->
            </div>
            <!-- /row -->
        </div>
        <!-- /container -->
    </div>
    <!-- /SECTION -->
<?php endif;?>
  <?php if($arResult['ORIGINAL_PARAMETERS']['FILTER_NAME'] =="Quantity"):?>

    <!-- SECTION -->
    <div class="section">
        <!-- container -->
        <div class="container">
            <!-- row -->
            <div class="row">

                <!-- section title -->
                <div class="col-md-12">
                    <div class="section-title">
                        <h3 class="title">Top selling</h3>
                    </div>
                </div>
                <!-- /section title -->

                <!-- Products tab & slick -->
                <div class="col-md-12">
                    <div class="row">
                        <div class="products-tabs">
                            <!-- tab -->
                            <div id="tab2" class="tab-pane fade in active">
                                <div class="products-slick" data-nav="#slick-nav-2">
                                    <!-- product -->
                                    <?foreach($arResult["ITEMS"] as $arItem):?>
                                        <div class="product">
                                            <div class="product-img">
                                                <img src="<?=$arItem['PREVIEW_PICTURE'] ['SRC']?>" alt="">
                                            </div>
                                            <div class="product-body">
                                                <p class="product-category">Category</p>
                                                <h3 class="product-name"><a href="#"><?=$arItem['PREVIEW_PICTURE'] ['TITLE']?></a></h3>
                                                <h4 class="product-price"><?=$arItem['PRICES'] ['Price'] ['VALUE']?><del class="product-old-price"><?=$arItem['PRICES'] ['Price'] ['VALUE']?></del></h4>
                                                <div class="product-rating">
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                </div>
                                            </div>
                                            <div class="add-to-cart">
                                                <button class="add-to-cart-btn"><i class="fa fa-shopping-cart"></i> add to cart</button>
                                            </div>
                                        </div>
                                        <!-- /product -->
                                    <?endforeach;?>
                                </div>
                                <div id="slick-nav-2" class="products-slick-nav"></div>
                            </div>
                            <!-- /tab -->
                        </div>
                    </div>
                </div>
                <!-- /Products tab & slick -->
            </div>
            <!-- /row -->
        </div>
        <!-- /container -->
    </div>
<?php endif;?>

    <!-- /SECTION -->
<?//prent($arResult, 1,1);?>