var Question = require('./modules/question.js');
var Answer = require('./modules/answer.js');
var Quiz = require('./modules/quiz.js');
var QuizSession = require('./modules/quizSession.js');
var Account = require('./modules/account.js');
var $ = require('./jQuery.js');
const Sequelize = require('sequelize');
//var pg = require('pg');

(function (exports) {

    var questions = [];
    var quizzes = [];
    var answers = [];

    const sequelize = new Sequelize('postgres://postgres:Password1@localhost:8080/The_Real_Quiz');

    //to find quizzes from the DB
    function findQuizzesSQL() {
        
    };

    //to find questions from the DB
    function findQuestionsSQL(quizNumber) {
        
    };

    //to find answers from the DB
    function findAnswersSQL() {
        
    };

    //start a quiz session
    function startQuizSessionSQL(quizNumber, accountId) {
        accountId = 1; //This is here to hold an account
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

    //store a quiz_session in sessionStorage and Cookies
    function storeQuizSessionSQL(accountId) {
        accountId = 1;
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
                    document.cookie = `accountId=${thisSession.account_taking_id}`;
                    document.cookie = `session_id=${thisSession.session_id}`;
                    document.cookie = `quiz_id=${thisSession}`;
                    document.cookie = `start_date=${start_date}`;
                    document.cookie = `score=${thisSession}`;
                    console.log("Cookies after start quiz session: " + document.cookie)
                    sequelize.close();
                }
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });
    };

    //Sends the Questions and Answers to the database
    function sendAnswersToSQL(sessionQandAs) { //would need to be passed properly from index.js
        var queryString = ""; //need to remove last 4 chars from the queryString to remove the " OR " from the last entry
        sessionQandAs.forEach(value => {
            queryString += "correct_answer_id=" + value.answer_id.toString() + " OR "
        });
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
    };

    //to print a question from the DB when editing a question/answer
    function printQuestionToEditSQL() {
        
    };

    //to print an answer from the DB when editing a question/answer
    function printAnswerToEditSQL() {
        
    };

    //to submit an edited question to database
    function submitEditedQuestionSQL(question_id) {
        var newQuestionText = $('input[name="questionBeingEdited"]').val();
        sequelize
            .query(`UPDATE "questions" SET question_text = ${newQuestionText} WHERE question_id=${question_id}`)
            .then((questions) => {
                //handle success
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });
    };

    //to submit a new question to DB. Will include validation to see if question exists based on exact string match to question_text
    function submitNewQuestionSQL() {
        
    };

    //to check if the user's permissions permit actions
    function checkPermissionsSQL() {
        
    };

    //to log out from the database
    function logOutSQL() {

    };

    //Models an account for Sequelize
    function accountModel() {
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

    //Using the model to pass a login to the databse
    function passLoginToDB(fields) {
        var username = fields[0].value;
        var password = fields[1].value;
        accountModel
            .count({
                where: {
                    "username": username,
                    "password": password
                }
            })
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