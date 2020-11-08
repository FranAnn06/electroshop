<?
$langs = CLanguage::GetList(($b=""), ($o=""));
while($lang = $langs->Fetch())
{
    IncludeModuleLangFile(__FILE__, $lang["LID"]);


    $eventType = new CEventType;
    
    //add YAKA_ORDER_ADD =====================        
    $db_events = CEventType::GetList(array("EVENT_NAME" => "YAKA_ORDER_ADD", "LID" => $lang["LID"]));
    if (!$db_events->Fetch()){
        $eventType->Add(array(
            "LID" => $lang["LID"],
            "EVENT_NAME" => "YAKA_ORDER_ADD",
            "NAME" => GetMessage("YAKA_ORDER_ADD_NAME"),
            "DESCRIPTION" => GetMessage("YAKA_ORDER_DESC")
        ));
    }

    //add YAKA_ORDER_PAID =====================
    $db_events = CEventType::GetList(array("EVENT_NAME" => "YAKA_ORDER_PAID", "LID" => $lang["LID"]));
    if (!$db_events->Fetch()){
        $eventType->Add(array(
            "LID" => $lang["LID"],
            "EVENT_NAME" => "YAKA_ORDER_PAID",
            "NAME" => GetMessage("YAKA_ORDER_PAID_NAME"),
            "DESCRIPTION" => GetMessage("YAKA_ORDER_DESC")
        ));
    }

    //add YAKA_ORDER_CANCEL =====================
    $db_events = CEventType::GetList(array("EVENT_NAME" => "YAKA_ORDER_CANCEL", "LID" => $lang["LID"]));
    if (!$db_events->Fetch()){    
        $eventType->Add(array(
            "LID" => $lang["LID"],
            "EVENT_NAME" => "YAKA_ORDER_CANCEL",
            "NAME" => GetMessage("YAKA_ORDER_CANCEL_NAME"),
            "DESCRIPTION" => GetMessage("YAKA_ORDER_DESC")
        ));
    }

    //add YAKA_ORDER_WAITING =====================
    $db_events = CEventType::GetList(array("EVENT_NAME" => "YAKA_ORDER_WAITING", "LID" => $lang["LID"]));
    if (!$db_events->Fetch()){    
        $eventType->Add(array(
            "LID" => $lang["LID"],
            "EVENT_NAME" => "YAKA_ORDER_WAITING",
            "NAME" => GetMessage("YAKA_ORDER_WAITING_NAME"),
            "DESCRIPTION" => GetMessage("YAKA_ORDER_DESC")
        ));
    }


    $arSites = array();
    $sites = CSite::GetList(($b=""), ($o=""), Array("LANGUAGE_ID"=>$lang["LID"]));
    while ($site = $sites->Fetch()){
        $arSites[] = $site["LID"];
    }

    if(count($arSites) > 0) 
    {
        $eventMessage = new CEventMessage;

        //add YAKA_ORDER_ADD =====================
        $eventMessage->Add(array(
            "ACTIVE" => "Y",
            "EVENT_NAME" => "YAKA_ORDER_ADD",
            "LID" => $arSites,
            "EMAIL_FROM" => "#DEFAULT_EMAIL_FROM#",
            "EMAIL_TO" => "#ADMIN_EMAIL#",
            "SUBJECT" => GetMessage("YAKA_ORDER_ADD_SUBJECT"),
            "MESSAGE" => GetMessage("YAKA_ORDER_ADD_MESSAGE"),
            "BODY_TYPE" => "text",
        ));
        $eventMessage->Add(array(
            "ACTIVE" => "Y",
            "EVENT_NAME" => "YAKA_ORDER_ADD",
            "LID" => $arSites,
            "EMAIL_FROM" => "#DEFAULT_EMAIL_FROM#",
            "EMAIL_TO" => "#USER_EMAIL#",
            "SUBJECT" => GetMessage("YAKA_ORDER_ADD_SUBJECT_CUSTOMER"),
            "MESSAGE" => GetMessage("YAKA_ORDER_ADD_MESSAGE_CUSTOMER"),
            "BODY_TYPE" => "text",
        ));

        //add YAKA_ORDER_PAID =====================
        $eventMessage->Add(array(
            "ACTIVE" => "Y",
            "EVENT_NAME" => "YAKA_ORDER_PAID",
            "LID" => $arSites,
            "EMAIL_FROM" => "#DEFAULT_EMAIL_FROM#",
            "EMAIL_TO" => "#ADMIN_EMAIL#",
            "SUBJECT" => GetMessage("YAKA_ORDER_PAID_SUBJECT"),
            "MESSAGE" => GetMessage("YAKA_ORDER_PAID_MESSAGE"),
            "BODY_TYPE" => "text",
        ));
        $eventMessage->Add(array(
            "ACTIVE" => "Y",
            "EVENT_NAME" => "YAKA_ORDER_PAID",
            "LID" => $arSites,
            "EMAIL_FROM" => "#DEFAULT_EMAIL_FROM#",
            "EMAIL_TO" => "#USER_EMAIL#",
            "SUBJECT" => GetMessage("YAKA_ORDER_PAID_SUBJECT_CUSTOMER"),
            "MESSAGE" => GetMessage("YAKA_ORDER_PAID_MESSAGE_CUSTOMER"),
            "BODY_TYPE" => "text",
        ));

        //add YAKA_ORDER_CANCEL =====================
        $eventMessage->Add(array(
            "ACTIVE" => "Y",
            "EVENT_NAME" => "YAKA_ORDER_CANCEL",
            "LID" => $arSites,
            "EMAIL_FROM" => "#DEFAULT_EMAIL_FROM#",
            "EMAIL_TO" => "#ADMIN_EMAIL#",
            "SUBJECT" => GetMessage("YAKA_ORDER_CANCEL_SUBJECT"),
            "MESSAGE" => GetMessage("YAKA_ORDER_CANCEL_MESSAGE"),
            "BODY_TYPE" => "text",
        ));
        $eventMessage->Add(array(
            "ACTIVE" => "Y",
            "EVENT_NAME" => "YAKA_ORDER_CANCEL",
            "LID" => $arSites,
            "EMAIL_FROM" => "#DEFAULT_EMAIL_FROM#",
            "EMAIL_TO" => "#USER_EMAIL#",
            "SUBJECT" => GetMessage("YAKA_ORDER_CANCEL_SUBJECT_CUSTOMER"),
            "MESSAGE" => GetMessage("YAKA_ORDER_CANCEL_MESSAGE_CUSTOMER"),
            "BODY_TYPE" => "text",
        ));

        //add YAKA_ORDER_WAITING =====================
        $eventMessage->Add(array(
            "ACTIVE" => "Y",
            "EVENT_NAME" => "YAKA_ORDER_WAITING",
            "LID" => $arSites,
            "EMAIL_FROM" => "#DEFAULT_EMAIL_FROM#",
            "EMAIL_TO" => "#ADMIN_EMAIL#",
            "SUBJECT" => GetMessage("YAKA_ORDER_WAITING_SUBJECT"),
            "MESSAGE" => GetMessage("YAKA_ORDER_WAITING_MESSAGE"),
            "BODY_TYPE" => "text",
        ));
        $eventMessage->Add(array(
            "ACTIVE" => "Y",
            "EVENT_NAME" => "YAKA_ORDER_WAITING",
            "LID" => $arSites,
            "EMAIL_FROM" => "#DEFAULT_EMAIL_FROM#",
            "EMAIL_TO" => "#USER_EMAIL#",
            "SUBJECT" => GetMessage("YAKA_ORDER_WAITING_SUBJECT_CUSTOMER"),
            "MESSAGE" => GetMessage("YAKA_ORDER_WAITING_MESSAGE_CUSTOMER"),
            "BODY_TYPE" => "text",
        ));
    }

}