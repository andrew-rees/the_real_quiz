var Question = require('./modules/question.js')
var Answer = require('./modules/answer.js')
var Quiz = require('./modules/quiz.js')
var QuizSession = require('./modules/quizSession.js')
var $ = require('./jQuery.js')
//var jsonFile = require('../data/testJSON.js')
//const Sequelize = require('sequelize');
var Account = require('./modules/account.js')

var quizMockJSON = [{
    "quiz_id": 1,
    "quiz_name": "The Real Quiz"
}, {
    "quiz_id": 2,
    "quiz_name": "The Dead Parrots Quiz\n"
}];

var questionMockJSON = [{
        "question_id": 1,
        "question_text": "What type of animal is a spider?",
        "correct_answer_id": 1,
        "question_used": false,
        "quiz_id": 1
    },
    {
        "question_id": 2,
        "question_text": "What is the printer error?",
        "correct_answer_id": 5,
        "question_used": false,
        "quiz_id": 1
    },
    {
        "question_id": 3,
        "question_text": "What can Finchy throw over a pub?",
        "correct_answer_id": 9,
        "question_used": false,
        "quiz_id": 1
    },
    {
        "question_id": 4,
        "question_text": "What did Finchy throw over the Warehouse?",
        "correct_answer_id": 13,
        "question_used": false,
        "quiz_id": 1
    },
    {
        "question_id": 5,
        "question_text": "Whats the capital of Borneo?",
        "correct_answer_id": 17,
        "question_used": false,
        "quiz_id": 1
    },
    {
        "question_id": 6,
        "question_text": "What does Tim tell Dawn?",
        "correct_answer_id": 21,
        "question_used": false,
        "quiz_id": 1
    },
    {
        "question_id": 7,
        "question_text": "What is Davids management philosophy?",
        "correct_answer_id": 25,
        "question_used": false,
        "quiz_id": 1
    },
    {
        "question_id": 8,
        "question_text": "Who wrote 'In the Summertime?",
        "correct_answer_id": 29,
        "question_used": false,
        "quiz_id": 1
    },
    {
        "question_id": 9,
        "question_text": "What was the average age of a soldier in the Vietnam War?",
        "correct_answer_id": 33,
        "question_used": false,
        "quiz_id": 1
    },
    {
        "question_id": 10,
        "question_text": "What is Gareth afraid of?",
        "correct_answer_id": 37,
        "question_used": false,
        "quiz_id": 1
    },
    {
        "question_id": 11,
        "question_text": "Who is on Tim's Case?",
        "correct_answer_id": 43,
        "question_used": false,
        "quiz_id": 2
    },
    {
        "question_id": 12,
        "question_text": "What is 'in process?'",
        "correct_answer_id": 47,
        "question_used": false,
        "quiz_id": 2
    }
];

