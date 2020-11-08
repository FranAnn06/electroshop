<?if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();?>
<?php if(empty($arResult['ALL_ITEMS'])) return; ?>

<ul class="footer-links">
<?php foreach($arResult['ALL_ITEMS'] as $arItem): ?>
	<li><a href="<?=$arItem['LINK'];?>"><?=$arItem['TEXT'];?></a></li>
<?php endforeach;?>
</ul>

