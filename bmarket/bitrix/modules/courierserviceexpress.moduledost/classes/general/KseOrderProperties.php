<?php

//use KseService;

use Bitrix\Main\Loader;
use Bitrix\Main\ObjectNotFoundException;
use Bitrix\Sale\BasketItem;
use Bitrix\Sale\Location\LocationTable;
use Bitrix\Sale\Order;
use Bitrix\Sale\PaySystem\Manager;
use Bitrix\Sale\PropertyValue;
//use CIBlockElement;
//use CIBlockSection;

class KseOrderProperties
{
    /** @var string[] */
    public $propertiesByCode;

    /** @var Order */
    public $order;

    public function __construct(Order $order)
    {
        $this->order = $order;

        $propertyCollection     = $order->getPropertyCollection();
        $this->propertiesByCode = [];
        foreach ($propertyCollection as $propertyItem) {
            if (!empty($propertyItem->getField('CODE'))) {
                $this->propertiesByCode[$propertyItem->getField('CODE')] = $propertyItem->getField('VALUE');
            }
        }
    }

    public function getMatter(): string
    {
        Loader::includeModule('iblock');

        $elementIds   = [];
        $sectionNames = [];

        /** @var BasketItem $basketItem */
        foreach ($this->order->getBasket()->getBasketItems() as $basketItem) {
            $elementIds[] = $basketItem->getProductId();
        }

        $elementsDbResult = CIBlockElement::GetElementGroups($elementIds, true);
        while ($sectionData = $elementsDbResult->Fetch()) {
            $sectionNames[] = $sectionData['NAME'];
        }

        if ($sectionNames) {
            $sectionNames = array_unique($sectionNames);
            return join(', ', $sectionNames);
        } else {
            $basketItem = $this->order->getBasket()->getItemByIndex(0);
            if ($basketItem === null) {
                return '';
            }

            return $basketItem->getFieldValues()['NAME'] ?? '';
        }
    }

    public function getTotalWeight(): float
    {
        $WeightBasket = round($this->order->getBasket()->getWeight() / 1000,2);
        $basketItems = $this->order->getBasket()->getBasketItems();
        foreach ($basketItems as $basketItem) {
            $quant = $basketItem->getField('QUANTITY');
            $item = \CCatalogProduct::GetByID($basketItem->getField('PRODUCT_ID'));
            $objWeight += round(($item['WIDTH']/10 * $item['LENGTH']/10 * $item['HEIGHT']/10) / 5000 * $quant,2);
        }        
        if ($objWeight > $WeightBasket) $WeightBasket = $objWeight;
        return $WeightBasket;
    }

    public function getDeliveryAddress(): string
    {
        return $this->propertiesByCode[KseOptions::getBitrixSaleAddressField()] ?? '';
    }

    public function getDeliveryAddressWithCityPrefix(): string
    {
        $isUtf8 = in_array(strtolower(ini_get('default_charset')), ['utf8', 'utf-8']);

        $deliveryAddress = $this->getDeliveryAddress();

        $city = $this->getCityTitle();
        if ($city) {
            $lowerCity            = $isUtf8 ? mb_strtolower($city) : strtolower($city);
            $lowerDeliveryAddress = $isUtf8 ? mb_strtolower($deliveryAddress) : strtolower($deliveryAddress);

            if (strpos($lowerDeliveryAddress, $lowerCity) === false) {
                $deliveryAddress = $city . ', ' . $deliveryAddress;
            }
        }

        return $deliveryAddress;
    }

    public function getRecipientName(): string
    {
        return $this->propertiesByCode[KseOptions::getBitrixSaleRecipientNameField()] ?? '';
    }

    public function getRecipientPhone(): string
    {
        return $this->propertiesByCode[KseOptions::getBitrixSaleRecipientPhoneField()] ?? '';
    }
    
    public function getNote(): string
    {
        return $this->order->getFieldValues()['USER_DESCRIPTION'] ?? '';
    }

    public function getNoteWithPrefix(): string
    {
        $noteParts = [];

        if (KseOptions::getDeliveryPointNotePrefix()) {
            $noteParts[] = KseOptions::getDeliveryPointNotePrefix();
        }

        $noteParts[] = $this->getNote();

        return trim(join(' ', $noteParts));
    }