var answerMockJSON = [{
    "answer_id": 1,
    "answer_text": "Insect",
    "question_id": 1
}, {
    "answer_id": 2,
    "answer_text": "Arachnid",
    "question_id": 1
}, {
    "answer_id": 3,
    "answer_text": "Fish",
    "question_id": 1
}, {
    "answer_id": 4,
    "answer_text": "Dog",
    "question_id": 1
}, {
    "answer_id": 5,
    "answer_text": "243",
    "question_id": 2
}, {
    "answer_id": 6,
    "answer_text": "112",
    "question_id": 2
}, {
    "answer_id": 7,
    "answer_text": "568",
    "question_id": 2
}, {
    "answer_id": 8,
    "answer_text": "Broken",
    "question_id": 2
}, {
    "answer_id": 9,
    "answer_text": "Kettle",
    "question_id": 3
}, {
    "answer_id": 10,
    "answer_text": "Shoe",
    "question_id": 3
}, {
    "answer_id": 11,
    "answer_text": "Lamp",
    "question_id": 3
}, {
    "answer_id": 12,
    "answer_text": "Pint of Lager",
    "question_id": 3
}, {
    "answer_id": 13,
    "answer_text": "Tims shoe",
    "question_id": 4
}, {
    "answer_id": 14,
    "answer_text": "Kettle",
    "question_id": 4
}, {
    "answer_id": 15,
    "answer_text": "Lamp",
    "question_id": 4
}, {
    "answer_id": 16,
    "answer_text": "Pint of Lager",
    "question_id": 4
}, {
    "answer_id": 17,
    "answer_text": "Doesnt have one",
    "question_id": 5
}, {
    "answer_id": 18,
    "answer_text": "Borneo City",
    "question_id": 5
}, {
    "answer_id": 19,
    "answer_text": "Kuala Lumpor",
    "question_id": 5
}, {
    "answer_id": 20,
    "answer_text": "Yateley",
    "question_id": 5
}, {
    "answer_id": 21,
    "answer_text": "Never give up",
    "question_id": 6
}, {
    "answer_id": 22,
    "answer_text": "Keep on moving",
    "question_id": 6
}, {
    "answer_id": 23,
    "answer_text": "Trust Encouragement Reward Loyalty, Satisfaction",
    "question_id": 6
}, {
    "answer_id": 24,
    "answer_text": "Youre the best",
    "question_id": 6
}, {
    "answer_id": 25,
    "answer_text": "Team Individuality",
    "question_id": 7
}, {
    "answer_id": 26,
    "answer_text": "Trust Encouragement Reward Loyalty, Satisfaction",
    "question_id": 7
}, {
    "answer_id": 27,
    "answer_text": "Anything Nobby Burton says",
    "question_id": 7
}, {
    "answer_id": 28,
    "answer_text": "Dead Poets Society",
    "question_id": 7
}, {
    "answer_id": 29,
    "answer_text": "Mungo Jerry",
    "question_id": 8
}, {
    "answer_id": 30,
    "answer_text": "4 non-blondes",
    "question_id": 8
}, {
    "answer_id": 31,
    "answer_text": "Texas",
    "question_id": 8
}, {
    "answer_id": 32,
    "answer_text": "Foregone Conclusion",
    "question_id": 8
}, {
    "answer_id": 33,
    "answer_text": 19,
    "question_id": 9
}, {
    "answer_id": 34,
    "answer_text": 18,
    "question_id": 9
}, {
    "answer_id": 35,
    "answer_text": 20,
    "question_id": 9
}, {
    "answer_id": 36,
    "answer_text": 21,
    "question_id": 9
}, {
    "answer_id": 37,
    "answer_text": "Jelly",
    "question_id": 10
}, {
    "answer_id": 38,
    "answer_text": "Foxholes",
    "question_id": 10
}, {
    "answer_id": 39,
    "answer_text": "Mr Toad",
    "question_id": 10
}, {
    "answer_id": 40,
    "answer_text": "Benefits fraud",
    "question_id": 10
}, {
    "answer_id": 41,
    "answer_text": "Jamie",
    "question_id": 11
}, {
    "answer_id": 42,
    "answer_text": "Sheila from Accounts",
    "question_id": 11
}, {
    "answer_id": 43,
    "answer_text": "Trevor Cromwell",
    "question_id": 11
}, {
    "answer_id": 44,
    "answer_text": "Jeff Lamp",
    "question_id": 11
}, {
    "answer_id": 45,
    "answer_text": "The fire alarm test",
    "question_id": 12
}, {
    "answer_id": 46,
    "answer_text": "The Hunt for Davids successor",
    "question_id": 12
}, {
    "answer_id": 47,
    "answer_text": "Invetigation",
    "question_id": 12
}, {
    "answer_id": 48,
    "answer_text": "Investigation",
    "question_id": 12
}];

// // var accountMockJSON = [{
// //     "account_id": 1,
// //     "username": "admin1@WebbiSkools.com",
// //     "password": "$2a$06$xv/Nn/EaoUL3CPwt6wVy9.19UOPKJ6p3LHOFd2gXmpe2z74/6Soea",
// //     "permission": 1
// // }, {
// //     "account_id": 2,
// //     "username": "admin2@WebbiSkools.com",
// //     "password": "$2a$06$azmKaQhqWriFf54VtdCzz.zhlgzb8GLECWtrEgp3EJ25LzcGNxZ2u",
// //     "permission": 1
// // }, {
// //     "account_id": 3,
// //     "username": "taker1@gmail.com",
// //     "password": "$2a$06$PYro/CnQKjHQFk8VqNPRX.tMzn95KoEVM5L7S7MfPE/ESf5dlQota",
// //     "permission": 2
// // }, {
// //     "account_id": 4,
// //     "username": "taker2@gmail.com",
// //     "password": "$2a$06$JHv4cmwnmb6/1oqdcBJaP.upoGoWjgzfRiVGTqGIg2FSjh/t6LNEm",
// //     "permission": 2
// // }, {
// //     "account_id": 5,
// //     "username": "viewer1@gmail.com",
// //     "password": "$2a$06$SQDRuQV9palDUp6iZ1MRCuY9QFpTUyZ0br6db9NQIB/WJiSrRSo9W",
// //     "permission": 3
// // }, {
// //     "account_id": 6,
// //     "username": "viewer2@gmail.com",
// //     "password": "$2a$06$N8D6i90RJGSSEAxXH0q.euFLL5PZUd9m/2EKmoqPK0GlcWPmK.nna",
// //     "permission": 3
// // }]

