if (typeof(dostavista) === 'undefined') {
    dostavista = {};
}
dostavista.saleOrderUtils = (new function() {
    this.send = function() {
        var orderIds = [];
        $('#tbl_sale_order input[name="ID[]"]:checked').each(function() {
            orderIds.push($(this).val());
        });

        dostavista.orderDialog.show(orderIds);
    };
});