<?php
//if ($_POST['sectionId']) {
//    $sectionId = $_POST['sectionId'];
$sec = $_POST['sectionId'];
  array_map('tabl',$sec);
    function tabl($sect)
    {

    $host = '127.0.0.1'; // адрес сервера
    $database = 'test4db'; // имя базы данных
    $user = 'test4db'; // имя пользователя
    $password = '2R9e3R5x'; // пароль

    $link = mysqli_connect($host, $user, $password, $database)
    or die("Ошибка " . mysqli_error($link));

        $query = "DROP TABLE $sect";
        $result = mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link));
        if ($result) {
            echo "Удаление таблицы прошло успешно";
        }
 }

    mysqli_close($link);
//}
?>