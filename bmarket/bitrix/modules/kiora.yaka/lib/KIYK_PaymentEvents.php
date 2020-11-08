<?php

namespace Kiora\Payments;

class KIYK_PaymentEvents {
    
    public static function GetShopAdminEmail($shop_id){
        $admin_email = Settings::getOption('shop_email', $shop_id);
        
        if(!$admin_email || $admin_email == '#DEFAULT_EMAIL_FROM#')
            $admin_email = \COption::GetOptionString("main", "email_from");
        
        return $admin_email;
    }

    public static function OrderAdd(\Bitrix\Main\Event $event) {
        $data = $event->getParameters();

        $shop_id = $data['REQUEST']['shopId'];
        $api_type = Settings::getOption('API_TYPE', $shop_id);
        $email_event_add = Settings::getOption('email_event_add', $shop_id);
        $admin_email = self::GetShopAdminEmail($shop_id);
        

        if ($email_event_add == 'Y' && $api_type == 'http') {

            $arEventFields = array(
                "ORDER_ID" => $data['orderId'],
                "ORDER_TIME" => date("d.m.Y H:i"),
                "ORDER_AMOUNT" => $data['REQUEST']['sum'],
                "ORDER_CONTENT" => \KIUtils::ConvertEncoding($data['REQUEST']['order_content']),
                "USER_EMAIL" => $data['REQUEST']['user_email'],
                "USER_PHONE" => $data['REQUEST']['user_phone'],
                "ADMIN_EMAIL" => $admin_email,
                "PAYMENT_LINK" => "---",
            );

            $result = \CEvent::Send("YAKA_ORDER_ADD", $data['REQUEST']['SITE_LID'], $arEventFields, "N");
            if(!$result) \KIUtils::error('FAIL Send YAKA_ORDER_ADD');
        }
    }

    
    //add order for $api_type = 'api'
    public static function PaymentGetYInvoiceId(\Bitrix\Main\Event $event) {
        $data = $event->getParameters();

        $shop_id = $data['REQUEST']['shopId'];
        $email_event_add = Settings::getOption('email_event_add', $shop_id);
        $admin_email = self::GetShopAdminEmail($shop_id);

        if ($email_event_add == 'Y') {

            $arEventFields = array(
                "ORDER_ID" => $data['orderId'],
                "ORDER_TIME" => date("d.m.Y H:i"),
                "ORDER_AMOUNT" => $data['REQUEST']['sum'],
                "ORDER_CONTENT" => \KIUtils::ConvertEncoding($data['REQUEST']['order_content']),
                "USER_EMAIL" => $data['REQUEST']['user_email'],
                "USER_PHONE" => $data['REQUEST']['user_phone'],
                "ADMIN_EMAIL" => $admin_email,
                "PAYMENT_LINK" => $data['REQUEST']['confirmation_url'],
            );

            $result = \CEvent::Send("YAKA_ORDER_ADD", $data['REQUEST']['SITE_LID'], $arEventFields, "N");
            if(!$result) \KIUtils::error('FAIL Send YAKA_ORDER_ADD');
        }
    }

    public static function OrderWait(\Bitrix\Main\Event $event) {
        $data = $event->getParameters();

        $shop_id = $data['ORDER']['Y_SHOP_ID'];
        $api_type = Settings::getOption('API_TYPE', $shop_id);
        $email_event_wait = Settings::getOption('email_event_waiting', $shop_id);
        $admin_email = self::GetShopAdminEmail($shop_id);

        if ($email_event_wait == 'Y' && $api_type == 'api') {

            $arEventFields = array(
                "ORDER_ID" => $data['ORDER']['ORDER_ID'],
                "ORDER_TIME" => $data['ORDER']['ORDER_DATE_TIME']->toString(),
                "ORDER_AMOUNT" => $data['ORDER']['ORDER_AMOUNT'],
                "ORDER_CONTENT" => $data['ORDER']['ORDER_CONTENT'],
                "USER_EMAIL" => $data['ORDER']['USER_EMAIL'],
                "USER_PHONE" => $data['ORDER']['USER_PHONE'],
                "ADMIN_EMAIL" => $admin_email,
            );

            $result = \CEvent::Send("YAKA_ORDER_WAITING", $data['ORDER']['SITE_LID'], $arEventFields, "N");
            if(!$result) \KIUtils::error('FAIL Send YAKA_ORDER_WAITING');
        }
    }

