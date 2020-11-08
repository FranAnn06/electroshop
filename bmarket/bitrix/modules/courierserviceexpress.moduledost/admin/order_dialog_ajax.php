<?
use Bitrix\Main\HttpApplication;
use Bitrix\Main\Loader;
use Bitrix\Main\Localization\Loc;
use Bitrix\Sale\Order;
use Bitrix\Main\Config\Option;
//use Dostavista\Business\Service\DvOptions;
//use Dostavista\Business\Service\DvService;
//use KseService;
//use KseOptions;
//use KseOrderProperties;
//use Dostavista\Business\Service\Warehouses\WarehouseStorage;


require_once $_SERVER['DOCUMENT_ROOT'] . '/bitrix/modules/main/include/prolog_admin_before.php';

$moduleId = 'courierserviceexpress.moduledost';

Loc::loadMessages(__FILE__);
Loader::includeModule('sale');
Loader::includeModule($moduleId);

$GorodZaboraGruza = Option::get("courierserviceexpress.moduledost", "GorodZaboraGruza");
$AdresSaboraGruza = Option::get($moduleId, "AdresZaboraGruza");
$SenderContactPhone = Option::get($moduleId, "SenderContactPhone");
$Urgency = Option::get($moduleId, "urgency");
$CompName = htmlspecialchars(Option::get($moduleId, "CompanyName"),ENT_NOQUOTES);

        //Формируем массив населенных пунктов
        $arCitiesData=KseService::getGeoCodesArray(1);
        $arCities = $arCitiesData;
?>
<script id="kce-business-order-dialog-translations">
    kse.orderDialog.setTranslations(
        {
            title                           : '<?= Loc::getMessage('KSE_BUSINESS_ORDER_DIALOG_TITLE')?>',
            submit_value                    : '<?= Loc::getMessage('KSE_BUSINESS_ORDER_DIALOG_SUBMIT_VALUE')?>',
            error_title                     : '<?= Loc::getMessage('KSE_BUSINESS_ORDER_DIALOG_ERROR_TITLE') ?>',
            creation_error_text             : '<?= Loc::getMessage('KSE_BUSINESS_ORDER_DIALOG_CREATION_ERROR_TEXT') ?>',
            creation_success_title          : '<?= Loc::getMessage('KSE_BUSINESS_ORDER_DIALOG_CREATION_SUCCESS_TITLE') ?>',
            creation_success_text           : '<?= Loc::getMessage('KSE_BUSINESS_ORDER_DIALOG_CREATION_SUCCESS_TEXT') ?>',
            calculation_error_text          : '<?= Loc::getMessage('KSE_BUSINESS_ORDER_DIALOG_CALCULATION_ERROR_TEXT') ?>',
            calculation_parameter_error_text: '<?= Loc::getMessage('KSE_BUSINESS_ORDER_DIALOG_CALCULATION_PARAMETER_ERROR_TEXT') ?>',
        }
    );

    kse.orderDialog.setErrorTranslations(
        {
            required                   : '<?= Loc::getMessage('KSE_BUSINESS_ORDER_DIALOG_PARAMETER_ERROR_REQUIRED') ?>',
            invalid_value              : '<?= Loc::getMessage('KSE_BUSINESS_ORDER_DIALOG_PARAMETER_ERROR_INVALID_VALUE') ?>',
            min_length                 : '<?= Loc::getMessage('KSE_BUSINESS_ORDER_DIALOG_PARAMETER_ERROR_MIN_LENGTH') ?>',
            max_length                 : '<?= Loc::getMessage('KSE_BUSINESS_ORDER_DIALOG_PARAMETER_ERROR_MAX_LENGTH') ?>',
            min_value                  : '<?= Loc::getMessage('KSE_BUSINESS_ORDER_DIALOG_PARAMETER_ERROR_MIN_VALUE') ?>',
            max_value                  : '<?= Loc::getMessage('KSE_BUSINESS_ORDER_DIALOG_PARAMETER_ERROR_MAX_VALUE') ?>',
            invalid_integer            : '<?= Loc::getMessage('KSE_BUSINESS_ORDER_DIALOG_PARAMETER_ERROR_INVALID_INTEGER') ?>',
            invalid_phone              : '<?= Loc::getMessage('KSE_BUSINESS_ORDER_DIALOG_PARAMETER_ERROR_INVALID_PHONE') ?>',
            different_regions          : '<?= Loc::getMessage('KSE_BUSINESS_ORDER_DIALOG_PARAMETER_ERROR_DIFFERENT_REGIONS') ?>',
            address_not_found          : '<?= Loc::getMessage('KSE_BUSINESS_ORDER_DIALOG_PARAMETER_ERROR_ADDRESS_NOT_FOUND') ?>',
            min_date                   : '<?= Loc::getMessage('KSE_BUSINESS_ORDER_DIALOG_PARAMETER_ERROR_MIN_DATE') ?>',
            max_date                   : '<?= Loc::getMessage('KSE_BUSINESS_ORDER_DIALOG_PARAMETER_ERROR_MAX_DATE') ?>',
            cannot_be_past             : '<?= Loc::getMessage('KSE_BUSINESS_ORDER_DIALOG_PARAMETER_ERROR_CANNOT_BE_PAST') ?>',
            start_after_end            : '<?= Loc::getMessage('KSE_BUSINESS_ORDER_DIALOG_PARAMETER_ERROR_START_AFTER_END') ?>',
            earlier_than_previous_point: '<?= Loc::getMessage('KSE_BUSINESS_ORDER_DIALOG_PARAMETER_ERROR_EARLIER_THAN_PREVIOUS_POINT') ?>',
        }
    );
