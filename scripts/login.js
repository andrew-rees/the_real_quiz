var $ = require('./jQuery.js');
//var Account = require('./modules/account.js');
var AccountJSON = require('../data/accounts.json');
//const Sequelize = require('sequelize');

window.onload = function () {

    if (sessionStorage.getItem("permission_level") == "1") {
        $('#admin_button').prop("disabled", false);
    };

    $('#username').blur(() => {
        checkField("#username", /^[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,}$/)
    })
    $('#password').blur(() => {
        checkField("#password", /[^/>]*/)
    })

    $("#submit_login").click(() => {
        checkAndSubmit("#username", /^[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,}$/, "#password", /[^/>]*/)
    })

    var fieldsToTest = [];

    function checkField(id, regexep) {
        var regex = regexep
        var fieldValue = $(id).val();
        if (fieldValue) {
            if (regex.test(fieldValue)) {
                $(id).css("border-color", "green")
            } else {
                $(id).css("border-color", "red")
            };
        }
    };

    function checkAndSubmit(username, unRegex, password, pwRegex) {
        //repeat checkField
        //get value
        var success = 0;
        var errorString = "";

        //username
        var unId = username
        var unVal = $(username).val();
        var unName = $(username).attr("name");

        //password
        var pwId = password
        var pwVal = $(password).val();
        var pwName = $(password).attr("name");

        function checkFieldValue(fieldValue, fieldId, fieldRegex, fieldName) {
            if (fieldValue) {
                if (fieldRegex.test(fieldValue)) {
                    success++
                    $(fieldId).css("border-color", "green")
                    fieldsToTest.push({
                        value: fieldValue
                    })
                } else {
                    errorString += `${fieldName} `
                    $(fieldId).css("border-color", "red")
                };
            } else {
                errorString += `${fieldName} `
                $(fieldId).css("border-color", "red")
            }
        }

        checkFieldValue(unVal, unId, unRegex, unName)
        checkFieldValue(pwVal, pwId, pwRegex, pwName)

        //final tests
        if (success == 2) {
            passLoginToSession();
            passLoginToNode(fieldsToTest);
            //passLoginToDB(fieldsToTest);
        }
        if (errorString != "") {
            var starter = "The following fields have failed: "
            var errorString2 = starter.concat(errorString);
            alert(errorString2)
        };
    };

    function passLoginToSession() {
        var loginSerialized = $("form").serialize()
        sessionStorage.setItem("submitted_login", loginSerialized);
    };

    function passLoginToNode(fields) {

        var foundUsername = false;
        var username = fields[0].value
        var password = fields[1].value
        var thisAccount = AccountJSON.accounts.find((account) => {
            if (username.toLowerCase() == account.username.toLowerCase()) {
                foundUsername = true;
                if (account.password == password) {
                    loggedIn(true)
                    sessionStorage.setItem("permission_level", account.permission)
                    return
                } else {
                    loggedIn(false)
                    return
                };
            };
            if (!foundUsername) {
                loggedIn(false)
            };
        });
    };

    // function passLoginToDB(fields) {
    //     var username = fields[0].value
    //     var password = fields[1].value
    //     const sequelize = new Sequelize('postgres://postgres:Password1@localhost:5432/The_Real_Quiz')
    //     sequelize
    //         .query(`SELECT "account_id" FROM "accounts" WHERE username=${username} AND password=${password}`)
    //         .then((login) => {
    //             if (login.length > 0) {
    //                 loggedIn(true);
    //                 sequelize.close();
    //             } else {
    //                 loggedIn(false);
    //                 sequelize.close();
    //             };
    //         })
    //         .catch(err => {
    //             console.error('Unable to connect to the database:', err);
    //         });
    // }

    function loggedIn(isLoggedIn) {
    if (isLoggedIn) {
        sessionStorage.setItem("logged_in", true)
        $(location).attr('href', 'C:/Work/Week%20Project/The_Real_Quiz/Code/index.html')
    } else {
        sessionStorage.removeItem("logged_in")
        console.log("Sorry, we couldn't log you in, please try again")
        $('#username').css("border-color", "red")
        $('#password').css("border-color", "red")
    }
};

};

