if (typeof(kse) === 'undefined') {
    kse = {};
}
kse.saleOrderViewUtils = (new function() {
    this.send = function(orderId) {
        kse.orderDialog.show([orderId]);
    };
});