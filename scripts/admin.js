var LocalFunctions = require('./localfunctions.js');
//var sqlFunctions = require('./sqlfunctions.js');
var $ = require('./jQuery');

window.onload = function () {

    if (LocalFunctions.checkPermissionsLocal("logged_in") == "true") {
        LocalFunctions.addRemoveDisableElements('#spiel', "remove");
        LocalFunctions.addRemoveDisableElements('#logout_button', "add");
    };

    // if (LocalFunctions.checkPermissionsSQL("logged_in") == "true") {
    //     LocalFunctions.addRemoveDisableElements('#spiel', "remove");
    //     LocalFunctions.addRemoveDisableElements('#logout_button', "add");
    // }

    LocalFunctions.findQuizzesLocal();
    LocalFunctions.displayQuizzesLocal();
    LocalFunctions.findQuestionsLocal(null);
    LocalFunctions.fillQuestionsOption();
    //sqlFunctions.findQuizzesSQL();
    // sqlFunctions.findQuestionsSQL();

    $('#add_question').click(() => {
        LocalFunctions.printAnswerToEditLocal(null);
        LocalFunctions.printQuestionToEditLocal(null);
        // $('#question_selector').remove();
        // $('#edit_question').remove();
        LocalFunctions.hideAdminFunctions()
    })

    var isQuestionToEdit
    $("#edit_question").click(() => {
        isQuestionToEdit = true
        var questionId = $('#question_selector option:selected').attr('id');
        console.log(questionId)
        LocalFunctions.printAnswerToEditLocal(questionId);
        LocalFunctions.printQuestionToEditLocal(questionId);
        LocalFunctions.hideAdminFunctions()
    });

    $("#submit_edited_question").click(() => {
        if (isQuestionToEdit) {
            var questionId = $('#question_selector option:selected').attr('id');
            console.log("clicked");
            LocalFunctions.submitEditedQuestionLocal(questionId);
            //sqlFunctions.submitEditedQuestionSQL(questionId);
        } else {
            LocalFunctions.submitNewQuestionLocal();
            //sqlfunctions.submitNewQuestionSQL();
        }
    });

    $('#cancel_current').click(() => {
        LocalFunctions.addRemoveDisableElements()
        ".correct_answer_checkboxes"
        "#edit_remove"
    })

    $('#logout_button').click(() => {
        LocalFunctions.logOutLocal()
        //sqlFunctions.logOutSQL();
    })
};