var Question = require('./modules/question.js');
var Answer = require('./modules/answer.js');
var Quiz = require('./modules/quiz.js');
var QuizSession = require('./modules/quizSession.js');
var $ = require('./jQuery.js');
var QuizJSON = require('../data/quizzes.json');
var QuestionJSON = require('../data/questions.json');
var AnswerJSON = require('../data/answers.json');
var AccountJSON = require('../data/accounts.json');

(function (exports) {

    var questions = [];
    var quizzes = [];
    var answers = [];
    var sessionQandAs = [];

    //Find the quizzes and fill quizzes Array
    function findQuizzesLocal () {
        QuizJSON.quizzes.forEach((value) => {
            //quizMockJSON.forEach((value) => {
            quizzes.push(new Quiz(value.quiz_id, value.quiz_name));
        });
    };

    //Fill the quizzes <select> with options
    function displayQuizzesLocal () {
        $('#quizzes_selector').empty();
        quizzes.forEach((value) => {
            var print = $("<option></option>").text(value.quiz_name).attr('value', value.quiz_id);
            $('#quizzes_selector').append(print);
        });
    };

    //get quiz Number
    function getQuizNumber() {
        return $('#quizzes_selector').val();
    };

    //find questions from that quiz and put them in this array
    function findQuestionsLocal(quizNumber) {
        questions = [];
        if (quizNumber) {
            QuestionJSON.questions.forEach((value) => {
                if (value.quiz_id == quizNumber) {
                    questions.push(new Question(value.question_id, value.question_text, value.correct_answer_id, value.question_used, value.quiz_id));
                };
            })
        } else {
            QuestionJSON.questions.forEach((value) => {
                questions.push(new Question(value.question_id, value.question_text, value.correct_answer_id, value.question_used, value.quiz_id));
            });
        };
        //console.log("Questions array after findQuestions: " + questions)
    };

    //for each question, find the answers
    function findAnswersLocal(questionNumber) {
        AnswerJSON.answers.forEach((value) => {
            if (value.question_id == questionNumber) {
                answers.push(new Answer(value.answer_id, value.answer_text, value.question_id));
            };
        });
        //console.log("Answers for this question " + questionNumber + ": " + answers)
    };

    //clears a specified array
    function clearArray(arrayName) {
        arrayName.length = 0;
    };

    //print q and a for each value in questions array
    function printQandA(/*permissionLevel*/) {
        $('.hidden_until_trigger').css("visibility", "visible")
        questions.forEach((value) => {
            findAnswersLocal(value.question_id);
            var questionToPrint = $("<p></p>").text(value.question_text).attr('id', `Question${value.question_id}`).attr('class', 'question');
            $('#questions_and_answers').append(questionToPrint);
            if (sessionStorage.getItem("permission_level") == "3") {
                addRemoveDisableElements('#form_submit_button', "disable");
                $('#form_submit_button').attr('type', 'text').val("To take a quiz, get a higher level account");
            } else {
                var select = $("<select></select>").attr('id', `Select${value.question_id}`).attr('class', 'answer').attr('name', `Question${value.question_id}`);
                $(`#Question${value.question_id}`).append(select);
                answers.forEach((val) => {
                    var answerToPrint = $("<option></option>").text(val.answer_text).attr('value', val.answer_id);
                    $(`#Select${value.question_id}`).append(answerToPrint);
                });
                clearArray(answers);
            };
        });
    };

    //Stores Session Data in sessionStorage and Cookies
    var thisSession;
    function startAndStoreQuizSessionLocal(quizNumber, accountId) {
        accountId = 2; //while there is no database connection to get an ID, this value is passed in
        thisSession = new QuizSession(accountId, 1, quizNumber, "16/12/19", 0, null);
        sessionStorage.setItem("accountId", thisSession.account_taking_id);
        sessionStorage.setItem("session_id", thisSession.session_id);
        sessionStorage.setItem("quiz_id", thisSession.quiz_id);
        sessionStorage.setItem("start_date", thisSession.start_date);
        sessionStorage.setItem("score", thisSession.score);
        document.cookie = `accountId=${thisSession.account_taking_id}`;
        document.cookie = `session_id=${thisSession.session_id}`;
        document.cookie = `quiz_id=${thisSession.quiz_id}`;
        document.cookie = `start_date=${thisSession.start_date}`;
        document.cookie = `score=${thisSession.score}`;
        console.log("Cookies after start quiz session: " + document.cookie);
    };

    //add the quuestions and answers to the session
    function updateQuizSessionLocal(thisQandA) {
        sessionQandAs.push(thisQandA);
    };

    //gather the form data
    function gatherFormDataLocal() {
        var answersSubmitted = [];
        $('select.answer').map(function () {
            let thisQandA = {
                answer_id: $(this).val(),
                answer_text: $(this).text(), //Bug - gets text from ALL select options
                question_text: $(this).parent().text(), //Bug - gets text from ALL select options and question
                question_id: $(this).attr('id').replace('Select', ''),
            };
            answersSubmitted.push(thisQandA);
            presentSubmittedForm(thisQandA);
            updateQuizSessionLocal(thisQandA);
            sessionStorage.setItem(`Answer${thisQandA.question_id }`, `${thisQandA.answer_id}`);
            document.cookie = `Answer${thisQandA.question_id}=${thisQandA.answer_id}`;
        });
        var answersSubmittedSerialized = $("form").serialize();
        sessionStorage.setItem("submitted_data", answersSubmittedSerialized);
        document.cookie = `submitted_data=${answersSubmittedSerialized}`;
        thisSession.questions = sessionQandAs;
        console.log(thisSession);
        console.log("Cookies after quiz submit: " + document.cookie);
    };

    //presents the Submitted Session to the user
    function presentSubmittedForm (QandAobject) {
        var questionforScreen = $("<li></li>").text("Question: " + QandAobject.question_text).attr('class', 'qanda').css('font-weight', 'bold');
        var answerforScreen = $('<p></p>').text("Your Answer: " + QandAobject.answer_text).attr('class', 'qanda');
        $('#show_qanda').append(questionforScreen);
        $('#show_qanda').append(answerforScreen);
    };

    //generates and prints the score of the session to the user
    function printScore (correct) {
        if (correct.length > 5) {
            var message = "Well done!!";
        } else if (correct.length <= 5) {
            var message = "Hmm, not great. You need to watch The Office more";
        };
        var score = $('<h2></h2>').text("You scored: " + correct.length + "... " + message);
        $('#score').prepend(score);
    };

    //checks each Answer against the Question
    function checkAnswersLocal () {
        var correct = sessionQandAs.map((value) => {
            var thisQuestion = QuestionJSON.questions.find((question) => {
                return value.question_id == question.question_id;
            });
            if (thisQuestion.correct_answer_id == value.answer_id) {
                return thisQuestion;
            };
        });
        correct = correct.filter(function (val) {
            return val != null;
        });
        printScore(correct);
    };

    //Fills any list of Questions
    function fillQuestionsOption () {
        questions.forEach((value) => {
            var question = $('<option></option>').text(value.question_text).attr('id', `${value.question_id}`);
            $('#question_selector').append(question);
        });
    };

    //Deactivates the Admin button
    function hideAdminFunctions () {
        $('.admin_page_functions').css("display", "none");
    };

    //When a question is selected to be edited, this displays the question in the Edit Pane
    function printQuestionToEditLocal (questionId) {
        $('.hidden_until_trigger').css("visibility", "visible");
        if (questionId) {
            QuestionJSON.questions.forEach((value) => {
                if (value.question_id == questionId) {
                    var questionForPrinting = $('<input></input>').attr('value', value.question_text).attr('id', value.question_id).prop('type', 'text').attr('name', "questionBeingEdited").attr('class', "edit_remove").attr("max-length", "100");
                    var questionText = $('<p></p>').text("Question:").attr('class', "edit_remove");
                    $('#questions_and_answers').prepend(questionForPrinting);
                    $('#questions_and_answers').prepend(questionText);
                };
            });
        } else {
            var questionForPrinting = $('<input></input>').prop('type', 'text').attr('name', "questionBeingEdited").attr('class', "edit_remove").attr("max-length", "100");
            var questionText = $('<p></p>').text("Question:").attr('class', "edit_remove");
            $('#questions_and_answers').prepend(questionForPrinting);
            $('#questions_and_answers').prepend(questionText);
        };
    };

    //When a question is selected to be edited, this displays the linked answers in the Edit Pane
    function printAnswerToEditLocal(questionId) {
        $('.hidden_until_trigger').css("visibility", "visible");
        if (questionId) {
            AnswerJSON.answers.forEach((value) => {
                if (value.question_id == questionId) {
                    var answerForPrinting = $('<input></input>').attr('value', value.answer_text).attr('id', value.answer_id).prop('type', 'text').attr('name', `answersBeingEdited${value.answer_id}`).attr('class', "edit_remove").attr("max-length", "100");
                    var answerText = $('<p></p>').text("Answer:").attr('class', "edit_remove");
                    $('#questions_and_answers').prepend(answerForPrinting);
                    $('#questions_and_answers').prepend(answerText);
                };
            });
        } else {
            for (var i = 1; i < 5; i++) {
                var answerForPrinting = $('<input></input>').prop('type', 'text').attr('name', `${i}`).attr('class', "edit_remove").attr("max-length", "100");
                var answerText = $('<p></p>').text(`Answer ${i}:`).attr('class', "edit_remove");
                var isCorrect = $('<input></input>').prop('type', 'checkbox').attr('value', i).attr('name', `checkbox${i}`).attr('class', 'correct_answer_checkboxes');
                $('#questions_and_answers').prepend('Correct answer: ');
                $('#questions_and_answers').prepend(isCorrect);
                $('#questions_and_answers').prepend(answerForPrinting);
                $('#questions_and_answers').prepend(answerText);
            };
        };
    };

    //When the Question is edited, this submits it
    function submitEditedQuestionLocal(question_id) {
        var newQuestionText = $('input[name="questionBeingEdited"]').val();
        for (var i = 0; i < QuestionJSON.questions.length; i++) {
            if (QuestionJSON.questions[i].question_id == question_id) {
                QuestionJSON.questions[i].question_text = newQuestionText;
                console.log(QuestionJSON);
                return;
            };
        };
    };

    //When a new Question is created, this submits it
    function submitNewQuestionLocal() {
        var randomQuestionId = 100 //used to generate an ID while we are not connected to the DB (where an id is generated)
        var newQuestion = new Question(randomQuestionId, $('input[name="questionBeingEdited"]').val(), null, false, null);
        QuestionJSON.questions.push(newQuestion);
        console.log(QuestionJSON.questions);
    };

    //controls the visibility, display and state of elements
    function addRemoveDisableElements(element, action) {
        if (action == "add") {
            $(element).css("display", "inline");
        } else if (action == "remove") {
            //$(element).remove();
            $(element).css("display", "none");
        } else if (action == "show") {
            $(element).css("visibility", "visible");
        } else if (action == "hide") {
            $(element).css("visibility", "hidden");
        } else if (action == "disable") {
            $(element).prop("disabled", true);
        } else if (action == "enable") {
            $(element).prop("disabled", false);
        };
    };

    //checks the Permissions level from sessionStorage
    function checkPermissionsLocal(itemToGet) {
        return sessionStorage.getItem(itemToGet);
    };

    //logs out the user and navigates to Index
    function logOutLocal() {
        if (confirm("This will log you out and you will lose any on-going or past quiz sessions")) {
            sessionStorage.clear();
            document.cookie = "";
            $(location).attr('href', 'http://192.168.43.222:8080//index.html');
        };
    };

    var fieldsToTest = [];

    function checkField(id, regexep) {
        var regex = regexep;
        var fieldValue = $(id).val();
        if (fieldValue) {
            if (regex.test(fieldValue)) {
                $(id).css("border-color", "green");
            } else {
                $(id).css("border-color", "red");
            };
        };
    };

    function checkAndSubmit(username, unRegex, password, pwRegex) {
        var success = 0;
        var errorString = "";
        var unId = username
        var unVal = $(username).val();
        var unName = $(username).attr("name");
        var pwId = password
        var pwVal = $(password).val();
        var pwName = $(password).attr("name");

        function checkFieldValue(fieldValue, fieldId, fieldRegex, fieldName) {
            if (fieldValue) {
                if (fieldRegex.test(fieldValue)) {
                    success++;
                    $(fieldId).css("border-color", "green");
                    fieldsToTest.push({
                        value: fieldValue
                    })
                } else {
                    errorString += `${fieldName} `;
                    $(fieldId).css("border-color", "red");
                };
            } else {
                errorString += `${fieldName} `;
                $(fieldId).css("border-color", "red");
            };
        };

        checkFieldValue(unVal, unId, unRegex, unName);
        checkFieldValue(pwVal, pwId, pwRegex, pwName);

        //final tests
        if (success == 2) {
            passLoginToSession();
            passLoginToNode(fieldsToTest);
            console.log(fieldsToTest);
            //Sqlfunctions.passLoginToDB(fieldsToTest);
        }
        if (errorString != "") {
            var starter = "The following fields have failed: ";
            var errorString2 = starter.concat(errorString);
            alert(errorString2);
        };
    };

    function passLoginToSession() {
        var loginSerialized = $("form").serialize();
        sessionStorage.setItem("submitted_login", loginSerialized);
        document.cookie = "submitted_login= " + loginSerialized + ";path=/";
    };

    function passLoginToNode(fields) {
        var foundUsername = false;
        var username = fields[0].value;
        var password = fields[1].value;
        var thisAccount = AccountJSON.accounts.find((account) => {
            if (username.toLowerCase() == account.username.toLowerCase()) {
                foundUsername = true;
                if (account.password == password) {
                    loggedIn(true);
                    sessionStorage.setItem("permission_level", account.permission);
                    document.cookie = `permission_level=${account.permission}`;
                    return;
                } else {
                    loggedIn(false);
                    return;
                };
            };
            if (!foundUsername) {
                loggedIn(false);
            };
        });
    };

    function loggedIn(isLoggedIn) {
        if (isLoggedIn) {
            sessionStorage.setItem("logged_in", true);
            document.cookie = `logged_in=true`;
            $(location).attr('href', 'http://192.168.43.222:8080/index.html');
            $('#username').css("border-color", "green");
            $('#password').css("border-color", "green");
        } else {
            sessionStorage.removeItem("logged_in")
            document.cookie = `logged_in=""`;
            console.log("Sorry, we couldn't log you in, please try again");
            $('#username').css("border-color", "red");
            $('#password').css("border-color", "red");
        }
    };

    exports.findQuizzesLocal = findQuizzesLocal;
    exports.displayQuizzesLocal = displayQuizzesLocal;
    exports.getQuizNumber = getQuizNumber;
    exports.findQuestionsLocal = findQuestionsLocal;
    exports.printQandA = printQandA;
    exports.startAndStoreQuizSessionLocal = startAndStoreQuizSessionLocal;
    exports.gatherFormDataLocal = gatherFormDataLocal;
    exports.presentSubmittedForm = presentSubmittedForm;
    exports.checkAnswersLocal = checkAnswersLocal;
    exports.fillQuestionsOption = fillQuestionsOption;
    exports.printQuestionToEditLocal = printQuestionToEditLocal;
    exports.submitEditedQuestionLocal = submitEditedQuestionLocal;
    exports.printAnswerToEditLocal = printAnswerToEditLocal;
    exports.submitNewQuestionLocal = submitNewQuestionLocal;
    exports.hideAdminFunctions = hideAdminFunctions;
    exports.addRemoveDisableElements = addRemoveDisableElements;
    exports.checkPermissionsLocal = checkPermissionsLocal;
    exports.logOutLocal = logOutLocal;
    exports.checkField = checkField;
    exports.checkAndSubmit = checkAndSubmit;


})(typeof exports === 'undefined' ?
    this['loccalfunctions'] = {} : exports);