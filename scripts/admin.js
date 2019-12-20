var LocalFunctions = require('./localfunctions.js');
//var SqlFunctions = require('./sqlfunctions.js');
var $ = require('./jQuery');

window.onload = function () {

    if (LocalFunctions.checkPermissionsLocal("logged_in") == "true") {
    // if (LocalFunctions.checkPermissionsSQL("logged_in") == "true") {
        LocalFunctions.addRemoveDisableElements('#spiel', "remove");
        LocalFunctions.addRemoveDisableElements('#logout_button', "add");
    };

    LocalFunctions.findQuizzesLocal();
    //SqlFunctions.findQuizzesSQL();
    LocalFunctions.displayQuizzesLocal();
    LocalFunctions.findQuestionsLocal(null);
    //SqlFunctions.findQuestionsSQL();
    LocalFunctions.fillQuestionsOption();
    
    $('#add_question').click(() => {
        LocalFunctions.printAnswerToEditLocal(null);
        LocalFunctions.printQuestionToEditLocal(null);
        LocalFunctions.hideAdminFunctions();
    })

    var isQuestionToEdit
    $("#edit_question").click(() => {
        isQuestionToEdit = true
        var questionId = $('#question_selector option:selected').attr('id');
        LocalFunctions.printAnswerToEditLocal(questionId);
        LocalFunctions.printQuestionToEditLocal(questionId);
        LocalFunctions.hideAdminFunctions();
    });

    $("#submit_edited_question").click(() => {
        if (isQuestionToEdit) {
            var questionId = $('#question_selector option:selected').attr('id');
            LocalFunctions.submitEditedQuestionLocal(questionId);
            //SqlFunctions.submitEditedQuestionSQL(questionId);
        } else {
            LocalFunctions.submitNewQuestionLocal();
            //SqlFunctions.submitNewQuestionSQL();
        };
    });

    $('#cancel_current').click(() => {
        LocalFunctions.addRemoveDisableElements();
    })

    $('#logout_button').click(() => {
        LocalFunctions.logOutLocal();
        //SqlFunctions.logOutSQL();
    });
};