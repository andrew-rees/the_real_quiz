var Question = require('./modules/question.js');
var Answer = require('./modules/answer.js');
var Quiz = require('./modules/quiz.js');
var QuizSession = require('./modules/quizSession.js');
var $ = require('./jQuery.js');
var QuizJSON = require('../data/quizzes.json');
var QuestionJSON = require('../data/questions.json');
var AnswerJSON = require('../data/answers.json');
var Account = require('./modules/account.js');

//the work
(function (exports) {

    var questions = [];
    var quizzes = [];
    var answers = [];
    var sessionQandAs = [];

    //Find the quizzes and fill quizzes Array
    function findQuizzesLocal() {
        QuizJSON.quizzes.forEach((value) => {
            //quizMockJSON.forEach((value) => {
            quizzes.push(new Quiz(value.quiz_id, value.quiz_name))
        });
    };
    //Fill the quizzes <select> with options
    function displayQuizzesLocal() {
        //quizzes = []
        $('#quizzes_selector').empty();
        quizzes.forEach((value) => {
            var print = $("<option></option>").text(value.quiz_name).attr('value', value.quiz_id)
            $('#quizzes_selector').append(print)
        });
    };

    //get quiz Number
    function getQuizNumber() {
        return $('#quizzes_selector').val();
    }

    //find questions from that quiz and put them in this array
    function findQuestionsLocal(quizNumber) {
        questions = []
        if (quizNumber) {
            QuestionJSON.questions.forEach((value) => {
                if (value.quiz_id == quizNumber) {
                    questions.push(new Question(value.question_id, value.question_text, value.correct_answer_id, value.question_used, value.quiz_id))
                };
            })
        } else {
            QuestionJSON.questions.forEach((value) => {
                questions.push(new Question(value.question_id, value.question_text, value.correct_answer_id, value.question_used, value.quiz_id))
            })
        }

        //console.log("Questions array after findQuestions: " + questions)
    };

    //for each question, find the answers
    function findAnswersLocal(questionNumber) {
        AnswerJSON.answers.forEach((value) => {
            if (value.question_id == questionNumber) {
                answers.push(new Answer(value.answer_id, value.answer_text, value.question_id))
            };
        });
        //console.log("Answers for this question " + questionNumber + ": " + answers)
    };

    function clearArray(arrayName) {
        arrayName.length = 0;
    }

    //print q and a for each value in questions array
    function printQandA(permissionLevel) {
        $('.hidden_until_trigger').css("visibility", "visible")
        questions.forEach((value) => {
            //var answers = [];
            findAnswersLocal(value.question_id);
            // $('#questions_and_answers').empty()
            var questionToPrint = $("<p></p>").text(value.question_text).attr('id', `Question${value.question_id}`).attr('class', 'question')
            $('#questions_and_answers').append(questionToPrint);
            if (sessionStorage.getItem("permission_level") == "3") {
                addRemoveDisableElements('#form_submit_button', "disable")
                $('#form_submit_button').attr('type', 'text').val("To take a quiz, get a higher level account")
            } else {
                var select = $("<select></select>").attr('id', `Select${value.question_id}`).attr('class', 'answer').attr('name', `Question${value.question_id}`);
                $(`#Question${value.question_id}`).append(select);
                answers.forEach((val) => {
                    var answerToPrint = $("<option></option>").text(val.answer_text).attr('value', val.answer_id)
                    $(`#Select${value.question_id}`).append(answerToPrint);
                });
                clearArray(answers);
            }
        });
    };



    var thisSession

    function startAndStoreQuizSessionLocal(quizNumber, accountId) {
        accountId = 2;
        thisSession = new QuizSession(accountId, 1, quizNumber, "16/12/19", 0, null);
        sessionStorage.setItem("accountId", thisSession.account_taking_id);
        sessionStorage.setItem("session_id", thisSession.session_id);
        sessionStorage.setItem("quiz_id", thisSession.quiz_id);
        sessionStorage.setItem("start_date", thisSession.start_date);
        sessionStorage.setItem("score", thisSession.score);
        //console.log(thisSession)
    };

    function updateQuizSessionLocal(thisQandA) {
        sessionQandAs.push(thisQandA)
    }


    function gatherFormDataLocal() {
        //gather all Questions by class (10)
        //For each, create a thisQandA
        //answer_id is val() of option:selected of the child select
        //answer_text is text() of option:selected of the child select
        //question_id is attribute of child select with .replace('Select', ''),
        //question_text is text of this

        // var answersSubmitted = [];
        // $('.question').map(() => {
        //     var child = $(this).children(":first")
        //     let thisQandA = {
        //         answer_id: child.val(),
        //         answer_text: .text(),  //gets text from ALL select options
        //         question_text: $().text(), //gets text from ALL select options and question
        //         question_id: $().attr('id').replace('Select', ''),

        //     };
        // })

        var answersSubmitted = [];
        $('select.answer').map(function () {
            let thisQandA = {
                answer_id: $(this).val(),
                answer_text: $(this).text(), //gets text from ALL select options
                question_text: $(this).parent().text(), //gets text from ALL select options and question
                question_id: $(this).attr('id').replace('Select', ''),

            };

            answersSubmitted.push(thisQandA);
            presentSubmittedForm(thisQandA);
            updateQuizSessionLocal(thisQandA);

            sessionStorage.setItem(`Answer${thisQandA.question_id }`, `${thisQandA.answer_id}`)


        });
        var answersSubmittedSerialized = $("form").serialize()
        sessionStorage.setItem("submitted_data", answersSubmittedSerialized);
        thisSession.questions = sessionQandAs
        console.log(thisSession)
    }

    function presentSubmittedForm(QandAobject) {
        var questionforScreen = $("<li></li>").text("Question: " + QandAobject.question_text).attr('class', 'qanda').css('font-weight', 'bold');
        var answerforScreen = $('<p></p>').text("Your Answer: " + QandAobject.answer_text).attr('class', 'qanda');
        $('#show_qanda').append(questionforScreen);
        $('#show_qanda').append(answerforScreen);
    };



    function printScore(correct) {
        if (correct.length > 5) {
            var message = "Well done!!"
        } else if (correct.length <= 5) {
            var message = "Hmm, not great"
        }
        var score = $('<h2></h2>').text("You scored: " + correct.length + "... " + message)
        $('#score').prepend(score);
    }

    function checkAnswersLocal() {
        var correct = sessionQandAs.map((value) => {
            var thisQuestion = QuestionJSON.questions.find((question) => {
                return value.question_id == question.question_id
            });
            if (thisQuestion.correct_answer_id == value.answer_id) {
                return thisQuestion
            };
        });
        correct = correct.filter(function (val) {
            return val != null;
        });
        printScore(correct)
    }


    function fillQuestionsOption() {
        questions.forEach((value) => {
            var question = $('<option></option>').text(value.question_text).attr('id', `${value.question_id}`)
            $('#question_selector').append(question)
        })
    }

    function hideAdminFunctions() {
        $('.admin_page_functions').css("display", "none");
    };

    //admin page functions
    function printQuestionToEditLocal(questionId) {
        $('.hidden_until_trigger').css("visibility", "visible")
        if (questionId) {
            QuestionJSON.questions.forEach((value) => {
                if (value.question_id == questionId) {
                    var questionForPrinting = $('<input></input>').attr('value', value.question_text).attr('id', value.question_id).prop('type', 'text').attr('name', "questionBeingEdited").attr('class', "edit_remove").attr("max-length", "100")
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
        }

    };

    function printAnswerToEditLocal(questionId) {
        $('.hidden_until_trigger').css("visibility", "visible")
        if (questionId) {
            AnswerJSON.answers.forEach((value) => {
                if (value.question_id == questionId) {
                    var answerForPrinting = $('<input></input>').attr('value', value.answer_text).attr('id', value.answer_id).prop('type', 'text').attr('name', `answersBeingEdited${value.answer_id}`).attr('class', "edit_remove").attr("max-length", "100");
                    var answerText = $('<p></p>').text("Answer:").attr('class', "edit_remove");
                    $('#questions_and_answers').prepend(answerForPrinting);
                    $('#questions_and_answers').prepend(answerText);

                };
            });
            // var submitButton = $('<input></input>').prop("type", "submit").attr('id', 'submit_edited_question').text("Submit Edit");
            // $('#questions_and_answers').append(submitButton)
        } else {
            for (var i = 1; i < 5; i++) {
                var answerForPrinting = $('<input></input>').prop('type', 'text').attr('name', `${i}`).attr('class', "edit_remove").attr("max-length", "100");
                var answerText = $('<p></p>').text(`Answer ${i}:`).attr('class', "edit_remove");
                var isCorrect = $('<input></input>').prop('type', 'checkbox').attr('value', i).attr('name', `checkbox${i}`).attr('class', 'correct_answer_checkboxes');
                $('#questions_and_answers').prepend('Correct answer: ');
                $('#questions_and_answers').prepend(isCorrect);
                $('#questions_and_answers').prepend(answerForPrinting);
                $('#questions_and_answers').prepend(answerText);
            }
        }
    };

    function submitEditedQuestionLocal(question_id) {
        var newQuestionText = $('input[name="questionBeingEdited"]').val();
        for (var i = 0; i < QuestionJSON.questions.length; i++) {
            if (QuestionJSON.questions[i].question_id == question_id) {
                QuestionJSON.questions[i].question_text = newQuestionText
                console.log(QuestionJSON)
                return
            };
        };

        //submitAnswers
    };


    function submitNewQuestionLocal() {
        //get question and create object
        //get answers and create objects
        //get tickboxes and create correct_answer_id for question
        var randomQuestionId = 100
        // if ($('.correct_answer_checkboxes').prop('checked')) {
        //     var correctAnswerCheckbox = 
        // }

        var questionToCreate = {
            question_id: randomQuestionId,
            question_text: $('input[name="questionBeingEdited"]').val(),
            correct_answer_id: "",
            question_used: false,
            quiz_id: 2
        };

        // var answersToCreate = []
        // for (var i = 1; i < 5; i++) {
        //     answersToCreate.push($(`input[name="answersBeingEdited${i}"]`).val());
        //     }
        // };

        var newQuestion = new Question(randomQuestionId, $('input[name="questionBeingEdited"]').val(), null, false, null)
        QuestionJSON.questions.push(newQuestion)
        console.log(QuestionJSON.questions);
    };

    // function removeItem(attribute) {
    //     $(attribute).remove();
    // };

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
        }
    }

    function checkPermissionsLocal(itemToGet) {
        return sessionStorage.getItem(itemToGet);
    }

    function logOutLocal() {
        if (confirm("This will log you out and you will lose any on-going or past quiz sessions")) {
            sessionStorage.clear();
            $(location).attr('href', 'C:/Work/Week%20Project/The_Real_Quiz/Code/index.html');
        };
    };

    exports.findQuizzesLocal = findQuizzesLocal;
    exports.displayQuizzesLocal = displayQuizzesLocal;
    exports.getQuizNumber = getQuizNumber;
    exports.findQuestionsLocal = findQuestionsLocal;
    exports.printQandA = printQandA;
    exports.startAndStoreQuizSessionLocal = startAndStoreQuizSessionLocal;
    exports.gatherFormDataLocal = gatherFormDataLocal;
    exports.presentSubmittedForm = presentSubmittedForm;
    //exports.removeItem = removeItem;
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



})(typeof exports === 'undefined' ?
    this['loccalfunctions'] = {} : exports);