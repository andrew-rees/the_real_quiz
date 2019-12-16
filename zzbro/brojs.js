var $ = require('jquery')
var Question = require("../scripts/questionClass.js");
var Answer = require("../scripts/answerClass.js");
//const Sequelize = require('sequelize');

$("#brobutton").click(() => {
    console.log("clicks")
});

var testQuestion = new Question(1, "why is this shit so hard?", 2, true);

var testAnswer = new Answer(1, "because, you shit", 2);

console.log(testQuestion.question_text);

console.log(testAnswer.answer_text)

//const sequelize = new Sequelize('postgres://andrew:Password1@localhost:3000/TEST_Quiz');

//TEST of connectivity
// sequelize
//     .authenticate()
//     .then(() => {
//         console.log('Connection has been established successfully.');
//         sequelize.close()
//     })
//     .catch(err => {
//         console.error('Unable to connect to the database:', err);
//     });


