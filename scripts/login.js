var $ = require('./jQuery.js');
var Account = require('./modules/account.js');

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
    }]

window.onload = function () {

    $('#username').blur(() => {checkField("#username", /^[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,}$/)})
    $('#password').blur(() => {checkField("#password", /[^/>]*/)})

    $("#submit_login").click(() => {checkAndSubmit("#username", /^[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,}$/, "#password", /[^/>]*/)})

    var fieldsToTest = [{
        name: "username",
        id: "#username",
        regex: /^[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,}$/,
        fieldValue: null
    }, {
        name: "password",
        id: "#password",
        regex: /[^/>]*/,
        fieldValue: null
    }]


    function checkField (id, regexep) {
        var regex = regexep
        var fieldValue = $(id).val();
        if (fieldValue) {
            if (regex.test(fieldValue)) {
                $(id).css("border-color", "green")
            } else {
                $(id).css("border-color", "red")
            };
        }
    }

    
    function checkAndSubmit (username, unRegex, password, pwRegex) {
        var parameters = [username, unRegex, password, pwRegex]
        var success = 0;
        var errorString = "";

        for (var i = 0; i < 2; i++) {

        }

        fieldsToTest.forEach((value) => {
            var name = value.name;
            var id = value.id;
            var regex = value.regex;
            var fieldValue = $(id).val();
            fieldsToTest.fieldValue = fieldValue;
            if (fieldValue) {
                if (regex.test(fieldValue)) {
                    success++
                    $(id).css("border-color", "green")
                } else {
                    errorString += `${name} `
                    $(id).css("border-color", "red")
                };
            } else {
                errorString += `${name} `
                $(id).css("border-color", "red")
            }
        });

        //final tests
        if (success == fieldsToTest.length) {
            //console.log("All fields ok")
            passLoginToSession();
            passLoginToNode(fieldsToTest);
            //passLoginToServer(fieldsToTest);
        }
        if (errorString != "") {
            var starter = "The following fields have failed: "
            var errorString2 = starter.concat(errorString);
            alert(errorString2)
        };
    };

    function passLoginToSession () {
        var loginSerialized = $("form").serialize()
        sessionStorage.setItem("submitted_login", loginSerialized);
        //console.log(loginSerialized)
    }

    function passLoginToNode (fields) {
        //check the accounts for a username match (tolowercase)
        //if match, compare p/w
        //if ok, direct to index and add to session "logged in"
        //if not ok, error on page
        var username = fields[0].fieldValue
        var password = fields[1].fieldValue
        var thisAccount = accountMockJSON.find((account) => {
            if (username.toLowerCase() == account.username.toLowerCase()) {
                return account
            }
        })
        if (thisAccount.password == password) {
            loggedIn(true)
        } else {
            loggedIn(false)
        }
    }

    function loggedIn (isLoggedIn) {
        if (isLoggedIn) {
            sessionStorage.setItem("logged_in", true)
            $(location).attr('href', 'C:/Work/Week%20Project/The_Real_Quiz/Code/index.html')
        } else {
            sessionStorage.removeItem("logged_in")
            alert("Sorry, we couldn't log you in, please try again")
        }
    }
}