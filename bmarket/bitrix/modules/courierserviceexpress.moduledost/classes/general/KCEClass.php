<?
    use Bitrix\Main\Loader; 
    use Bitrix\Highloadblock as HL; 
    use Bitrix\Main\Entity;
    use Bitrix\Main\Application;
    use Bitrix\Sale;
    use Bitrix\Main\Config\Option;
class cKCE 
{
	private $client;				//SOAP клиент

	//const SoapLink = 'http://lk-test.cse.ru/1c/ws/web1c.1cws?wsdl';	//Ссылка на WSDL
    //const SoapRequest ='http://lk-test.cse.ru/1c/ws/web1c.1cws';

	const soapUrl = "https://module.cse.ru/bitrix/ws/web1c.1cws"; //  URL of WSDL
    const soapUser = "bitrix";  //  username
    const soapPassword = "bitrixcse"; // password
	const NumWB = 39; //максимальное количество печатных форм

   // const hlbl = 9;//COption::GetOptionString("courierserviceexpress.moduledost", "hblockID"); //ID HIGHLOAD инфоблока. Далее нужно забирать это значение из настроек, куда оно подставится после установки модуля

	public function __construct()
	{
	  if (class_exists('SoapClient')):
			ini_set("soap.wsdl_cache_enabled", "0" );    //Отключаем кэширование
		else:
			echo "SOAP not installed";
		endif;
	}

	public function pr ($s) {
    	echo"<pre>";print_r($s);echo"</pre>";
    }
    
    public function GetDeliveryType($DeliveryOfCargo) {
            switch ($DeliveryOfCargo) {
            case '0':
                //Дверь-Дверь
                $res = 1;
                break;
            case '1':
                //Склад-Дверь
                $res = 6;
                break;
            case '2':
                //Дверь-Склад (самовывоз)
                $res = 5;
                break;
            case '3':
                //Склад-Склад (самовывоз)
                $res = 7;
                break;
            case '4':
                //Склад-Склад (самовывоз)
                $res = 2;
                break;
        }
        return $res;
    }
    
    public function SetDiscount($rash_price, $set_val,$set_edin) {
        
        switch ($set_edin) {
            case "persent":
                if ($set_val < -100) {
                    $price = 0; 
                } else {
                    $price = $rash_price + round($rash_price * $set_val / 100, 2);
                }
            break;
            case "fix":
                $price = $rash_price + $set_val;
            break;
            case "fixprice":
                $price = $set_val;
            break;
        }
        
        return $price;
    }
    
    public function FormatXml($soap_result) {
        
        $soap_result = preg_replace("/(<\/?)(\w+):([^>]*>)/", "$1$2$3", $soap_result);
        $xml = new SimpleXMLElement($soap_result);
        $body = $xml->xpath('//mGetReferenceDataResponse')[0];
        $array = json_decode(json_encode((array)$body), TRUE); 
        $array = $array['mreturn'];
        $array = $array['mList'];
                
        return $array;
    }

    public function FormatXml2($soap_result) {
		$soap_result = preg_replace("/(<\/?)(\w+):([^>]*>)/", "$1$2$3", $soap_result);
		
		try {
		$xml = new SimpleXMLElement($soap_result);
		}catch(Exception $e){
		return array();
		}

		$body = $xml->xpath('//mCalcResponse')[0];
		$array = json_decode(json_encode((array)$body), TRUE);
		$array = $array['mreturn'];
		$array = $array['mList'];

		return $array;
    }
    
