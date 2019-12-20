var LocalFunctions = require('./scripts/localfunctions.js');
//var sqlFunctions = require('./scripts/sqlfunctions.js');
var $ = require('./scripts/jQuery.js');

window.onload = function () {

    //display for the index page

    if (LocalFunctions.checkPermissionsLocal("permission_level") == "1") {
        LocalFunctions.addRemoveDisableElements('#admin_button', "enable");
    };

    if (
        (LocalFunctions.checkPermissionsLocal("logged_in") == "true")) {
        LocalFunctions.addRemoveDisableElements('#quiz_section', "add");
    };

    if (LocalFunctions.checkPermissionsLocal("logged_in") == "true") {
        LocalFunctions.addRemoveDisableElements('#spiel', "remove");
        LocalFunctions.addRemoveDisableElements('#logout_button', "add");
    };

    // if (sqlFunctions.checkPermissionsSQL("permission_level") == "1") {
    //     LocalFunctions.addRemoveDisableElements('#admin_button', "enable")
    // }

    // if ((LocalFunctions.checkPermissionsSQL("permission_level") == ("1" || "2")) &&
    //     (LocalFunctions.checkPermissionsSQL("logged_in") == "true")) {
    //     LocalFunctions.addRemoveDisableElements('#quiz_section', "add");
    // }

    // if (LocalFunctions.checkPermissionsSQL("logged_in") == "true") {
    //     LocalFunctions.addRemoveDisableElements('#spiel', "remove");
    //     LocalFunctions.addRemoveDisableElements('#logout_button', "add");
    // }

    LocalFunctions.findQuizzesLocal();
    LocalFunctions.displayQuizzesLocal();
    //sqlFunctions.findQuizzesSQL();


    $("#start_quiz").click(() => {
        LocalFunctions.addRemoveDisableElements('#quiz_display_section', "add");
        LocalFunctions.addRemoveDisableElements('.qanda', "remove");
        var quizNumber = LocalFunctions.getQuizNumber();
        try {
            //sqlFunctions.startQuizSessionSQL(quizNumber, /*accountId*/);
            LocalFunctions.startAndStoreQuizSessionLocal(quizNumber, /*accountId*/ );
        } catch (e) {
            console.log(e.message)
        };
        try {
            //sqlFunctions.storeQuizSessionSQL( /*accountId*/);
        } catch (e) {
            console.log(e.message)
        };
        LocalFunctions.findQuestionsLocal(quizNumber);
        //sqlFunctions.findQuestionsSQL(quizNumber);
        LocalFunctions.printQandA();
    });

    $("form").on("submit", function (event) {
        //$('.hidden_until_trigger2').css('visibility', "visible")
        LocalFunctions.addRemoveDisableElements('#score', "add");
        event.preventDefault();
        LocalFunctions.gatherFormDataLocal();
        LocalFunctions.addRemoveDisableElements('.question', "remove");
        LocalFunctions.addRemoveDisableElements('.answer', "remove");
        LocalFunctions.checkAnswersLocal();
        LocalFunctions.addRemoveDisableElements('#quiz_display_section', "remove");
        //sqlFunctions.sendAnswersToSQL(sessionQandAs) //This will need to be moved from localfunctions.js
    });

    $('#logout_button').click(() => {
        LocalFunctions.logOutLocal()
        //sqlFunctions.logOutSQL();
    })

}