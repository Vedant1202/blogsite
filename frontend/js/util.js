function setData(cname, cvalue) {
    window.localStorage.setItem(cname, JSON.stringify(cvalue));
}

function getData(cname) {
    return JSON.parse(JSON.parse(window.localStorage.getItem(cname)));
}

function checkData(cname) {
    var user = getData(cname);
    if (user != null) {
        return true;
    } else {
        return false;
    }
}

function deleteData(cname) {
    window.localStorage.removeItem(cname);
}

function checkEmailField(inputField, spanElement, buttonSubmit) { // Pass in elements as jQuery selectors
    inputField.focusout(function() {
        var value = $(this).val().trim();
        var re = /\S+@\S+\.\S+/;
        // console.log(value);
        if (!re.test(value)) {
            inputField.removeClass('w3-border-green');
            inputField.addClass('w3-border-red');
            spanElement.removeAttr('hidden');
            // buttonSubmit.removeAttr('disabled');
            if ((buttonSubmit.attr('disabled') + '') == 'undefined') {
                buttonSubmit.attr('disabled', '');
            }
        } else {
            spanElement.attr('hidden', '');
            inputField.removeClass('w3-border-red');
            // inputField.addClass('w3-border-green');
        }
    });
}