    public function GetData($xml_post_string){
        
        $headers = array(
            "Content-type: text/xml;charset=\"utf-8\"",
            "Accept: text/xml",
            "Cache-Control: no-cache",
            "Pragma: no-cache",
            "SOAPAction: ".self::soapUrl,
            //"Content-length: ".strlen($xml_post_string),
        );
        
        // PHP cURL  for https connection with auth
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($ch, CURLOPT_URL, self::soapUrl);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_USERPWD, self::soapUser.":".self::soapPassword);
        curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_ANY);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $xml_post_string);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        
        //get data
        $response = curl_exec($ch);
        curl_close($ch);
               
        return ($response);
    }
    
    public function GetDaysName ($days) {
        
        $daysName = 'дней';
        
		if ($days < 10) {
			switch (substr($days, -1)) {
				case "1": $daysName='день'; break;
				case "2": $daysName='дня'; break;
				case "3": $daysName='дня'; break;
				case "4": $daysName='дня'; break;
			}
        }
        return $daysName;
    } 
	
	public function DateTimeFormat ($date) {
		
		//Приводим к формату 2014-09-01T00:00:00
		$result = $date.'T00:00:00';
		
		return $result;
	}

    //Получаем список валют клиента
	public function GetCurrencies($login,$password) {
	   $XmlData = '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns1="http://www.cargo3.ru">
                             <soap:Header/>
                             <soap:Body>
                             <ns1:GetReferenceData>
                             <ns1:login>'.$login.'</ns1:login>
                             <ns1:password>'.$password.'</ns1:password>
                             <ns1:parameters>
                             <ns1:Key>parameters</ns1:Key>
                             <ns1:List>
                             <ns1:Key>Reference</ns1:Key>
                             <ns1:Value>Currencies </ns1:Value>
                             <ns1:ValueType>string</ns1:ValueType>
                             </ns1:List>
                             </ns1:parameters>
                             </ns1:GetReferenceData>
                             </soap:Body>
                            </soap:Envelope>';
       
       $result = cKCE::GetData($XmlData);
        $text = cKCE::FormatXml($result);
       
       return $text;
	
	}
    
     //Получаем список валют клиента
	public function GetUnits($login,$password) {
	   
       $XmlData = '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns1="http://www.cargo3.ru">
                     <soap:Header/>
                     <soap:Body>
                     <ns1:GetReferenceData>
                     <ns1:login>'.$login.'</ns1:login>
                     <ns1:password>'.$password.'</ns1:password>
                     <ns1:parameters>
                     <ns1:Key>parameters</ns1:Key>
                     <ns1:List>
                     <ns1:Key>Reference</ns1:Key>
                     <ns1:Value>BaseUnitsOfMeasurement</ns1:Value>
                     <ns1:ValueType>string</ns1:ValueType>
                     </ns1:List>
                     </ns1:parameters>
                     </ns1:GetReferenceData>
                     </soap:Body>
                    </soap:Envelope>';

        $result = cKCE::GetData($XmlData);
        $text = cKCE::FormatXml($result);
       
       return $text;
	
	}
    
    //Получаем код платедьщика
	public function GetPayerCode($login,$password) {
	   
        $XmlData = '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns1="http://www.cargo3.ru">
                     <soap:Header/>
                     <soap:Body>
                     <ns1:GetReferenceData>
                     <ns1:login>'.$login.'</ns1:login>
                     <ns1:password>'.$password.'</ns1:password>
                     <ns1:parameters>
                     <ns1:Key>parameters</ns1:Key>
                     <ns1:List>
                     <ns1:Key>Reference</ns1:Key>
                     <ns1:Value>Payers</ns1:Value>
                     <ns1:ValueType>string</ns1:ValueType>
                     </ns1:List>
                     </ns1:parameters>
                     </ns1:GetReferenceData>
                     </soap:Body>
                    </soap:Envelope>';
        
		$result = cKCE::GetData($XmlData);
        $text = cKCE::FormatXml($result);
       
       return $text;
	
	}
    
    //Получаем список методов оплаты
	public function GetPayMethods($login,$password) {
	   
        $XmlData = '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns1="http://www.cargo3.ru">
                     <soap:Header/>
                     <soap:Body>
                     <ns1:GetReferenceData>
                     <ns1:login>'.$login.'</ns1:login>
                     <ns1:password>'.$password.'</ns1:password>
                     <ns1:parameters>
                     <ns1:Key>parameters</ns1:Key>
                     <ns1:List>
                     <ns1:Key>Reference</ns1:Key>
                     <ns1:Value>PaymentMethods</ns1:Value>
                     <ns1:ValueType>string</ns1:ValueType>
                     </ns1:List>
                     </ns1:parameters>
                     </ns1:GetReferenceData>
                     </soap:Body>
                    </soap:Envelope>';
        
		$result = cKCE::GetData($XmlData);
        $text = cKCE::FormatXml($result);
       
       return $text;
	
	}   

    //Получаем список методов оплаты
	public function GetShippingMethods($login,$password) {
	   
       $XmlData = '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns1="http://www.cargo3.ru">
                     <soap:Header/>
                     <soap:Body>
                     <ns1:GetReferenceData>
                     <ns1:login>'.$login.'</ns1:login>
                     <ns1:password>'.$password.'</ns1:password>
                     <ns1:parameters>
                     <ns1:Key>parameters</ns1:Key>
                     <ns1:List>
                     <ns1:Key>Reference</ns1:Key>
                     <ns1:Value>ShippingMethods</ns1:Value>
                     <ns1:ValueType>string</ns1:ValueType>
                     </ns1:List>
                     </ns1:parameters>
                     </ns1:GetReferenceData>
                     </soap:Body>
                    </soap:Envelope>';

        $result = cKCE::GetData($XmlData);
       $text = cKCE::FormatXml($result);
       
       return $text;
	
	}  
     
    //Получаем список типов груза
	public function GetCargoTypes($login,$password) {
	   
       $XmlData = '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns1="http://www.cargo3.ru">
                     <soap:Header/>
                     <soap:Body>
                     <ns1:GetReferenceData>
                     <ns1:login>'.$login.'</ns1:login>
                     <ns1:password>'.$password.'</ns1:password>
                     <ns1:parameters>
                     <ns1:Key>parameters</ns1:Key>
                     <ns1:List>
                     <ns1:Key>Reference</ns1:Key>
                     <ns1:Value>TypesOfCargo</ns1:Value>
                     <ns1:ValueType>string</ns1:ValueType>
                     </ns1:List>
                     </ns1:parameters>
                     </ns1:GetReferenceData>
                     </soap:Body>
                    </soap:Envelope>';

        $result = cKCE::GetData($XmlData);
        $text = cKCE::FormatXml($result);
       
       return $text;
	
	}      
    
    //Получаем список доступных срочностей доставки для клиента    
    public function GetUrgencies($login,$password) {
        
        $XmlData = '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns1="http://www.cargo3.ru"><soap:Header/>
                     <soap:Body>
                     <ns1:GetReferenceData>
                     <ns1:login>'.$login.'</ns1:login>
                     <ns1:password>'.$password.'</ns1:password>
                     <ns1:parameters>
                     <ns1:Key>parameters</ns1:Key>
                     <ns1:List>
                     <ns1:Key>Reference</ns1:Key>
                     <ns1:Value>Urgencies</ns1:Value>
                     <ns1:ValueType>string</ns1:ValueType>
                     </ns1:List>
                     </ns1:parameters>
                     </ns1:GetReferenceData>
                     </soap:Body>
                    </soap:Envelope>';
       
       $result = cKCE::GetData($XmlData);
       $text = cKCE::FormatXml($result);
   
       return $text;	
	}
    
    //Получаем список доступных видов груза для клиента
    public function GetTypesOfCargo($login,$password) {
        
        $XmlData = '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns1="http://www.cargo3.ru">
                     <soap:Header/>
                     <soap:Body>
                     <ns1:GetReferenceData>
                     <ns1:login>'.$login.'</ns1:login>
                     <ns1:password>'.$password.'</ns1:password>
                     <ns1:parameters>
                     <ns1:Key>parameters</ns1:Key>
                     <ns1:List>
                     <ns1:Key>Reference</ns1:Key>
                     <ns1:Value>TypesOfCargo</ns1:Value>
                     <ns1:ValueType>string</ns1:ValueType>
                     </ns1:List>
                     </ns1:parameters>
                     </ns1:GetReferenceData>
                     </soap:Body>
                    </soap:Envelope>';
                    
        $result = cKCE::GetData($XmlData);
		$text = cKCE::FormatXml($result);
       
       return $text;
	}
	
	//Получаем список статусов груза
    public function GetStatuses($login,$password) {
        
        // Получили текущие статусы и закомментили, т.к. это запрос лишний. Если изменятся статусы, то нужно отправить этот запрос и переформировать итоговый массив
       
		$XmlData = '<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns1="http://www.cargo3.ru">
			<SOAP-ENV:Body>
			 <ns1:GetReferenceData>
			 <ns1:login>'.$login.'</ns1:login>
			 <ns1:password>'.$password.'</ns1:password>
			 <ns1:parameters>
			 <ns1:Key>parameters</ns1:Key>
			 <ns1:List>
			 <ns1:Key>Reference</ns1:Key>
			 <ns1:Value>CargoStates</ns1:Value>
			 <ns1:ValueType>string</ns1:ValueType>
			 </ns1:List>
			 <ns1:List>
			 <ns1:Key>DocumentType</ns1:Key>
			 <ns1:Value>waybill</ns1:Value>
			 <ns1:ValueType>string</ns1:ValueType>
			 </ns1:List>
			 </ns1:parameters>
			 </ns1:GetReferenceData>
			</SOAP-ENV:Body>
			</SOAP-ENV:Envelope>';

		$search_result = cKCE::GetData($XmlData);
        
		$sxe = new SimpleXMLElement($search_result);
		$text = $sxe->children('soap',TRUE);
		$text = $text->children('m',TRUE);
		
		$ResultArr = $text->GetReferenceDataResponse->return->List;
        
        //pr ($ResultArr);
		
		foreach ($ResultArr as $ResArr)
		{             
			$Statuses[] = array("KEY" => (string)$ResArr->Key, "VALUE" => (string)$ResArr->Value);
		}

        $arStatuses = array (
            array (
                'KEY'=>'ee9fc99e-53e5-4253-8b80-b582294ef526',
                'VALUE'=>'Зарегистрирована накладная'
            ),            
            array (
                'KEY'=>'b7b5f799-94c7-4588-bae4-c14df35c9752',
                'VALUE'=>'Груз получен на склад КС'
            ),
            array (
                'KEY'=>'b2af9ad9-22bd-4476-9393-7b51ffdab6f7',
                'VALUE'=>'Груз передан на доставку'
            ),
            array (
                'KEY'=>'1c3ed878-48d2-4192-bbe6-513727535f21',
                'VALUE'=>'Отправление прибыло в город'
            ),
            array (
                'KEY'=>'0997e505-7ccf-42cd-b5e3-dda20d26da27',
                'VALUE'=>'Доставка завершена'
            ),
            array (
                'KEY'=>'8e5ded66-a8f5-4fa8-b863-03e1e0406df5',
                'VALUE'=>'Отправление доставлено получателю'
            ),
            array (
                'KEY'=>'e71eb2c1-36db-4b9c-9559-6a6350030d41',
                'VALUE'=>'Внимание! Информация по доставке'
            ),                                    
            array (
                'KEY'=>'56f72f4b-60c4-49a8-8a86-730bad6cd07a',
                'VALUE'=>'Оформлен возврат отправления'
            ),
        
        );
		
		return $arStatuses;
	
	}

    //Получаем список типов доставки для пользователя
	public function GetDeliveryMethods($login, $password) {

        $XmlData = '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns1="http://www.cargo3.ru">
         <soap:Header/>
         <soap:Body>
         <ns1:GetReferenceData>
		 <ns1:login>'.$login.'</ns1:login>
		 <ns1:password>'.$password.'</ns1:password>
         <ns1:parameters>
         <ns1:Key>parameters</ns1:Key>
         <ns1:List>
         <ns1:Key>Reference</ns1:Key>
         <ns1:Value>DeliveryType</ns1:Value>
         <ns1:ValueType>string</ns1:ValueType>
         </ns1:List>
         </ns1:parameters>
         </ns1:GetReferenceData>
         </soap:Body>
        </soap:Envelope>';

        $result = cKCE::GetData($XmlData);
       	$sxe = new SimpleXMLElement($result);
	$text = $sxe->children('soap',TRUE);
	$text = $text->children('m',TRUE);

	$ResultArr = json_decode(json_encode($text->GetReferenceDataResponse->return));
	$ResultArr = $ResultArr -> List;

       return $ResultArr;
	}

///////////////////////////// ПОЛУЧАЕМ XMLID НАСЕЛЕННЫХ ПУНКТОВ /////////////////////////////////////////

public function GetGeographyID($login, $password, $search) {

		$XmlData = '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns1="http://www.cargo3.ru">
          <soap:Header/>
          <soap:Body>
         <ns1:GetReferenceData>
          <ns1:login>'.$login.'</ns1:login>
          <ns1:password>'.$password.'</ns1:password>
          <ns1:parameters>
           <ns1:Key>parameters</ns1:Key>
           <ns1:List>
            <ns1:Key>Reference</ns1:Key>
            <ns1:Value>Geography</ns1:Value>
            <ns1:ValueType>string</ns1:ValueType>
           </ns1:List>
             <ns1:List>
            <ns1:Key>Search</ns1:Key>
            <ns1:Value>'.$search.'</ns1:Value>
            <ns1:ValueType>string</ns1:ValueType>
            </ns1:List>
           </ns1:parameters>
         </ns1:GetReferenceData>
          </soap:Body>
        </soap:Envelope>';

		$search_result = cKCE::GetData($XmlData);
        	$sxe = new SimpleXMLElement($search_result);
		$text = $sxe->children('soap',TRUE);
		$text = $text->children('m',TRUE);

		$ResultArr = json_decode(json_encode($text->GetReferenceDataResponse->return->List));
        	//$repositorys = $repositorys->Fields;
		
		$GeographyID = "".$ResultArr->Key;
		return $GeographyID;
        
	}
    
///////////////////////////// ПОЛУЧАЕМ ОТЧЕТ ПО ОТГРУЗКАМ КЛИЕНТА /////////////////////////////////////////

