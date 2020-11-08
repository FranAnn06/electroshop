<?php

IncludeModuleLangFile(__FILE__);
$APPLICATION->SetTitle(GetMessage('YAKA_UNSTEP1_TITLE')); 

?>
	<form action="<?=$APPLICATION->GetCurPage(); ?>">
		<?=bitrix_sessid_post(); ?>
		<input type="hidden" name="lang" value="<?=LANG; ?>">
        <input type="hidden" name="id" value="kiora.yaka">
        <input type="hidden" name="uninstall" value="Y">
        <input type="hidden" name="step" value="2">
		<?=CAdminMessage::ShowMessage(GetMessage('YAKA_UNSTEP1_MESS01')); ?>
		<p><input type="checkbox" name="savedata" id="savedata" value="Y" checked><label for="savedata"><?=GetMessage('YAKA_UNSTEP1_MESS02')?></label></p>
		<p><input type="checkbox" name="savemess" id="savemess" value="Y" checked><label for="savemess"><?=GetMessage('YAKA_UNSTEP1_MESS03')?></label></p><br />
		<input type="submit" name="inst" value="<?=GetMessage('YAKA_UNSTEP1_SUBMIT')?>">
	</form>
