if (typeof(dostavista) === 'undefined') {
    dostavista = {};
}

dostavista.warehouseDialog = (new function () {
    var _translations = {};

    var _warehouseDialog;
    function _getWarehouseDialog() {
        if (!_warehouseDialog) {
            _warehouseDialog = new BX.CDialog({
                title    : _translations.edition_title,
                content  : '',
                icon     : 'head-block',
                resizable: true,
                draggable: true,
                height   : '400',
                width    : '800',
                buttons  : [
                    {
                        title : _translations.save_button,
                        name  : 'warehouse-dialog',
                        id    : 'dostavista-business-warehouse-dialog-submit',
                        action: function () {
                            saveWarehouse();
                        },
                    },
                    BX.CDialog.btnClose
                ]
            });
        }

        return _warehouseDialog;
    }

    var _errorSavingDialog;
    function _getErrorSavingDialog() {
        if (!_errorSavingDialog) {
            _errorSavingDialog = new BX.CDialog({
                title    : _translations.error_title,
                content  : _translations.saving_error_text,
                icon     : 'head-block',
                resizable: true,
                draggable: true,
                height   : '100',
                width    : '400',
                buttons  : [BX.CDialog.btnClose]
            });
        }

        return _errorSavingDialog;
    }

    var _errorDeletingDialog;
    function _getErrorDeletingDialog() {
        if (!_errorDeletingDialog) {
            _errorDeletingDialog = new BX.CDialog({
                title    : _translations.error_title,
                content  : _translations.deleting_error_text,
                icon     : 'head-block',
                resizable: true,
                draggable: true,
                height   : '100',
                width    : '400',
                buttons  : [BX.CDialog.btnClose]
            });
        }

        return _errorDeletingDialog;
    }

    this.show = function (warehouseId) {
        $.ajax({
            url: '/bitrix/admin/dostavista_business_warehouse_dialog_ajax.php',
            type: 'GET',
            data: {'warehouse_id': warehouseId},
            dataType: 'html',
            cache: false
        }).done(function (data) {
            var content = $('<div></div>');
            content.append(data);

            _getWarehouseDialog().SetContent(content.html());
            _getWarehouseDialog().Show();

            $('#dostavista-business-warehouse-dialog').submit(function () {
                saveWarehouse();
            });

            $('#dostavista-business-warehouse-dialog form select[name="selected_bitrix_warehouse_id"]').change(warehouseChangingHandler);

        });
    };

    this.close = function () {
        _getWarehouseDialog().Close();
    };

    this.setTranslations = function (translations) {
        _translations = translations;
    };

    function saveWarehouse() {
        var dialogForm = $('#dostavista-business-warehouse-dialog');

        var data = {};
        dialogForm.find(':input').each(function () {
            data[this.name] = $(this).val();
        });

        data['warehouse_id'] = dialogForm.data('id');

        licode.preloader.on(dialogForm);
        $.ajax({
            url: '/bitrix/admin/dostavista_business_warehouse_dialog_save_ajax.php',
            type: 'POST',
            data: data,
            dataType: 'json',
        }).done(function (result) {
            licode.preloader.off(dialogForm);

            if (typeof(result.is_successfully) === 'undefined' || !result.is_successfully) {
                _getErrorSavingDialog().Show();
                return;
            }

            window.location.reload();
        });
    }

    this.delete = function (warehouseId) {
        if (!confirm(_translations.deleting_confirm_text)) {
            return;
        }

        $.ajax({
            url: '/bitrix/admin/dostavista_business_warehouse_dialog_delete_ajax.php',
            type: 'POST',
            data: {'warehouse_id' : warehouseId},
            dataType: 'json',
        }).done(function (result) {
            if (typeof(result.is_successfully) === 'undefined' || !result.is_successfully) {
                _getErrorDeletingDialog().Show();
                return;
            }

            window.location.reload();
        });
    };

    function warehouseChangingHandler() {
        var option = $(this).find('option:selected');

        if (option.length) {
            var form = $('#dostavista-business-warehouse-dialog form');

            form.find(':input[name="name"]').val(option.data('name'));
            form.find(':input[name="address"]').val(option.data('address'));
            form.find(':input[name="contact_phone"]').val(option.data('contact-phone'));
            form.find(':input[name="note"]').val(option.data('note'));
        }
    }
});
