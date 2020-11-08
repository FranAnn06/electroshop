<?
require_once($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/main/include/prolog_admin_before.php");
require_once("install/const.php");
IncludeModuleLangFile(__FILE__);

$moduleId = KIYA_NAME_MOD;

$MODULE_RIGHT = $APPLICATION->GetGroupRight(KIYA_NAME_MOD);

if (!($MODULE_RIGHT >= "R"))
    $APPLICATION->AuthForm(GetMessage("ACCESS_DENIED"));

$APPLICATION->SetTitle(GetMessage('YAKA_OPT_TITLE'));

CModule::IncludeModule(KIYA_NAME_MOD);

$aTabs = array();

$logFile = "http://" . $_SERVER['HTTP_HOST'] . "/bitrix/tools/kiora.yaka/log.txt";

$aTabs[] = array(
    'DIV' => 'main-tab',
    'TAB' => GetMessage('YAKA_OPT_TAB_MAIN'),
    'OPTIONS' => array(
        array('yk_shops_id',
            GetMessage('YAKA_OPT_SHOPS_ID'),
            null,
            array('text', 52),
        ),
        array('write_log',
            GetMessage('YAKA_OPT_WRITE_LOG') . ' <a href="' . $logFile . '" target="__blank">' . $logFile . '</a>',
            "Y",
            array("checkbox", "")
        )
    )
);

$arYKShops = explode(',', \Bitrix\Main\Config\Option::get(KIYA_NAME_MOD, "yk_shops_id", "0", 1));
if ($arYKShops[0] == '0' || $arYKShops[0] == '')
    $arYKShops = array();

foreach (is_array($arYKShops) ? $arYKShops : array() as $keyId => $tempShop_id) {
    $shop_id = trim($tempShop_id);
    $arYKShops[$keyId] = $shop_id;

    $send_check = \Bitrix\Main\Config\Option::get(KIYA_NAME_MOD, 'shop_send_check_data_' . $shop_id, "0", 1);
    $isApiType = \Bitrix\Main\Config\Option::get(KIYA_NAME_MOD, 'api_type_' . $shop_id, "api", 1) == 'api' ? true : false;
    $shopPassword = \Bitrix\Main\Config\Option::get(KIYA_NAME_MOD, 'shop_password_' . $shop_id, "", 1);
    $shopName = \Bitrix\Main\Config\Option::get(KIYA_NAME_MOD, 'shop_name_'.$shop_id, "", 1);
    $testPresent = strpos($shopPassword, 'test_') === 0;
    $isDemoOn = $isApiType ? $testPresent ? true  : false : \Bitrix\Main\Config\Option::get(KIYA_NAME_MOD, 'demo_mode_' . $shop_id, "api", 1) == 'Y' ? true : false;

    $aTab = array(
        'DIV' => $shop_id,
        'TAB' => $shop_id . ': ' . $shopName,
        'OPTIONS' => array(
            GetMessage('YAKA_OPT_TAB_TITLE') . ' shopId - ' . $shop_id, //,
            array(
                'api_type_' . $shop_id,
                GetMessage('YAKA_OPT_API_TYPE'),
                null,
                array('selectbox', array(
                        'api' => GetMessage('YAKA_OPT_API_TYPE_API'),
                        'http' => GetMessage('YAKA_OPT_API_TYPE_HTTP')
                    )
                ),
                'N',
                '*'
            ),
            array(
                'shop_password_' . $shop_id,
                $isApiType ? GetMessage('YAKA_OPT_SHOP_PASSWORD') : GetMessage('YAKA_OPT_SHOP_PASSWORD2'),
                null,
                array('text', 52),
                'N',
                '*'
            ),
            array(
                'yandex_payment_ type',
                GetMessage('YAKA_OPT_SHOP_PAYMENT_VARIANT'),
                GetMessage('YAKA_OPT_SHOP_PAYMENT_VARIANT_DES'),
                array('statichtml'),
                'Y'
            ),
            'scid' => array(),
            'shop_back_url' => array(),
            'shop_currency' => array(),
            GetMessage('YAKA_OPT_SEND_CHECK'),
            array(
                'shop_send_check_data_' . $shop_id,
                GetMessage('YAKA_OPT_SEND_CHECK_DATA'),
                'N',
                array("checkbox", "")
            ),
            'demo_mode_title' => GetMessage('YAKA_OPT_DEMO_MODE_TITLE'),
            'demo_mode_on' => array(),
            'scid_demo' => array(),
            GetMessage('YAKA_OPT_EMAIL_EVENT'),
            array(
                'email_event_add_' . $shop_id,
                GetMessage('YAKA_OPT_EMAIL_EVENT_ADD'),
                'Y',
                array("checkbox", "")
            ),
            array('email_event_paid_' . $shop_id,
                GetMessage('YAKA_OPT_EMAIL_EVENT_PAID'),
                'Y',
                array("checkbox", "")
            ),
            array('email_event_waiting_' . $shop_id,
                GetMessage('YAKA_OPT_EMAIL_EVENT_WAITING'),
                'Y',
                array("checkbox", "")
            ),
            array('email_event_cancel_' . $shop_id,
                GetMessage('YAKA_OPT_EMAIL_EVENT_CANCEL'),
                'Y',
                array("checkbox", "")
            ),
            GetMessage('YAKA_OPT_ADV_OPTS') . ' ' .$shop_id,
            array('shop_name_'.$shop_id,
                GetMessage('YAKA_OPT_ADV_OPTS_SHOP_NAME'),
                GetMessage('YAKA_OPT_ADV_OPTS_SHOP_NAME_DEFAULT'). $shop_id,
                array('text', 52),
            ),
            array('shop_email_'.$shop_id,
                GetMessage('YAKA_OPT_ADV_OPTS_ADMIN_EMAIL'),
                '#DEFAULT_EMAIL_FROM#',
                array('text', 52),
            )
        )
    );

    if ($isApiType) {

        $aTab['OPTIONS']['shop_back_url'] = array(
            'shop_back_url_' . $shop_id,
            GetMessage('YAKA_OPT_SHOP_BACK_URL'),
            '/bitrix/tools/kiora.yaka/sale_ps_result.php',
            array('text', 52),
            !$isApiType ? 'Y' : 'N',
        );

        $aTab['OPTIONS']['shop_currency'] = array(
            'shop_currency_' . $shop_id,
            GetMessage('YAKA_OPT_SHOP_CURRENCY'),
            'RUB',
            array('text', 3),
            !$isApiType ? 'Y' : 'N',
        );
        
        $aTab['OPTIONS']['demo_mode_on'] = array(
            '',
            GetMessage('YAKA_OPT_DEMO_PAYMENTS'),
            $isDemoOn ? GetMessage('YAKA_OPT_DEMO_MODE_ON') : GetMessage('YAKA_OPT_DEMO_MODE_OFF'),
            array('statichtml')
        );
        
    } else {

        $aTab['OPTIONS']['scid'] = array(
            'scid_' . $shop_id,
            GetMessage('YAKA_OPT_SCID'),
            null,
            array('text', 52),
            $isApiType ? 'Y' : 'N'
        );

        $aTab['OPTIONS']['demo_mode_on'] = array(
            'demo_mode_' . $shop_id,
            GetMessage('YAKA_OPT_IS_DEMO_PAYMENTS'),
            'N',
            array("checkbox", "")
        );

//        $aTab['OPTIONS']['scid_demo'] = array(
//            'scid_demo_' . $shop_id,
//            GetMessage('YAKA_OPT_DEMO_SCID'),
//            null,
//            array('text', 52),
//            $isApiType ? 'Y' : 'N'
//        );
    }

    if (class_exists('KIUtils')) {
        $aTab = \KIUtils::event('kiora.yaka', "KiYKBeforeShowOptions", $aTab);
    }
    $aTabs[] = $aTab;
}//foreach $arYKShops


require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/main/include/prolog_admin_after.php");

$RK_RIGHT = $APPLICATION->GetGroupRight($module_id);

$tabControl = new CAdminTabControl('tabControl', $aTabs);

if ($_SERVER['REQUEST_METHOD'] == 'POST' && check_bitrix_sessid() && $RK_RIGHT >= "W") {
    foreach ($aTabs as $aTab) {
        __AdmSettingsSaveOptions($moduleId, $aTab['OPTIONS']);
    }

    $Update = $Update . $Apply;
    ob_start();
    require_once($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/main/admin/group_rights.php");
    ob_end_clean();

    if ($Apply == '' && $_REQUEST["back_url_settings"] <> '')
        LocalRedirect($_REQUEST["back_url_settings"]);
    else
        LocalRedirect($APPLICATION->GetCurPage() . "?mid=" . urlencode($mid) . "&lang=" . urlencode(LANGUAGE_ID) . "&back_url_settings=" . urlencode($_REQUEST["back_url_settings"]) . "&" . $tabControl->ActiveTabParam());
}
?>

<form method='post' action='' name='bootstrap'>
    <?
    $tabControl->Begin();

    foreach ($aTabs as $aTab) {
        $tabControl->BeginNextTab();
        __AdmSettingsDrawList($moduleId, $aTab['OPTIONS']);
    }



//rights tab
//$module_id = KIYA_NAME_MOD;
//$RK_RIGHT = $APPLICATION->GetGroupRight($module_id);

    if (0 && $REQUEST_METHOD == "POST" && strlen($_REQUEST['save']) > 0 && $RK_RIGHT >= "W" && check_bitrix_sessid()) {

        $Update = $Update . $Apply;
        ob_start();
        require_once($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/main/admin/group_rights.php");
        ob_end_clean();

        if ($Apply == '' && $_REQUEST["back_url_settings"] <> '')
            LocalRedirect($_REQUEST["back_url_settings"]);
        else
            LocalRedirect($APPLICATION->GetCurPage() . "?mid=" . urlencode($mid) . "&lang=" . urlencode(LANGUAGE_ID) . "&back_url_settings=" . urlencode($_REQUEST["back_url_settings"]) . "&" . $tabControl->ActiveTabParam());
    }
    ?>

    <?
    //require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/admin/group_rights.php");
    $tabControl->Buttons();
    ?>
    <? if (strlen($_REQUEST["back_url_settings"]) > 0): ?>
        <input type="submit" name="Update" value="<?= GetMessage('YAKA_OPT_FORM_SAVE') ?>" title="<?= GetMessage('YAKA_OPT_FORM_SAVE') ?>"<? if ($RK_RIGHT < "W") echo " disabled" ?>> 
    <? endif ?>
    <input type="submit" name="Apply" value="<?= GetMessage('YAKA_OPT_FORM_APPLY') ?>" title="<?= GetMessage('YAKA_OPT_FORM_APPLY') ?>"<? if ($RK_RIGHT < "W") echo " disabled" ?>>
    <? if (strlen($_REQUEST["back_url_settings"]) > 0): ?>
        <input type="button" name="Cancel" value="<?= GetMessage('YAKA_OPT_FORM_CANCEL') ?>" title="<?= GetMessage('YAKA_OPT_FORM_CANCEL') ?>" onclick="window.location = '<? echo htmlspecialchars(CUtil::JSEscape($_REQUEST["back_url_settings"])) ?>'">
        <input type="hidden" name="back_url_settings" value="<?= htmlspecialchars($_REQUEST["back_url_settings"]) ?>">
    <? endif ?>
    <?= bitrix_sessid_post(); ?>
    <? $tabControl->End(); ?>

</form>

<div class="adm-info-message-wrap">
    <div class="adm-info-message">
        <h2><?= GetMessage('YAKA_OPT_LK') ?></h2>

        <h3><?= GetMessage('YAKA_OPT_LK_HTTP_URL') ?></h3>
        <?
        $checkURL = "https://" . $_SERVER['HTTP_HOST'] . "/bitrix/tools/kiora.yaka/checkOrder.php";
        $resultURL = "https://" . $_SERVER['HTTP_HOST'] . "/bitrix/tools/kiora.yaka/sale_ps_result.php";
        ?>
        <ul>
            <li>Check url & Aviso url - <a href="<?= $checkURL ?>" target="__blank"><?= $checkURL ?></a></li>
            <li>Success URL & Fail URL - <a href="<?= $resultURL ?>" target="__blank"><?= $resultURL ?></a></li>
        </ul>

        <h3><?= GetMessage('YAKA_OPT_LK_API_URL_TITLE') ?></h3>
        <ul>
            <li><?= GetMessage('YAKA_OPT_LK_CHECK_URL') ?> - <a href="<?= $checkURL ?>" target="__blank"><?= $checkURL ?></a></li>
            <li><?= GetMessage('YAKA_OPT_LK_RESULT_URL') ?> - <a href="<?= $resultURL ?>" target="__blank"><?= $resultURL ?></a></li>
        </ul>
        
        <p>*<i><?= GetMessage('YAKA_OPT_LK_URL_WARNING') ?></i></p>

        <h3><?= GetMessage('YAKA_OPT_LK_TEST') ?></h3>
        <?= GetMessage('YAKA_OPT_LK_TEST_TEXT') ?>
    </div>
</div>
<?
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/main/include/epilog_admin.php");
?> 