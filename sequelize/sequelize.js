const Sequelize = require('sequelize');
var pg = require('pg');

// const Question = require("../scripts/questionClass.js");
// const Answer = require("../scripts/answerClass.js");

// var sequelize = new Sequelize('PostgreSQL 10 (x86)', 'postgres', {
//     host: "localhost", //your server
//     port: 3000, //server port
//     dialect: 'postgres'
//   });

//const sequelize = new Sequelize('postgres://username:passwword@localhost(orwhatever):5432/dbname');
//const sequelize = new Sequelize('postgres://andrew:Password1@localhost:3000/TEST_Quiz'); //softwire
//const sequelize = new Sequelize('postgres://postgres:Password1@localhost:5432/Test'); //postgres12
const sequelize = new Sequelize('postgres://postgres:Password1@localhost:8080/The_Real_Quiz'); //postgres12

//TEST of connectivity
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        sequelize.close()
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


    //test for insert query
    
    // var account_id = 3; //taker1
    // var quizNumber = 2; //the_real_quiz
    // sequelize
    //     .query(`INSERT INTO "quiz_sessions" ("account_id_taking", "session_id", "quiz_id", "start_date", "score") VALUES(${account_id}, nextval('create_unique_session_id'), ${quizNumber}, CURRENT_DATE, 0)`)
    //     .then(() => {
    //         console.log('Query passed to DB');
    //         sequelize.close()
    //     })
    //     .catch(err => {
    //         console.error('Error:', err);
    //     });

    //test for 

// //Set classes
// class Question {
//     constructor(question_id, question_text, correct_answer_id, question_used) {
//         this.question_id = question_id;
//         this.question_text = question_text;
//         this.correct_answer_id = correct_answer_id;
//         this.question_used = question_used;
//     }
// }

// class Answer {
//     constructor(answer_id, answer_text, question_id) {
//         this.answer_id = answer_id;
//         this.answer_text = answer_text;
//         this.question_id = question_id;
//     }
// }

//simple query to find
// var questionsArray = [];
// sequelize
//     .query('SELECT * FROM questions')
//     .then(questions => {
//         for (i = 0; i < questions[0].length; i++) {
//             //console.log(`QUESTIONS\n\n------QUESTION ${i+1}-----\nID: ${questions[0][i].question_id}\nAnswer Text: ${questions[0][i].question_text}\nQuestion ID: ${questions[0][i].correct_answer_id}\nHas Been used: ${questions[0][i].used}.`);
//             var thisQuestion = new Question(questions[0][i].question_id, questions[0][i].question_text, questions[0][i].correct_answer_id, questions[0][i].used)
//             questionsArray.push(thisQuestion);
//         }
//         sequelize.close();
//         console.log(questionsArray)
//         //IF it can be used in browser
//         // var printQ = $("<p></p>").text(questionsArray)
//         // $("#show_databases_here").append(printQ);
//     })
//     .catch(err => {
//         console.error('Unable to connect to the database:', err);
//     });

// var answersArray = [];
// sequelize
//     .query('SELECT * FROM answers')
//     .then(answers => {
//         for (i = 0; i < answers[0].length; i++) {
//             //console.log(`ANSWERS\n\n------ANSWER ${i+1}-----\nID: ${answers[0][i].answer_id}\nAnswer Text: ${answers[0][i].answer_text}\nQuestion ID: ${answers[0][i].question_id}.`);
//             var thisAnswer = new Answer(answers[0][i].answer_id, answers[0][i].answer_text, answers[0][i].question_id)
//             answersArray.push(thisAnswer);
//         }
//         //console.log(JSON.stringify(kennels, null, 4));
//         sequelize.close();
//         console.log(answersArray)
//         // var printA = $("<p></p>").text(questionsArray)
//         // $("#show_databases_here").append(printA);
//     })
//     .catch(err => {
//         console.error('Unable to connect to the database:', err);
//     });
// console.log(answersArray)