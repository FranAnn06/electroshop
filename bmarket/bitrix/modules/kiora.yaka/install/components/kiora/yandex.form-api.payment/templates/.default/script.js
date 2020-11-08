document.addEventListener("DOMContentLoaded", function () {

    var modal = document.querySelector('.formModal');
    var btn_close;
    var father;
    var btn_showModal = document.querySelectorAll('.showModal');

    function init_yaka_form_api() {

        applyPhoneMask()

        if (!!modal) {

            for (var i = 0; i < btn_showModal.length; i++) {

                btn_showModal[i].onclick = function () {
                    father = this.parentNode;

                    modal = father.querySelector('.formModal');
                    modal.style.display = "block";

                    btn_close = father.querySelector('.closeModal');

                    btn_close.onclick = function () {
                        modal.style.display = "none";
                    }

                };
            }

            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }

        }

        var form_payment = document.querySelectorAll('.ki-yaka-form-api form');
        for (var j = 0; j < form_payment.length; j++) {
            form_payment[j].addEventListener('submit', validate_form_api, false);
        }
    }

    function validate_form_api(e) {

        var form = e.target;

        e.preventDefault();

        var formIsValid = true;
        var input_user_name = form.querySelector('[name="user_name"]');
        var input_user_email = form.querySelector('[name="user_email"]');

        if (input_user_name.value != '') {
            input_user_name.classList.remove("error");
        } else {
            input_user_name.classList.add("error");
            formIsValid = false;
        }

        if (isValidEmailAddress(input_user_email.value)) {
            input_user_email.classList.remove("error");
        } else {
            input_user_email.classList.add("error");
            formIsValid = false;
        }

        if (formIsValid) {
            form.classList.add("pending");
            getOrderID_form_api(form);
        }


    }

    function getOrderID_form_api(form) {

        var xmlhttp = new XMLHttpRequest();

        var formData = new FormData(form);

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == XMLHttpRequest.DONE) {
                if (xmlhttp.status == 200) {
                    try {
                        var jsonResponse = JSON.parse(xmlhttp.responseText);

                        setTimeout(function () {

                            if (jsonResponse.confirmation_url)
                                window.location = jsonResponse.confirmation_url;
                            else {
                                alert('Error: ' + jsonResponse.error);
                                console.error('jsonResponse', jsonResponse);
                            }


                        }, 200);
                    } catch (e) {
                        alert('An error occurred while retrieving the order number: bad response!');
                    }
                } else if (xmlhttp.status == 400) {
                    alert('Error: There was an error 400');
                } else {
                    alert('Error: Something else other than 200 was returned');
                }
            }
        };

        xmlhttp.open("POST", "/bitrix/tools/kiora.yaka/numberOrder.php", true);
        xmlhttp.send(formData);
    }

    function isValidEmailAddress(emailAddress) {
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        return pattern.test(emailAddress);
    }

    function applyPhoneMask() {

        var phoneInput = document.querySelector('.ki-yaka-form-api form input.tel-mask[name="user_phone"]')
        if (phoneInput) {
            phoneInput.placeholder = '+7 (___)___-__-__'
            phoneInput.addEventListener('keydown', function (event) {
                if (!(event.key == 'ArrowLeft' || event.key == 'ArrowRight' || event.key == 'Backspace' || event.key == 'Tab')) {
                    event.preventDefault()
                }
                var mask = '+7 (111) 111-11-11';

                if (/[0-9\+\ \-\(\)]/.test(event.key)) {
                    var currentString = this.value;
                    var currentLength = currentString.length;
                    if (/[0-9]/.test(event.key)) {
                        if (mask[currentLength] == '1') {
                            this.value = currentString + event.key;
                        } else {
                            for (var i = currentLength; i < mask.length; i++) {
                                if (mask[i] == '1') {
                                    this.value = currentString + event.key;
                                    break;
                                }
                                currentString += mask[i];
                            }
                        }
                    }
                }
            });
        }
    }

    init_yaka_form_api()

});