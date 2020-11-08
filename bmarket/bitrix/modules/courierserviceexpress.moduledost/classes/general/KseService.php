<?php
CModule::IncludeModule('sale');
class KseService {
    public static function getModuleId(): string
    {
        return 'courierserviceexpress.moduledost';
    }

    public static function getTimeEnum(): array
    {
        $enum = [];
        for ($h = 0; $h < 24; $h++) {
            for ($i = 0; $i < 60; $i += 30) {
                $value = date('H:i', strtotime("today {$h}:{$i}"));
                $enum[$value] = $value;
            }
        }

        return $enum;
    }

    public static function getDateEnumReq(): array
    {
        for ($i = 1; $i < 10; $i++) {
            $time = strtotime("+{$i} days");
            $enum[date('Y-m-d', $time)] = date('d.m.Y', $time);
        }

        return $enum;
    }

    public static function getDateEnum(): array
    {
        $enum = [];
        $enum['']='';
        for ($i = 1; $i < 10; $i++) {
            $time = strtotime("+{$i} days");
            $enum[date('Y-m-d', $time)] = date('d.m.Y', $time);
        }

        return $enum;
    }

    public static function getBitrixSelectEnum(array $enum): array
    {
        $bitrixEnum = ['REFERENCE' => [], 'REFERENCE_ID' => []];
        foreach ($enum as $key => $value) {
            $bitrixEnum['REFERENCE_ID'][] = $key;
            $bitrixEnum['REFERENCE'][]    = $value;
        }

        return $bitrixEnum;
    }
    
    public function getGeoCodesArray($type=0){
        $res = \Bitrix\Sale\Location\LocationTable::getList(array(
            'filter' => array('=TYPE.CODE' => 'CITY', '=NAME.LANGUAGE_ID' => LANGUAGE_ID),
            'select' => array('NAME_RU' => 'NAME.NAME','ID'=>'ID'),
            'order' => array ('NAME_RU' => 'ASC')
        ));
        while ($item = $res->fetch()) {
            if (!$type){
                $arCities[] = '"'.$item['NAME_RU'].'", ';
                $arCodes[] = '"'.$item['NAME_RU'].'" : "'.$item['ID'].'", ';    
            }
            else {
                $arCities[$item['ID']] = $item['NAME_RU'];
            }
        } 
        if ($type){
            $result = $arCities;
        } else {
            $result = array("CITIES" => $arCities,"CODES" => $arCodes);
        }     
        return $result;
    }
    
   	public function GetZipCode ($cityCode){
		$res = \Bitrix\Sale\Location\LocationTable::getList(array(
            'filter' => array(
                'ID' => $cityCode,
                'SALE_LOCATION_LOCATION_EXTERNAL_SERVICE_CODE' => 'ZIP'
            ),
            'select' => array(
                'EXTERNAL.*',
                'EXTERNAL.SERVICE.CODE'
            )            
        ));
        while($item = $res->fetch())
        {
            $ZipCode = $item['SALE_LOCATION_LOCATION_EXTERNAL_XML_ID'];
        }
		return $ZipCode;
	}
}
