<?php
if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();
CModule::IncludeModule("iblock");
?>



<div class="aside">
    <h3 class="aside-title">Categories</h3>
    <div class="checkbox-filter">
        <?foreach($arResult['SECTIONS'] as $arItem):?>
            <div class="input-checkbox">
                <input type="checkbox" class="checkIt" id="<?=$arItem['ID']?>"/>
                <label for="<?=$arItem['ID']?>">
                    <span></span>
                    <?=$arItem['NAME']?>
                    <small><?="(".$arItem['ELEMENT_CNT'].")"?></small>
                </label>
            </div>
        <?endforeach;?>
    </div>
</div>

<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
<script type="text/javascript">

    $(document).on('change', '.checkIt', function () {
        let filterCheckbox = $('.checkIt');
        let sectionId ;
        $('.checkIt').not(this).prop('checked', false);
        filterCheckbox.each(function () {
            if($(this).is(":checked")){
                sectionId=$(this).attr('id');

            }

        });
        $.ajax({
           type:'POST',
           url: 'check.php',
           data: {section_id: sectionId}
        }).done(function (result) {
            $('#container_catalog').html(result);
        })

    });


</script>
