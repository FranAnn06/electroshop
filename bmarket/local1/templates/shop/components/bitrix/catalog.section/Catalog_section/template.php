<? if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true) die();
$this->setFrameMode(true);?>
<?if($arParams["DISPLAY_TOP_PAGER"]):?>
    <?=$arResult["NAV_STRING"]?><br />
<?endif;?>

<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>

<script type="text/javascript">
    $(document).ready(function () {
        $(".good a").click(function () {
            var parent=$(this).parent().parent();
            var id=parent.find('button').attr('id');

            $.ajax({
                type:'POST',
                url: 'addCart.php',
                target: '#container_basket',
                data: { good_id:id},
                success: function (data) {
                    alert("Товар добавлен");

                }
            })
            return false;
        })
    })

</script>
<div class="store-filter clearfix">
    <div class="store-sort">
        <label>
            Sort By:
            <select class="input-select" onchange="window.location.href=this.options[this.selectedIndex].value">
                <option VALUE="" hidden disabled selected>По цене</option>
                <option VALUE="?sort=catalog_PRICE_1&method=asc" <?if ($_GET["method"] == "asc"):?>selected<?endif;?>>по возрастанию</option>
                <option VALUE="?sort=catalog_PRICE_1&method=desc"<?if ($_GET["method"] == "desc"):?>selected<?endif;?> >по убыванию</option>
            </select>
        </label>
        <label>
            Sort By:
            <select class="input-select" onchange="window.location.href=this.options[this.selectedIndex].value">
                <option VALUE="" hidden disabled selected>По алфавиту</option>
                <option VALUE="?sort=NAME&method=asc" <?if ($_GET["method"] == "asc"):?>selected<?endif;?> >По алфавиту (А-Я)</option>
                <option VALUE="?sort=NAME&method=desc" <?if ($_GET["method"] == "desc"):?>selected<?endif;?> >По алфавиту (Я-А)</option>
            </select>
        </label>
        <label>
            Show:
            <select class="input-select" onchange="window.location.href=this.options[this.selectedIndex].value">
                <option VALUE="" hidden disabled selected>На страницу</option>
                <option VALUE="?sort=catalog_QUANTITY&limit=10" <?if ($_GET["limit"] == "10"):?>selected<?endif;?> >10</option>
                <option VALUE="?sort=catalog_QUANTITY&limit=50" <?if ($_GET["limit"] == "50"):?>selected<?endif;?> >50</option>
                <option VALUE="?sort=catalog_QUANTITY&limit=80" <?if ($_GET["limit"] == "80"):?>selected<?endif;?> >80</option>
            </select>
        </label>
        <label>

            Show:
            <a <?if ($_GET["sort"] == "timestamp_x"):?>class="active"<?endif;?>
               href="<?=$arResult["SECTION_PAGE_URL"]?>?sort=timestamp_x&method=desc">
                От Недавно добавленных
            </a>

        </label>
    </div>

</div>

    <!-- store products -->
    <div class="row">
        <!-- product -->
        <?foreach ($arResult['ITEMS'] as $arItem):?>
            <div class="col-md-4 col-xs-6">
                <div class="product">
                    <div class="product-img">
                        <img src="<?=$arItem['PREVIEW_PICTURE']['SRC']?>"alt="">
                    </div>
                    <div class="product-body">
                        <p class="product-category">Category</p>
                        <h3 class="product-name"><a href="<?=$arItem['DETAIL_PAGE_URL']?>"><?=$arItem['NAME']?></a></h3>
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
                        <div class="good">
                        <button class="add-to-cart-btn" id="<?=$arItem['ID']?>"><a href="#"><i class="fa fa-shopping-cart"></i> add to cart</a></button>
                    </div>
                    </div>
                </div>
            </div>
        <?endforeach;?>
        <!-- /product -->
    </div>
<?if($arParams["DISPLAY_BOTTOM_PAGER"]):?>
	<br /><?=$arResult["NAV_STRING"]?>
<?endif;?>

