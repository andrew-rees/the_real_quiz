var localFunctions = require('./scripts/localfunctions.js');
//var sqlFunctions = require('./scripts/sqlfunctions.js');
var $ = require('./scripts/jQuery.js');

window.onload = function () {

    if(sessionStorage.getItem("permission_level") == "1") {
        $('#admin_button').prop("disabled", false);
    };

    if (sessionStorage.getItem("permission_level") == ("1" || "2")) {
        $('#quiz_section').css("display", "inline");
    }

    if (sessionStorage.getItem("logged_in") == "true") {
        $('#spiel').css("display", "none");
    }   

    localFunctions.findQuizzesLocal();
    localFunctions.displayQuizzesLocal();
    //sqlFunctions.findQuizzesSQL();


    $("#start_quiz").click(() => {
        localFunctions.removeItem('.qanda');
        var quizNumber = localFunctions.getQuizNumber();
        try {
            //sqlFunctions.startQuizSessionSQL(quizNumber, /*accountId*/);
            localFunctions.startAndStoreQuizSessionLocal(quizNumber, /*accountId*/);
        } catch (e) {
            console.log(e.message)
        };
        try {
            //sqlFunctions.storeQuizSessionSQL( /*accountId*/);
        } catch (e) {
            console.log(e.message)
        };
        localFunctions.findQuestionsLocal(quizNumber);
        //sqlFunctions.findQuestionsSQL(quizNumber);
        localFunctions.printQandA();
    });

    $("form").on("submit", function(event) {
        $('.hidden_until_trigger2').css('visibility', "visible")
        event.preventDefault();
        localFunctions.gatherFormDataLocal();
        localFunctions.removeItem('.question');
        localFunctions.removeItem('.answer');
        localFunctions.checkAnswersLocal();
        //sqlFunctions.sendAnswersToSQL(sessionQandAs) //This will need to be moved from localfunctions.js
      });

}