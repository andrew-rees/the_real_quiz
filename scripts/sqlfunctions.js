// var Question = require('./modules/question.js')
// var Answer = require('./modules/answer.js')
// var Quiz = require('./modules/quiz.js')
var QuizSession = require('./modules/quizSession.js')
// var $ = require('./jQuery.js')
const Sequelize = require('sequelize');
// var Account = require('./modules/account.js')

(function (exports) {

    var questions = [];
    var quizzes = [];
    var answers = [];

    function findQuizzesSQL() {
        //to find quizzes from the DB
    };

    function findQuestionsSQL(quizNumber) {
        //to find questions from the DB
    };

    function findAnswersSQL() {
        //to find answers from the DB
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

    //store a quiz_session
    function storeQuizSessionSQL(accountId) {
        accountId = 1;
        const sequelize = new Sequelize('postgres://andrew:Password1@localhost:3000/TEST_Quiz');
        sequelize
            .query(`SELECT * FROM "quiz_sessions" WHERE "account_id_taking" = ${accountId} ORDER BY "start_date" desc LIMIT 1`)
            .then((session) => {
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

    function sendAnswersToSQL(sessionQandAs) { //would need to be passed properly from index.js
        var queryString = ""; //need to remove last 4 chars from the 
        sessionQandAs.forEach(value => {
            queryString += "correct_answer_id=" + value.answer_id.toString() + " OR "
        });
        const sequelize = new Sequelize('postgres://postgres:Password1@localhost:5432/The_Real_Quiz')
        sequelize
            .query(`SELECT * FROM questions WHERE ${queryString}`)
            .then((questions) => {
                printScore(questions.length) //from localfunctions
                sequelize
                    .query(`UPDATE "quiz_sessions" SET score = ${questions.length} WHERE session_id=${thisSession.session_id}`) //will need to get SessionID from function above.
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });
    }

    function printQuestionToEditSQL() {
        //to print a question from the DB when editing a question/answer
    }

    function printAnswerToEditSQL() {
        //to print an answer from the DB when editing a question/answer
    }

    function submitEditedQuestionSQL(question_id) {
        var newQuestionText = $('input[name="questionBeingEdited"]').val();
        const sequelize = new Sequelize('postgres://postgres:Password1@localhost:5432/The_Real_Quiz')
        sequelize
            .query(`UPDATE "questions" SET question_text = ${newQuestionText} WHERE question_id=${question_id}`)
            .then((questions) => {
                //handle success
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });
    }

    function submitNewQuestionSQL() {
        //to submit a new question to DB. will include validation to see if question exists based on exact string match to question_text
    }

    function checkPermissionsSQL() {
        //to check if the user's permissions permit actions
    }

    function logOutSQL() {

    };

    function passLoginToDB(fields) {
        var username = fields[0].value
        var password = fields[1].value

        accountModel
        .count({ where: {"username": username, "password": password}  })
        .then((value) => {
            if (value == 0) {
                loggedIn(true);
                sequelize.close();
            } else {
                loggedIn(false);
                sequelize.close();
            };
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });
    }

    function accountModel() {
        const sequelize = new Sequelize('postgres://postgres:Password1@localhost:3000/The_Real_Quiz');
        sequelize
            .define('accountModel', {
                account_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                username: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                password: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                permission: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                }
            })
            .then(() => {
                console.log('Query passed to DB');
                sequelize.close()
            })
            .catch(err => {
                console.error('Error:', err);
            });
    };



    exports.startQuizSessionSQL = startQuizSessionSQL;
    exports.storeQuizSessionSQL = storeQuizSessionSQL;
    exports.sendAnswersToSQL = sendAnswersToSQL;
    exports.submitEditedQuestionSQL = submitEditedQuestionSQL;
    exports.findQuizzesSQL = findQuizzesSQL;
    exports.findQuestionsSQL = findQuestionsSQL;
    exports.findAnswersSQL = findAnswersSQL;
    exports.submitNewQuestionSQL = submitNewQuestionSQL;
    exports.checkPermissionsSQL = checkPermissionsSQL;
    exports.printQuestionToEditSQL = printQuestionToEditSQL;
    exports.printAnswerToEditSQL = printAnswerToEditSQL;
    exports.logOutSQL = logOutSQL;
    exports.passLoginToDB = passLoginToDB;

})(typeof exports === 'undefined' ?
    this['sqlfunctions'] = {} : exports);