var SqlFunctions = require('./sqlfunctions.js');

//Start Quiz Session

var quizNumber = 3; //range is 2-3
var accountId = 3;

SqlFunctions.startQuizSessionSQL(quizNumber, accountId)

//Submit Edited Answer

var a = 41; //range is 41-50
var b = 'Which type of animal is a spider';

SqlFunctions.submitEditedQuestionSQL(a, b);