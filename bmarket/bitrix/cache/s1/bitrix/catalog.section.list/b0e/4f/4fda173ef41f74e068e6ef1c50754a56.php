<?
if($INCLUDE_FROM_CACHE!='Y')return false;
$datecreate = '001597648077';
$dateexpire = '001633648077';
$ser_content = 'a:2:{s:7:"CONTENT";s:1732:"


<div class="aside">
    <h3 class="aside-title">Categories</h3>
    <div class="checkbox-filter">
                    <div class="input-checkbox">
                <input type="checkbox" class="checkIt" id="1"/>
                <label for="1">
                    <span></span>
                    Компьютеры                    <small>(37)</small>
                </label>
            </div>
                    <div class="input-checkbox">
                <input type="checkbox" class="checkIt" id="2"/>
                <label for="2">
                    <span></span>
                    Планшеты                    <small>(4)</small>
                </label>
            </div>
                    <div class="input-checkbox">
                <input type="checkbox" class="checkIt" id="3"/>
                <label for="3">
                    <span></span>
                    Принтеры                    <small>(3)</small>
                </label>
            </div>
            </div>
</div>

<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
<script type="text/javascript">

    $(document).on(\'change\', \'.checkIt\', function () {
        let filterCheckbox = $(\'.checkIt\');
        let sectionId ;
        $(\'.checkIt\').not(this).prop(\'checked\', false);
        filterCheckbox.each(function () {
            if($(this).is(":checked")){
                sectionId=$(this).attr(\'id\');

            }

        });
        $.ajax({
           type:\'POST\',
           url: \'check.php\',
           data: {section_id: sectionId}
        }).done(function (result) {
            $(\'#container_catalog\').html(result);
        })

    });


</script>
";s:4:"VARS";a:2:{s:8:"arResult";a:2:{s:14:"SECTIONS_COUNT";i:3;s:7:"SECTION";a:2:{s:2:"ID";i:0;s:11:"DEPTH_LEVEL";i:0;}}s:18:"templateCachedData";a:2:{s:9:"frameMode";N;s:12:"frameModeCtx";s:82:"/local/templates/shop/components/bitrix/catalog.section.list/.default/template.php";}}}';
return true;
?>