<?
if($INCLUDE_FROM_CACHE!='Y')return false;
$datecreate = '001597649487';
$dateexpire = '001633649487';
$ser_content = 'a:2:{s:7:"CONTENT";s:11493:"
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>

<script type="text/javascript">
    $(document).ready(function () {
        $(".good a").click(function () {
            var parent=$(this).parent().parent();
            var id=parent.find(\'button\').attr(\'id\');

            $.ajax({
                type:\'POST\',
                url: \'addCart.php\',
                target: \'#container_basket\',
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
                <option VALUE="?sort=catalog_PRICE_1&method=asc" >по возрастанию</option>
                <option VALUE="?sort=catalog_PRICE_1&method=desc" >по убыванию</option>
            </select>
        </label>
        <label>
            Sort By:
            <select class="input-select" onchange="window.location.href=this.options[this.selectedIndex].value">
                <option VALUE="" hidden disabled selected>По алфавиту</option>
                <option VALUE="?sort=NAME&method=asc"  >По алфавиту (А-Я)</option>
                <option VALUE="?sort=NAME&method=desc"  >По алфавиту (Я-А)</option>
            </select>
        </label>
        <label>
            Show:
            <select class="input-select" onchange="window.location.href=this.options[this.selectedIndex].value">
                <option VALUE="" hidden disabled selected>На страницу</option>
                <option VALUE="?sort=catalog_QUANTITY&limit=10"  >10</option>
                <option VALUE="?sort=catalog_QUANTITY&limit=50"  >50</option>
                <option VALUE="?sort=catalog_QUANTITY&limit=80"  >80</option>
            </select>
        </label>
        <label>

            Show:
            <a                href="?sort=timestamp_x&method=desc">
                От Недавно добавленных
            </a>

        </label>
    </div>

</div>

    <!-- store products -->
    <div class="row">
        <!-- product -->
                    <div class="col-md-4 col-xs-6">
                <div class="product">
                    <div class="product-img">
                        <img src="/upload/iblock/67c/67c7008540231309b33447933e45d987.jpeg"alt="">
                    </div>
                    <div class="product-body">
                        <p class="product-category">Category</p>
                        <h3 class="product-name"><a href="/categories/detail.php?ELEMENT_ID=209">TUF Gaming TUF565DT-AL435</a></h3>
                        <h4 class="product-price">2499<del class="product-old-price">2499</del></h4>
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
                        <button class="add-to-cart-btn" id="209"><a href="#"><i class="fa fa-shopping-cart"></i> add to cart</a></button>
                    </div>
                    </div>
                </div>
            </div>
                    <div class="col-md-4 col-xs-6">
                <div class="product">
                    <div class="product-img">
                        <img src="/upload/iblock/796/7962866be2fd3ae7c15555aa113ada81.jpeg"alt="">
                    </div>
                    <div class="product-body">
                        <p class="product-category">Category</p>
                        <h3 class="product-name"><a href="/categories/detail.php?ELEMENT_ID=208">IdeaPad 3 15IML05 81WB00KERE</a></h3>
                        <h4 class="product-price">1656<del class="product-old-price">1656</del></h4>
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
                        <button class="add-to-cart-btn" id="208"><a href="#"><i class="fa fa-shopping-cart"></i> add to cart</a></button>
                    </div>
                    </div>
                </div>
            </div>
                    <div class="col-md-4 col-xs-6">
                <div class="product">
                    <div class="product-img">
                        <img src="/upload/iblock/396/396e9199f5de7ae083de02b9badf68d1.jpeg"alt="">
                    </div>
                    <div class="product-body">
                        <p class="product-category">Category</p>
                        <h3 class="product-name"><a href="/categories/detail.php?ELEMENT_ID=207">MateBook D 14 AMD Nbl-WAQ9R</a></h3>
                        <h4 class="product-price">1826.1<del class="product-old-price">1826.1</del></h4>
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
                        <button class="add-to-cart-btn" id="207"><a href="#"><i class="fa fa-shopping-cart"></i> add to cart</a></button>
                    </div>
                    </div>
                </div>
            </div>
                    <div class="col-md-4 col-xs-6">
                <div class="product">
                    <div class="product-img">
                        <img src="/upload/iblock/697/697e6f77456db1cef22efb4fcbf27ffa.jpeg"alt="">
                    </div>
                    <div class="product-body">
                        <p class="product-category">Category</p>
                        <h3 class="product-name"><a href="/categories/detail.php?ELEMENT_ID=206">15s-eq1017ur 103U5EA</a></h3>
                        <h4 class="product-price">759<del class="product-old-price">759</del></h4>
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
                        <button class="add-to-cart-btn" id="206"><a href="#"><i class="fa fa-shopping-cart"></i> add to cart</a></button>
                    </div>
                    </div>
                </div>
            </div>
                    <div class="col-md-4 col-xs-6">
                <div class="product">
                    <div class="product-img">
                        <img src="/upload/iblock/510/51015c48ac3c5be8ee68b2810e9fdb2a.jpeg"alt="">
                    </div>
                    <div class="product-body">
                        <p class="product-category">Category</p>
                        <h3 class="product-name"><a href="/categories/detail.php?ELEMENT_ID=205">Zenbook UX433FN-A5110</a></h3>
                        <h4 class="product-price">2211.61<del class="product-old-price">2211.61</del></h4>
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
                        <button class="add-to-cart-btn" id="205"><a href="#"><i class="fa fa-shopping-cart"></i> add to cart</a></button>
                    </div>
                    </div>
                </div>
            </div>
                    <div class="col-md-4 col-xs-6">
                <div class="product">
                    <div class="product-img">
                        <img src="/upload/iblock/c20/c206ef0da4fedbc2e880126695881f18.jpeg"alt="">
                    </div>
                    <div class="product-body">
                        <p class="product-category">Category</p>
                        <h3 class="product-name"><a href="/categories/detail.php?ELEMENT_ID=204">IdeaPad S340-15IIL 81VW00E8RE</a></h3>
                        <h4 class="product-price">1265<del class="product-old-price">1265</del></h4>
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
                        <button class="add-to-cart-btn" id="204"><a href="#"><i class="fa fa-shopping-cart"></i> add to cart</a></button>
                    </div>
                    </div>
                </div>
            </div>
                <!-- /product -->
    </div>
	<br />

<!-- SECTION -->
<div class="section">
    <!-- container -->
    <div class="container">
        <!-- row -->
        <div class="row">
            <div id="store" class="col-md-9">
                <div class="store-filter clearfix">
 <span class="store-qty">Showing 1-6 products</span>
                    <ul class="store-pagination">
<font class="text">

	
		            <li class="active">1</li>
					
					<li ><a href="/local/templates/shop/css/ajax-loader.gif?PAGEN_1=2">2</a></li>
					
					<li ><a href="/local/templates/shop/css/ajax-loader.gif?PAGEN_1=3">3</a></li>
					
					<li ><a href="/local/templates/shop/css/ajax-loader.gif?PAGEN_1=4">4</a></li>
					
					<li ><a href="/local/templates/shop/css/ajax-loader.gif?PAGEN_1=5">5</a></li>
					

	        <li><a href="/local/templates/shop/css/ajax-loader.gif?PAGEN_1=2"><i class="fa fa-angle-right"></i></a></li>

	
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
</font>
";s:4:"VARS";a:2:{s:8:"arResult";a:6:{s:2:"ID";i:0;s:15:"NAV_CACHED_DATA";N;s:10:"NAV_STRING";s:1043:"

<!-- SECTION -->
<div class="section">
    <!-- container -->
    <div class="container">
        <!-- row -->
        <div class="row">
            <div id="store" class="col-md-9">
                <div class="store-filter clearfix">
 <span class="store-qty">Showing 1-6 products</span>
                    <ul class="store-pagination">
<font class="text">

	
		            <li class="active">1</li>
					
					<li ><a href="/local/templates/shop/css/ajax-loader.gif?PAGEN_1=2">2</a></li>
					
					<li ><a href="/local/templates/shop/css/ajax-loader.gif?PAGEN_1=3">3</a></li>
					
					<li ><a href="/local/templates/shop/css/ajax-loader.gif?PAGEN_1=4">4</a></li>
					
					<li ><a href="/local/templates/shop/css/ajax-loader.gif?PAGEN_1=5">5</a></li>
					

	        <li><a href="/local/templates/shop/css/ajax-loader.gif?PAGEN_1=2"><i class="fa fa-angle-right"></i></a></li>

	
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
</font>";s:16:"IPROPERTY_VALUES";a:0:{}s:16:"BACKGROUND_IMAGE";b:0;s:19:"USE_CATALOG_BUTTONS";a:2:{s:11:"add_product";b:1;s:7:"add_sku";b:1;}}s:18:"templateCachedData";a:6:{s:13:"additionalCSS";s:81:"/local/templates/shop/components/bitrix/catalog.section/Catalog_section/style.css";s:12:"additionalJS";s:81:"/local/templates/shop/components/bitrix/catalog.section/Catalog_section/script.js";s:9:"frameMode";b:1;s:16:"component_epilog";a:5:{s:10:"epilogFile";s:92:"/local/templates/shop/components/bitrix/catalog.section/Catalog_section/component_epilog.php";s:12:"templateName";s:15:"Catalog_section";s:12:"templateFile";s:84:"/local/templates/shop/components/bitrix/catalog.section/Catalog_section/template.php";s:14:"templateFolder";s:71:"/local/templates/shop/components/bitrix/catalog.section/Catalog_section";s:12:"templateData";b:0;}s:8:"__NavNum";i:1;s:17:"__currentCounters";a:1:{s:28:"bitrix:system.pagenavigation";i:2;}}}}';
return true;
?>