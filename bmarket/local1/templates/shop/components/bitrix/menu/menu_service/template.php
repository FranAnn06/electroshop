<?if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();?>

<div class="col-md-3 col-xs-6">
    <div class="footer">
        <h3 class="footer-title">Service</h3>
        <?php foreach($arResult as $arItem): ?>
        <ul class="footer-links">
            <li style="margin-top: 15px;"><a href="<?=$arItem['LINK'];?>"><?=$arItem['TEXT'];?></a></li>

        </ul>
        <?php endforeach;?>
    </div>
</div>