public function GetOrders($login, $password, $dateFrom, $dateTo, $PrintName) {

		$XmlData = '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
					<soap:Header/>
						<soap:Body>
							<m:Report xmlns:m="http://www.cargo3.ru">
							<m:login xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">'.$login.'</m:login>
							<m:password xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">'.$password.'</m:password>
							<m:name xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">SummaryOfPayments</m:name>
							<m:parameters xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
								<m:Key>Parameters</m:Key>
									<m:List>
										<m:Key>FromDate</m:Key>
										<m:Value xsi:type="xs:dateTime">'.$dateFrom.'</m:Value>
										<m:ValueType>dateTime</m:ValueType>
									</m:List>
									<m:List>
										<m:Key>ToDate</m:Key>
										<m:Value xsi:type="xs:dateTime">'.$dateTo.'</m:Value>
										<m:ValueType>dateTime</m:ValueType>
									</m:List>
							</m:parameters></m:Report></soap:Body></soap:Envelope>';
//pr ($XmlData);
        $search_result = cKCE::GetData($XmlData);
//pr ($search_result);
//	if (!$search_result) return $arOrdersKCE=0;

        $sxe = new SimpleXMLElement($search_result);
		$text = $sxe->children('soap',TRUE);
		$text = $text->children('m',TRUE);
		
		//cKCE::pr($text); //die();
        
        //Получаем информацию о клиенте
		$ResultArrClient = json_decode(json_encode($text->ReportResponse->return));
//        $ResultArrClient = $text->ReportResponse->return->List->Fields;

	if ($ResultArrClient->List->Fields[6]->Value == 0) return $arOrdersKCE=0;
	$ResultArrClient = $ResultArrClient->List[0]->Fields;
//	pr ($ResultArrClient); die();

	if ($ResultArrClient) {
        
	        foreach ($ResultArrClient as $Prop) {

	            if ($Prop->Key == 'Client') $arOrdersKCE['client']['name'] = (string)$Prop->Value;
	            if ($Prop->Key == 'Contract') $arOrdersKCE['client']['contract'] = (string)$Prop->Value;
	            if ($Prop->Key == 'ContractCurrency') $arOrdersKCE['client']['currency'] = (string)$Prop->Value;
	            //pr ($Prop);
	        }
        }

        //Получаем информацию о заказах клиента
        //$ResultArrOrders = $text->ReportResponse->return->List->List->Rows;

	$ResultArrOrders = json_decode(json_encode($text->ReportResponse->return));

//	$ResultArrOrders = $ResultArrOrders->List[2]->List[0]->Rows;

//	$ResultArrOrders = $ResultArrOrders->List[1]->List[0]->Rows;

	
	//cKCE::pr($ResultArrOrders); //die();
	

	if ($ResultArrOrders) {
        	$ResultArrOrders = $ResultArrOrders->List[1]->List[0]->Rows;
//        	$ResultArrOrders[] = $ResultArrOrders->List[1]->List[1]->Rows;
//		$ResultArrOrders = $ResultArrOrders->List[2]->List[0]->Rows;
//		cKCE::pr($ResultArrOrders); die();

	       $i=0;
		if (is_array($ResultArrOrders)) $ResultArrOrders = array_reverse($ResultArrOrders);
		if (is_array($ResultArrOrders)) {
		        foreach ($ResultArrOrders as $Order) {
	
		            $arOrdersKCE['orders'][$i]['numberbill'] = (string)$Order->Cells[2];
		            if (!empty((array)$Order->Cells[3])) $arOrdersKCE['orders'][$i]['number'] = (string)$Order->Cells[3];
		            $arOrdersKCE['orders'][$i]['date'] = substr((string)$Order->Cells[4],0,strpos((string)$Order->Cells[4], 'T'));
		            $arOrdersKCE['orders'][$i]['from'] = (string)$Order->Cells[6];
		            $arOrdersKCE['orders'][$i]['to'] = (string)$Order->Cells[7];
		            $arOrdersKCE['orders'][$i]['type'] = (string)$Order->Cells[8];
		            $arOrdersKCE['orders'][$i]['gruz'] = (string)$Order->Cells[9];
				if (!empty((array)$Order->Cells[10])) $arOrdersKCE['orders'][$i]['delivdate'] = (string)$Order->Cells[10];
		            if (!empty((array)$Order->Cells[11])) $arOrdersKCE['orders'][$i]['poluchatel'] = (string)$Order->Cells[11];
		            $arOrdersKCE['orders'][$i]['mesta'] = (string)$Order->Cells[12];
		            $arOrdersKCE['orders'][$i]['vesFakt'] = (string)$Order->Cells[13];
		            $arOrdersKCE['orders'][$i]['cost'] = (string)$Order->Cells[14];
		            
		            //Получаем печатные формы накладных
		            $arOrdersKCE['orders'][$i]['printBill'] = cKCE::GetWayBillsPrint($login, $password, $arOrdersKCE['orders'][$i]['numberbill'], $PrintName);
		            $i++;
                    if ($i==self::NumWB) break;
		        }  
		}  	
	}	
		return $arOrdersKCE;	
	}
    
    public function GetWayBillsPrint ($login, $password, $WaybID, $PrintName, $DocType){
        
        $XmlData = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope">
                    <soap:Header/>
                    <soap:Body>
						<m:GetFormsForDocuments xmlns:m="http://www.cargo3.ru">
							<m:login>'.$login.'</m:login>
							<m:password>'.$password.'</m:password>
							<m:documents>
								<m:Key>Documents</m:Key>
								<m:List>
									<m:Key>'.$WaybID.'</m:Key>
								</m:List>
							</m:documents>
							<m:parameters>
								<m:Key>Parameters</m:Key>
								<m:List>
									<m:Key>DocumentType</m:Key>
									<m:Value>'.$DocType.'</m:Value>
									<m:ValueType>string</m:ValueType>
								</m:List>
								<m:List>
									<m:Key>Type</m:Key>
									<m:Value>print</m:Value>
									<m:ValueType>string</m:ValueType>
								</m:List>
								<m:List>
									<m:Key>OnlyPath</m:Key>
									<m:Value>false</m:Value>
									<m:ValueType>boolean</m:ValueType>
								</m:List>
								<m:List>
									<m:Key>Format</m:Key>
									<m:Value>PDF</m:Value>
									<m:ValueType>string</m:ValueType>
								</m:List>
								<m:List>
									<m:Key>Name</m:Key>
									<m:Value>'.$PrintName.'</m:Value>
									<m:ValueType>string</m:ValueType>
								</m:List>
							</m:parameters>
						</m:GetFormsForDocuments>
                    </soap:Body>
                </soap:Envelope>';

	$name = $WaybID.".pdf";
	$path = '/bitrix/admin/kse.pdf/';
        $rute = $_SERVER['DOCUMENT_ROOT'].$path.$name;
	$WUrl = $path.$name;

//	if (!file_exists($rute)) {
		$search_result = cKCE::GetData($XmlData);
	        $sxe = new SimpleXMLElement($search_result);
		$text = $sxe->children('soap',TRUE);
		$text = $text->children('m',TRUE);
	        
	        //$PrintDoc = $text->GetFormsForDocumentsResponse->return->List;
		$PrintDoc = json_decode(json_encode($text->GetFormsForDocumentsResponse->return));
	       
	        $FindBase64 = (string)$PrintDoc->List->BData;
	        $pdf_b64 = base64_decode($FindBase64);
	        $PDFFile = file_put_contents($rute, $pdf_b64);
	        $WUrl = '';
	        
	        if($PDFFile){
	           $MainUrl = explode('/bitrix', $_SERVER['SCRIPT_URI']);
	           $WUrl = $MainUrl[0].$path.$name;
	        }          
//	}
        
        return $pdf_b64;
    }

  

