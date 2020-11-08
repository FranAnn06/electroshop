<?php

namespace Kiora\Payments;

class Log {

    public function info($str) {
        if(is_array($str) || is_object($str)) {
            $str = print_r($str,true);
        }
        $str = '[' . date("Y-m-d H:i:s") . '] ' . $str . PHP_EOL;
        
        //echo $str;//debug
        
        $write_log = \Bitrix\Main\Config\Option::get('kiora.yaka', "write_log", "0", 1) == 'Y' ? true : false;
        
        if( $write_log )
            file_put_contents($_SERVER["DOCUMENT_ROOT"]."/bitrix/tools/kiora.yaka/log.txt", $str, FILE_APPEND);
    }
}