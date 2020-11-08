if (typeof(kse) === 'undefined') {
    kse = {};
}

kse.orderDialog = (new function () {
    var _self = this;

    var _translations = {};
    var _errorTranslations = {};
    var _isCalculatingPrevented = false;

    var _orderDialog;
    function _getOrderDialog() {
        if (!_orderDialog) {
            _orderDialog = new BX.CDialog({
                title    : _translations.title,
                content  : '',
                icon     : 'head-block',
                resizable: true,
                draggable: true,
                height   : '400',
                width    : '800',
                buttons  : [
                    {
                        title : _translations.submit_value,
                        name  : 'create-order',
                        id    : 'kse-business-order-dialog-submit',
                        action: function () {
                            //alert ("OK");
                            createOrder();
                        },
                    },
                    BX.CDialog.btnClose
                ]
            });
        }

        return _orderDialog;
    }

    var _errorDialog;
    function _getErrorDialog() {
        if (!_errorDialog) {
            _errorDialog = new BX.CDialog({
                title    : _translations.error_title,
                content  : _translations.creation_error_text,
                icon     : 'head-block',
                resizable: true,
                draggable: true,
                height   : '100',
                width    : '400',
                buttons  : [BX.CDialog.btnClose]
            });
        }

        return _errorDialog;
    }

    var _successDialog;
    function _getSuccessDialog() {
        if (!_successDialog) {
            _successDialog = new BX.CDialog({
                title    : _translations.creation_success_title,
                content  : '',
                icon     : 'head-block',
                resizable: true,
                draggable: true,
                height   : '100',
                width    : '400',
                buttons  : [BX.CDialog.btnClose]
            });
        }

        return _successDialog;
    }

    this.show = function (orderIds) {
        $.ajax({
            url: '/bitrix/admin/kse_business_order_dialog_ajax.php',
            type: 'GET',
            data: {order_ids: orderIds},
            dataType: 'html',
            cache: false
        }).done(function (data) {
            var content = $('<div></div>');
            content.append(data)
            eval(content.find('#kse-business-order-dialog-translations').text());
            _getOrderDialog().SetContent(content.html());
            _getOrderDialog().Show();

//            var inputElements = getInputElements();
//            if (inputElements.length) {
//                inputElements.change(function () {
                    //calculateOrder();
//                });
                //calculateOrder();
//            }

//            $('#kse-business-order-dialog form').submit(function () {
//                createOrder();
//            });

//            $('#kse-business-order-dialog form select[name="selected_pickup_warehouse_id"]').change(warehouseChangingHandler);
        });
    };

    this.close = function () {
        _getOrderDialog().Close();
    };

    this.setTranslations = function (translations) {
        _translations = translations;
    };

    this.setErrorTranslations = function (translations) {
        _errorTranslations = translations;
    };

    function getInputElements() {
        return $('#kse-business-order-dialog :input');
    }

    function calculateOrder() {
        if (!getInputElements().length) {
            return;
        }

        if (_isCalculatingPrevented) {
            return;
        }

        //var summaryBlock = $('#kse-business-order-dialog-summary');
        //licode.preloader.on(summaryBlock);

        var data = {};
        getInputElements().each(function () {
            data[this.name] = $(this).val();
        });

        $.ajax({
            url: '/bitrix/admin/dostavista_business_order_dialog_calculate_ajax.php',
            type: 'POST',
            data: data,
            dataType: 'json',
        }).done(function (result) {
            licode.preloader.off(summaryBlock);
            renderErrors(result);

            if (typeof(result.order) === 'undefined') {
                return false;
            }

            summaryBlock.find('[data-calculation="delivery_fee_amount"]:first').text(result.order.delivery_fee_amount);
            summaryBlock.find('[data-calculation="weight_fee_amount"]:first').text(result.order.weight_fee_amount);
            summaryBlock.find('[data-calculation="insurance_fee_amount"]:first').text(result.order.insurance_fee_amount);
            summaryBlock.find('[data-calculation="money_transfer_fee_amount"]:first').text(result.order.money_transfer_fee_amount);
            summaryBlock.find('[data-calculation="loading_fee_amount"]:first').text(result.order.loading_fee_amount);
            summaryBlock.find('[data-calculation="payment_amount"]:first').text(result.order.payment_amount);
        });
    }

    function createOrder() {
        if (!getInputElements().length) {
            return;
        }

        var data = {};
        getInputElements().each(function () {
            data[this.name] = $(this).val();
        });
        
        $.ajax({
            url: '/bitrix/admin/kse_business_order_dialog_create_ajax.php',
            type: 'POST',
            data: data,
            dataType: 'text',
            success: function (data) {  
                alert (data);
                _self.close();
            }
        });
    }

    function renderErrors(response) {
        clearErrors();

        for (let parameterName in response.parameter_errors) {
            if (parameterName === 'delivery_points') {
                continue;
            }

            renderInputError(
                $('#kse-business-order-dialog :input[name="' + parameterName + '"]'),
                response.parameter_errors[parameterName]
            );
        }

        if (typeof(response.parameter_errors.delivery_points) !== 'undefined') {
            for (let i in response.parameter_errors.delivery_points) {
                var deliveryPointErrors = response.parameter_errors.delivery_points[i];
                for (let parameterName in deliveryPointErrors) {
                    renderInputError(
                        $('#kse-business-order-dialog :input[name="' + parameterName + '[' + i +']"]'),
                        deliveryPointErrors[parameterName]
                    );
                }
            }
        }

        if (response.have_errors || response.have_parameter_errors) {
            var summaryBlockErrors = $('#dostavista-business-order-dialog-summary .errors:first');
            if (response.have_errors) {
                summaryBlockErrors.text(_translations.calculation_error_text);
            }
            if (response.have_parameter_errors) {
                summaryBlockErrors.text(_translations.calculation_parameter_error_text);
            }

            summaryBlockErrors.show();
        }
    }

    function clearErrors() {
//       $('#dostavista-business-order-dialog-summary .errors').text('').hide();
//        $('#dostavista-business-order-dialog table div.parameter-error').remove();
    }

    function renderInputError(input, errorCode) {
        var parentTdBlock = input.parents('td:first');
        var errorBlock = $('<div class="parameter-error"></div>');

        var errorText = '';
        if (typeof(_errorTranslations[errorCode]) !== 'undefined') {
            errorText = _errorTranslations[errorCode];
        } else {
            errorText = _errorTranslations['invalid_value'];
        }
        errorBlock.text(errorText);

        parentTdBlock.append(errorBlock);
    }

    function warehouseChangingHandler() {
        var option = $(this).find('option:selected');

        if (option.length) {
            var form = $('#dostavista-business-order-dialog form');

            _isCalculatingPrevented = true;

            form.find(':input[name="pickup_address"]').val(option.data('address'));
            form.find(':input[name="pickup_start_time"]').val(option.data('work-start-time'));
            form.find(':input[name="pickup_finish_time"]').val(option.data('work-finish-time'));
            form.find(':input[name="pickup_contact_name"]').val(option.data('contact-name'));
            form.find(':input[name="pickup_contact_phone"]').val(option.data('contact-phone'));
            form.find(':input[name="pickup_note"]').val(option.data('note'));

            _isCalculatingPrevented = false;
            calculateOrder();
        }
    }
});
