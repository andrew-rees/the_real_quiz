var $ = require('./jQuery.js');
var Account = require('./modules/account.js');
const Sequelize = require('sequelize');

var accountMockJSON = [{
    "account_id": 1,
    "username": "admin1@WebbiSkools.com",
    "password": "$2a$06$xv/Nn/EaoUL3CPwt6wVy9.19UOPKJ6p3LHOFd2gXmpe2z74/6Soea",
    "permission": 1
}, {
    "account_id": 2,
    "username": "admin2@WebbiSkools.com",
    "password": "$2a$06$azmKaQhqWriFf54VtdCzz.zhlgzb8GLECWtrEgp3EJ25LzcGNxZ2u",
    "permission": 1
}, {
    "account_id": 3,
    "username": "taker1@gmail.com",
    "password": "$2a$06$PYro/CnQKjHQFk8VqNPRX.tMzn95KoEVM5L7S7MfPE/ESf5dlQota",
    "permission": 2
}, {
    "account_id": 4,
    "username": "taker2@gmail.com",
    "password": "$2a$06$JHv4cmwnmb6/1oqdcBJaP.upoGoWjgzfRiVGTqGIg2FSjh/t6LNEm",
    "permission": 2
}, {
    "account_id": 5,
    "username": "viewer1@gmail.com",
    "password": "$2a$06$SQDRuQV9palDUp6iZ1MRCuY9QFpTUyZ0br6db9NQIB/WJiSrRSo9W",
    "permission": 3
}, {
    "account_id": 6,
    "username": "viewer2@gmail.com",
    "password": "$2a$06$N8D6i90RJGSSEAxXH0q.euFLL5PZUd9m/2EKmoqPK0GlcWPmK.nna",
    "permission": 3
}, {
    "account_id": 7,
    "username": "andrewtrevor.rees@gmail.com",
    "password": "1234",
    "permission": 1
}]

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
        var thisAccount = accountMockJSON.find((account) => {
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

    function passLoginToDB(fields) {
        var username = fields[0].value
        var password = fields[1].value
        const sequelize = new Sequelize('postgres://postgres:Password1@localhost:5432/The_Real_Quiz')
        sequelize
            .query(`SELECT "account_id" FROM "accounts" WHERE username=${username} AND password=${password}`)
            .then((login) => {
                if (login.length > 0) {
                    loggedIn(true);
                    sequelize.close();
                } else {
                    loggedIn(false);
                    sequelize.close();
                };
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });
    }
};

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
