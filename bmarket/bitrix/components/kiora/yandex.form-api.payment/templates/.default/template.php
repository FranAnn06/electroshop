<?

use Bitrix\Main\Localization\Loc;

if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die(); ?>
<?

use \Kiora\Payments;

$modal = $arParams['MODAL_FORM'] == 'Y' ? true : false;
?>

<div class="ki-yandex-kassa form-api payment-wrap">
    <? if ($modal) { ?>
        <a href="javascript:void(0);" class="button good showModal"><?= $arParams['SUBMIT_NAME'] ?></a>
        <div class="modal formModal">

            <!-- Modal content -->	
            <div class="modal-content slideDown">
                <span class="closeModal">&times;</span>
            <? }//MODAL_FORM?>
            <div class="form-body ki-yaka-form-api payment-system-<?= $arParams['PAYMENT_TYPE'] ?>">
                <?= ( $arResult['DEMO_MODE'] ? ' <div style="color:red;" align="center">' . GetMessage('DEMO_MODE') . '</div>' : '' ) ?>
                <form action="" <? if ($modal) { ?>class="modal-form"<? } ?> method="post" >
                    <div class="form-overlay">
                        <div class="load-data-progress isShow"></div>
                    </div>
                    <input name="shopId" value="<?= $arResult['SHOP_ID'] ?>" type="hidden"/>
                    <input name="SITE_LID" value="<?= SITE_ID ?>" type="hidden"/>
                    <input name="paymentType" value="<?= $arParams['PAYMENT_TYPE'] ?>" type="hidden"/>
                    <? if ($arParams['YANDEX_TWO_STAGE'] == "Y") { ?><input name="YANDEX_TWO_STAGE" value="Y" type="hidden" /><? } ?>
                    <? if ($arResult['TOTAL_AMOUNT'] > 0) { ?><input name="sum" value="<?= $arResult['TOTAL_AMOUNT'] ?>" type="hidden" /><? } ?>
                    <input name="order_content" value="<?= $arParams['ITEM_NAME'] ?>" type="hidden" />
                    <input name="orderNumber" value="" type="hidden" />
                    <input name="customerNumber" value="" type="hidden" />
                    <input name="receipt" value="<?= $arParams['CHECK_DATA']; ?>" type="hidden"/>
                    <? if ($arResult['SEND_CHECK']) { ?>
                        <input name="f_tax" value="<?= $arParams['CHECK_TAX'] ?>" type="hidden" />
                        <input name="f_vat" value="<?= $arParams['CHECK_VAT'] ?>" type="hidden" />
                        <input name="paymentMethodType" value="<?= $arParams['PAYMENT_METHOD_TYPE'] ?>" type="hidden"/>
                        <input name="paymentSubjectType" value="<?= $arParams['PAYMENT_SUBJECT_TYPE'] ?>" type="hidden"/>
                    <? } ?>

                    <div class="form-row form_name">
                        <?= $arParams['ITEM_NAME'] ?>
                    </div>
                    <div class="form-row user_name">
                        <label for="user_name"><?= GetMessage('NAME') ?><?=$component->isRequiredHtml()?></label>
                        <input name="user_name" value="<?= $arResult['USER_NAME'] ?>"  required type="text"/>
                    </div>
                    <div class="form-row user_email">
                        <label for="user_email"><?= GetMessage('USER_EMAIL') ?><?=$component->isRequiredHtml()?></label>
                        <input name="user_email" value="<?= $arResult['USER_EMAIL'] ?>" required type="email" />
                    </div>
                    <div class="form-row user_phone">
                        <label for="user_phone"><?= GetMessage('USER_PHONE') ?></label>
                        <input name="user_phone" value="<?= $arResult["USER_PHONE"] ?>" class="tel-mask" type="tel"/>
                    </div>
                        
                    <? if ($arParams['CUSTOM_FIELDS_USE'] == 'Y') { ?>
                        <? foreach($arResult['CUSTOM_FIELDS'] as $CUSTOM_FIELD) {?>
                        <div class="form-row custom-field field-type-<?=$CUSTOM_FIELD['type']?>">
                            <label><?= $CUSTOM_FIELD['name'] ?><?= $CUSTOM_FIELD['required'] ? $component->isRequiredHtml() : ''?></label>
                            <?= $component->buildCustomField($CUSTOM_FIELD) ?>
                        </div>
                        <? } ?>
                    <? } ?>
                             
                    <? if ($arParams['FORM_TYPE'] == 'simple' && count($arResult['CHECK_DATA'])) { ?>
                        <div class="form-row item_name">
                            <label><?= GetMessage('ITEM_NAME') ?><?= $arResult['CHECK_DATA'][0]['name'] ? '' : $component->isRequiredHtml()?></label>
                            <div class="value"><?= ($arResult['CHECK_DATA'][0]['name'] ? $arResult['CHECK_DATA'][0]['name'] : '<input name="order_content_input" value="" required type="text" maxlength="255" />' ) ?></div>
                        </div>
                        <div class="form-row amount check-row">
                            <label for=""><?= GetMessage('SUM_PRINT') ?><?= $arResult['TOTAL_AMOUNT'] > 0 ? '' : $component->isRequiredHtml()?></label>
                            <div class="value">
                                <?= ($arResult['TOTAL_AMOUNT'] > 0 ? $component->floatPrintFormat($arResult['TOTAL_AMOUNT']) . " " . $arParams['SUM_PRINT'] : '<input name="sum" value="" required type="number" step="0.01" placeholder="' . $arParams['SUM_PRINT'] . '" />' ) ?>
                            </div>
                        </div>
                    <? } ?>
                        
                        
                    <? if ($arParams['FORM_TYPE'] == 'check') { ?>
                        <div class="form-row check-head">
                            <label><?= GetMessage('ORDER_CONTENT') ?>:</label>
                        </div>
                        <div class="check-wrap">
                            <? foreach ($arResult['CHECK_DATA'] as $checkItem) { ?>
                                <div class="form-row check-row">
                                    <label><?= $checkItem['name'] ?></label>
                                    <div class="value"><?= $component->floatPrintFormat($checkItem['quantity']) . ' * ' . $component->floatPrintFormat($checkItem['amount']) . ' = <i>' . $component->floatPrintFormat($checkItem['quantity'] * $checkItem['amount']) . '</i> ' . $arParams['SUM_PRINT'] ?></div>
                                </div>
                            <? } ?>
                        </div>
                        <div class="form-row amount check-row">
                            <label for=""><?= GetMessage('TOTAL_SUM') ?></label>
                            <div class="value">
                                <?= $component->floatPrintFormat($arResult['TOTAL_AMOUNT']) . " " . $arParams['SUM_PRINT'] ?>
                            </div>
                        </div>
                    <? } ?>
                    <div class="modal-footer">
                        <input type="submit" class="button good" value="<?= $arParams['SUBMIT_NAME'] ?>">
                    </div>
                </form>
            </div><!--/.form-body-->
            <? if ($modal) { ?>
            </div><!--/.modal-content-->

        </div><!--/#formModal-->
    <? } ?>
</div><!--/.payment-wrap-->