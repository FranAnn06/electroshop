<?php
if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();

/**
 * @global CMain $APPLICATION
 */

global $APPLICATION;

//delayed function must return a string
if(empty($arResult))
    return "";

$strReturn = '';
$strReturn .= '<div id="breadcrumb" class="section">';
$strReturn .= '   <div class="container">';
$strReturn .= '        <div class="row">';
$strReturn .= '           <div class="col-md-12">';
$strReturn .= '                <ul class="breadcrumb-tree">';

$itemSize = count($arResult);
for($index = 0; $index < $itemSize; $index++)
{
    $title = htmlspecialcharsex($arResult[$index]["TITLE"]);


    if($arResult[$index]["LINK"] <> "" && $index != $itemSize-1)
    {
        $strReturn .= '<li class="active"><a href="'.$arResult[$index]["LINK"].'">'.$title.'</a></li>';

    }
    else
    {
        $strReturn .= '
			<li><a href="'.$arResult[$index]["LINK"].'">'.$title.'</a></li>';
    }
}

$strReturn .= '</ul>';
$strReturn .= '</div>';
$strReturn .= '</div>';
$strReturn .= '</div>';
$strReturn .= '</div>';

return $strReturn;
