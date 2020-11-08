<?
$MESS["YAKA_ORDER_INFO_BODY"] = "
email клиента - #USER_EMAIL#;
телефон клиента - #USER_PHONE#;
номер заказа - #ORDER_ID#;
сумма заказа - #ORDER_AMOUNT#;
время заказа - #ORDER_TIME#;
содержимое заказа - #ORDER_CONTENT#;
ссылка для оплаты - #PAYMENT_LINK#.

Сообщение сгенерировано автоматически.";

$MESS["YAKA_ORDER_DESC"] = "#ORDER_ID# - ID заказа
#ORDER_TIME# - время заказа 
#ORDER_AMOUNT# - сумма заказа
#ORDER_CONTENT# - содержимое заказа
#USER_EMAIL# - email клиента
#USER_PHONE# - телефон клиента
#ADMIN_EMAIL# - email администратора магазина
";

$MESS["YAKA_ORDER_ADD_NAME"] = "Новый заказ";
$MESS["YAKA_ORDER_ADD_SUBJECT"] = "#SITE_NAME#: Заказ #ORDER_ID# на сумму #ORDER_AMOUNT#";
$MESS["YAKA_ORDER_ADD_SUBJECT_CUSTOMER"] = "#SITE_NAME#: Ваш заказ #ORDER_ID# на сумму #ORDER_AMOUNT#";
$MESS["YAKA_ORDER_ADD_MESSAGE"] = "На сайте #SITE_NAME# оставлен заказ #ORDER_ID#:" . $MESS["YAKA_ORDER_INFO_BODY"];
$MESS["YAKA_ORDER_ADD_MESSAGE_CUSTOMER"] = "На сайте #SITE_NAME# ваш заказ #ORDER_ID# принят в обработку:" . $MESS["YAKA_ORDER_INFO_BODY"];

$MESS["YAKA_ORDER_PAID_NAME"] = "Заказ оплачен";
$MESS["YAKA_ORDER_PAID_SUBJECT"] = "#SITE_NAME#: Оплачен заказ #ORDER_ID# на сумму #ORDER_AMOUNT#";
$MESS["YAKA_ORDER_PAID_SUBJECT_CUSTOMER"] = "#SITE_NAME#: Оплачен ваш заказ #ORDER_ID# на сумму #ORDER_AMOUNT#";
$MESS["YAKA_ORDER_PAID_MESSAGE"] = "На сайте #SITE_NAME# оплачен заказ #ORDER_ID#:" . $MESS["YAKA_ORDER_INFO_BODY"];
$MESS["YAKA_ORDER_PAID_MESSAGE_CUSTOMER"] = "На сайте #SITE_NAME# оплачен ваш заказ #ORDER_ID#:" . $MESS["YAKA_ORDER_INFO_BODY"];

$MESS["YAKA_ORDER_CANCEL_NAME"] = "Заказ отменён";
$MESS["YAKA_ORDER_CANCEL_SUBJECT"] = "#SITE_NAME#: Отменён заказ #ORDER_ID# на сумму #ORDER_AMOUNT#";
$MESS["YAKA_ORDER_CANCEL_SUBJECT_CUSTOMER"] = "#SITE_NAME#: Отменён ваш заказ #ORDER_ID# на сумму #ORDER_AMOUNT#";
$MESS["YAKA_ORDER_CANCEL_MESSAGE"] = "На сайте #SITE_NAME# отменён заказ #ORDER_ID#:" . $MESS["YAKA_ORDER_INFO_BODY"];
$MESS["YAKA_ORDER_CANCEL_MESSAGE_CUSTOMER"] = "На сайте #SITE_NAME# отменён ваш заказ #ORDER_ID#:" . $MESS["YAKA_ORDER_INFO_BODY"];

$MESS["YAKA_ORDER_WAITING_NAME"] = "Заказ успешно оплачен и ждет вашего подтверждения";
$MESS["YAKA_ORDER_WAITING_SUBJECT"] = "#SITE_NAME#: Заказ #ORDER_ID# на сумму #ORDER_AMOUNT# успешно оплачен и ждет вашего подтверждения";
$MESS["YAKA_ORDER_WAITING_SUBJECT_CUSTOMER"] = "#SITE_NAME#: Ваш заказ #ORDER_ID# на сумму #ORDER_AMOUNT# успешно оплачен и ждет подтверждения продавцом";
$MESS["YAKA_ORDER_WAITING_MESSAGE"] = "На сайте #SITE_NAME# заказ #ORDER_ID# ждет подтверждения:" . $MESS["YAKA_ORDER_INFO_BODY"];
$MESS["YAKA_ORDER_WAITING_MESSAGE_CUSTOMER"] = "На сайте #SITE_NAME# ваш заказ #ORDER_ID# успешно оплачен и ждет подтверждения продавцом:" . $MESS["YAKA_ORDER_INFO_BODY"];