////////////////////////////////////////// GET DELIVERY DAYS ///////////////////////////////////////////////////////////////////////
	// на вход
	// логин + пароль, откуда и куда и срочность
	// на выход 
	// число, количество рабочих дней - PlannedDeliveryPeriodMax
	public function GetDeliveryDays($login, $password, $regionFrom, $regionTo, $Urgency) {
        
       // $regionFrom = 'fias-'.$regionFrom;
        $regionTo = 'postcode-'.$regionTo;
		
        $XmlData = '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:m="http://www.cargo3.ru">
        <soap:Header/>
        <soap:Body>
        	<m:Calc>
        		<m:login>'.$login.'</m:login>
        		<m:password>'.$password.'</m:password>
        		<m:data>
        		<m:Key>Destinations</m:Key>
        		<m:List>
        			<m:Key>Destination</m:Key>
        			<m:Fields>
        				<m:Key>SenderGeography</m:Key>
        				<m:Value>'.$regionFrom.'</m:Value>
        				<m:ValueType>string</m:ValueType>
        			</m:Fields>
        			<m:Fields>
        				<m:Key>RecipientGeography</m:Key>
        				<m:Value>'.$regionTo.'</m:Value>
        				<m:ValueType>string</m:ValueType>
        			</m:Fields>
        			<m:Fields>
        				<m:Key>TypeOfCargo</m:Key>
        				<m:Value>4aab1fc6-fc2b-473a-8728-58bcd4ff79ba</m:Value>
        				<m:ValueType>string</m:ValueType>
        			</m:Fields>
        			<m:Fields>
        				<m:Key>Urgency</m:Key>
        				<m:Value>'.$Urgency.'</m:Value>
        				<m:ValueType>string</m:ValueType>
        			</m:Fields>
        			<m:Fields>
        				<m:Key>Weight</m:Key>
        				<m:Value>1</m:Value>
        				<m:ValueType>float</m:ValueType>
        			</m:Fields>
        			<m:Fields>
        				<m:Key>Qty</m:Key>
        				<m:Value>1</m:Value>
        				<m:ValueType>int</m:ValueType>
        			</m:Fields>
        			<m:Fields>
        				<m:Key>VolumeWeight</m:Key>
        				<m:Value>0.5</m:Value>
        				<m:ValueType>float</m:ValueType>
        			</m:Fields>
        			<m:Fields>
        				<m:Key>Volume</m:Key>
        				<m:Value>0.03</m:Value>
        				<m:ValueType>float</m:ValueType>
        			</m:Fields>
        			<m:Fields>
        				<m:Key>DeliveryType</m:Key>
        				<m:Value>1</m:Value>
        				<m:ValueType>decimal</m:ValueType>
        			</m:Fields>
        			<m:Fields>
        				<m:Key>DeclaredValueRate</m:Key>
        				<m:Value>1000</m:Value>
        				<m:ValueType>float</m:ValueType>
        			</m:Fields>
        			<m:Fields>
        				<m:Key>InsuranceRate</m:Key>
        				<m:Value>500</m:Value>
        				<m:ValueType>float</m:ValueType>
        			</m:Fields>
        			</m:List>
        		</m:data>
        		<m:parameters>
        			<m:Key>Parameters</m:Key>
        		</m:parameters>
        	</m:Calc>
        </soap:Body>
        </soap:Envelope>';
        
        //pr ($xml);

		$search_result = cKCE::GetData($XmlData);
        	$sxe = new SimpleXMLElement($search_result);
		$text = $sxe->children('soap',TRUE);
		$text = $text->children('m',TRUE);
		$ResultArr = $text->CalcResponse->return->List->List[0];

		if ($ResultArr) {
			foreach ($ResultArr->Fields as $Fields) {		
				if($Fields->Key == 'MaxPeriod') {
					$days = "".$Fields->Value;
					break;
				}
			}
		}
		return $days;
	}

    ////////////////////////////////////////// GET USER Repository ///////////////////////////////////////////////////////////////////////
	// на вход
	// логин + пароль
	// на выход 
	// склад пользователя


	public function GetUserRepository($login, $password) {
	   
       $XmlData = '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns1="http://www.cargo3.ru">
                     <soap:Header/>
                     <soap:Body>
                     <ns1:GetReferenceData>
        		      <ns1:login>'.$login.'</ns1:login>
        		      <ns1:password>'.$password.'</ns1:password>
                     <ns1:parameters>
                     <ns1:Key>parameters</ns1:Key>
                     <ns1:List>
                     <ns1:Key>Reference</ns1:Key>
                     <ns1:Value>Repository</ns1:Value>
                     <ns1:ValueType>string</ns1:ValueType>
                     </ns1:List>
                     </ns1:parameters>
                     </ns1:GetReferenceData>
                     </soap:Body>
                    </soap:Envelope>';
       
		$result = cKCE::GetData($XmlData);
        $sxe = new SimpleXMLElement($result);
        
        //pr ($result);
		$text = $sxe->children('soap',TRUE);
		$text = $text->children('m',TRUE);

		$GuidGeography = "";
		$repository = "";
		$NameGeography = "";
		$repositorys = json_decode(json_encode($text->GetReferenceDataResponse->return->List));
        	$repositorys = $repositorys->Fields;
		
		foreach ($repositorys as $repository_item) {		
			if($repository_item->Key == 'GuidGeography') {
				$GuidGeography = "".$repository_item->Value;
			}
			if($repository_item->Key == 'NameGeography') {
				$NameGeography = "".$repository_item->Value;
			}
		}
		
        //Получаем GUID код склада
		$repository = cKCE::GetGeographyID($login, $password, $NameGeography);
        
		return $repository;
         
	}
    
    
        //Рассчитываем стоимость доставки
        // вход
        // login - логин пользователя (из настроек модуля)
        // password - пароль пользователя (из настроек модуля)
        // regionFrom - откуда идет отправка (из настроек модуля)
        // regionTo - куда идет отправка
        // Weight - вес груза, кг
        // Qty - количество мест (считаем, что SKU - одно место)
        // VolumeWeight - объемный вес (необязательный параметр)
        // Volume - объем груза (необязательный параметр)
        // DeclaredValueRate - объявленная стоимость груза (необязательный параметр) (из настроек модуля)
        // InsuranceRate - страховая стоимость груза (из настроек модуля)
        // Urgency - срочность (необязательный параметр) (из настроек модуля) 8bbab642-1df3-11de-bcd5-0015170f8c09 - эконом доставка, 18c4f207-458b-11dc-9497-0015170f8c09 - срочная доставка
        // TypeOfCargo - тип доставки (из настроек модуля) по умолчанию указана доставка от склада до склада        
        //
        // выход - количество дней, сумма, валюта (рубли) 
    
    	public function GetDeliveryCost($login, $password, $regionFrom, $regionTo, $Weight, $Qty, $DeliveryMethod, $Urgency ='18c4f207-458b-11dc-9497-0015170f8c09', $VolumeWeight='', $Volume='', $DeclaredValueRate = '0', $InsuranceRate = '0', $TypeOfCargo = '4aab1fc6-fc2b-473a-8728-58bcd4ff79ba') {

		//echo "<hr><h1>Выводим стоимость доставки с $regionFrom до $regionTo</h1>";
		//echo "<strong>GetDeliveryCost</strong><br>";

        $regionTo = 'postcode-'.$regionTo;
        $regionFrom = 'postcode-'.$regionFrom;
        
		$XmlData = '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:m="http://www.cargo3.ru">
		<soap:Header/>
		<soap:Body>
			<m:Calc>
				<m:login>'.$login.'</m:login>
				<m:password>'.$password.'</m:password>
				<m:data>
				<m:Key>Destinations</m:Key>
				<m:List>
					<m:Key>Destination</m:Key>
					<m:Fields>
						<m:Key>SenderGeography</m:Key>
						<m:Value>'.$regionFrom.'</m:Value>
						<m:ValueType>string</m:ValueType>
					</m:Fields>
					<m:Fields>
						<m:Key>RecipientGeography</m:Key>
						<m:Value>'.$regionTo.'</m:Value>
						<m:ValueType>string</m:ValueType>
					</m:Fields>
					<m:Fields>
						<m:Key>TypeOfCargo</m:Key>
						<m:Value>'.$TypeOfCargo.'</m:Value>
						<m:ValueType>string</m:ValueType>
					</m:Fields>
					<m:Fields>
						<m:Key>Urgency</m:Key>
						<m:Value>'.$Urgency.'</m:Value>
						<m:ValueType>string</m:ValueType>
					</m:Fields>
					<m:Fields>
						<m:Key>Weight</m:Key>
						<m:Value>'.$Weight.'</m:Value>
						<m:ValueType>float</m:ValueType>
					</m:Fields>
					<m:Fields>
						<m:Key>Qty</m:Key>
						<m:Value>'.$Qty.'</m:Value>
						<m:ValueType>int</m:ValueType>
					</m:Fields>
					<m:Fields>
						<m:Key>VolumeWeight</m:Key>
						<m:Value>'.$VolumeWeight.'</m:Value>
						<m:ValueType>float</m:ValueType>
					</m:Fields>
					<m:Fields>
						<m:Key>Volume</m:Key>
						<m:Value>'.$Volume.'</m:Value>
						<m:ValueType>float</m:ValueType>
					</m:Fields>
					<m:Fields>
						<m:Key>DeliveryType</m:Key>
						<m:Value>'.$DeliveryMethod.'</m:Value>
						<m:ValueType>decimal</m:ValueType>
					</m:Fields>
					<m:Fields>
						<m:Key>DeclaredValueRate</m:Key>
						<m:Value>'.$DeclaredValueRate.'</m:Value>
						<m:ValueType>float</m:ValueType>
					</m:Fields>
					<m:Fields>
						<m:Key>InsuranceRate</m:Key>
						<m:Value>'.$InsuranceRate.'</m:Value>
						<m:ValueType>float</m:ValueType>
					</m:Fields>
					</m:List>
				</m:data>
				<m:parameters>
					<m:Key>Parameters</m:Key>
				</m:parameters>
			</m:Calc>
		</soap:Body>
		</soap:Envelope>';
AddMessage2Log($XmlData);
		$search_result = cKCE::GetData($XmlData);
AddMessage2Log($search_result);
//		$sxe = new SimpleXMLElement($search_result);

		$text = cKCE::FormatXml2($search_result);



		if ($text) {
//			$text = $sxe->children('soap',TRUE);
			//$text = $text->children('m',TRUE);
			if ($text['mList'][0]) {
				$ResultArr = $text['mList'][0];
			} else {
				$ResultArr = $text['mList'];
			}
			//echo "<pre>";print_r($ResultArr);echo "</pre>";

//pr($text);	
			//Init
			$cost = 0;
			$currency = '';
			$days = 0;
			$mindays = 0;
			if ($ResultArr) {
				foreach ($ResultArr['mFields'] as $Fields) {		
					if($Fields['mKey'] == 'Total') {
						$cost = "".$Fields['mValue'];
					}
					if($Fields['mKey'] == 'Currency') {
						$currency = "".$Fields['mValue'];
						if($currency=='ff3f7c38-4430-11dc-9497-0015170f8c09')
							$currency = 'руб';
					}
					if($Fields['mKey'] == 'MinPeriod') {
						$mindays = "".$Fields['mValue'];
					}
					if($Fields['mKey'] == 'MaxPeriod') {
						$days = "".$Fields['mValue'];
					}			
				}
			}
		}
        $val = COption::GetOptionString("courierserviceexpress.moduledost", "price")*1;
        $edin = COption::GetOptionString("courierserviceexpress.moduledost", "price_edinitsa");
        $cost = cKCE::SetDiscount($cost,$val,$edin);
		return array('cost'=>$cost, 'currency'=>$currency, 'days'=>$days, 'mindays'=>$mindays);
	}
    

    public function UpdateClientProducts ($login, $password, $Items){
        
        
        //Сопоставляем единицы измерения товаров
        $unit = '601632e2-976d-11dc-986e-0015170f8c09'; //По умолчанию считаем, что товары измеряются в штуках

        
        
        $null='';
        
        $XmlData = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope">
                    <soap:Header/>
                    <soap:Body>
                        <m:UpdateClientProducts xmlns:m="http://www.cargo3.ru">
                            <m:Login>'.$login.'</m:Login>
                            <m:Password>'.$password.'</m:Password>
                            <m:data>
                                <m:Key>Products</m:Key>';
        foreach ($Items as $item){
            
            switch ($item['UNIT']) {
                case 'шт': $unit = '601632e2-976d-11dc-986e-0015170f8c09'; break;
                case 'ч': $unit = '601632e1-976d-11dc-986e-0015170f8c09'; break;
                case 'упк': $unit = '0232d433-c84d-11dd-927a-0015170f8c09'; break;
                case 'см': $unit = '37dec53a-e399-11dd-927a-0015170f8c09'; break;
                case 'м3': $unit = '601632de-976d-11dc-986e-0015170f8c09'; break;
                case 'кг': $unit = '601632df-976d-11dc-986e-0015170f8c09'; break;
            }

	if (!$item['UNIT']) $unit = '601632e2-976d-11dc-986e-0015170f8c09';
    
    if (!$item['SKU']) $item['SKU'] = str_replace('.','',$_SERVER['HTTP_HOST']).$item['ID'];
    
    //pr ($item);
            
            $XmlData.='             <m:List>
                                    <m:Key>'.$item['SKU'].'</m:Key>
                                    <m:Fields>
                                        <m:Key>Article</m:Key>
                                        <m:Value>'.$item['SKU'].'</m:Value>
                                        <m:ValueType>string</m:ValueType>
                                    </m:Fields>
                                    <m:Fields>
                                        <m:Key>Name</m:Key>
                                        <m:Value>'.$item['NAME'].'</m:Value>
                                        <m:ValueType>string</m:ValueType>
                                    </m:Fields>
                                    <m:Fields>
                                        <m:Key>FullName</m:Key>
                                        <m:Value>'.$item['NAME'].'</m:Value>
                                        <m:ValueType>string</m:ValueType>
                                    </m:Fields>
                                    <m:Fields>
                                        <m:Key>BaseUnit</m:Key>
                                        <m:Value>'.$unit.'</m:Value>
                                        <m:ValueType>string</m:ValueType>
                                    </m:Fields>
                                    <m:Fields>
                                        <m:Key>TypeOfProduct</m:Key>
                                        <m:Value>0</m:Value>
                                        <m:ValueType>decimal</m:ValueType>
                                    </m:Fields>
                                </m:List>';
        }

	$XmlData.='             <m:List>
                                    <m:Key>ДОСТАВКА2</m:Key>
                                    <m:Fields>
                                        <m:Key>Article</m:Key>
                                        <m:Value>ДОСТАВКАКСЭ</m:Value>
                                        <m:ValueType>string</m:ValueType>
                                    </m:Fields>
                                    <m:Fields>
                                        <m:Key>Name</m:Key>
                                        <m:Value>Услуга доставки КСЭ</m:Value>
                                        <m:ValueType>string</m:ValueType>
                                    </m:Fields>
                                    <m:Fields>
                                        <m:Key>FullName</m:Key>
                                        <m:Value>Услуга доставки КСЭ</m:Value>
                                        <m:ValueType>string</m:ValueType>
                                    </m:Fields>
                                    <m:Fields>
                                        <m:Key>BaseUnit</m:Key>
                                        <m:Value>601632e2-976d-11dc-986e-0015170f8c09</m:Value>
                                        <m:ValueType>string</m:ValueType>
                                    </m:Fields>
                                    <m:Fields>
                                        <m:Key>TypeOfProduct</m:Key>
                                        <m:Value>0</m:Value>
                                        <m:ValueType>decimal</m:ValueType>
                                    </m:Fields>
                                </m:List>';
                                
        $XmlData.='                               
                            </m:data>
                            <m:parameters>
                                <m:Key>Parameters</m:Key>
                            </m:parameters>
                        </m:UpdateClientProducts>
                    </soap:Body>
                </soap:Envelope>';
 //pr ($XmlData);
        $search_result = cKCE::GetData($XmlData);
	$sxe = new SimpleXMLElement($search_result);
	$text = $sxe->children('soap',TRUE);
	$text = $text->children('m',TRUE);
	$ResultData = json_decode(json_encode($text->UpdateClientProductsResponse->return));
	$ResultData = $ResultData->List;
        $i=0;
        if (count($Items) > 1) {
	        foreach ($ResultData as $Data) {
	            foreach ($Data->Properties as $prop){
	                if ($prop->Key == 'Article') $arProd[$i]['SKU'] = (string)$prop->Value;
	                if ($prop->Key == 'GUID') $arProd[$i]['GUID'] = (string)$prop->Value;
	            }
	            $i++;
	        }
	} else {
		foreach ($ResultData->Properties as $prop){
	                if ($prop->Key == 'Article') $arProd[$i]['SKU'] = (string)$prop->Value;
	                if ($prop->Key == 'GUID') $arProd[$i]['GUID'] = (string)$prop->Value;
	            }
	}
        //pr ($arProd); die();
        return $arProd;
    }
	
    public function SetWaybill(
                        $login,
                        $password,
                        $BtrxOrderId,
                        $RecepientName,
                        $GeoTo,
                        $RecepientFullAddress,
                        $RecepientPhone,
                        $RecepientEmail,
                        $Urgency,
                        $CargoDescription,
                        $CargoPackageQty,
                        $Weight,
                        $GeoFrom,
                        $ClientName,
                        $ClientNameOfficial,
                        $SenderPhone,
                        $SenderAddress,
                        $SenderComment,
                        $TakeDate,
                        $TypeOfCargo,
                        $TypeOfPayer,
                        $WayOfPayment,
                        $Items,
                        $SumDost,
                        $SumPayZakaz,
                        $SumNeedPayZakaz,
                        $DeliveryOfCargo,
                        $GUIDPvz,
                        $DeliveryDate,
                        $DeliveryTime,
                        $VATRate
    ) {
        
       // $regionFrom = 'fias-'.$regionFrom;
        $regionTo = 'postcode-'.$regionTo;
        
        //Обновляем информацию о товарах
        $arProd = cKCE::UpdateClientProducts($login, $password, $Items);
        
        //приводим тип доставки в соответствие с накладными
        $DeliveryOfCargo = cKCE::GetDeliveryType($DeliveryOfCargo);

        $rand=rand(0,1598458);
        $DeclaredValueRate = $SumNeedPayZakaz - $SumDost;
        if ($DeliveryDate) {
            $DeliveryDate = cKCE::DateTimeFormat($DeliveryDate);
        }
                if ($SumPayZakaz>0) {
            $COD = floatval($SumNeedPayZakaz) - floatval($SumPayZakaz);
        }else{
            $COD = floatval($SumNeedPayZakaz);
        }
        
        $XmlData = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:car="http://www.cargo3.ru"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xs="http://www.w3.org/2001/XMLSchema">
         <soap:Header/>
         <soap:Body>
             <car:SaveWaybillOffice>
                 <car:Language/>
                 <car:Login>'.$login.'</car:Login>
                 <car:Password>'.$password.'</car:Password>
                 <car:Company/>
                 <car:Number/>
                 <car:ClientNumber>'.$BtrxOrderId.'-'.$rand.'</car:ClientNumber>
                 <car:OrderData>
                     <car:ClientContact/>';
        if ($DeliveryDate) {
            $XmlData .='<car:DeliveryDate>'.$DeliveryDate.'</car:DeliveryDate>';
                        //<car:DeliveryTime>'.$DeliveryTime.'</car:DeliveryTime>'; 
        }
        

        $XmlData .='<car:Recipient>
                         <car:Client>'.$RecepientName.'</car:Client>
                         <car:Official></car:Official>
                         <car:Address>
                             <car:Geography>'.$GeoTo.'</car:Geography>
                             <car:Info>'.$RecepientFullAddress.'</car:Info>
                             <car:Comment></car:Comment>
                             <car:FreeForm>true</car:FreeForm>
                         </car:Address>
        				 <car:Phone>'.$RecepientPhone.'</car:Phone>
        				 <car:EMail>'.$RecepientEmail.'</car:EMail>
        				 <car:Urgency>'.$Urgency.'</car:Urgency>
                         <car:Cargo>
                             <car:CargoDescription>'.$CargoDescription.'</car:CargoDescription>
                             <car:CargoPackageQty>'.$CargoPackageQty.'</car:CargoPackageQty>
                             <car:Weight>'.$Weight.'</car:Weight>                             
            				<car:DeclaredValueRate>'.$DeclaredValueRate.'</car:DeclaredValueRate>
                            <car:COD>'.$COD.'</car:COD>
            				<car:CustomerPrepayment>'.$SumPayZakaz.'</car:CustomerPrepayment>
                         </car:Cargo>';
        
        foreach ($Items as $Item){    
                $Name='';
                foreach ($arProd as $Prod) {
                    if ($Prod['SKU'] == $Item['SKU']) $Name = $Prod['GUID'];
                }
                
                if (!$Item['SKU']) $Item['SKU'] = str_replace('.','',$_SERVER['HTTP_HOST']).$Item['ID'];
                        
                 $XmlData .='<car:Products>
                             <car:Article>'.$Item['SKU'].'</car:Article>  
                             <car:Price>'.$Item['PRICE'].'</car:Price>
                             <car:PackageQty>'.$Item['QTY'].'</car:PackageQty>
                             <car:Qty>'.$Item['QTY'].'</car:Qty>
                             <car:VATRate>'.$VATRate.'</car:VATRate>
                             <car:Comment>'.$Item['NAME'].'</car:Comment>
                         </car:Products>';
        }

		$XmlData .='<car:Products>
                             <car:Article>ДОСТАВКАКСЭ</car:Article>  
                             <car:Price>'.$SumDost.'00</car:Price>
                             <car:PackageQty>1</car:PackageQty>
                             <car:Qty>1</car:Qty>
                             <car:VATRate>'.$VATRate.'</car:VATRate>
                             <car:Comment>Услуга доставки</car:Comment>
                         </car:Products>';
    if ($GUIDPvz) {    
        $XmlData .='<car:PVZ>'.$GUIDPvz.'</car:PVZ>';
    }
        $XmlData .='</car:Recipient>                        
                        <car:ReplyEMail>'.$RecepientEmail.'</car:ReplyEMail>
                        <car:ReplySMSPhone>'.$RecepientPhone.'</car:ReplySMSPhone>                        
                     <car:Sender>
                         <car:Client>'.$ClientName.'</car:Client>
                         <car:Official>'.$ClientNameOfficial.'</car:Official>
                         <car:Address>
                             <car:Geography>'.$GeoFrom.'</car:Geography>
                             <car:Info>'.$SenderAddress.'</car:Info>
                             <car:FreeForm>true</car:FreeForm>
                         </car:Address>
                         <car:Phone>'.$SenderPhone.'</car:Phone>
                     </car:Sender>
        			 <car:TakeDate>'.$TakeDate.'</car:TakeDate>
        			 <car:TypeOfCargo>'.$TypeOfCargo.'</car:TypeOfCargo>
        			 <car:TypeOfPayer>'.$TypeOfPayer.'</car:TypeOfPayer>
        			 <car:WayOfPayment>'.$WayOfPayment.'</car:WayOfPayment>
                     <car:Comment>'.$SenderComment.'</car:Comment>
                     <car:DeliveryOfCargo>'.$DeliveryOfCargo.'</car:DeliveryOfCargo>                                                                            
                 </car:OrderData>
                 <car:Office/>
             </car:SaveWaybillOffice>
         </soap:Body>
        </soap:Envelope>';

//AddMessage2Log($XmlData);

                        //<car:DeliveryDateOf>2020-05-28 00:00:00</car:DeliveryDateOf>

		$search_result = cKCE::GetData($XmlData);

        AddMessage2Log($XmlData);
        AddMessage2Log($search_result);

        $sxe = new SimpleXMLElement($search_result);
		$text = $sxe->children('soap',TRUE);
		$text = $text->children('m',TRUE);

		$WayBills = json_decode(json_encode($text->SaveWaybillOfficeResponse->return->Items));        
        $WayBillID = (string)$WayBills->Value;

		return $WayBillID;
	}
    
    
    public function SetOrder(
                        $login,
                        $password,
                        $arWaybills,
                        $TakeDate,
                        $TakeTime,
                        $Sender,
                        $SenderFIO,
                        $SenderGeography,
                        $SenderAddress,
                        $SenderPhone,
                        $SenderEmail,
                        $SenderComment,
                        $Urgency,
                        $Payer,
                        $PaymentMethod,
                        $ShippingMethod,
                        $TypeOfCargo,
                        $Weight,
                        $CargoPackageQty
    ) {
        
        
        $XmlData = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:m="http://www.cargo3.ru">
                	<soap:Header/>
                	<soap:Body>
                    	<m:SaveDocuments>
                    	<m:login>'.$login.'</m:login>
                    	<m:password>'.$password.'</m:password>
                    	<m:data>
                    		<m:Key>Orders</m:Key>
                    		<m:List>
                    			<m:Key>Order</m:Key>
                    			<m:Fields>
                    				<m:Key>TakeDate</m:Key>
                    				<m:Value>'.$TakeDate.'T00:00:00</m:Value>
                    				<m:ValueType>dateTime</m:ValueType>
                    			</m:Fields>
                                <m:Fields>
                                <m:Key>TakeTime</m:Key>
                                    <m:Value>'.$TakeTime.'</m:Value>
                                    <m:ValueType>string</m:ValueType>
                                </m:Fields>
                                <m:Fields>
                                    <m:Key>TakeAtOffice</m:Key>
                                    <m:Value>false</m:Value>
                                    <m:ValueType>boolean</m:ValueType>
                                </m:Fields>
                    			<m:Fields>
                    				<m:Key>Sender</m:Key>
                    				<m:Value>'.$Sender.'</m:Value>
                    				<m:ValueType>string</m:ValueType>
                    			</m:Fields>
                                <m:Fields>
                                    <m:Key>SenderOfficial</m:Key>
                                    <m:Value>'.$SenderFIO.'</m:Value>
                                    <m:ValueType>string</m:ValueType>
                                </m:Fields>
                    			<m:Fields>
                    				<m:Key>SenderGeography</m:Key>
                    				<m:Value>'.$SenderGeography.'</m:Value>
                    				<m:ValueType>string</m:ValueType>
                    			</m:Fields>
                    			<m:Fields>
                    				<m:Key>SenderAddress</m:Key>
                    				<m:Value>'.$SenderAddress.'</m:Value>
                    				<m:ValueType>string</m:ValueType>
                    			</m:Fields>
                    			<m:Fields>
                    				<m:Key>SenderPhone</m:Key>
                    				<m:Value>'.$SenderPhone.'</m:Value>
                    				<m:ValueType>string</m:ValueType>
                    			</m:Fields>
                    			<m:Fields>
                    				<m:Key>SenderEMail</m:Key>
                    				<m:Value>'.$SenderEmail.'</m:Value>
                    				<m:ValueType>string</m:ValueType>
                    			</m:Fields>
                    			<m:Fields>
                    				<m:Key>SenderInfo</m:Key>
                    				<m:Value>'.$SenderComment.'</m:Value>
                    				<m:ValueType>string</m:ValueType>
                    			</m:Fields>
                    			<m:Fields>
                    				<m:Key>Urgency</m:Key>
                    				<m:Value>'.$Urgency.'</m:Value>
                    				<m:ValueType>string</m:ValueType>
                    			</m:Fields>
                                <m:Fields>
        				            <m:Key>IsDistribution</m:Key>
                    				<m:Value>true</m:Value>
                    				<m:ValueType>boolean</m:ValueType>
                    			</m:Fields>
                    			<m:Fields>
                    				<m:Key>Payer</m:Key>
                    				<m:Value>'.$Payer.'</m:Value>
                    				<m:ValueType>string</m:ValueType>
                    			</m:Fields>
                    			<m:Fields>
                    				<m:Key>PaymentMethod</m:Key>
                    				<m:Value>'.$PaymentMethod.'</m:Value>
                    				<m:ValueType>string</m:ValueType>
                    			</m:Fields>
                    			<m:Fields>
                    				<m:Key>ShippingMethod</m:Key>
                    				<m:Value>'.$ShippingMethod.'</m:Value>
                    				<m:ValueType>string</m:ValueType>
                    			</m:Fields>
                    			<m:Fields>
                    				<m:Key>TypeOfCargo</m:Key>
                    				<m:Value>'.$TypeOfCargo.'</m:Value>
                    				<m:ValueType>string</m:ValueType>
                    			</m:Fields>
                    			<m:Fields>
                    				<m:Key>WithReturn</m:Key>
                    				<m:Value>false</m:Value>
                    				<m:ValueType>boolean</m:ValueType>
                    			</m:Fields>
                    			<m:Fields>
                    				<m:Key>Weight</m:Key>
                    				<m:Value>'.$Weight.'</m:Value>
                    				<m:ValueType>float</m:ValueType>
                    			</m:Fields>
                    			<m:Fields>
                    				<m:Key>CargoPackageQty</m:Key>
                    				<m:Value>'.$CargoPackageQty.'</m:Value>
                    				<m:ValueType>int</m:ValueType>
                    			</m:Fields>
                               <m:Tables>
                        			<m:Key>Waybills</m:Key>';
            foreach ($arWaybills as $Waybill){
                $XmlData .='            <m:List>
                        			    <m:Key>Items</m:Key>
                        			    <m:Fields>
                            				<m:Key>Number</m:Key>
                            				<m:Value>'.$Waybill.'</m:Value>
                           					<m:ValueType>string</m:ValueType>
                        				</m:Fields>
                       				</m:List>';
            }                                        
            $XmlData .='            </m:Tables>
                    		</m:List>
                    	</m:data>
                    	<m:parameters>
                    		<m:Key>Parameters</m:Key>
                    		<m:List>
                    			<m:Key>DocumentType</m:Key>
                    			<m:Value>order</m:Value>
                    			<m:ValueType>string</m:ValueType>
                    		</m:List>
                    	</m:parameters>
                    </m:SaveDocuments>
                </soap:Body>
                </soap:Envelope>';
        
	        $search_result = cKCE::GetData($XmlData);
		$sxe = new SimpleXMLElement($search_result);
		$text = $sxe->children('soap',TRUE);
		$text = $text->children('m',TRUE);
		$Orders = json_decode(json_encode($text->SaveDocumentsResponse->return->List));
	        $Orders = $Orders->Properties;
		$OrderID ='';
		foreach ($Orders as $Order) {
			if ($Order->Key == 'Number') $OrderID = (string)$Order->Value;
		}
	return $OrderID;
	}
    
    
    //$DocType = Waybill - накладная
    //$DocType = Order - заказ
   	public function GetDocumentInfo($login, $password, $DocType, $BillNumber) {
        
        
        $XmlData = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope">
                    <soap:Header/>
                    <soap:Body>
                        <m:GetDocuments xmlns:m="http://www.cargo3.ru">
                            <m:login>'.$login.'</m:login>
                            <m:password>'.$password.'</m:password>
                            <m:data>
                                <m:Key>Number</m:Key>
                                <m:List>
                                    <m:Key>'.$BillNumber.'</m:Key>
                                    <m:Properties>
                                        <m:Key>Number</m:Key>
                                        <m:Value>'.$BillNumber.'</m:Value>
                                        <m:ValueType>string</m:ValueType>
                                    </m:Properties>
                                </m:List>
                            </m:data>
                            <m:parameters>
                            <m:Key>Parameters</m:Key>
                            <m:List>
                                <m:Key>DocumentType</m:Key>
                                <m:Value>'.$DocType.'</m:Value>
                                <m:ValueType>string</m:ValueType>
                            </m:List>
                            </m:parameters>
                        </m:GetDocuments>
                    </soap:Body>
                </soap:Envelope>';

        $search_result = cKCE::GetData($XmlData);
pr ($search_result);        
	$sxe = new SimpleXMLElement($search_result);
	$text = $sxe->children('soap',TRUE);
	$text = $text->children('m',TRUE);
	$arFields = json_decode(json_encode($text->GetDocumentsResponse->return));
        $arFields = $arFields->Tables->Fields;
        
        
        foreach ($arFields as $Field) {
            if ($Field->Key == 'Weight') $Weight = (float) $Field->Value;
            if ($Field->Key == 'CargoPackageQty') $Qty = (int) $Field->Value;
            
        }
        $result['WEIGHT'] = $Weight;
        $result['QTY'] = $Qty;
        
		return $result;
	}
    
    	public function GetDocumentStatus($login, $password, $DocType, $BillNumber) {
        
        
        $XmlData = '<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns1="http://www.cargo3.ru">
                        <SOAP-ENV:Body>
                            <ns1:Tracking>
                                <ns1:login>'.$login.'</ns1:login>
                                <ns1:password>'.$password.'</ns1:password>
                                <ns1:documents>
                                    <ns1:Key>Documents</ns1:Key>
                                        <ns1:Properties>
                                         <ns1:Key>DocumentType</ns1:Key>
                                         <ns1:Value>'.$DocType.'</ns1:Value>
                                         <ns1:ValueType>string</ns1:ValueType>
                                        </ns1:Properties>
                                        <ns1:Properties>
                                         <ns1:Key>OnlySelectedType</ns1:Key>
                                         <ns1:Value>true</ns1:Value>
                                         <ns1:ValueType>boolean</ns1:ValueType>
                                        </ns1:Properties>
                                        <ns1:List>
                                         <ns1:Key>'.$BillNumber.'</ns1:Key>
                                        </ns1:List>
                                </ns1:documents>
                                <ns1:parameters>
                                    <ns1:Key>Parameters</ns1:Key>
                                </ns1:parameters>
                            </ns1:Tracking>
                        </SOAP-ENV:Body>
                    </SOAP-ENV:Envelope>';

		$search_result = cKCE::GetData($XmlData);
        $sxe = new SimpleXMLElement($search_result);
	   $text = $sxe->children('soap',TRUE);
	   $text = $text->children('m',TRUE);
       
       $arStatuses = array (
            'ee9fc99e-53e5-4253-8b80-b582294ef526', //Зарегистрирована накладная
            'b7b5f799-94c7-4588-bae4-c14df35c9752', //Груз получен на склад КС
            'b2af9ad9-22bd-4476-9393-7b51ffdab6f7', //Груз передан на доставку
            '1c3ed878-48d2-4192-bbe6-513727535f21', //Отправление прибыло в город
            '0997e505-7ccf-42cd-b5e3-dda20d26da27', //Доставка завершена
            '8e5ded66-a8f5-4fa8-b863-03e1e0406df5', //Отправление доставлено получателю
            'e71eb2c1-36db-4b9c-9559-6a6350030d41', //Внимание! Информация по доставке
            '56f72f4b-60c4-49a8-8a86-730bad6cd07a', //Оформлен возврат отправления
       );
       
       $arExceptions = array (
            '7f72c526-076b-11ea-80d7-7cd30aec6901', //	Количество доставок истекло
            'd25a2ec5-a2be-11e7-875d-001e67086478', //	Перенос по просьбе заказчика/отправителя
            'b357981f-a2be-11e7-875d-001e67086478', //	Утилизация отправления
            '67e3b5b1-b402-11df-a1ff-00237dd28494', //	Неудачная попытка вручения
            'bdd08c0c-d6a3-11e8-b321-005056b649b2', //	Отправление задержано на складе
            '91b16527-8d30-11dc-86de-0015170f8c09', //	Переадресация
            '87f14612-05cc-11e8-a2b1-001e67086478', //	Проблема при выполнении заявки
            '3d686e47-515f-11e1-8562-001e67086478', //	Груз на таможенном оформлении
            '66b22dc2-0659-11e8-a2b1-001e67086478', //	Груз на таможенном оформлении
            '99f37df7-82fe-11dc-86de-0015170f8c09', //	Перенос доставки
            'c9eca960-8ea4-11dc-86de-0015170f8c09', //	самовывоз из офиса КС
            '91b16526-8d30-11dc-86de-0015170f8c09', //	Вопрос по оплате 
            '44048d1f-05cc-11e8-a2b1-001e67086478', //	Уточнение данных по доставке
            'ac33d1ee-4880-11e4-bb98-001e67086478', //	Загрузка док-тов некоррек
            '67e3b5b3-b402-11df-a1ff-00237dd28494', //	Задержка прибытия жд/авто, невылет
            '5a45fb8b-0659-11e8-a2b1-001e67086478', //	Задержка прибытия жд/авто, невылет
            '67e3b5b2-b402-11df-a1ff-00237dd28494', //	Попытка вручения не состоялась
            '67e3b5b0-b402-11df-a1ff-00237dd28494', //	некорректные сопров.докты
            '771e4809-9131-11dc-86de-0015170f8c09', //	Отказ при попытке вручения
            'f76287cd-0782-11ea-80ee-7cd30aebf951', //	Отказ через WEB
            '6e4ec5ed-1f58-11ea-80ee-7cd30aebf951', //	Переадресация через виджет
            'd8f7cf2d-ae45-11e2-a158-001e67086478', //	Отказ при предварительном согласовании
            '8fefa51f-9114-11dc-86de-0015170f8c09', //	Возврат отправления по требованию клиента
            '99f37dfb-82fe-11dc-86de-0015170f8c09', //	Отправление изъято
            '21aef387-0659-11e8-a2b1-001e67086478', //	Отправление изъято
            '4d3cd573-0659-11e8-a2b1-001e67086478', //	Требуется дополнительная упаковка
            '5aecc954-e791-11dd-927a-0015170f8c09', //	_Возврат обратных документов не произведен по причине их отсутствия

       );
        $ResultArr = json_decode(json_encode($text->TrackingResponse->return->List));
        $ResultArr = $ResultArr->List;
        foreach ($ResultArr as $arRes) {
            if (in_array($arRes->Properties[0]->Value,$arStatuses))
            {
                if ($arRes->Properties[4]->Value != 'Расконсолидация') {
                    //pr ($arRes);
                    $arStatusResult['NAME'] = $arRes->Properties[1]->Value;
                    $arStatusResult['GUID'] = $arRes->Properties[0]->Value;
                }
                if (($arRes->Properties[0]->Value == '8e5ded66-a8f5-4fa8-b863-03e1e0406df5') or ($arRes->Properties[0]->Value == '56f72f4b-60c4-49a8-8a86-730bad6cd07a'))
                {
                    $arStatusResult['NAME'] = $arRes->Properties[1]->Value;
                    $arStatusResult['GUID'] = $arRes->Properties[0]->Value;
                    break;
                }
            } elseif (in_array($arRes->Properties[0]->Value,$arExceptions)) {
                $arStatusResult['NAME'] = 'Внимание! Информация по доставке';
                $arStatusResult['GUID'] = 'e71eb2c1-36db-4b9c-9559-6a6350030d41';
            }
        }
        
        //pr ($ResultArr);
        //pr ($arStatusResult);
        
		return $arStatusResult;
	}
	
	
	
