<?php

class KIUtils {

    public static function event($name_module, $name_event, $filter_var) {

        $event = new \Bitrix\Main\Event($name_module, $name_event, $filter_var);
        $event->send();

        if ($event->getResults()) {
            foreach ($event->getResults() as $evenResult) {
                if ($evenResult->getResultType() == \Bitrix\Main\EventResult::SUCCESS) {

                    if (is_array($filter_var) && is_array($evenResult->getParameters()))
                        $filter_var = array_replace_recursive($filter_var, $evenResult->getParameters());
                    else
                        $filter_var = $evenResult->getParameters();

                    //var_dump(__FILE__.' '.__METHOD__,$filter_var);
                }
            }
        }

        return $filter_var;
    }

    public static function log() {

        $isWrite = \Bitrix\Main\Config\Option::get('kiora.yaka', "write_log", "0", 1);

        if ('Y' === $isWrite) {

            self::error(func_get_args());
        }
    }

    public static function error() {

        $arg_list = func_get_args();

        error_log(PHP_EOL . date('H:i:s') . " " . print_r(count($arg_list) == 1 ? $arg_list[0] : $arg_list, 1), 3, $_SERVER["DOCUMENT_ROOT"] . "/bitrix/tools/kiora.yaka/log.txt");
    }

    public static function convert_to_1251($data) {

        if (LANG_CHARSET == "windows-1251") {

            if (is_array($data)) {

                foreach ($data as $key => $arg) {
                    $data[$key] = utf8win1251($data);
                }
            } else {
                $data = utf8win1251($data);
            }
        }

        return $data;
    }

    public static function ConvertEncoding($data) {
        if (defined("BX_UTF"))
            return $data;
        if (is_array($data) || is_object($data)) {
            foreach ($data as $k => $v) {
                $data[$k] = ConvertEncoding($v);
            }
            return $data;
        } else
            return utf8win1251($data);
    }

    public static function jsonDecode($data) {
        try {
            $data = \Bitrix\Main\Web\Json::decode($data);
        } catch (\Bitrix\Main\ArgumentException $exception) {
            $data = false;
        }

        return $data;
    }

    public static function jsonEncode($data) {
        try {
            $data = \Bitrix\Main\Web\Json::encode($data);
        } catch (\Bitrix\Main\ArgumentException $exception) {
            $data = false;
        }

        return $data;
    }

    public static function sanitizePostField($field) {
        if (is_array($field)) {
            foreach ($field as $key => $subField) {
                $field[$key] = self::sanitizePostField($subField);
            }
        } else {
            $field = htmlspecialcharsEx($field, ENT_QUOTES);
            $field = trim($field);
        }

        return $field;
    }

    public static function short_name($full_name, $char_set = LANG_CHARSET/* 'utf-8''cp1251' */) {

        $arr_name = explode(' ', $full_name);

        $short_name = mb_substr($arr_name[0], 0, 35, $char_set) . ' ' .
                ( isset($arr_name[1]) ? ( isset($arr_name[2]) ? mb_substr($arr_name[1], 0, 1, $char_set)
                . '.' . mb_substr($arr_name[2], 0, 1, $char_set) . '.' : mb_substr($arr_name[1], 0, 1, $char_set) . '.' ) : '' );

        return $short_name;
    }

    public static function date_diff_in_mitute($early_date, $past_date) {

        $start_date = new DateTime($early_date);
        $since_start = $start_date->diff(new DateTime($past_date));

        $minutes = $since_start->days * 24 * 60;
        $minutes += $since_start->h * 60;
        $minutes += $since_start->i;

        return $minutes;
    }

    public static function getDropDownList($list, $name, $curr) {
        ?>
        <select name="<?= $name ?>">
            <option value="">--</option><?
        foreach ($list as $key => $item) {
            ?>
                <option value="<?= $key ?>"<? if ($key === $curr) echo " selected" ?>><?= $item ?></option>
                <?
            }//foreach
            ?></select>
            <?
        }

    }
    