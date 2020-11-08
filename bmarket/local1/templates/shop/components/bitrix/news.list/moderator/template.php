<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();?>
<?php //prent($arResult,1,1) ?>


    <table border='1px' style="margin-left: 60px;">
        <?php $color = 'white';?>
        <tr>
            <th style="text-align:center;">Автор</th>
            <th style="text-align:center;">Дата</th>
            <th style="text-align:center;">Текст</th>
            <th style="text-align:center;">Оценка</th>
            <th style="text-align:center;">Товар(ID)</th>
        </tr>

        <?php
        foreach ($arResult['ITEMS'] as $arItem) {?>
            <form id="result">
           <tr id="<?=$arItem['ID']?>">

            <td style="text-align:center; width: 200px"><?=$arItem['NAME'] ?></td>
            <td style="text-align:center; width: 200px"><?=$arItem['DISPLAY_ACTIVE_FROM']?></td>
            <td style="width: 450px"><textarea id="text" class="text" name="text" style="width: 450px; overflow: hidden" ><?=$arItem['PREVIEW_TEXT']?></textarea></td>
            <td style="text-align:center;width: 100px" class="rat" id="<?=$arItem['PROPERTIES']['Rating']['VALUE']?>"><?=$arItem['PROPERTIES']['Rating']['VALUE']?></td>
               <td style="text-align:center;width: 100px" class="Id_el" id="<?=$arItem['PROPERTIES']['ID_ELEMENT']['VALUE']?>"><?=$arItem['PROPERTIES']['ID_ELEMENT']['VALUE']?></td>
               <td>

                       <button id="<?=$arItem['ID']?>" type="submit" class="upd">Save upd</button>

                   <button id="<?=$arItem['ID']?>" type="submit" class="del">Delete</button>

               </td>


           </tr>
            </form>

       <? } ?>

    </table>

<script>
var textarea = document.querySelector('textarea');

textarea.addEventListener('keyup', function(){
if(this.scrollTop > 0){
this.style.height = this.scrollHeight + "px";
}
});
</script>

<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>

<script type="text/javascript">
        $("table tr .upd").click(function (e) {
            e.preventDefault();
            var parent=$(this).parent().parent();
            var id=parent.find('button').attr('id');
            var text = parent.find('textarea').val();
            var Elem_id = parent.find('.Id_el').attr('id');
            var rating = parent.find('.rat').attr('id');

            console.log(id);
            console.log(text);
            console.log(Elem_id);
            console.log(rating);
            $.ajax({
                type: 'POST',
                url: '/moderator/otzgoods/updotz.php',
                data: {id:id,text:text,rating:rating,Elem_id:Elem_id}
            })
    })

</script>

<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>

<script type="text/javascript">
    $("table tr .del").click(function (e) {
        e.preventDefault();
        var parent=$(this).parent().parent();
        var id=parent.find('button').attr('id');
        console.log(id);
        $.ajax({
            type: 'POST',
            url: '/moderator/otzgoods/delotz.php',
            data: {id:id}
        })
    })

</script>