</script>
<?

$request = HttpApplication::getInstance()->getContext()->getRequest();
$orderIds = $request->get('order_ids');
$orderId = $orderIds[0];
if (!$orderIds || !is_array($orderIds)) {
    $orderIds = [];
}





$orders = [];
foreach ($orderIds as $orderId) {
    try {
        $order = Order::load($orderId);
        $orders[] = $order;
    } catch (Throwable $exception) {

    }
}

if (!$orders) {
    echo Loc::getMessage('KSE_BUSINESS_ORDER_DIALOG_ORDERS_NOT_FOUND');
    return;
}

$ordersTotalWeight     = 0;
$ordersTotalSum        = 0;
$ordersTakingAmountSum = 0;
$ordersTotalQty = 0;
$matterCategoryList = [];
foreach ($orders as $order) {
    
    
    $orderProps = new KseOrderProperties($order);

    $ordersTotalSum        += $order->getPrice() - $order->getDeliveryPrice();
    $ordersTotalWeight     += $orderProps->getTotalWeight();
    $ordersTakingAmountSum += $orderProps->getTakingAmount();
   
    $orderZIP = $orderProps->propertiesByCode['ZIP'];
    $matterCategoryList[] = $orderProps->getMatter();
}



$matter = KseOptions::getDefaultMatter() ?: trim(join(', ', $matterCategoryList));
if (KseOptions::isMatterWeightPrefixEnabled()) {
    Loc::includeGeneralLangFile();

    $weightTemplate = Loc::getMessage('KSE_BUSINESS_WEIGHT_KG_TEMPLATE');
    $matter = sprintf($weightTemplate, (string) ($ordersTotalWeight ?: KseOptions::getDefaultWeightKg()))
        . ' ' . $matter;
}

/*
$warehouseStorage = new WarehouseStorage();

$pickupWarehouse = null;
if (KseOptions::getDefaultPickupWarehouseId()) {
    $pickupWarehouse = $warehouseStorage->getById(KseOptions::getDefaultPickupWarehouseId());
}

$warehouses = $warehouseStorage->getList();
*/


// Получаем дополнительные данные о заказе
$TotalQty = 1; //CSaleBasket::GetList(array(),array("ORDER_ID" => $orderId),array());

if (!$ordersTotalWeight) $ordersTotalWeight = Option::get($moduleId, "massa");