    public static function OrderPayed(\Bitrix\Main\Event $event) {
        $data = $event->getParameters();

        $shop_id = $data['ORDER']['Y_SHOP_ID'];
        $email_event_paid = Settings::getOption('email_event_paid', $shop_id);
        $admin_email = self::GetShopAdminEmail($shop_id);

        if ($email_event_paid == 'Y') {

            $arEventFields = array(
                "ORDER_ID" => $data['ORDER']['ORDER_ID'],
                "ORDER_TIME" => $data['ORDER']['ORDER_DATE_TIME']->toString(),
                "ORDER_AMOUNT" => $data['ORDER']['ORDER_AMOUNT'],
                "ORDER_CONTENT" => $data['ORDER']['ORDER_CONTENT'],
                "USER_EMAIL" => $data['ORDER']['USER_EMAIL'],
                "USER_PHONE" => $data['ORDER']['USER_PHONE'],
                "ADMIN_EMAIL" => $admin_email,
            );

            $result = \CEvent::Send("YAKA_ORDER_PAID", $data['ORDER']['SITE_LID'], $arEventFields, "N");
            if(!$result) \KIUtils::error('FAIL Send YAKA_ORDER_PAID');
        }

        //add check for Kiora.Cashbox
        $sendCheck = Settings::getOption('send_check_data', $shop_id);
        
        if (\Bitrix\Main\Loader::includeModule('kiora.cashbox') && $sendCheck != 'Y') {

            $payment['TYPE'] = 'sell';
            $payment['ORDER_ID'] = $data['ORDER']['ORDER_ID'];
            $payment['SUM'] = $data['ORDER']['ORDER_AMOUNT'];
            $payment['CURRENCY'] = 'RUB';
            $payment['CONTENT'] = $data['ORDER']['ORDER_CONTENT'];
            $payment['EMAIL'] = $data['ORDER']['USER_EMAIL'];
            if ($data['ORDER']['USER_PHONE']) $payment['PHONE'] = $data['ORDER']['USER_PHONE'];

            \Kiora\Cashbox\CheckManager::addCheck($payment);
        }
    }

    public static function OrderCancel(\Bitrix\Main\Event $event) {
        $data = $event->getParameters();

        $shop_id = $data['ORDER']['Y_SHOP_ID'];
        $email_event_cancel = Settings::getOption('email_event_cancel', $shop_id);
        $admin_email = self::GetShopAdminEmail($shop_id);

        if ($email_event_cancel == 'Y') {

            $arEventFields = array(
                "ORDER_ID" => $data['ORDER']['ORDER_ID'],
                "ORDER_TIME" => $data['ORDER']['ORDER_DATE_TIME']->toString(),
                "ORDER_AMOUNT" => $data['ORDER']['ORDER_AMOUNT'],
                "ORDER_CONTENT" => $data['ORDER']['ORDER_CONTENT'],
                "USER_EMAIL" => $data['ORDER']['USER_EMAIL'],
                "USER_PHONE" => $data['ORDER']['USER_PHONE'],
                "ADMIN_EMAIL" => $admin_email,
            );

            $result = \CEvent::Send("YAKA_ORDER_CANCEL", $data['ORDER']['SITE_LID'], $arEventFields, "N");
            if(!$result) \KIUtils::error('FAIL Send YAKA_ORDER_CANCEL');
        }
    }
}
