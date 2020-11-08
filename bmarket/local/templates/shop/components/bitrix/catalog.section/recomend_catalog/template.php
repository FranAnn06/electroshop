<? if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true) die();?>
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>

<script type="text/javascript">
    $(document).ready(function () {
        $(".good a").click(function () {
            var parent=$(this).parent().parent();
            var id=parent.find('button').attr('id');

            $.ajax({
                type:'POST',
                url: '/categories/addCart.php',
                target: '#container_basket',
                data: { good_id:id},
                success: function (data) {
                    alert(data);

                }
            })
            return false;
        })
    })

</script>
    <div class="section">
    <!-- container -->
    <div class="container">
    <!-- row -->
    <div class="row">
<div class="col-md-12">
    <div class="section-title text-center">
        <h3 class="title">Related Products</h3>
    </div>
</div>

<?foreach ($arResult['ITEMS'] as $arItem):?>

<!-- product -->
<div class="col-md-3 col-xs-6">
    <div class="product">
        <div class="product-img">
            <img src="<?=$arItem['PREVIEW_PICTURE']['SRC']?>" alt="">
        </div>
        <div class="product-body">
            <p class="product-category">Category</p>
            <h3 class="product-name"><a href="<?=$arItem['DETAIL_PAGE_URL']?>"><?=$arItem['NAME']?></a></h3>
            <h4 class="product-price"><?=$arItem['PRICES'] ['Price'] ['VALUE']?><del class="product-old-price"><?=$arItem['PRICES'] ['Price'] ['VALUE']?></del></h4>
            <div class="product-rating">
            </div>
        </div>
        <div class="add-to-cart">
            <div class="good">
                <button class="add-to-cart-btn" id="<?=$arItem['ID']?>"><a href="#"><i class="fa fa-shopping-cart"></i> add to cart</a></button>
            </div>
            </div>
    </div>
</div>
<!-- /product -->
<?php endforeach;?>
    </div>
    </div>
    </div>