    /**
     * @return string ISO 8601
     */
    public function getRequiredStartDatetime(): string
    {
        $date = $day[$this->propertiesByCode[KseOptions::getBitrixSaleRequiredDateField()]] ?? 'today';

        if (
            isset($this->propertiesByCode[KseOptions::getBitrixSaleRequiredStartTimeField()])
            && $this->propertiesByCode[KseOptions::getBitrixSaleRequiredStartTimeField()]
        ) {
            $time = date('H:i', strtotime($this->propertiesByCode[KseOptions::getBitrixSaleRequiredStartTimeField()] . ':00'));
            $requiredStartTime = strtotime("{$date} {$time}");
        } else {
            $requiredFinishTime = strtotime($this->getRequiredFinishDatetime());
            $requiredStartTime  = strtotime('-4 hours', $requiredFinishTime);
            if ($requiredStartTime < time()) {
                $requiredStartTime = strtotime('-1 hour', $requiredFinishTime);
            }
        }

        return date('c', $requiredStartTime);
    }

    /**
     * @return string ISO 8601
     */
    public function getRequiredFinishDatetime(): string
    {
        $day   = [
            'today'          => 'today',
            'tomorrow'       => '+1 day',
            'after_tomorrow' => '+2 days',
        ];
        $date = $day[$this->propertiesByCode[KseOptions::getBitrixSaleRequiredDateField()]] ?? 'today';

        $requiredFinishTime = strtotime("{$date} 20 hours");

        $orderProcessingTimeHours = KseOptions::getOrderProcessingTimeHours();
        if (
            isset($this->propertiesByCode[KseOptions::getBitrixSaleRequiredFinishTimeField()])
            && $this->propertiesByCode[KseOptions::getBitrixSaleRequiredFinishTimeField()]
        ) {
            $time = date('H:i', strtotime($this->propertiesByCode[KseOptions::getBitrixSaleRequiredFinishTimeField()] . ':00'));
            $requiredFinishTime = strtotime("{$date} {$time}");
        } elseif ($orderProcessingTimeHours && $date === 'today') {
            $requiredFinishTime = strtotime("now +{$orderProcessingTimeHours} hours");
        }

        return date('c', $requiredFinishTime);
    }

    /**
     * Можно использовать, когда заказ уже создан,
     * и когда стоимость доставки заказа уже посчитана с учетом дисконта и наценки
     *
     * @return float
     * @throws ObjectNotFoundException
     */
    public function getTakingAmount(): float
    {
        $paymentSystemId = reset($this->order->getPaymentSystemId());
        if ($paymentSystemId) {
            $paymentService = Manager::getObjectById($paymentSystemId);
            if ($paymentService && $paymentService->isCash()) {
                $takingAmount = $this->order->getPrice();
                return $takingAmount;
            }
        }

        return (float) 0;
    }

    public function saveKseOrderId(string $orderId)
    {
        $propertyCollection = $this->order->getPropertyCollection();
        foreach ($propertyCollection as $propertyItem) {
            /** @var PropertyValue $propertyItem */
            if (
                !empty($propertyItem->getField('CODE'))
                && $propertyItem->getField('CODE') == KseOptions::getBitrixKseOrderIdField()
            ) {
                $propertyItem->setValue($orderId);
                $propertyItem->save();
            }
        }
    }

    public function saveKseCourier(string $courierData)
    {
        $propertyCollection = $this->order->getPropertyCollection();
        foreach ($propertyCollection as $propertyItem) {
            /** @var PropertyValue $propertyItem */
            if (
                !empty($propertyItem->getField('CODE'))
                && $propertyItem->getField('CODE') == KseOptions::getBitrixKseCourierField()
            ) {
                $propertyItem->setValue($courierData);
                $propertyItem->save();
            }
        }
    }

    public function getKseOrderId(): string
    {
        return $this->propertiesByCode[KseOptions::getBitrixKseOrderIdField()] ?? '';
    }

    public function getKseCourier(): string
    {
        return $this->propertiesByCode[KseOptions::getBitrixKseCourierField()] ?? '';
    }

    private function getCityTitle(): string
    {
        $cityTitle = '';

        $locationCode = $this->propertiesByCode['LOCATION'] ?? '';
        if ($locationCode) {
            $locationDbResult = LocationTable::getList(
                [
                    'filter' => ['CODE' => $locationCode],
                    'select' => ['ID', 'CODE', 'NAME_RU' => 'NAME.NAME']
                ]
            );
            $locationData = $locationDbResult->fetch();
            if ($locationData) {
                $cityTitle = $locationData['NAME_RU'];
            }
        }

        if (!$cityTitle && KseOptions::getBitrixKseCityField()) {
            $cityFieldValue = $this->propertiesByCode[KseOptions::getBitrixKseCityField()] ?? '';
            if ($cityFieldValue) {
                $cityTitle = $cityFieldValue;
            }
        }

        return $cityTitle;
    }
}