$fields = [
    Loc::getMessage('KSE_BUSINESS_ORDER_INFO_ABOUT_OTPRAV'),
    [
        'ClientName',
        Loc::getMessage('KSE_BUSINESS_ORDER_DIALOG_NAIM'),
        $CompName,
        ['text', 40]
    ],
    [
        'geodata',
        Loc::getMessage('KSE_BUSINESS_ORDER_DIALOG_CITY'),
        $GorodZaboraGruza,
        ['selectbox', $arCities]
    ],
    [
        'adres_zabora',
        Loc::getMessage('KSE_BUSINESS_ORDER_DIALOG_ADDRZAB'),
        $AdresSaboraGruza,
        ['text', 40],
    ],  
    [
        'otprav_phone',
        Loc::getMessage('KSE_BUSINESS_ORDER_DIALOG_SENDPHONE'),
        $SenderContactPhone,
        ['text', 40],
    ],   
/*    
    [
        'Urgency',
        Loc::getMessage('KSE_BUSINESS_ORDER_DIALOG_URG'),
        $Urgency,
        ['text', 40],
    ], 
*/
    [
        'pickup_date',
        Loc::getMessage('KSE_BUSINESS_ORDER_DIALOG_DATEZAB'),
        date('Y-m-d'),
        ['selectbox', KseService::getDateEnumReq()],
    ],
/*    [
        'pickup_start_time',
        Loc::getMessage('KSE_BUSINESS_ORDER_DIALOG_PICKUP_SECTION_START_TIME'),
        $pickupWarehouse ? $pickupWarehouse->workStartTime : '',
        ['selectbox', KseService::getTimeEnum()],
    ],
*/    
    [
        'pickup_finish_time',
        Loc::getMessage('KSE_BUSINESS_ORDER_DIALOG_GRUZTIME'),
        $pickupWarehouse ? $pickupWarehouse->workFinishTime : '',
        ['selectbox', KseService::getTimeEnum()],
    ],
    
    [
        'total_qty',
        Loc::getMessage('KSE_BUSINESS_ORDER_DIALOG_GRUZMEST'),
        $TotalQty,
        ['text', 10],
    ],
    
    [
        'total_weight_kg',
        Loc::getMessage('KSE_BUSINESS_ORDER_DIALOG_ZAKW'),
        $ordersTotalWeight,
        ['text', 10],
    ],
    [
        'waybill_order',
        Loc::getMessage('KSE_BUSINESS_ORDER_DIALOG_DOCFORM'),
        'waybill',
        ['selectbox', array ('waybill'=>Loc::getMessage('KSE_BUSINESS_ORDER_DIALOG_DOCFORM_NAKL')/*,'order'=>Loc::getMessage('KSE_BUSINESS_ORDER_DIALOG_DOCFORM_NAKLZAK') */)],
    ],
/*
    [
        'backpayment_details',
        Loc::getMessage('KSE_BUSINESS_ORDER_DIALOG_ORDER_SECTION_BACKPAYMENT_DETAILS'),
        KseOptions::getDefaultBackpaymentDetails(),
        ['textarea', 5, 40],
    ],
    [
        'pickup_address',
        Loc::getMessage('KSE_BUSINESS_ORDER_DIALOG_PICKUP_SECTION_ADDRESS'),
        $pickupWarehouse ? $pickupWarehouse->address : '',
        ['text', 40],
    ],

    [
        'pickup_contact_name',
        Loc::getMessage('KSE_BUSINESS_ORDER_DIALOG_PICKUP_SECTION_CONTACT_NAME'),
        $pickupWarehouse ? $pickupWarehouse->contactName : '',
        ['text', 40],
    ],
    [
        'pickup_contact_phone',
        Loc::getMessage('KSE_BUSINESS_ORDER_DIALOG_PICKUP_SECTION_CONTACT_PHONE'),
        $pickupWarehouse ? $pickupWarehouse->contactPhone : '',
        ['text', 40],
    ],
    [
        'pickup_buyout_amount',
        Loc::getMessage('KSE_BUSINESS_ORDER_DIALOG_PICKUP_SECTION_BUYOUT_AMOUNT'),
        KseOptions::isBuyoutEnabled() ? $ordersTakingAmountSum : 0,
        ['text', 40],
    ],
    [
        'pickup_note',
        Loc::getMessage('KSE_BUSINESS_ORDER_DIALOG_PICKUP_SECTION_NOTE'),
        $pickupWarehouse ? $pickupWarehouse->note : '',
        ['textarea', 5, 40],
    ],
*/    
];