// // var quizSessionMockJSON = [{
// //     "account_taking_id": 4,
// //     "session_id": 1,
// //     "quiz_id": 2,
// //     "start_date": "15/12/19",
// //     "score": 0
// // }]



//the work
(function (exports) {


    var questions = [];
    var quizzes = [];
    var answers = [];
    var sessionQandAs = [];

    //Find the quizzes and fill quizzes Array
    function findQuizzesLocal() {
        quizMockJSON.forEach((value) => {
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
            questionMockJSON.forEach((value) => {
                if (value.quiz_id == quizNumber) {
                    questions.push(new Question(value.question_id, value.question_text, value.correct_answer_id, value.question_used, value.quiz_id))
                };
            })
        } else {
            questionMockJSON.forEach((value) => {
                questions.push(new Question(value.question_id, value.question_text, value.correct_answer_id, value.question_used, value.quiz_id))
            })
        }

        //console.log("Questions array after findQuestions: " + questions)
    };

    //for each question, find the answers
    function findAnswersLocal(questionNumber) {
        answerMockJSON.forEach((value) => {
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
    function printQandA() {
        questions.forEach((value) => {
            //var answers = [];
            findAnswersLocal(value.question_id);
            // $('#questions_and_answers').empty()
            var questionToPrint = $("<p></p>").text(value.question_text).attr('id', `Question${value.question_id}`).attr('class', 'question')
            $('#questions_and_answers').append(questionToPrint);
            var select = $("<select></select>").attr('id', `Select${value.question_id}`).attr('class', 'answer').attr('name', `Question${value.question_id}`);
            $(`#Question${value.question_id}`).append(select);
            answers.forEach((val) => {
                var answerToPrint = $("<option></option>").text(val.answer_text).attr('value', val.answer_id)
                $(`#Select${value.question_id}`).append(answerToPrint);
            });
            clearArray(answers);
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
        var answersSubmitted = [];
        $('select.answer').map(function () {
            let thisQandA = {
                question_text: null,
                question_id: null,
                answer_id: null,
                answer_text: null
            }
            thisQandA.answer_id = $(this).val();
            thisQandA.answer_text = $(this).text(); //gets text from ALL select options
            thisQandA.question_id = $(this).attr('id').replace('Select', '');
            thisQandA.question_text = $(this).parent().text();

            answersSubmitted.push(thisQandA);
            presentSubmittedForm(thisQandA);
            updateQuizSessionLocal(thisQandA);

            sessionStorage.setItem(`Answer${thisQandA.question_id }`, `${thisQandA.answer_id}`)
            console.log(`${thisQandA.question_id} , ${thisQandA.answer_id}`)

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

    function removeItem(attribute) {
        $(attribute).remove();
    };

    function printScore(correct) {
        var score = $('<p></p>').text("You scored: " + correct.length).css('color', 'red').css('font-size', '36pt').css('font-weight', 'bold');
        $('#score').append(score);
        var message = $('<p></p>').css('color', 'red').css('font-size', '24pt').css('font-weight', 'bold');
        if (correct.length > 5) {
            message.text("Well done!!")
        } else if (correct.length <= 5) {
            message.text("Hmm, not great")
        }
        $('#score').append(message);
    }

    function checkAnswersLocal() {
        var correct = sessionQandAs.map((value) => {
            var thisQuestion = questionMockJSON.find((question) => {
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


    //admin page functions
    function printQuestionToEditLocal(questionId) {
        if (questionId) {
            questionMockJSON.forEach((value) => {
                if (value.question_id == questionId) {
                    var questionForPrinting = $('<input></input>').attr('value', value.question_text).attr('id', value.question_id).prop('type', 'text').attr('name', "questionBeingEdited").attr('class', "edit_remove");
                    var questionText = $('<p></p>').text("Question:").attr('class', "edit_remove");
                    $('#questions_and_answers').append(questionText);
                    $('#questions_and_answers').append(questionForPrinting);
                };
            });
        } else {
            var questionForPrinting = $('<input></input>').prop('type', 'text').attr('name', "questionBeingEdited").attr('class', "edit_remove");
            var questionText = $('<p></p>').text("Question:").attr('class', "edit_remove");
            $('#questions_and_answers').append(questionText);
            $('#questions_and_answers').append(questionForPrinting);
        }

    };

    function printAnswerToEditLocal(questionId) {
        if (questionId) {
            answerMockJSON.forEach((value) => {
                if (value.question_id == questionId) {
                    var answerForPrinting = $('<input></input>').attr('value', value.answer_text).attr('id', value.answer_id).prop('type', 'text').attr('name', `answersBeingEdited${value.answer_id}`).attr('class', "edit_remove");
                    var answerText = $('<p></p>').text("Answer:").attr('class', "edit_remove");
                    $('#questions_and_answers').append(answerText);
                    $('#questions_and_answers').append(answerForPrinting);
                };
            });
            // var submitButton = $('<input></input>').prop("type", "submit").attr('id', 'submit_edited_question').text("Submit Edit");
            // $('#questions_and_answers').append(submitButton)
        } else {
            for (var i = 1; i < 5; i++) {
                var answerForPrinting = $('<input></input>').prop('type', 'text').attr('name', `${i}`).attr('class', "edit_remove");
                var answerText = $('<p></p>').text(`Answer ${i}:`).attr('class', "edit_remove");
                var isCorrect = $('<input></input>').prop('type', 'checkbox').attr('value', i).attr('name', `checkbox${i}`).attr('class', 'correct_answer_checkboxes')
                $('#questions_and_answers').append(answerText);
                $('#questions_and_answers').append(answerForPrinting);
                $('#questions_and_answers').append('Correct answer: ');
                $('#questions_and_answers').append(isCorrect);
            }
        }
    };

    function submitEditedQuestionLocal(question_id) {
        var newQuestionText = $('input[name="questionBeingEdited"]').val();
        for (var i = 0; i < questionMockJSON.length; i++) {
            if (questionMockJSON[i].question_id == question_id) {
                questionMockJSON[i].question_text = newQuestionText
                console.log(questionMockJSON)
                return
            };
        };

        //submitAnswers
    };


    function submitNewQuestionLocal() {  
        //get question and create object
        //get answers and create objects
        //get tickboxes and create correct_answer_id for question
        var randomQuestionId = 15
        // if ($('.correct_answer_checkboxes').prop('checked')) {
        //     var correctAnswerCheckbox = 
        // }

        var questionToCreate = {question_id: randomQuestionId, question_text: $('input[name="questionBeingEdited"]').val(), correct_answer_id: "", question_used: false, quiz_id: 2};

        // var answersToCreate = []
        // for (var i = 1; i < 5; i++) {
        //     answersToCreate.push($(`input[name="answersBeingEdited${i}"]`).val());
        //     }
        // };

        var newQuestion = new Question(randomQuestionId, $('input[name="questionBeingEdited"]').val(), null, false, 2)
        questionMockJSON.push(newQuestion)
        console.log(questionMockJSON);
    };


    exports.findQuizzesLocal = findQuizzesLocal;
    exports.displayQuizzesLocal = displayQuizzesLocal;
    exports.getQuizNumber = getQuizNumber;
    exports.findQuestionsLocal = findQuestionsLocal;
    exports.printQandA = printQandA;
    exports.startAndStoreQuizSessionLocal = startAndStoreQuizSessionLocal;
    exports.gatherFormDataLocal = gatherFormDataLocal;
    exports.presentSubmittedForm = presentSubmittedForm;
    exports.removeItem = removeItem;
    exports.checkAnswersLocal = checkAnswersLocal;
    exports.fillQuestionsOption = fillQuestionsOption;
    exports.printQuestionToEditLocal = printQuestionToEditLocal;
    exports.submitEditedQuestionLocal = submitEditedQuestionLocal;
    exports.printAnswerToEditLocal = printAnswerToEditLocal;
    exports.submitNewQuestionLocal = submitNewQuestionLocal;



})(typeof exports === 'undefined' ?
    this['loccalfunctions'] = {} : exports);