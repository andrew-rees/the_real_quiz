var localFunctions = require('./localfunctions.js');
//var sqlFunctions = require('./sqlfunctions.js');
var $ = require('./jQuery');

window.onload = function () {

    localFunctions.findQuizzesLocal();
    localFunctions.displayQuizzesLocal();
    localFunctions.findQuestionsLocal(null);
    localFunctions.fillQuestionsOption();
    //sqlFunctions.findQuizzesSQL();
    // sqlFunctions.findQuestionsSQL();

    $('#add_question').click(() => {
        localFunctions.printAnswerToEditLocal(null);
        localFunctions.printQuestionToEditLocal(null);
        // $('#question_selector').remove();
        // $('#edit_question').remove();
        localFunctions.hideAdminFunctions()
    })

    $("#edit_question").click(() => {
        var questionId = $('#question_selector option:selected').attr('id');
        console.log(questionId)
        localFunctions.printAnswerToEditLocal(questionId);
        localFunctions.printQuestionToEditLocal(questionId);
    });

    $("#submit_edited_question").click(() => {
        var questionId = $('#question_selector option:selected').attr('id');
        console.log("clicked");
        if (questionId) {
            localFunctions.submitEditedQuestionLocal(questionId);
            //sqlFunctions.submitEditedQuestionSQL(questionId);
        } else {
            localFunctions.submitNewQuestionLocal();
            //sqlfunctions.submitNewQuestionSQL();
        }
        
    });
};