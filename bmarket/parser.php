<?php
require($_SERVER['DOCUMENT_ROOT'].'/bitrix/header.php');

//сайт для парсинга
$url='https://catalog.onliner.by/sdapi/catalog.api/search/notebook';

//получение сайта с помощью curl в переменную
$ch = curl_init();
curl_setopt($ch,CURLOPT_URL,$url); //установка ссылки
curl_setopt($ch,CURLOPT_RETURNTRANSFER,true); //передача в качестве строки
$result = curl_exec($ch);// результат
curl_close($ch);
$result_json = json_decode($result,true);
//prent($result_json, 1,1);
foreach ($result_json['products'] as $arItem) {
    CModule::IncludeModule("iblock");
    $el = new CIBlockElement;

    $arLoadProductArray = array(
        "IBLOCK_ID" => 1,
        "IBLOCK_SECTION_ID" => 1,
        "NAME" => $arItem['name'],
        "CODE" => $arItem['extended_name'],
        "ACTIVE" => "Y",            // активен
        "PROPERTY_VALUES" => array('ATT_PROCESSOR'=>"-",'ATT_HD'=>"-",'ATT_PRINT'=>"-",'ATT_COLOR'=>"-",'ATT_DIAGONAL'=>"-"),
        "PREVIEW_TEXT" => $arItem['description'],
        "DETAIL_TEXT" => $arItem['description'],
        "DETAIL_PICTURE" => CFile::MakeFileArray("http:{$arItem['images']['header']}"),
        "PREVIEW_PICTURE" => CFile::MakeFileArray("http:{$arItem['images']['header']}"),

    );
    if ($PRODUCT_ID = $el->Add($arLoadProductArray))
        echo "New ID: " . $PRODUCT_ID;
    else
        echo "Error: " . $el->LAST_ERROR;

    CModule::IncludeModule("catalog");
    $arFields = array(
        "ID" => $PRODUCT_ID,
        "QUANTITY" => $arItem['prices']['offers']['count'],
        "VAT_INCLUDED" => "N" //НДС входит в стоимость
    );
    if (CCatalogProduct::Add($arFields))
        echo "Добавили параметры товара к элементу каталога " . $PRODUCT_ID . '<br>';
    else
        echo 'Ошибка добавления параметров<br>';

// Установление цены для товара
    $PRICE_TYPE_ID = 1;

    $arrFieldds = array(
        "PRODUCT_ID" => $PRODUCT_ID,
        "CATALOG_GROUP_ID" => $PRICE_TYPE_ID,
        "PRICE" => $arItem['prices']['price_min']['amount'],
        "CURRENCY" => $arItem['prices']['price_min']['currency'],
    );

    if (CPrice::Add($arrFieldds))
        echo "Добавил цену " . $arItem['prices']['price_min']['amount'] . " рублей на товар с ID: " . $PRODUCT_ID . '<br>';
    else
        echo 'Ошибка добавления цены ' . $arItem['prices']['price_min']['amount'] . '<br>';
}
?>
