<?php

function prent($mas, $prent = true, $show = false)
{

    global $USER;
    if (isset($_REQUEST["SHOW_DEBUG"])) {
        $_SESSION["SHOW_DEBUG"] = intval($_REQUEST["SHOW_DEBUG"]);
    }

    if (!empty($_SESSION["SHOW_DEBUG"]) && !defined("SHOW_DEBUG")) {
        define("SHOW_DEBUG", $_SESSION["SHOW_DEBUG"]);
    }


    $userID = $USER->GetID();

    if ($USER->IsAdmin() || $show || defined("SHOW_DEBUG")) {
        echo "<pre style=\"text-align:left; background-color:#CCC;color:#000; font-size:10px; padding-bottom: 10px; border-bottom:1px solid #000;\">\n";
        if ($prent)
            print_r($mas);
        else
            var_dump($mas);
        echo "</pre>\n";
    }
}
