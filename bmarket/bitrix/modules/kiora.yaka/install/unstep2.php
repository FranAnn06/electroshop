<?if(!check_bitrix_sessid()) return;?>
<?
IncludeModuleLangFile(__FILE__);

global $errors;

if(empty($errors)):
        echo CAdminMessage::ShowNote( GetMessage('YAKA_UNSTEP2_TITLE') );
else:
        for($i=0; $i<count($errors); $i++)
            $alErrors .= $errors[$i]."<br>";
        echo CAdminMessage::ShowMessage(Array("TYPE"=>"ERROR", "MESSAGE" =>GetMessage('YAKA_UNSTEP2_ERR'), "DETAILS"=>$alErrors, "HTML"=>true));
endif;
?>
<form action="<?echo $APPLICATION->GetCurPage()?>">
        <input type="hidden" name="lang" value="<?echo LANG?>">
        <input type="submit" name="" value="<?echo GetMessage('YAKA_UNSTEP2_SUBMIT')?>">
<form>