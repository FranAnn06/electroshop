BX.loadCSS('/bitrix/components/kiora/yandex.form-api.payment/custom-controls/check-data/check-data.css');

function JSCheckDataControl(arParams)
{
    var componentParams, isSimpleForm, isCheckForm, checkData, RUB_PRINT, LANG_MESS
    var obControlWrap, obControlFooter, footerTotal
    
    var defaultCheckItem = '{"name":"","quantity":"","amount":""}'

    initCheckControl = function () {
        componentParams = JSON.parse(arParams.data)
        checkData = JSON.parse(arParams.oInput.value)
        isSimpleForm = componentParams.FORM_TYPE == 'simple'
        isCheckForm = componentParams.FORM_TYPE == 'check'
        RUB_PRINT = componentParams.SUM_PRINT
        LANG_MESS = componentParams.LANG_MESS

        BX.message(LANG_MESS)

        obControlWrap = arParams.oCont.appendChild(BX.create('div', {
            attrs: {
                className: 'check-data-conrol-wrap'
            },
        }));

        if (isSimpleForm && Array.isArray(checkData) && checkData.length) {
            checkData = [checkData[0]]
            checkData[0].quantity = 1
            arParams.oInput.value = JSON.stringify(checkData)
        }

        createCheckControl(obControlWrap, checkData)
    }

    getCheckTotal = function () {
        var total = 0
        checkData.forEach(function (item, index) {
            total += item.quantity * item.amount
        })
        return parseFloat(total).toFixed(2)
    }

    getCheckTotalPhrase = function () {
        var total = getCheckTotal()
        return BX.message('CONTROL_CHECK_TOTAL') + ': ' + total + ' ' + RUB_PRINT
    }

    buildCheckFooter = function () {
        obControlFooter = obControlWrap.appendChild(BX.create('div', {
            attrs: {
                className: 'check-data-conrol-footer'
            }
        }));

        footerTotal = obControlFooter.appendChild(BX.create('span', {
            attrs: {
                className: 'total'
            },
            text: getCheckTotalPhrase()
        }));

        if (isCheckForm)
            obControlFooter.appendChild(BX.create('div', {
                attrs: {
                    className: 'check-item-conrol-button add',
                    title: BX.message('CONTROL_CHECK_ITEM_ADD')
                },
                text: '+',
                events: {
                    click: function () {
                        checkData.push(JSON.parse(defaultCheckItem))
                        rebuildCheckControl()
                    }
                },
            }))
    }

    createCheckControl = function (parentNode, checkData = []) {
        checkData.forEach(function (item, index) {
            createCheckItemControl(parentNode, item, index)
        })

        buildCheckFooter()
    }

    updateCheckData = function () {
        arParams.oInput.value = JSON.stringify(checkData)
        footerTotal.innerHTML = getCheckTotalPhrase()
    }

    rebuildCheckControl = function () {
        updateCheckData()
        obControlWrap.innerHTML = ''
        createCheckControl(obControlWrap, checkData)
    }

    createCheckItemControl = function (parentNode, item, index) {

        var obItemControlWrap = parentNode.appendChild(BX.create('div', {
            attrs: {
                className: 'check-data-item-conrol-wrap'
            },
        }));

        if (isCheckForm && index > 0)
            obItemControlWrap.appendChild(BX.create('div', {
                attrs: {
                    className: 'check-item-conrol-button remove',
                    title: BX.message('CONTROL_CHECK_ITEM_DELETE')
                },
                text: '-',
                events: {
                    click: function () {
                        checkData.splice(index, 1)
                        rebuildCheckControl()
                    }
                },
            }))


        obItemControlWrap.appendChild(BX.create('input', {
            attrs: {
                className: 'check-item-conrol-name',
                type: 'text',
                maxLength: 255,
                placeholder: BX.message('CONTROL_CHECK_NAME_PLACEHOLDER'),
                value: item.name,
                title: BX.message('CONTROL_CHECK_NAME_TITLE') + (isSimpleForm ? ', ' + BX.message('CONTROL_CHECK_TITLE_EMPTY') : ''),
            },
            events: {
                keyup: function (event) {
                    checkData[index].name = event.target.value
                    updateCheckData()
                }
            },
        }));

        var numWrap = obItemControlWrap.appendChild(BX.create('div', {
            attrs: {
                className: 'check-item-conrol-num-wrap',
            },
        }));

        numWrap.appendChild(BX.create('input', {
            attrs: {
                className: 'check-item-conrol-quantity',
                type: 'number',
                placeholder: BX.message('CONTROL_CHECK_QUANTITY_PLACEHOLDER'),
                value: isSimpleForm ? 1 : item.quantity,
                readonly: isSimpleForm ? true : false,
                title: isSimpleForm ? BX.message('CONTROL_CHECK_QUANTITY_TITLE_NOT_EMPTY') : BX.message('CONTROL_CHECK_QUANTITY_TITLE'),
                step: "0.01",
            },
            events: {
                keyup: function (event) {
                    checkData[index].quantity = parseFloat(event.target.value).toFixed(2)
                    updateCheckData()
                }
            },
        }));

        numWrap.appendChild(BX.create('input', {
            attrs: {
                className: 'check-item-conrol-amount',
                type: 'number',
                placeholder: BX.message('CONTROL_CHECK_AMOUNT_PLACEHOLDER'),
                value: item.amount,
                title: BX.message('CONTROL_CHECK_AMOUNT_TITLE') + (isSimpleForm ? ', ' + BX.message('CONTROL_CHECK_TITLE_EMPTY') : ''),
                step: "0.01",
            },
            events: {
                keyup: function (event) {
                    checkData[index].amount = parseFloat(event.target.value).toFixed(2)
                    updateCheckData()
                }
            },
        }));

    }

    initCheckControl()
}
