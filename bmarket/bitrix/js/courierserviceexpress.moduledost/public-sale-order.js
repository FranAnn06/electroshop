window.addEventListener('DOMContentLoaded', function () {
    if (typeof(BX) === 'undefined') {
        return;
    }

    if (typeof(BX.Sale) === 'undefined') {
        return;
    }

    if (typeof(BX.Sale.OrderAjaxComponent) === 'undefined') {
        return;
    }

    document.addEventListener('change', function(event) {
        var name = event.target.name;
        var tagName = event.target.tagName.toLowerCase();

        var listenElements = {
            'input'   : true,
            'select'  : true,
            'textarea': true,
        };

        if (
            name
            && typeof(listenElements[tagName]) !== 'undefined'
            && document.getElementById('bx-soa-properties').querySelector('[name="' + name + '"]')
        ) {
            BX.Sale.OrderAjaxComponent.sendRequest();
        }
    });
});