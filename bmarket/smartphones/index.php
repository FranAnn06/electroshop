<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("Smartphones");?>
    <h1 style="font-size: 16pt">Список папок</h1>
    <form id="tt">
        <ul>
            <?php $dir='../';
            $files=array_diff(scandir($dir),['..','.']);
            foreach($files as $file){
                $path=$dir.'/'.$file;
                if (is_dir($path)) {
                    echo "<input style='float: left;margin-left: 20px' type='checkbox' class='checkIt' id='../$file'/><li> <img style='width: 20px; height: 20px;' src='Folder.ico'>" . $file . "</li>";
                }
                else {echo "<input style='float: left; margin-left: 20px' type='checkbox' class='checkIt' id='../$file'/><li>  <img style='width: 20px; height: 20px;'  src='php.ico'>".$file."</li>";
                }
            }
            ?>
        </ul>
        <button style="margin-left: 20px; height: 40px;width: 150px; margin-top: 20px; margin-bottom: 20px" type="submit">Удалить</button>
    </form>

    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
    <script type="text/javascript">

        $(document).on('submit', '#tt', function () {

            let filterCheckbox = $('.checkIt');
            let sectionId=[];
            filterCheckbox.each(function () {
                if($(this).is(":checked")){
                    sectionId.push(($(this).attr('id')));
                    console.log(sectionId);
                }
            });
            $.ajax({
                type:'POST',
                url: '/delete/file_directory.php',
                data: {sectionId: sectionId}
            })
        });


    </script>

<?php
$host = '127.0.0.1'; // адрес сервера
$database = 'test4db'; // имя базы данных
$user = 'test4db'; // имя пользователя
$password = '2R9e3R5x'; // пароль

$link = mysqli_connect($host, $user, $password, $database)
or die("Ошибка " . mysqli_error($link));

$sql = "SHOW TABLES FROM $database";
$result = mysqli_query($link,$sql);
?>
    <h1 style="font-size: 16pt">Список Таблиц</h1>
    <form id="tt2">
<ul><?
while ($row = mysqli_fetch_row($result)) {
    echo "<input style='float: left;margin-left: 20px' type='checkbox' class='checkI' id='$row[0]'/><li> <img style='width: 20px; height: 20px;' src='Folder.ico'>" . $row[0] . "</li>";
}
?>
</ul>
    <button style="margin-left: 20px; height: 40px;width: 150px; margin-top: 20px; margin-bottom: 20px" class="cart-btns" type="submit">Удалить</button>
    </form>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
    <script type="text/javascript">

        $(document).on('submit', '#tt2', function () {
            let filterCheckbox = $('.checkI');
            let sectionidd=[];
            filterCheckbox.each(function () {
                if($(this).is(":checked")){
                    sectionidd.push($(this).attr('id'));
                    console.log(sectionidd)
                }

            });
            $.ajax({
                type:'POST',
                url: '/delete/table_db.php',
                data: {sectionId: sectionidd}
            })
        });


    </script>

<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>