var $ = require('./jQuery.js');
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
        LocalFunctions.checkField("#username", /^[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,}$/);
    })
    $('#password').blur(() => {
        LocalFunctions.checkField("#password", /[^/>]*/);
    })

    $("#submit_login").click(() => {
        LocalFunctions.checkAndSubmit("#username", /^[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,}$/, "#password", /[^/>]*/);
    })

    $('#logout_button').click(() => {
        LocalFunctions.logOutLocal();
        //sqlFunctions.logOutSQL();
    });
};