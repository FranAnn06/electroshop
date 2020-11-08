<?if(!defined("B_PROLOG_INCLUDED")||B_PROLOG_INCLUDED!==true)die();

$arTemplateParameters = array(


        "MODAL_TEXT" => array(
            "NAME" => GetMessage("MODAL_TEXT"),
            "TYPE" => "STRING",
            "DEFAULT" => GetMessage("MODAL_TEXT_DEFAULT"),
            "PARENT" => "GROUPS_VISUAL",
        ),
        "EMAIL_SEND_END" => array(
            "NAME" => GetMessage("EMAIL_SEND_END"),
            "TYPE" => "STRING",
            "DEFAULT" => GetMessage("EMAIL_SEND_END_DEFAULT"),
            "PARENT" => "GROUPS_VISUAL",
        ),
        
        "ELEMENT_CLICK" => array(
            "NAME" => GetMessage("ELEMENT_CLICK"),
            "TYPE" => "STRING",
            "DEFAULT" => ".mailing_click_popup",
            "PARENT" => "GROUPS_VISUAL",
        ),   
        
        "COLOR_MODAL_BORDER" => array(
            "NAME" => GetMessage("COLOR_MODAL_BORDER"),
            "TYPE" => "STRING",
            "DEFAULT" => "2B5779",
            "PARENT" => "GROUPS_VISUAL",
        ),
        "MODAL_BORDER_PADDING" => array(
            "NAME" => GetMessage("MODAL_BORDER_PADDING"),
            "TYPE" => "STRING",
            "DEFAULT" => "3",
            "PARENT" => "GROUPS_VISUAL",
        ),  
            
        "COLOR_MODAL_BG" => array(
            "NAME" => GetMessage("COLOR_MODAL_BG"),
            "TYPE" => "STRING",
            "DEFAULT" => "FFFFFF",
            "PARENT