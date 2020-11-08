<? if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true) die();
?>

<div class="section">
    <div class="container">
        <div class="row">
            <div class="col-md-5 col-md-push-2">

                <div id="product-main-img">

                    <div class="product-preview">
                        <img border="0" src="<?=$arResult["PREVIEW_PICTURE"]["SRC"]?>" width="200" />

                    </div>

                    <?if(count($arResult["MORE_PHOTO"])>0):?>
                    <?foreach($arResult["MORE_PHOTO"] as $PHOTO):?>
                    <div class="product-preview">
                        <img border="0" src="<?=$PHOTO["SRC"]?>" width="200" />

                    </div>
                     <?endforeach?>
                        <?endif?>
                </div>
            </div>
            <div class="col-md-2  col-md-pull-5">
                <div id="product-imgs">
                    <div class="product-preview">
                        <img border="0" src="<?=$arResult["PREVIEW_PICTURE"]["SRC"]?>" width="200" />

                    </div>

                    <?if(count($arResult["MORE_PHOTO"])>0):?>
                        <?foreach($arResult["MORE_PHOTO"] as $PHOTO):?>
                            <div class="product-preview">
                                <img border="0" src="<?=$PHOTO["SRC"]?>" width="200" />

                            </div>
                        <?endforeach?>
                    <?endif?>
                </div>
            </div>

            <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
            <script type="text/javascript">
                $(document).ready(function () {
                    $(".product a").click(function () {
                        var parent=$(this).parent().parent();
                        var id=parent.find('button').attr('id');
                        var count=parent.find('input').val();
                        $.ajax({
                            type:'POST',
                            url: '/categories/addBusketDetail.php',
                            target: '#container_basket',
                            data: { good_id:id,countе:count},
                            success: function (data) {
                                alert(data);

                            }
                        })
                        return false;
                    })
                })

            </script>
            <div class="col-md-5">
                <div class="product-details">
                    <h2 class="product-name"><?=$arResult["NAME"]?></h2>
                    <div>
                        <div class="product-rating">
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                        </div>
                        <a class="review-link" href="#">10 Review(s) | Add your review</a>
                    </div>
                    <div>

                        <h3 class="product-price"><?=$arResult['PRICES']['Price']['PRINT_VALUE']?></h3>
                        <p><?=$arResult['DETAIL_TEXT']?></p>
                        <?if(($arResult['PRODUCT']['QUANTITY'])<=0):?>
                        <span class="product-available">NO Stock <?=$arResult['PRODUCT']['QUANTITY']?> шт.</span>
                        <?else: ?>

                        <span class="product-available">In Stock <?=$arResult['PRODUCT']['QUANTITY']?> шт.</span>
                            <div class="add-to-cart">
                                <div class="product">
                                    <div class="qty-label">
                                        Qty
                                        <div class="input-number">

                                            <input type="number" value="1" />
                                            <span class="qty-up">+</span>
                                            <span class="qty-down">-</span>
                                        </div>
                                    </div>

                                    <button class="add-to-cart-btn" id="<?=$arResult['ID']?>"><a href="#"><i class="fa fa-shopping-cart"></i> add to cart</a></button>
                                </div>
                            </div>
                        <? endif;?>
                    </div>





                </div>
            </div>

            <div class="col-md-12">
                <div id="product-tab">

                    <ul class="tab-nav">
                        <li class="active"><a data-toggle="tab" href="#tab1">Description</a></li>
                        <li><a data-toggle="tab" href="#tab3">Reviews</a></li>
                    </ul>

                    <div class="tab-content">
                        <!-- tab1  -->
                        <div id="tab1" class="tab-pane fade in active">
                            <div class="row">
                                <div class="col-md-12">

                                    <p style="float:left;"><?=$arResult['PROPERTIES']['ATT_PROCESSOR']['NAME']?></p>
                                    <p align="right"><?=$arResult['PROPERTIES']['ATT_PROCESSOR']['VALUE']?></p>

                                    <p style="float:left; "><?=$arResult['PROPERTIES']['ATT_RAM']['NAME']?></p>
                                    <p align="right"><?=$arResult['PROPERTIES']['ATT_RAM']['VALUE']?></p>

                                    <p style="float:left;"><?=$arResult['PROPERTIES']['ATT_HD']['NAME']?></p>
                                    <p align="right"><?=$arResult['PROPERTIES']['ATT_HD']['VALUE']?></p>

                                    <p style="float:left;"><?=$arResult['PROPERTIES']['ATT_PRINT']['NAME']?></p>
                                    <p align="right"><?=$arResult['PROPERTIES']['ATT_PRINT']['VALUE']?></p>

                                    <p style="float:left;"><?=$arResult['PROPERTIES']['ATT_COLOR']['NAME']?></p>
                                    <p align="right"><?=$arResult['PROPERTIES']['ATT_COLOR']['VALUE']?></p>

                                    <p style="float:left;"><?=$arResult['PROPERTIES']['ATT_DIAGONAL']['NAME']?></p>
                                    <p align="right"><?=$arResult['PROPERTIES']['ATT_DIAGONAL']['VALUE']?></p>

                                </div>
                            </div>
                        </div>

                        <div id="tab3" class="tab-pane fade in">
                            <div class="row">
                                <?
                                GLOBAL $arFilter;
                                $arFilter = array(
                                    'PROPERTY_20' => $arResult['ID'],
                                );?>
                                <?$APPLICATION->IncludeComponent(
                                    "bitrix:news.list",
                                    "",
                                    Array(
                                        "ACTIVE_DATE_FORMAT" => "d.M.Y g:i A",
                                        "ADD_SECTIONS_CHAIN" => "N",
                                        "AJAX_MODE" => "Y",
                                        "AJAX_OPTION_ADDITIONAL" => "",
                                        "AJAX_OPTION_HISTORY" => "N",
                                        "AJAX_OPTION_JUMP" => "N",
                                        "AJAX_OPTION_STYLE" => "Y",
                                        "CACHE_FILTER" => "N",
                                        "CACHE_GROUPS" => "Y",
                                        "CACHE_TIME" => "36000000",
                                        "CACHE_TYPE" => "A",
                                        "CHECK_DATES" => "Y",
                                        "DETAIL_URL" => "",
                                        "DISPLAY_BOTTOM_PAGER" => "Y",
                                        "DISPLAY_TOP_PAGER" => "N",
                                        "FIELD_CODE" => array("", ""),
                                        "FILTER_NAME" => "arFilter",
                                        "HIDE_LINK_WHEN_NO_DETAIL" => "N",
                                        "IBLOCK_ID" => "3",
                                        "IBLOCK_TYPE" => "Catalog",
                                        "INCLUDE_IBLOCK_INTO_CHAIN" => "N",
                                        "INCLUDE_SUBSECTIONS" => "Y",
                                        "MESSAGE_404" => "",
                                        "NEWS_COUNT" => "3",
                                        "PAGER_BASE_LINK_ENABLE" => "N",
                                        "PAGER_DESC_NUMBERING" => "N",
                                        "PAGER_DESC_NUMBERING_CACHE_TIME" => "36000",
                                        "PAGER_SHOW_ALL" => "N",
                                        "PAGER_SHOW_ALWAYS" => "N",
                                        "PAGER_TEMPLATE" => ".default",
                                        "PAGER_TITLE" => "Новости",
                                        "PARENT_SECTION" => "",
                                        "PARENT_SECTION_CODE" => "",
                                        "PREVIEW_TRUNCATE_LEN" => "",
                                        "PROPERTY_CODE" => array("Rating","ID_ELEMENT", ""),
                                        "SET_BROWSER_TITLE" => "N",
                                        "SET_LAST_MODIFIED" => "N",
                                        "SET_META_DESCRIPTION" => "Y",
                                        "SET_META_KEYWORDS" => "Y",
                                        "SET_STATUS_404" => "N",
                                        "SET_TITLE" => "N",
                                        "SHOW_404" => "N",
                                        "SORT_BY1" => "ACTIVE_FROM",
                                        "SORT_BY2" => "SORT",
                                        "SORT_ORDER1" => "DESC",
                                        "SORT_ORDER2" => "ASC",
                                        "STRICT_SECTION_CHECK" => "N"
                                    )
                                );?>
                                <div class="col-md-4">
                                    <div id="review-form">
                                        <form id="comment" class="review-form">
                                            <input id="name" class="input" type="text" name="name" placeholder="Your Name">
                                            <input id="email" class="input" type="email" name="email" placeholder="Your Email" required>
                                            <textarea id="text" class="input" name="text" placeholder="Your Review"></textarea>
                                            <input id="ElemID" class="input" name="ElemID" type="hidden" value="<?=$arResult['ID']?>">
                                            <div class="input-rating">
                                                <span>Your Rating: </span>
                                                <div class="stars">
                                                    <input id="star5" name="rating" value="5" type="radio"><label for="star5"></label>
                                                    <input id="star4" name="rating" value="4" type="radio"><label for="star4"></label>
                                                    <input id="star3" name="rating" value="3" type="radio"><label for="star3"></label>
                                                    <input id="star2" name="rating" value="2" type="radio"><label for="star2"></label>
                                                    <input id="star1" name="rating" value="1" type="radio"><label for="star1"></label>
                                                </div>
                                            </div>
                                            <button type="submit" class="primary-btn">Submit</button>
                                        </form>
                                    </div>
                                </div>
                                <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>

                                <script type="text/javascript">
                                    $(document).on('submit', '#comment', function (e) {
                                        e.preventDefault();
                                        let comment_data = $('#comment').serialize();
                                        $.ajax({
                                            type: 'POST',
                                            url: '/categories/ajax_comment.php',
                                            data: comment_data,
                                            success: function () {
                                                alert('ok');
                                            }
                                        })

                                    })

                                </script>

                            </div>
                        </div>
                        <!-- /tab3  -->
                    </div>
                    <!-- /product tab content  -->
                </div>
            </div>
            <!-- /product tab -->
            <?
            $GLOBALS['arFilter'] = array('!ID'=>$arResult['ID']);?>
            <?$APPLICATION->IncludeComponent(
                "bitrix:catalog.section",
                "recomend_catalog",
                Array(
                    "ACTION_VARIABLE" => "action",
                    "ADD_PICT_PROP" => "-",
                    "ADD_PROPERTIES_TO_BASKET" => "Y",
                    "ADD_SECTIONS_CHAIN" => "N",
                    "ADD_TO_BASKET_ACTION" => "ADD",
                    "AJAX_MODE" => "N",
                    "AJAX_OPTION_ADDITIONAL" => "",
                    "AJAX_OPTION_HISTORY" => "N",
                    "AJAX_OPTION_JUMP" => "N",
                    "AJAX_OPTION_STYLE" => "Y",
                    "BACKGROUND_IMAGE" => "-",
                    "BASKET_URL" => "/cart.php/",
                    "BROWSER_TITLE" => "-",
                    "CACHE_FILTER" => "N",
                    "CACHE_GROUPS" => "Y",
                    "CACHE_TIME" => "36000000",
                    "CACHE_TYPE" => "A",
                    "COMPATIBLE_MODE" => "Y",
                    "CONVERT_CURRENCY" => "N",
                    "CUSTOM_FILTER" => "{\"CLASS_ID\":\"CondGroup\",\"DATA\":{\"All\":\"AND\",\"True\":\"True\"},\"CHILDREN\":[]}",
                    "DETAIL_URL" => "/categories/detail.php/?ELEMENT_ID=#ELEMENT_ID#/",
                    "DISABLE_INIT_JS_IN_COMPONENT" => "N",
                    "DISPLAY_BOTTOM_PAGER" => "N",
                    "DISPLAY_COMPARE" => "N",
                    "DISPLAY_TOP_PAGER" => "N",
                    "ELEMENT_SORT_FIELD" => "sort",
                    "ELEMENT_SORT_FIELD2" => "id",
                    "ELEMENT_SORT_ORDER" => "asc",
                    "ELEMENT_SORT_ORDER2" => "desc",
                    "ENLARGE_PRODUCT" => "STRICT",
                    "FILTER_NAME" => "arFilter",
                    "HIDE_NOT_AVAILABLE" => "N",
                    "HIDE_NOT_AVAILABLE_OFFERS" => "N",
                    "IBLOCK_ID" => "1",
                    "IBLOCK_TYPE" => "Catalog",
                    "INCLUDE_SUBSECTIONS" => "Y",
                    "LABEL_PROP" => array(),
                    "LAZY_LOAD" => "N",
                    "LINE_ELEMENT_COUNT" => "4",
                    "LOAD_ON_SCROLL" => "N",
                    "MESSAGE_404" => "",
                    "MESS_BTN_ADD_TO_BASKET" => "В корзину",
                    "MESS_BTN_BUY" => "Купить",
                    "MESS_BTN_DETAIL" => "Подробнее",
                    "MESS_BTN_SUBSCRIBE" => "Подписаться",
                    "MESS_NOT_AVAILABLE" => "Нет в наличии",
                    "META_DESCRIPTION" => "-",
                    "META_KEYWORDS" => "-",
                    "OFFERS_FIELD_CODE" => array("",""),
                    "OFFERS_LIMIT" => "4",
                    "OFFERS_SORT_FIELD" => "sort",
                    "OFFERS_SORT_FIELD2" => "id",
                    "OFFERS_SORT_ORDER" => "asc",
                    "OFFERS_SORT_ORDER2" => "desc",
                    "PAGER_BASE_LINK_ENABLE" => "N",
                    "PAGER_DESC_NUMBERING" => "N",
                    "PAGER_DESC_NUMBERING_CACHE_TIME" => "36000",
                    "PAGER_SHOW_ALL" => "N",
                    "PAGER_SHOW_ALWAYS" => "N",
                    "PAGER_TEMPLATE" => ".default",
                    "PAGER_TITLE" => "Товары",
                    "PAGE_ELEMENT_COUNT" => "4",
                    "PARTIAL_PRODUCT_PROPERTIES" => "N",
                    "PRICE_CODE" => array("Price"),
                    "PRICE_VAT_INCLUDE" => "Y",
                    "PRODUCT_BLOCKS_ORDER" => "price,props,sku,quantityLimit,quantity,buttons",
                    "PRODUCT_DISPLAY_MODE" => "N",
                    "PRODUCT_ID_VARIABLE" => "id",
                    "PRODUCT_PROPS_VARIABLE" => "prop",
                    "PRODUCT_QUANTITY_VARIABLE" => "quantity",
                    "PRODUCT_ROW_VARIANTS" => "[{'VARIANT':'3','BIG_DATA':false}]",
                    "PRODUCT_SUBSCRIPTION" => "Y",
                    "RCM_PROD_ID" => $_REQUEST["PRODUCT_ID"],
                    "RCM_TYPE" => "personal",
                    "SECTION_CODE" => "",
                    "SECTION_CODE_PATH" => "",
                    "SECTION_ID" => $arResult['SECTION']['ID'],
                    "SECTION_ID_VARIABLE" => "SECTION_ID",
                    "SECTION_URL" => "",
                    "SECTION_USER_FIELDS" => array("",""),
                    "SEF_MODE" => "Y",
                    "SEF_RULE" => "",
                    "SET_BROWSER_TITLE" => "Y",
                    "SET_LAST_MODIFIED" => "N",
                    "SET_META_DESCRIPTION" => "Y",
                    "SET_META_KEYWORDS" => "Y",
                    "SET_STATUS_404" => "Y",
                    "SET_TITLE" => "Y",
                    "SHOW_404" => "N",
                    "SHOW_ALL_WO_SECTION" => "N",
                    "SHOW_CLOSE_POPUP" => "N",
                    "SHOW_DISCOUNT_PERCENT" => "N",
                    "SHOW_FROM_SECTION" => "N",
                    "SHOW_MAX_QUANTITY" => "N",
                    "SHOW_OLD_PRICE" => "N",
                    "SHOW_PRICE_COUNT" => "1",
                    "SHOW_SLIDER" => "Y",
                    "SLIDER_INTERVAL" => "3000",
                    "SLIDER_PROGRESS" => "N",
                    "TEMPLATE_THEME" => "blue",
                    "USE_ENHANCED_ECOMMERCE" => "N",
                    "USE_MAIN_ELEMENT_SECTION" => "N",
                    "USE_PRICE_COUNT" => "N",
                    "USE_PRODUCT_QUANTITY" => "N"
                )
            );?>


        </div>
    </div>
</div>
