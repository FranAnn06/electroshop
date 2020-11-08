<?php
namespace Kiora\Payments\Internals;

use Bitrix\Main;
use Bitrix\Main\Localization\Loc;

Loc::loadMessages(__FILE__);

class PaySystemErrLogTable extends Main\Entity\DataManager
{
	public static function getFilePath()
	{
		return __FILE__;
	}

	public static function getTableName()
	{
		return 'ki_pay_system_err_log';
	}

	public static function getMap()
	{
		return array(
			'ID' => array(
				'data_type' => 'integer',
				'primary' => true,
				'autocomplete' => true,
				'title' => 'ID',
			),
			'DATE_INSERT' => array(
				'data_type' => 'datetime',
				'title' => 'DATE_INSERT',
			),
			'MESSAGE' => array(
				'data_type' => 'string',
				'validation' => array(__CLASS__, 'validateMessage'),
				'title' => 'MESSAGE',
				'required' => true
			)
		);
	}

	public static function validateMessage()
	{
		return array(
			new Main\Entity\Validator\Length(null, 2000),
		);
	}
}