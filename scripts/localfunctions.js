var Question = require('./modules/question.js')
var Answer = require('./modules/answer.js')
var Quiz = require('./modules/quiz.js')
var QuizSession = require('./modules/quizSession.js')
var $ = require('./jQuery.js')
const Sequelize = require('sequelize');
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
}];

// var accountMockJSON = [{
//     "account_id": 1,
//     "username": "admin1@WebbiSkools.com",
//     "password": "$2a$06$xv/Nn/EaoUL3CPwt6wVy9.19UOPKJ6p3LHOFd2gXmpe2z74/6Soea",
//     "permission": 1
// }, {
//     "account_id": 2,
//     "username": "admin2@WebbiSkools.com",
//     "password": "$2a$06$azmKaQhqWriFf54VtdCzz.zhlgzb8GLECWtrEgp3EJ25LzcGNxZ2u",
//     "permission": 1
// }, {
//     "account_id": 3,
//     "username": "taker1@gmail.com",
//     "password": "$2a$06$PYro/CnQKjHQFk8VqNPRX.tMzn95KoEVM5L7S7MfPE/ESf5dlQota",
//     "permission": 2
// }, {
//     "account_id": 4,
//     "username": "taker2@gmail.com",
//     "password": "$2a$06$JHv4cmwnmb6/1oqdcBJaP.upoGoWjgzfRiVGTqGIg2FSjh/t6LNEm",
//     "permission": 2
// }, {
//     "account_id": 5,
//     "username": "viewer1@gmail.com",
//     "password": "$2a$06$SQDRuQV9palDUp6iZ1MRCuY9QFpTUyZ0br6db9NQIB/WJiSrRSo9W",
//     "permission": 3
// }, {
//     "account_id": 6,
//     "username": "viewer2@gmail.com",
//     "password": "$2a$06$N8D6i90RJGSSEAxXH0q.euFLL5PZUd9m/2EKmoqPK0GlcWPmK.nna",
//     "permission": 3
// }]

// var quizSessionMockJSON = [{
//     "account_taking_id": 4,
//     "session_id": 1,
//     "quiz_id": 2,
//     "start_date": "15/12/19",
//     "score": 0
// }]



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
        questionMockJSON.forEach((value) => {
            if (value.quiz_id == quizNumber) {
                questions.push(new Question(value.question_id, value.question_text, value.correct_answer_id, value.question_used, value.quiz_id))
            };
        });
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

    //start a quiz session
    function startQuizSessionSQL(quizNumber, accountId) {
        const sequelize = new Sequelize('postgres://andrew:Password1@localhost:3000/TEST_Quiz');
        accountId = 1;
        sequelize
            .query(`INSERT INTO "quiz_sessions" ("account_id_taking", "session_id", "quiz_id", "start_date", "score") VALUES(${accountId}, nextval('create_unique_id'), ${quizNumber}, CURRENT_DATE, 0)`)
            .then(() => {
                console.log('Query passed to DB');
                sequelize.close()
            })
            .catch(err => {
                console.error('Error:', err);
            });   
    };
    var thisSession
    function startAndStoreQuizSessionLocal (quizNumber, accountId) {
        accountId = 2;
        thisSession = new QuizSession(accountId, 1, quizNumber, "16/12/19", 0, null);
        sessionStorage.setItem("accountId", thisSession.account_taking_id);
        sessionStorage.setItem("session_id", thisSession.session_id);
        sessionStorage.setItem("quiz_id", thisSession.quiz_id);
        sessionStorage.setItem("start_date", thisSession.start_date);
        sessionStorage.setItem("score", thisSession.score);
        //console.log(thisSession)
    };

     function storeQuizSessionSQL (accountId) {
        accountId = 1;
        const sequelize = new Sequelize('postgres://andrew:Password1@localhost:3000/TEST_Quiz');
        sequelize
            .query(`SELECT * FROM "quiz_sessions" WHERE "account_id_taking" = ${accountId} ORDER BY "start_date" desc LIMIT 1`)
            .then ((session) => {
                for (i = 0; i < session[0].length; i++) {
                    var thisSession = new QuizSession(session[0][i].account_taking_id, session[0][i].session_id, session[0][i].quiz_id, session[0][i].start_date, session[0][i].score);
                    sessionStorage.setItem("account_taking_id", thisSession.account_taking_id);
                    sessionStorage.setItem("session_id", thisSession.session_id);
                    sessionStorage.setItem("quiz_id", thisSession.quiz_id);
                    sessionStorage.setItem("start_date", thisSession.start_date);
                    sessionStorage.setItem("score", thisSession.score);
                sequelize.close();
                }
            })
            .catch(err => {
                        console.error('Unable to connect to the database:', err);
                    });
    }

    function updateQuizSessionSQL () {
        //get each question and answer pairing
        //send them to the DB. If answer_id === correct_answer_id

    }

    function updateQuizSessionLocal (thisQandA) {
        sessionQandAs.push(thisQandA)
    }


    function gatherFormDataLocal () {
        var answersSubmitted = [];
        $('select.answer').map(function() {
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

    function presentSubmittedForm (QandAobject) {
        var questionforScreen = $("<li></li>").text("Question: " + QandAobject.question_text).attr('class', 'qanda').css('font-weight', 'bold');
        var answerforScreen = $('<p></p>').text("Your Answer: " + QandAobject.answer_text).attr('class', 'qanda');
        $('#show_qanda').append(questionforScreen);
        $('#show_qanda').append(answerforScreen);
    };

    function removeItem (attribute) {
        $(attribute).remove();
    };

    function printScore (correct) {
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

    function checkAnswersLocal () {
        //get thisSession
        //for each, check questionMockJSON for the Q, and see if the answer_id matches correct_answer_id
        var correct = sessionQandAs.map((value) => {
            //look in mockjson for the question with same  id as value.question_id
            //get the correct_answer_id from that question
            //compare this to the value.answer_id
            //if same, add to the 

            var thisQuestion = questionMockJSON.find((question) => {
               return value.question_id == question.question_id
            });
            if (thisQuestion.correct_answer_id == value.answer_id) {
                return thisQuestion
            }
        });

        correct = correct.filter(function (val) {
            return val != null;
          });
          printScore(correct)
    }


    exports.findQuizzesLocal = findQuizzesLocal;
    exports.displayQuizzesLocal = displayQuizzesLocal;
    exports.getQuizNumber = getQuizNumber;
    exports.findQuestionsLocal = findQuestionsLocal;
    exports.printQandA = printQandA;
    exports.startQuizSessionSQL = startQuizSessionSQL;
    exports.storeQuizSessionSQL = storeQuizSessionSQL;
    exports.startAndStoreQuizSessionLocal = startAndStoreQuizSessionLocal;
    exports.gatherFormDataLocal = gatherFormDataLocal;
    exports.presentSubmittedForm = presentSubmittedForm;
    exports.removeItem = removeItem;
    exports.checkAnswersLocal = checkAnswersLocal;
    


})(typeof exports === 'undefined' ?
    this['loccalfunctions'] = {} : exports);
