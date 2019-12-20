var $ = require('./jQuery.js');
var AccountJSON = require('../data/accounts.json');
var LocalFunctions = require('./localfunctions.js');
//var SqlFunctions = require('./sqlfunctions.js');

window.onload = function () {

    if (LocalFunctions.checkPermissionsLocal("permission_level") == "1") {
    // if (sqlFunctions.checkPermissionsSQL("permission_level") == "1") {
        LocalFunctions.addRemoveDisableElements('#admin_button', "enable");
    };

    if (LocalFunctions.checkPermissionsLocal("logged_in") == "true") {
    // if (LocalFunctions.checkPermissionsSQL("logged_in") == "true") {
        LocalFunctions.addRemoveDisableElements('#spiel', "remove");
        LocalFunctions.addRemoveDisableElements('#logout_button', "add");
    };

    $('#username').blur(() => {
        checkField("#username", /^[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,}$/);
    })
    $('#password').blur(() => {
        checkField("#password", /[^/>]*/);
    })

    $("#submit_login").click(() => {
        checkAndSubmit("#username", /^[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,}$/, "#password", /[^/>]*/);
    })

    var fieldsToTest = [];

    function checkField(id, regexep) {
        var regex = regexep;
        var fieldValue = $(id).val();
        if (fieldValue) {
            if (regex.test(fieldValue)) {
                $(id).css("border-color", "green");
            } else {
                $(id).css("border-color", "red");
            };
        };
    };

    function checkAndSubmit(username, unRegex, password, pwRegex) {
        var success = 0;
        var errorString = "";
        var unId = username
        var unVal = $(username).val();
        var unName = $(username).attr("name");
        var pwId = password
        var pwVal = $(password).val();
        var pwName = $(password).attr("name");

        function checkFieldValue(fieldValue, fieldId, fieldRegex, fieldName) {
            if (fieldValue) {
                if (fieldRegex.test(fieldValue)) {
                    success++;
                    $(fieldId).css("border-color", "green");
                    fieldsToTest.push({
                        value: fieldValue
                    })
                } else {
                    errorString += `${fieldName} `;
                    $(fieldId).css("border-color", "red");
                };
            } else {
                errorString += `${fieldName} `;
                $(fieldId).css("border-color", "red");
            };
        };

        checkFieldValue(unVal, unId, unRegex, unName);
        checkFieldValue(pwVal, pwId, pwRegex, pwName);

        //final tests
        if (success == 2) {
            passLoginToSession();
            passLoginToNode(fieldsToTest);
            console.log(fieldsToTest);
            //Sqlfunctions.passLoginToDB(fieldsToTest);
        }
        if (errorString != "") {
            var starter = "The following fields have failed: ";
            var errorString2 = starter.concat(errorString);
            alert(errorString2);
        };
    };

    function passLoginToSession() {
        var loginSerialized = $("form").serialize();
        sessionStorage.setItem("submitted_login", loginSerialized);
        document.cookie = "submitted_login= " + loginSerialized + ";path=/";
    };

    function passLoginToNode(fields) {
        var foundUsername = false;
        var username = fields[0].value;
        var password = fields[1].value;
        var thisAccount = AccountJSON.accounts.find((account) => {
            if (username.toLowerCase() == account.username.toLowerCase()) {
                foundUsername = true;
                if (account.password == password) {
                    loggedIn(true);
                    sessionStorage.setItem("permission_level", account.permission);
                    document.cookie = `permission_level=${account.permission}`;
                    return;
                } else {
                    loggedIn(false);
                    return;
                };
            };
            if (!foundUsername) {
                loggedIn(false);
            };
        });
    };

    function loggedIn(isLoggedIn) {
        if (isLoggedIn) {
            sessionStorage.setItem("logged_in", true);
            document.cookie = `logged_in=true`;
            $(location).attr('href', 'http://192.168.43.222:8080/index.html');
            $('#username').css("border-color", "green");
            $('#password').css("border-color", "green");
        } else {
            sessionStorage.removeItem("logged_in")
            document.cookie = `logged_in=""`;
            console.log("Sorry, we couldn't log you in, please try again");
            $('#username').css("border-color", "red");
            $('#password').css("border-color", "red");
        }
    };

    $('#logout_button').click(() => {
        LocalFunctions.logOutLocal();
        //sqlFunctions.logOutSQL();
    });
};