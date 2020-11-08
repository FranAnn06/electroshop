<?php

use Bitrix\Main\Config\Option;

//use KseService;

class KseOptions
{
    private static $defaultVehicleTypeId = 6;

    public static function getVehicleTypesEnum(): array
    {
        DvLoc::includeGeneralLangFile();

        return [
            '6' => DvLoc::getMessage('KSE_BUSINESS_VEHICLE_TYPE_WALK'),
            '7' => DvLoc::getMessage('KSE_BUSINESS_VEHICLE_TYPE_CAR'),
            '1' => DvLoc::getMessage('KSE_BUSINESS_VEHICLE_TYPE_PICKUP'),
            '2' => DvLoc::getMessage('KSE_BUSINESS_VEHICLE_TYPE_MINIVAN'),
            '3' => DvLoc::getMessage('KSE_BUSINESS_VEHICLE_TYPE_PORTER'),
            '4' => DvLoc::getMessage('KSE_BUSINESS_VEHICLE_TYPE_VAN'),
        ];
    }

    public static function getAuthToken(): string
    {
        return Option::get(KseService::getModuleId(), 'auth_token');
    }

    public static function getApiUrl(): string
    {
        return Option::get(KseService::getModuleId(), 'api_url', 'https://robot.dostavista.ru/api/business');
    }

    public static function getApiCallbackSecretKey(): string
    {
        return Option::get(KseService::getModuleId(), 'api_callback_secret_key', '');
    }

    public static function getDefaultPickupWarehouseId(): int
    {
        return (int) Option::get(KseService::getModuleId(), 'default_pickup_warehouse_Id');
    }

    public static function getDefaultWeightKg(): int
    {
        return max(0, (int) Option::get(KseService::getModuleId(), 'default_weight_kg', '1'));
    }

    public static function getDefaultMatter(): string
    {
        return trim(Option::get(KseService::getModuleId(), 'default_matter'));
    }

    public static function getDostavistaPaymentMarkupAmount(): int
    {
        return max(0, (int) Option::get(KseService::getModuleId(), 'kse_payment_markup_amount', '0'));
    }

    public static function getDostavistaPaymentDiscountAmount(): int
    {
        return max(0, (int) Option::get(KseService::getModuleId(), 'kse_payment_discount_amount', '0'));
    }

    public static function getFreeDeliveryBitrixOrderSum(): int
    {
        return max(0, (int) Option::get(KseService::getModuleId(), 'free_delivery_bitrix_order_sum'));
    }

    public static function getDeliveryFixPrice(): int
    {
        return max(0, (int) Option::get(KseService::getModuleId(), 'delivery_fix_price'));
    }

    public static function getDefaultBackpaymentDetails(): string
    {
        return trim(Option::get(KseService::getModuleId(), 'default_backpayment_details'));
    }

    public static function isInsuranceEnabled(): bool
    {
        return Option::get(KseService::getModuleId(), 'insurance_enabled', 'Y') == 'Y';
    }

    public static function isBuyoutEnabled(): bool
    {
        return Option::get(KseService::getModuleId(), 'buyout_enabled', 'N') == 'Y';
    }

    public static function getDefaultVehicleTypeId(): int
    {
        return (int) Option::get(KseService::getModuleId(), 'default_vehicle_type_id', static::$defaultVehicleTypeId);
    }

    public static function getOrderProcessingTimeHours(): int
    {
        return max(0, (int) Option::get(KseService::getModuleId(), 'order_processing_time_hours', '2'));
    }

    public static function getDeliveryPointNotePrefix(): string
    {
        return trim(Option::get(KseService::getModuleId(), 'delivery_point_note_prefix'));
    }

    public static function isMatterWeightPrefixEnabled(): bool
    {
        return Option::get(KseService::getModuleId(), 'matter_weight_prefix_enabled', 'N') == 'Y';
    }

    public static function getIntegrationOrderStatusNew(): string
    {
        return Option::get(KseService::getModuleId(), 'integration_order_status_new', '');
    }

    public static function getIntegrationOrderStatusAvailable(): string
    {
        return Option::get(KseService::getModuleId(), 'integration_order_status_available', '');
    }

    public static function getIntegrationOrderStatusActive(): string
    {
        return Option::get(KseService::getModuleId(), 'integration_order_status_active', '');
    }

    public static function getIntegrationOrderStatusCompleted(): string
    {
        return Option::get(KseService::getModuleId(), 'integration_order_status_completed', '');
    }

    public static function getIntegrationOrderStatusCanceled(): string
    {
        return Option::get(KseService::getModuleId(), 'integration_order_status_canceled', '');
    }

    public static function getIntegrationShipmentStatusNew(): string
    {
        return Option::get(KseService::getModuleId(), 'integration_shipment_status_new', '');
    }

    public static function getIntegrationShipmentStatusAvailable(): string
    {
        return Option::get(KseService::getModuleId(), 'integration_shipment_status_available', '');
    }

    public static function getIntegrationShipmentStatusActive(): string
    {
        return Option::get(KseService::getModuleId(), 'integration_shipment_status_active', '');
    }

    public static function getIntegrationShipmentStatusCompleted(): string
    {
        return Option::get(KseService::getModuleId(), 'integration_shipment_status_completed', '');
    }

    public static function getIntegrationShipmentStatusCanceled(): string
    {
        return Option::get(KseService::getModuleId(), 'integration_shipment_status_canceled', '');
    }

    public static function getBitrixSaleAddressField(): string
    {
        return Option::get(KseService::getModuleId(), 'bitrix_sale_address_field', 'ADDRESS');
    }

    public static function getBitrixSaleRequiredDateField(): string
    {
        return Option::get(KseService::getModuleId(), 'bitrix_sale_required_date_field', 'DELIVERY_REQUIRED_DATE');
    }

    public static function getBitrixSaleRequiredStartTimeField(): string
    {
        return Option::get(KseService::getModuleId(), 'bitrix_sale_required_start_time_field', 'DELIVERY_REQUIRED_START_TIME');
    }

    public static function getBitrixSaleRequiredFinishTimeField(): string
    {
        return Option::get(KseService::getModuleId(), 'bitrix_sale_required_time_field', 'DELIVERY_REQUIRED_TIME');
    }

    public static function getBitrixSaleRecipientNameField(): string
    {
        return Option::get(KseService::getModuleId(), 'bitrix_sale_recipient_name_field', 'FIO');
    }

    public static function getBitrixSaleRecipientPhoneField(): string
    {
        return Option::get(KseService::getModuleId(), 'bitrix_sale_recipient_phone_field', 'PHONE');
    }
    
    public static function getBitrixDostavistaOrderIdField(): string
    {
        return Option::get(KseService::getModuleId(), 'bitrix_sale_kse_order_id_field', 'kse_ORDER_ID');
    }

    public static function getBitrixDostavistaCourierField(): string
    {
        return Option::get(KseService::getModuleId(), 'bitrix_sale_kse_courier_field', 'kse_COURIER');
    }

    public static function getBitrixDostavistaCityField(): string
    {
        return Option::get(KseService::getModuleId(), 'bitrix_sale_kse_city_field', '');
    }

    public static function isBitrixSaleCheckoutDostavistaJsIncluded(): bool
    {
        return Option::get(KseService::getModuleId(), 'bitrix_sale_checkout_kse_js_included', 'N') == 'Y';
    }
}
