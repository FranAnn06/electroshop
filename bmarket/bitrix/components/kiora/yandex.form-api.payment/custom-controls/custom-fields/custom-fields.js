BX.loadCSS('/bitrix/components/kiora/yandex.form-api.payment/custom-controls/custom-fields/custom-fields.css');

function JSCustomFieldsControl(arParams)
{
    var componentParams, CustomFields, LANG_MESS
    var obControlWrap, obControlFooter
    var fieldTypes = ['text', 'number', 'select']

    var defaultField = '{"name":"","type":"text","required":false,"options":[]}'

    initControl = function () {
        componentParams = JSON.parse(arParams.data)
        LANG_MESS = componentParams.LANG_MESS

        if (arParams.oInput.value)
            CustomFields = JSON.parse(arParams.oInput.value)
        else
            CustomFields = [JSON.parse(defaultField)]

        BX.message(LANG_MESS)

        obControlWrap = arParams.oCont.appendChild(BX.create('div', {
            attrs: {
                className: 'custom-fields-conrol-wrap'
            },
        }));

        createCustomFieldsControl(obControlWrap, CustomFields)
    }

    buildFooter = function () {
        obControlFooter = obControlWrap.appendChild(BX.create('div', {
            attrs: {
                className: 'custom-fields-conrol-footer'
            }
        }));

        obControlFooter.appendChild(BX.create('div', {
            attrs: {
                className: 'custom-field-conrol-button add',
                title: BX.message('CONTROL_CUSTOM_FIELD_ADD')
            },
            text: '+',
            events: {
                click: function () {
                    CustomFields.push(JSON.parse(defaultField))
                    rebuildControl()
                }
            },
        }))
    }

    createCustomFieldsControl = function (parentNode, CustomFields = []) {
        CustomFields.forEach(function (field, index) {
            createCustomFieldControl(parentNode, field, index)
        })

        buildFooter()
    }

    updateCustomFields = function () {
        arParams.oInput.value = JSON.stringify(CustomFields)
    }

    rebuildControl = function () {
        updateCustomFields()
        obControlWrap.innerHTML = ''
        createCustomFieldsControl(obControlWrap, CustomFields)
    }

    createCustomFieldControl = function (parentNode, field, index) {

        var obItemControlWrap = parentNode.appendChild(BX.create('div', {
            attrs: {
                className: 'custom-fields-item-conrol-wrap'
            },
        }));

        if (index > 0)
            obItemControlWrap.appendChild(BX.create('div', {
                attrs: {
                    className: 'custom-field-conrol-button remove',
                    title: BX.message('CONTROL_CUSTOM_FIELD_DELETE')
                },
                text: '-',
                events: {
                    click: function () {
                        CustomFields.splice(index, 1)
                        rebuildControl()
                    }
                },
            }))

        obItemControlWrap.appendChild(BX.create('input', {
            attrs: {
                className: 'custom-field-conrol-input input-name',
                type: 'text',
                maxLength: 255,
                value: field.name,
                title: BX.message('CONTROL_CUSTOM_FIELD_NAME_TITLE'),
                placeholder: BX.message('CONTROL_CUSTOM_FIELD_NAME_PLACEHOLDER'),
            },
            events: {
                keyup: function (event) {
                    CustomFields[index].name = event.target.value
                    updateCustomFields()
                }
            },
        }));

        var numWrap = obItemControlWrap.appendChild(BX.create('div', {
            attrs: {
                className: 'custom-field-conrol-num-wrap',
            },
        }));

        var obSelect = numWrap.appendChild(BX.create('select', {
            attrs: {
                className: 'custom-field-conrol-type',
                value: field.type,
                title: BX.message('CONTROL_CUSTOM_FIELD_TYPE_TITLE'),
            },
            events: {
                change: function (event) {
                    var type = event.target.value
                    CustomFields[index].type = type
                    if(type === 'select') CustomFields[index].options = ['']
                    else CustomFields[index].options = []
                    updateCustomFields()
                    rebuildControl()
                }
            },
        }))

        fieldTypes.forEach(function (type) {
            obSelect.appendChild(BX.create('option', {
                attrs: {
                    className: 'custom-field-conrol-type-option',
                    value: type,
                    selected: field.type === type ? true : false,
                },
                text: type,
            }))
        })

        var checkboxWrap = numWrap.appendChild(BX.create('div', {
            attrs: {
                className: 'custom-field-conrol-checkbox-wrap',
            },
        }));

        checkboxWrap.appendChild(BX.create('input', {
            attrs: {
                id: 'custom_field_conrol_checkbox_' + index,
                className: 'adm-designed-checkbox custom-field-conrol-checkbox',
                type: 'checkbox',
                checked: field.required === true ? true : false,
                value: field.required,
                title: BX.message('CONTROL_CUSTOM_FIELD_REQUIRED_TITLE'),
            },
            events: {
                change: function (event) {
                    CustomFields[index].required = event.target.checked
                    updateCustomFields()
                },
            },
        }))

        checkboxWrap.appendChild(BX.create('label', {
            attrs: {
                for : 'custom_field_conrol_checkbox_' + index,
                className: 'adm-designed-checkbox-label custom-field-conrol-checkbox-label',
                title: BX.message('CONTROL_CUSTOM_FIELD_REQUIRED_TITLE'),
            },
            text: BX.message('CONTROL_CUSTOM_FIELD_REQUIRED'),
        }))

        if (field.type === 'select') {

            var optionsWrap = obItemControlWrap.appendChild(BX.create('div', {
                attrs: {
                    className: 'custom-field-conrol-options-wrap',
                },
            }))

            field.options.forEach(function (option, optionIndex) {

                var optionWrap = optionsWrap.appendChild(BX.create('div', {
                    attrs: {
                        className: 'custom-field-conrol-option-wrap',
                    },
                }))

                optionWrap.appendChild(BX.create('input', {
                    attrs: {
                        className: 'custom-field-conrol-input input-option',
                        type: 'text',
                        maxLength: 255,
                        value: option,
                        title: BX.message('CONTROL_CUSTOM_FIELD_OPTION_TITLE'),
                        placeholder: BX.message('CONTROL_CUSTOM_FIELD_OPTION_TITLE'),
                    },
                    events: {
                        keyup: function (event) {
                            CustomFields[index].options[optionIndex] = event.target.value
                            updateCustomFields()
                        }
                    },
                }))

                if (optionIndex > 0)
                    optionWrap.appendChild(BX.create('div', {
                        attrs: {
                            className: 'custom-field-conrol-button remove',
                            title: BX.message('CONTROL_CUSTOM_FIELD_OPTION_DELETE')
                        },
                        text: '-',
                        events: {
                            click: function () {
                                CustomFields[index].options.splice(optionIndex, 1)
                                rebuildControl()
                            }
                        },
                    }))
                else
                    optionWrap.appendChild(BX.create('div', {
                        attrs: {
                            className: 'custom-field-conrol-button add',
                            title: BX.message('CONTROL_CUSTOM_FIELD_OPTION_ADD')
                        },
                        text: '+',
                        events: {
                            click: function () {
                                CustomFields[index].options.push('')
                                rebuildControl()
                            }
                        },
                    }))
            })
        }

    }

    initControl()
}
