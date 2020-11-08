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
prent($arResult,1,1);?>




<div class="col-md-4">
    <div id="review-form">
        <form id="comment" class="review-form">
            <input id="name" class="input" type="text" name="name" placeholder="Your Name">
			<input id="email" class="input" type="email" name="email" placeholder="Your Email">
			<textarea id="text" class="input" name="text" placeholder="Your Review"></textarea>
            <div class="input-rating">
			<span>Your Rating: </span>
				<div class="stars">
                    <input id="star5" name="rating" value="5" type="radio"><label for="star5"></label>
                    <input id="star4" name="rating" value="4" type="radio"><label for="star4"></label>
                    <input id="star3" name="rating" value="3" type="radio"><label for="star3"></label>
                    <input id="star2" name="rating" value="2" type="radio"><label for="star2"></label>
                    <input id="star1" name="rating" value="1" type="radio"><label for="star1"></label>
<!--                    --><?//
//                    $APPLICATION->IncludeComponent(
//                        "bitrix:iblock.vote",
//                        "stars1",
//                        array(
//                            "IBLOCK_TYPE" => "Catalog",
//                            "IBLOCK_ID" => 1,
//                            "ELEMENT_ID" => $arResult['ELEMENT']['ID'],
//                            "ELEMENT_CODE" => "",
//                            "MAX_VOTE" => "5",
//                            "VOTE_NAMES" => array("1", "2", "3", "4", "5"),
//                            "SET_STATUS_404" => "N",
//                            "DISPLAY_AS_RATING" => $arParams['VOTE_DISPLAY_AS_RATING'],
//                            "CACHE_TYPE" => $arParams['CACHE_TYPE'],
//                            "CACHE_TIME" => $arParams['CACHE_TIME']
//                        ),
//                        $component,
//                        array("HIDE_ICONS" => "Y")
//                    );
//                    ?>

				</div>
			</div>
		<button type="submit" class="primary-btn">Submit</button>
		</form>
	</div>
</div>

<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
<script type="text/javascript">
    $(document).on('submit', '#comment', function () {
        let form_comment = $('#comment').serialize();
        $.ajax({
            type: 'POST',
            url: '/categories/ajax_comment.php',
            data: form_comment,
            success: function () {
                alert('ok');
            }
        })

    })

</script>