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
        localFunctions.printQuestionToEditLocal(null);
        localFunctions.printAnswerToEditLocal(null);
        $('#question_selector').remove();
        $('#edit_question').remove();
    })

    $("#edit_question").click(() => {
        var questionId = $('#question_selector option:selected').attr('id');
        console.log(questionId)
        localFunctions.printQuestionToEditLocal(questionId);
        localFunctions.printAnswerToEditLocal(questionId);
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