var SqlFunctions = require('./sqlfunctions.js');

//Start Quiz Session

var quizNumber = 2; //range is 2-3
var accountId = 1;

SqlFunctions.startQuizSessionSQL(quizNumber, accountId)

//Submit Edited Answer

var a = 45; //range is 41-50
var b = 'Updated for POC';

SqlFunctions.submitEditedQuestionSQL(a, b);