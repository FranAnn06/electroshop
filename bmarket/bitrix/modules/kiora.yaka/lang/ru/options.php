<?
$MESS ['YAKA_OPT_TITLE'] = "Настройки модуля Яндекс.Касса";
$MESS ['YAKA_OPT_TAB_MAIN'] = "Общие настройки";
$MESS ['YAKA_OPT_SHOPS_ID'] = "<strong>shopId</strong> (если несколько вводить через запятую)";
$MESS ['YAKA_OPT_TAB_TITLE'] = "Основные настройки магазина";
$MESS ['YAKA_OPT_SHOP_ID'] = "Идентификатор магазина в ЦПП (shopId)";
$MESS ['YAKA_OPT_API_TYPE'] = "Тип подключения к Яндекс.Кассе";
$MESS ['YAKA_OPT_API_TYPE_API'] = "протокол API";
$MESS ['YAKA_OPT_API_TYPE_HTTP'] = "протокол HTTP";
$MESS ['YAKA_OPT_SHOP_PASSWORD'] = "Секретный ключ";
$MESS ['YAKA_OPT_SHOP_PASSWORD2'] = "Пароль магазина (<strong>shopPassword</strong>)";
$MESS ['YAKA_OPT_SHOP_BACK_URL'] = "URL страницы возврата";
$MESS ['YAKA_OPT_SHOP_CURRENCY'] = 'Валюта в формате <a href="https://www.iso.org/iso-4217-currency-codes.html" target="__blank">ISO-4217</a>';
$MESS ['YAKA_OPT_SCID'] = "Номер витрины магазина в ЦПП (<strong>SCID</strong>)";
$MESS ['YAKA_OPT_SEND_CHECK_DATA'] = "Отправлять в Яндекс.Кассу данные для чеков (54-ФЗ)";
$MESS ['YAKA_OPT_WRITE_LOG'] = "Писать лог-файл";
$MESS ['YAKA_OPT_DEMO_MODE_TITLE'] = 'Тестовый режим';
$MESS ['YAKA_OPT_DEMO_MODE_OFF'] = 'Тестовый режим Выключен';
$MESS ['YAKA_OPT_DEMO_MODE_ON'] = '<span style="color:red;">Тестовый режим Включен</span>';
$MESS ['YAKA_OPT_DEMO_PAYMENTS'] = "Демо-платежи";
$MESS ['YAKA_OPT_IS_DEMO_PAYMENTS'] = "Магазин работает в демо режиме";

$MESS ['YAKA_OPT_SHOP_PAYMENT_VARIANT'] = "Выбор способа оплаты";
$MESS ['YAKA_OPT_SHOP_PAYMENT_VARIANT_DES'] = "<i>Cпособ оплаты можно будет определить в настройках компонента<br />платёжной формы модуля kiora.yandex.form.payment</i>";

$MESS ['YAKA_OPT_ADV_OPTS'] = "Дополнительные настройки";
$MESS ['YAKA_OPT_ADV_OPTS_SHOP_NAME'] = "Название магазина";
$MESS ['YAKA_OPT_ADV_OPTS_SHOP_NAME_DEFAULT'] = "Магазина №";
$MESS ['YAKA_OPT_ADV_OPTS_ADMIN_EMAIL'] = "Email администратора магазина для отправки уведомлений";


$MESS ['YAKA_OPT_LK'] = "Справочная информация";
$MESS ['YAKA_OPT_LK_HTTP_URL'] = "URL для HTTP протокола";
$MESS ['YAKA_OPT_LK_API_URL_TITLE'] = "URL для API протокола";
$MESS ['YAKA_OPT_LK_URL_WARNING'] = "Русскоязычные домены необходимо вбивать в кодировке <strong>Punycode</strong>, например для адреса \"русский-домен.рф\" получится - \"xn----htbdjfesjgolay.xn--p1ai\"";
$MESS ['YAKA_OPT_LK_TEST'] = "Тестовые режимы:";
$MESS ['YAKA_OPT_LK_CHECK_URL'] = "URL для уведомлений (его необходимо ввести в ЛК Яндекс.Кассы)";
$MESS ['YAKA_OPT_LK_RESULT_URL'] = "Страница на которую вернётся пользователь после оплаты";
$MESS ['YAKA_OPT_LK_TEST_TEXT'] = "<h4>Для HTTP протокола</h4>"
        . "<p>Убедитесь у менеджера Яндекс.Кассы что ваш магазин работает в тестовом режиме,"
        . " отметьте опцию 'Демо-платежи', заполните поле 'Демо-номер витрины магазина',"
        . " для проверки платежей используйте тестовую банковскую карту 4444&nbsp;4444&nbsp;4444&nbsp;4448, дата любая в будущем, cvc&nbsp;000, <a href='https://kassa.yandex.ru/tech/examples/examples-payment.html'>подробнее</a>.</p>"
        . "<h4>Для API протокола</h4>"
        . "<p>Для работы в тестовом режиме, в случае подключения по API протоколу, "
        . "необходимо в Личном кабинете Яндекс.Кассы добавить тестовый магазин со своим индивидуальным shopId"
        . " и сгенерировать для него Секретный ключ, таким образом платежи поступившие на этот shopId будут считаться тестовыми, режим работы модуля"
        . " определяется автоматически по выданному ключу,"
        . " проверять платежи необходимо тестовой картой 4111&nbsp;1111&nbsp;1111&nbsp;1111, cvc&nbsp;000,"
        . " дата карты любая в будущем. Проверить передачу данных для чека в таком режиме пока нельзя, <a href='https://kassa.yandex.ru/developers/using-api/testing'>подробнее</a>.</p>"
        . "<p>Кроме файла лога, часть отладочной информации пишется в базу данных в таблицу <strong><a href='/bitrix/admin/perfmon_table.php?lang=ru&table_name=ki_pay_system_err_log'>ki_pay_system_err_log</a></strong></p>"
        . "<h4>Внимание!</h4>"
        . "<p>Статус платежа должен меняться после оплаты автоматически, вне зависимости от того вернулся пользователь на страницу магазина или нет. "
        . "Если этого не происходит значит забыли заполнить в ЛК Яндекс.Кассы поле <strong>URL для уведомлений</strong> или <strong>Check url & Aviso url</strong></p>"
        . "<p>Рекомендовано делать для тестового и боевго магазина отдельные вкладки, так будет возможность оперативно переключать компонент платёжной формы на работу в разных режимах.</p>";
$MESS ['YAKA_OPT_ADV_FIELDS'] = "Отображать в таблице платежей служебные поля";
$MESS ['YAKA_OPT_DEMO_SCID'] = "Демо-номер витрины магазина в ЦПП (SCID)";

$MESS["YAKA_OPT_SEND_CHECK"] = "Передача данных для чека";

$MESS ['YAKA_OPT_EMAIL_EVENT'] = "Почтовые события";
$MESS ['YAKA_OPT_EMAIL_EVENT_ADD'] = "Добавление заказа";
$MESS ['YAKA_OPT_EMAIL_EVENT_PAID'] = "Оплата заказа";
$MESS ['YAKA_OPT_EMAIL_EVENT_CANCEL'] = "Отмена заказа";
$MESS ['YAKA_OPT_EMAIL_EVENT_WAITING'] = "Заказа ждет подтверждения";


$MESS ['YAKA_OPT_ACCESS'] = "Доступ";
 
$MESS ['YAKA_OPT_FORM_SAVE'] = "Сохранить";
$MESS ['YAKA_OPT_FORM_APPLY'] = "Применить";
$MESS ['YAKA_OPT_FORM_CANCEL'] = "Отменить";
