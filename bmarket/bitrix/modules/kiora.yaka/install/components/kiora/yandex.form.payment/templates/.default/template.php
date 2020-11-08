<? if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die(); ?>
<?

use \Kiora\Payments;

$rsUser = CUser::GetByID($USER->GetID());
$arUser = $rsUser->Fetch();
$arUser['name_print'] = ( $arUser['NAME'] ? $arUser['NAME'] : '' ) . ( $arUser['NAME'] && $arUser['LAST_NAME'] ? ' ' : '' ) . ( $arUser['LAST_NAME'] ? $arUser['LAST_NAME'] : '' );
$arUser["PERSONAL_PHONE"] = $arUser["PERSONAL_PHONE"] ? $arUser["PERSONAL_PHONE"] : $arUser["PERSONAL_MOBILE"] ? $arUser["PERSONAL_MOBILE"] : '';
$arUser['EMAIL'] = $arUser['EMAIL'] ? $arUser['EMAIL'] : '';

$modal = $arParams['MODAL_FORM'] == 'Y' ? true : false;
?>
<div class="ki-yandex-kassa payment-wrap">
    <? if ($modal) { ?>
        <a href="javascript:void(0);" class="button good showModal"><?= $arParams['SUBMIT_NAME'] ?></a>
        <div class="modal formModal">

            <!-- Modal content -->	
            <div class="modal-content slideDown">

                <div class="modal-header">
                    <span class="closeModal">&times;</span>
                    <h3><?= GetMessage('PAY_ORDER') ?></h3>
                </div>
            <? }//MODAL_FORM?>
            <div class="form-body ki-yaka payment-system-<?= $arParams['PAYMENT_TYPE'] ?>">
                <?= ( $arResult['DEMO_MODE'] ? ' <div style="color:red;" align="center">' . GetMessage('DEMO_MODE') . '</div>' : '' ) ?>
                <form action="<?= $arResult['POST_URL'] ?>" <? if ($modal) { ?>class="modal-form"<? } ?> method="post" >
                    <div class="form-overlay">
                        <div class="load-data-progress isShow"></div>
                    </div>
                    <input name="shopId" value="<?= $arResult['SHOP_ID'] ?>" type="hidden"/>
                    <input name="SITE_LID" value="<?= SITE_ID ?>" type="hidden"/>
                    <input name="scid" value="<?= $arResult['SC_ID'] ?>" type="hidden"/>
                    <input name="paymentType" value="<?= $arParams['PAYMENT_TYPE'] ?>" type="hidden"/>
                    <? if ($arParams['SUM'] > 0) { ?><input name="sum" value="<?= $arParams['SUM'] ?>" type="hidden" /><? } ?>
                    <? if ($arParams['ITEM_NAME']) { ?><input name="order_content" value="<?= $arParams['ITEM_NAME'] ?>" type="hidden" /><? } ?>
                    <? if ($arParams['YANDEX_TWO_STAGE'] == "Y") { ?><input name="YANDEX_TWO_STAGE" value="Y" type="hidden" /><? } ?>
                    <input name="orderNumber" value="" type="hidden" />
                    <input name="customerNumber" value="" type="hidden" />
                    <? if ($arResult['SEND_CHECK']) { ?>
                        <input name="f_quantity" value="1.00" type="hidden" />
                        <input name="f_tax" value="<?= $arParams['CHECK_TAX'] ?>" type="hidden" />
                        <input name="f_vat" value="<?= $arParams['CHECK_VAT'] ?>" type="hidden" />
                        <input name="ym_merchant_receipt" value="" type="hidden"/>
                        <input name="paymentMethodType" value="<?= $arParams['PAYMENT_METHOD_TYPE'] ?>" type="hidden"/>
                        <input name="paymentSubjectType" value="<?= $arParams['PAYMENT_SUBJECT_TYPE'] ?>" type="hidden"/>
                    <? } ?>

                    <div class="form-row">
                        <label for="user_name"><?= GetMessage('NAME') ?></label>
                        <input name="user_name" value="<?= $arUser['name_print'] ?>"  required type="text"<? if ($arUser['name_print'] != '') { ?> readonly="readonly"<? } ?>/>
                    </div>
                    <div class="form-row">
                        <label for="user_phone"><?= GetMessage('YOUR_PHONE') ?></label>
                        <input name="user_phone" value="<?= $arUser["PERSONAL_PHONE"] ?>" type="tel"/>
                    </div>
                    <div class="form-row">
                        <label for="user_email"><?= GetMessage('YOUR_EMAIL') ?></label>
                        <input name="user_email" value="<?= $arUser['EMAIL'] ?>" required type="email" />
                    </div>                                
                    <div class="form-row">
                        <label for="order_content"><?= GetMessage('ITEM_NAME') ?></label>
                        <div class="value"><?= ($arParams['ITEM_NAME'] ? $arParams['ITEM_NAME'] : '<input name="order_content" value="" required type="text" maxlength="255" />' ) ?></div>
                    </div>
                    <div class="form-row amount">
                        <label for=""><?= GetMessage('SUM_PRINT') ?></label>
                        <div class="value">
                            <?= ($arParams['SUM'] > 0 ? $arParams['SUM'] . " " . $arParams['SUM_PRINT'] : '<input name="sum" value="" required type="number" step="0.01" placeholder="' . $arParams['SUM_PRINT'] . '" />' ) ?>
                        </div>
                    </div>
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