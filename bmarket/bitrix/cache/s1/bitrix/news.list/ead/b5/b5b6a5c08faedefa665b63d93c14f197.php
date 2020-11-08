<?
if($INCLUDE_FROM_CACHE!='Y')return false;
$datecreate = '001597649714';
$dateexpire = '001633649714';
$ser_content = 'a:2:{s:7:"CONTENT";s:5983:"

    <table border=\'1px\' style="margin-left: 60px;">
                <tr>
            <th style="text-align:center;">Автор</th>
            <th style="text-align:center;">Дата</th>
            <th style="text-align:center;">Текст</th>
            <th style="text-align:center;">Оценка</th>
            <th style="text-align:center;">Товар(ID)</th>
        </tr>

                    <form id="result">
           <tr id="54">

            <td style="text-align:center; width: 200px">test</td>
            <td style="text-align:center; width: 200px">12.Авг.2020 12:00 AM</td>
            <td style="width: 450px"><textarea id="text" class="text" name="text" style="width: 450px; overflow: hidden" >ok123</textarea></td>
            <td style="text-align:center;width: 100px" class="rat" id="5">5</td>
               <td style="text-align:center;width: 100px" class="Id_el" id="9">9</td>
               <td>

                       <button id="54" type="submit" class="upd">Save upd</button>

                   <button id="54" type="submit" class="del">Delete</button>

               </td>


           </tr>
            </form>

                   <form id="result">
           <tr id="49">

            <td style="text-align:center; width: 200px">NoName</td>
            <td style="text-align:center; width: 200px">12.Авг.2020 12:00 AM</td>
            <td style="width: 450px"><textarea id="text" class="text" name="text" style="width: 450px; overflow: hidden" >Like</textarea></td>
            <td style="text-align:center;width: 100px" class="rat" id="3">3</td>
               <td style="text-align:center;width: 100px" class="Id_el" id="15">15</td>
               <td>

                       <button id="49" type="submit" class="upd">Save upd</button>

                   <button id="49" type="submit" class="del">Delete</button>

               </td>


           </tr>
            </form>

                   <form id="result">
           <tr id="48">

            <td style="text-align:center; width: 200px">NoName</td>
            <td style="text-align:center; width: 200px">12.Авг.2020 12:00 AM</td>
            <td style="width: 450px"><textarea id="text" class="text" name="text" style="width: 450px; overflow: hidden" >Cool</textarea></td>
            <td style="text-align:center;width: 100px" class="rat" id="5">5</td>
               <td style="text-align:center;width: 100px" class="Id_el" id="17">17</td>
               <td>

                       <button id="48" type="submit" class="upd">Save upd</button>

                   <button id="48" type="submit" class="del">Delete</button>

               </td>


           </tr>
            </form>

                   <form id="result">
           <tr id="41">

            <td style="text-align:center; width: 200px">test</td>
            <td style="text-align:center; width: 200px">12.Авг.2020 12:00 AM</td>
            <td style="width: 450px"><textarea id="text" class="text" name="text" style="width: 450px; overflow: hidden" >Good, but not enough RAM</textarea></td>
            <td style="text-align:center;width: 100px" class="rat" id="5">5</td>
               <td style="text-align:center;width: 100px" class="Id_el" id="17">17</td>
               <td>

                       <button id="41" type="submit" class="upd">Save upd</button>

                   <button id="41" type="submit" class="del">Delete</button>

               </td>


           </tr>
            </form>

                   <form id="result">
           <tr id="34">

            <td style="text-align:center; width: 200px">Анна</td>
            <td style="text-align:center; width: 200px">11.Авг.2020 12:00 AM</td>
            <td style="width: 450px"><textarea id="text" class="text" name="text" style="width: 450px; overflow: hidden" >Good, but not enough RAM</textarea></td>
            <td style="text-align:center;width: 100px" class="rat" id=""></td>
               <td style="text-align:center;width: 100px" class="Id_el" id=""></td>
               <td>

                       <button id="34" type="submit" class="upd">Save upd</button>

                   <button id="34" type="submit" class="del">Delete</button>

               </td>


           </tr>
            </form>

       
    </table>

<script>
var textarea = document.querySelector(\'textarea\');

textarea.addEventListener(\'keyup\', function(){
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
            var id=parent.find(\'button\').attr(\'id\');
            var text = parent.find(\'textarea\').val();
            var Elem_id = parent.find(\'.Id_el\').attr(\'id\');
            var rating = parent.find(\'.rat\').attr(\'id\');

            console.log(id);
            console.log(text);
            console.log(Elem_id);
            console.log(rating);
            $.ajax({
                type: \'POST\',
                url: \'/moderator/otzgoods/updotz.php\',
                data: {id:id,text:text,rating:rating,Elem_id:Elem_id}
            })
    })

</script>

<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>

<script type="text/javascript">
    $("table tr .del").click(function (e) {
        e.preventDefault();
        var parent=$(this).parent().parent();
        var id=parent.find(\'button\').attr(\'id\');
        console.log(id);
        $.ajax({
            type: \'POST\',
            url: \'/moderator/otzgoods/delotz.php\',
            data: {id:id}
        })
    })

</script>



";s:4:"VARS";a:2:{s:8:"arResult";a:7:{s:2:"ID";s:1:"3";s:14:"IBLOCK_TYPE_ID";s:7:"Catalog";s:13:"LIST_PAGE_URL";s:43:"#SITE_DIR#/Catalog/index.php?ID=#IBLOCK_ID#";s:15:"NAV_CACHED_DATA";N;s:4:"NAME";s:12:"Отзывы";s:7:"SECTION";b:0;s:8:"ELEMENTS";a:5:{i:0;s:2:"54";i:1;s:2:"49";i:2;s:2:"48";i:3;s:2:"41";i:4;s:2:"34";}}s:18:"templateCachedData";a:3:{s:9:"frameMode";N;s:12:"frameModeCtx";s:72:"/local/templates/shop/components/bitrix/news.list/moderator/template.php";s:17:"__currentCounters";a:1:{s:28:"bitrix:system.pagenavigation";i:1;}}}}';
return true;
?>