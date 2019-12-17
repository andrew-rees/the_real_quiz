var localFunctions = require('./scripts/localfunctions.js');
//var sqlFunctions = require('./scripts/sqlfunctions.js');
var $ = require('./scripts/jQuery.js');

window.onload = function () {

    if(sessionStorage.getItem("permission_level") == "1") {
        $('#admin_button').prop("disabled", false);
    };

    localFunctions.findQuizzesLocal();
    localFunctions.displayQuizzesLocal();

    $("#start_quiz").click(() => {
        localFunctions.removeItem('.qanda')
        var quizNumber = localFunctions.getQuizNumber();
        try {
            //localFunctions.startQuizSessionSQL(quizNumber, /*accountId*/);
            localFunctions.startAndStoreQuizSessionLocal(quizNumber, /*accountId*/);
        } catch (e) {
            console.log(e.message)
        };
        try {
            //localFunctions.storeQuizSessionSQL( /*accountId*/);
        } catch (e) {
            console.log(e.message)
        };
        console.log("Quiz number:" + quizNumber);
        localFunctions.findQuestionsLocal(quizNumber);
        localFunctions.printQandA();
    });

    $("form").on("submit", function(event) {
        event.preventDefault();
        localFunctions.gatherFormDataLocal();
        localFunctions.removeItem('.question');
        localFunctions.removeItem('.answer');
        localFunctions.checkAnswersLocal();
      });

}