foreach ($orders as $i => $order) {
    $orderProps = new KseOrderProperties($order);
    $fields[] = Loc::getMessage('KSE_BUSINESS_ORDER_DIALOG_INFORM');
    $fields[] = [
        "delivery_address[{$i}]",
        Loc::getMessage('KSE_BUSINESS_ORDER_DIALOG_DELIVERY_SECTION_ADDRESS'),
        $orderProps->getDeliveryAddressWithCityPrefix(),
        ['text', 40],
    ];
    $fields[] = [
        "delivery_zip[{$i}]",
        Loc::getMessage('KSE_BUSINESS_ORDER_DIALOG_ZIPIND'),
        $orderZIP,
        ['text', 10],
    ];
    $fields[] = [
        "delivery_required_date[{$i}]",
        Loc::getMessage('KSE_BUSINESS_ORDER_DIALOG_DELIVERY_REQUIRED_DATE'),
        '',
        ['selectbox', KseService::getDateEnum()],
    ];
    /*$fields[] = [
        "delivery_required_start_time[{$i}]",
        Loc::getMessage('KSE_BUSINESS_ORDER_DIALOG_DELIVERY_REQUIRED_START_TIME'),
        date('H:i', strtotime($orderProps->getRequiredStartDatetime())),
        ['selectbox', KseService::getTimeEnum()],
    ];
    $fields[] = [
        "delivery_required_finish_time[{$i}]",
        Loc::getMessage('KSE_BUSINESS_ORDER_DIALOG_DELIVERY_REQUIRED_FINISH_TIME'),
        date('H:i', strtotime($orderProps->getRequiredFinishDatetime())),
        ['selectbox', KseService::getTimeEnum()],
    ];*/
    $fields[] = [
        "delivery_recipient_name[{$i}]",
        Loc::getMessage('KSE_BUSINESS_ORDER_DIALOG_DELIVERY_SECTION_RECIPIENT_NAME'),
        $orderProps->getRecipientName(),
        ['text', 40],
    ];
    $fields[] = [
        "delivery_recipient_phone[{$i}]",
        Loc::getMessage('KSE_BUSINESS_ORDER_DIALOG_DELIVERY_SECTION_RECIPIENT_PHONE'),
        $orderProps->getRecipientPhone(),
        ['text', 40],
    ];
    $fields[] = [
        "delivery_note[{$i}]",
        Loc::getMessage('KSE_BUSINESS_ORDER_DIALOG_DELIVERY_SECTION_NOTE'),
        $orderProps->getNoteWithPrefix(),
        ['textarea', 5, 40],
    ];
/*    
    $fields[] = [
        "delivery_taking_amount[{$i}]",
        Loc::getMessage('KSE_BUSINESS_ORDER_DIALOG_DELIVERY_TAKING_AMOUNT'),
        $orderProps->getTakingAmount(),
        ['text', 40],
    ];
*/    
    $fields[] = [
        "delivery_client_order_id[{$i}]",
        Loc::getMessage('KSE_BUSINESS_ORDER_DIALOG_DELIVERY_CLIENT_ORDER_ID'),
        $order->getId(),
        ['text', 20],
    ];
}     

?>


<div id="kse-business-order-dialog" class="adm-detail-content-wrap">
    <div class="adm-detail-content">
        <div class="adm-detail-content-item-block">
            <form action="/" method="post">           
                <table class="adm-detail-content-table edit-table">
                    <tbody>
                    <? foreach ($fields as $field) { ?>
                        <? if (!is_array($field)) { ?>
                            <tr class="heading">
                                <td colspan="2"><?= htmlspecialcharsbx($field) ?></td>
                            </tr>
                        <? } else { ?>
                            <tr>
                                <td class="adm-detail-content-cell-l" width="50%">
                                    <?= htmlspecialcharsbx($field[1]) ?>
                                </td>
                                <td class="adm-detail-content-cell-r" width="50%">
                                    <? if ($field[3][0] == 'text') { ?>
                                        <input size="<?= htmlspecialcharsbx($field[3][1]) ?>"
                                               maxlength="255"
                                               value="<?= htmlspecialcharsbx($field[2]) ?>"
                                               name="<?= htmlspecialcharsbx($field[0]) ?>"
                                               type="text"
                                        >
                                    <? } else if ($field[3][0] == 'textarea') { ?>
                                        <textarea rows="<?= htmlspecialcharsbx($field[3][1]) ?>"
                                                  cols="<?= htmlspecialcharsbx($field[3][2]) ?>"
                                                  name="<?= htmlspecialcharsbx($field[0]) ?>"
                                        ><?= htmlspecialcharsbx($field[2]) ?></textarea>
                                    <? } else if ($field[3][0] == 'selectbox') { ?>
                                        <? if ($field[0] == 'selected_pickup_warehouse_id') { ?>
                                            <select class="typeselect" name="selected_pickup_warehouse_id">
                                                <? foreach ($warehouses as $warehouse) { ?>
                                                    <option
                                                        value="<?= htmlspecialcharsbx($warehouse->id) ?>"
                                                        data-name="<?= htmlspecialcharsbx($warehouse->name) ?>"
                                                        data-address="<?= htmlspecialcharsbx($warehouse->address) ?>"
                                                        data-work-start-time="<?= htmlspecialcharsbx($warehouse->workStartTime) ?>"
                                                        data-work-finish-time="<?= htmlspecialcharsbx($warehouse->workFinishTime) ?>"
                                                        data-contact-name="<?= htmlspecialcharsbx($warehouse->contactName) ?>"
                                                        data-contact-phone="<?= htmlspecialcharsbx($warehouse->contactPhone) ?>"
                                                        data-note="<?= htmlspecialcharsbx($warehouse->note) ?>"
                                                    >
                                                        <?= htmlspecialcharsbx($warehouse->name) ?>
                                                    </option>
                                                <? } ?>
                                            </select>
                                        <? } else { ?>
                                            <?= SelectBoxFromArray($field[0], KseService::getBitrixSelectEnum($field[3][1]), $field[2]) ?>
                                        <? } ?>
                                    <? } ?>
                                </td>
                            </tr>
                        <? } ?>
                    <? } ?>
                    </tbody>
                </table>
            </form>
        </div>
    </div>
</div>