/////////////////////////////////////////////////////////////////////////////////////////////////////    
/////////////////////////////  ВИДЖЕТ ДОСТАВКИ В КАРТОЧКЕ ТОВАРА ///////////////////////////////////
// вход - название населенного пункта
// выход - массив с количеством дней и населенным пунктом
///////////////////////////////////////////////////////////////////////////////////////////////////    
    public function ShowCardWidget($cityTO){
        
        if (!$cityTO) return NULL;
        
        Loader::includeModule("highloadblock");  
		$hlbl = COption::GetOptionString("courierserviceexpress.moduledost", "hblockID")*1;
        $hlblock = HL\HighloadBlockTable::getById($hlbl)->fetch(); 
        $entity = HL\HighloadBlockTable::compileEntity($hlblock); 
        $entity_data_class = $entity->getDataClass();
        $res = \Bitrix\Sale\Location\LocationTable::getList(array(
            'filter' => array('=NAME_RU' => $cityTO),
            'select' => array('ID','NAME_RU' => 'NAME.NAME', 'TYPE_CODE' => 'TYPE.CODE')
            ));
        while($item = $res->fetch())
        {
            $CityID = $item['ID'];
        }
		$ZIPfrom = COption::GetOptionString("courierserviceexpress.moduledost", "sklad-fias");	//Отправляем со склада по умолчанию (из настроек модуля)
		$KCElogin = COption::GetOptionString("courierserviceexpress.moduledost", "login");
		$KCEpass = COption::GetOptionString("courierserviceexpress.moduledost", "pass");
        $Urgency = COption::GetOptionString("courierserviceexpress.moduledost", "urgency");
		$arLocs = CSaleLocation::GetLocationZIP($CityID)->fetch();
        //$Zips = Application::getConnection()->query("SELECT * FROM b_sale_loc_ext WHERE SERVICE_ID = '3' and LOCATION_ID = '".$CityID."'")->fetch(); 
        $ZIPto = $arLocs['ZIP'];
        //if ($Zips['XML_ID']) $ZIPto = $Zips['XML_ID'];
		//echo $ZIPto;
        
        //Если такие запросы уже были, то вытаскиваем их из HIGHLOAD инфоблока
        $rsData = $entity_data_class::getList(array(
           "select" => array("*"),
           "order" => array("ID" => "ASC"),
           "filter" => array("UF_ZIPTO" => $ZIPto)
        ));
        while($arData = $rsData->Fetch()){
            $days = $arData['UF_DAYS'];
			$zips = $arData['UF_ZIPTO'];
        }
        
        //Если данных нет в базе, то делаем запрос в КСЕ и записываем в базу
        if ((!$days)&&(!$zips)) {
            //Получаем данные от КСЕ
            $days = cKCE::GetDeliveryDays($KCElogin, $KCEpass, $ZIPfrom, $ZIPto, $Urgency);

            //Записываем их в HIGHLOAD если пришел ответ
            if ($days) {
             $data = array("UF_ZIPTO" => $ZIPto, "UF_DAYS" => $days, "UF_KSEDATE" => time());
             $result = $entity_data_class::add($data);
            }
        }
        
        //Если от КСЕ пришел пустой запрос, то выводим уточнение у менеджера        
        	if ($days) {
                $days = $days + COption::GetOptionString("courierserviceexpress.moduledost", "days-to-sklad")*1;
                $DaysName = cKCE::GetDaysName($days);   //Формируем русское название для дней
    			$days = $days.' '.$DaysName;
            }
    		else
    			$days = 'уточните у менеджера.';
            
       $logo = '<img src="'.$_SERVER["SITE_SERVER_NAME"].'/bitrix/modules/courierserviceexpress.moduledost/img/cse-sm.png">';
       $arKCE = array('days'=>$days,'cityTO'=>$cityTO, 'logo'=>$logo);
			
       return $arKCE;
    }

    public function updateKCEOrders(){
        Loader::includeModule("highloadblock"); 
        Loader::includeModule("sale");
        $KCElogin = COption::GetOptionString("courierserviceexpress.moduledost", "login");
        $KCEpass = COption::GetOptionString("courierserviceexpress.moduledost", "pass");
        $hlbl = COption::GetOptionString("courierserviceexpress.moduledost", "WayBillshblockID")*1;
        $hlblock = HL\HighloadBlockTable::getById($hlbl)->fetch(); 
        $entity = HL\HighloadBlockTable::compileEntity($hlblock); 
        $entity_data_class = $entity->getDataClass();

        $rsData = $entity_data_class::getList(array(
                   "select" => array("*"),
                   //"filter" => array ("UF_KSE_ORDERID" => ''),
                   "order" => array("ID" => "ASC")
                ));
                        $Weight=0;
                $Qty=0;
                $i=0;
                while ($res1 = $rsData->fetch()){
                    $arWayBills[$i]=$res1;           
                    //Получаем накладные от КСЭ, если данные еще не были получены ранее, и суммируем данные по ним
                    //$DocInfo = cKCE::GetDocumentInfo($KCELogin, $KCEPass,'Waybill',$res1['UF_WAYBILLID']);
                    //if ($DocInfo):
                    //    $Weight += $DocInfo['WEIGHT'];
                    //    $Qty += $DocInfo['QTY'];
                    //endif;
                    
                    //GetStatuses for waybills
                    $wayBillID = $res1['UF_WAYBILLID'];
                    $orderID = $res1['UF_ORDERID'];

                    $arWayBillStatus = cKCE::GetDocumentStatus($KCElogin,$KCEpass,'Waybill',$wayBillID);
 
                    if ($arWayBillStatus['NAME']) {
                        $arWayBills[$i]['UF_WAYBILLSTATUS'] = $arWayBillStatus['NAME'];
                        $resUpdate = $entity_data_class::update($res1['ID'], array('UF_WAYBILLSTATUS' => $arWayBillStatus['NAME'])); //Записываем ID заказа в инфоблок
                        
                        //обновляем статус отгрузки в магазине
                        $order = Sale\Order::load($orderID);
                        $orderStatus = Option::get("courierserviceexpress.moduledost", $arWayBillStatus['GUID']);
                        
                        $collection = $order->getShipmentCollection();
                        foreach ($collection as $ship) {
                            $System = $ship->getField('SYSTEM');
                            if ($System == 'N') {
                                $res = $ship->setField('STATUS_ID', $orderStatus);                                
                            }
                        }
                        $order->save();
                    }
                    $i++;
                }
        return "cKCE::updateKCEOrders();";
    }
}