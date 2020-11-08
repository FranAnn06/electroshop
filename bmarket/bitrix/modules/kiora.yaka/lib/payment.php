<?php

namespace Kiora\Payments;

class Payment {

    protected $data = [];

    public function __construct($data) {
        $this->data = $data;
    }

    public function getField($field_name) {
        return $this->data[$field_name];
    }

    public function getSum() {
        return floatval($this->getField('sum'));
    }

    public function getId() {
        return $this->getField('orderNumber');
    }
    
}
