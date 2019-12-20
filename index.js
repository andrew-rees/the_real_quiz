var LocalFunctions = require('./scripts/localfunctions.js');
//var SqlFunctions = require('./scripts/sqlfunctions.js');
var $ = require('./scripts/jQuery.js');

window.onload = function () {

    if (LocalFunctions.checkPermissionsLocal("permission_level") == "1") {
    // if (sqlFunctions.checkPermissionsSQL("permission_level") == "1") {
        LocalFunctions.addRemoveDisableElements('#admin_button', "enable");
    };

    if (LocalFunctions.checkPermissionsLocal("logged_in") == "true") {
    // if (LocalFunctions.checkPermissionsSQL("logged_in") == "true") {
        LocalFunctions.addRemoveDisableElements('#quiz_section', "add");
        LocalFunctions.addRemoveDisableElements('#spiel', "remove");
        LocalFunctions.addRemoveDisableElements('#logout_button', "add");
    };

    LocalFunctions.findQuizzesLocal();
    LocalFunctions.displayQuizzesLocal();
    //SqlFunctions.findQuizzesSQL();

    $("#start_quiz").click(() => {
        LocalFunctions.addRemoveDisableElements('#quiz_display_section', "add");
        LocalFunctions.addRemoveDisableElements('.qanda', "remove");
        var quizNumber = LocalFunctions.getQuizNumber();
        try {
            //SqlFunctions.startQuizSessionSQL(quizNumber, /*accountId*/);
            //SqlFunctions.testConnection();
            LocalFunctions.startAndStoreQuizSessionLocal(quizNumber, /*accountId*/ );
        } catch (e) {
            console.log(e.message);
        };
        try {
            //SqlFunctions.storeQuizSessionSQL(/*accountId*/);
        } catch (e) {
            console.log(e.message);
        };
        LocalFunctions.findQuestionsLocal(quizNumber);
        //SqlFunctions.findQuestionsSQL(quizNumber);
        LocalFunctions.printQandA();
    });

    $("form").on("submit", function (event) {
        LocalFunctions.addRemoveDisableElements('#score', "add");
        event.preventDefault();
        LocalFunctions.gatherFormDataLocal();
        LocalFunctions.addRemoveDisableElements('.question', "remove");
        LocalFunctions.addRemoveDisableElements('.answer', "remove");
        LocalFunctions.checkAnswersLocal();
        LocalFunctions.addRemoveDisableElements('#quiz_display_section', "remove");
        //SqlFunctions.sendAnswersToSQL(sessionQandAs);
    });

    $('#logout_button').click(() => {
        LocalFunctions.logOutLocal();
        //SqlFunctions.logOutSQL();
    });
};