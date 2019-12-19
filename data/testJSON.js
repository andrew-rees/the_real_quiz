(function (exports) {

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

exports.quizMockJSON = quizMockJSON;
exports.answerMockJSON = answerMockJSON;
exports.questionMockJSON = questionMockJSON;

})(typeof exports === 'undefined' ?
this['loccalfunctions'] = {} : exports);

// var quizMockJSON = [{
//     "quiz_id": 1,
//     "quiz_name": "The Real Quiz"
// }, {
//     "quiz_id": 2,
//     "quiz_name": "The Dead Parrots Quiz\n"
// }];

//var questionMockJSON = [
    // {
    //     "question_id": 1,
    //     "question_text": "What type of animal is a spider?",
    //     "correct_answer_id": 1,
    //     "question_used": false,
    //     "quiz_id": 1
    // },
    // {
    //     "question_id": 2,
    //     "question_text": "What is the printer error?",
    //     "correct_answer_id": 5,
    //     "question_used": false,
    //     "quiz_id": 1
    // },
    // {
    //     "question_id": 3,
    //     "question_text": "What can Finchy throw over a pub?",
    //     "correct_answer_id": 9,
    //     "question_used": false,
    //     "quiz_id": 1
    // },
    // {
    //     "question_id": 4,
    //     "question_text": "What did Finchy throw over the Warehouse?",
    //     "correct_answer_id": 13,
    //     "question_used": false,
    //     "quiz_id": 1
    // },
    // {
    //     "question_id": 5,
    //     "question_text": "Whats the capital of Borneo?",
    //     "correct_answer_id": 17,
    //     "question_used": false,
    //     "quiz_id": 1
    // },
    // {
    //     "question_id": 6,
    //     "question_text": "What does Tim tell Dawn?",
    //     "correct_answer_id": 21,
    //     "question_used": false,
    //     "quiz_id": 1
    // },
    // {
    //     "question_id": 7,
    //     "question_text": "What is Davids management philosophy?",
    //     "correct_answer_id": 25,
    //     "question_used": false,
    //     "quiz_id": 1
    // },
    // {
    //     "question_id": 8,
    //     "question_text": "Who wrote 'In the Summertime?",
    //     "correct_answer_id": 29,
    //     "question_used": false,
    //     "quiz_id": 1
    // },
    // {
    //     "question_id": 9,
    //     "question_text": "What was the average age of a soldier in the Vietnam War?",
    //     "correct_answer_id": 33,
    //     "question_used": false,
    //     "quiz_id": 1
    // },
    // {
    //     "question_id": 10,
    //     "question_text": "What is Gareth afraid of?",
    //     "correct_answer_id": 37,
    //     "question_used": false,
    //     "quiz_id": 1
    // },
    // {
    //     "question_id": 11,
    //     "question_text": "Who is on Tim's Case?",
    //     "correct_answer_id": 43,
    //     "question_used": false,
    //     "quiz_id": 2
    // },
    // {
    //     "question_id": 12,
    //     "question_text": "What is 'in process?'",
    //     "correct_answer_id": 47,
    //     "question_used": false,
    //     "quiz_id": 2
    // }
//];

// var answerMockJSON = [{
//     "answer_id": 1,
//     "answer_text": "Insect",
//     "question_id": 1
// }, {
//     "answer_id": 2,
//     "answer_text": "Arachnid",
//     "question_id": 1
// }, {
//     "answer_id": 3,
//     "answer_text": "Fish",
//     "question_id": 1
// }, {
//     "answer_id": 4,
//     "answer_text": "Dog",
//     "question_id": 1
// }, {
//     "answer_id": 5,
//     "answer_text": "243",
//     "question_id": 2
// }, {
//     "answer_id": 6,
//     "answer_text": "112",
//     "question_id": 2
// }, {
//     "answer_id": 7,
//     "answer_text": "568",
//     "question_id": 2
// }, {
//     "answer_id": 8,
//     "answer_text": "Broken",
//     "question_id": 2
// }, {
//     "answer_id": 9,
//     "answer_text": "Kettle",
//     "question_id": 3
// }, {
//     "answer_id": 10,
//     "answer_text": "Shoe",
//     "question_id": 3
// }, {
//     "answer_id": 11,
//     "answer_text": "Lamp",
//     "question_id": 3
// }, {
//     "answer_id": 12,
//     "answer_text": "Pint of Lager",
//     "question_id": 3
// }, {
//     "answer_id": 13,
//     "answer_text": "Tims shoe",
//     "question_id": 4
// }, {
//     "answer_id": 14,
//     "answer_text": "Kettle",
//     "question_id": 4
// }, {
//     "answer_id": 15,
//     "answer_text": "Lamp",
//     "question_id": 4
// }, {
//     "answer_id": 16,
//     "answer_text": "Pint of Lager",
//     "question_id": 4
// }, {
//     "answer_id": 17,
//     "answer_text": "Doesnt have one",
//     "question_id": 5
// }, {
//     "answer_id": 18,
//     "answer_text": "Borneo City",
//     "question_id": 5
// }, {
//     "answer_id": 19,
//     "answer_text": "Kuala Lumpor",
//     "question_id": 5
// }, {
//     "answer_id": 20,
//     "answer_text": "Yateley",
//     "question_id": 5
// }, {
//     "answer_id": 21,
//     "answer_text": "Never give up",
//     "question_id": 6
// }, {
//     "answer_id": 22,
//     "answer_text": "Keep on moving",
//     "question_id": 6
// }, {
//     "answer_id": 23,
//     "answer_text": "Trust Encouragement Reward Loyalty, Satisfaction",
//     "question_id": 6
// }, {
//     "answer_id": 24,
//     "answer_text": "Youre the best",
//     "question_id": 6
// }, {
//     "answer_id": 25,
//     "answer_text": "Team Individuality",
//     "question_id": 7
// }, {
//     "answer_id": 26,
//     "answer_text": "Trust Encouragement Reward Loyalty, Satisfaction",
//     "question_id": 7
// }, {
//     "answer_id": 27,
//     "answer_text": "Anything Nobby Burton says",
//     "question_id": 7
// }, {
//     "answer_id": 28,
//     "answer_text": "Dead Poets Society",
//     "question_id": 7
// }, {
//     "answer_id": 29,
//     "answer_text": "Mungo Jerry",
//     "question_id": 8
// }, {
//     "answer_id": 30,
//     "answer_text": "4 non-blondes",
//     "question_id": 8
// }, {
//     "answer_id": 31,
//     "answer_text": "Texas",
//     "question_id": 8
// }, {
//     "answer_id": 32,
//     "answer_text": "Foregone Conclusion",
//     "question_id": 8
// }, {
//     "answer_id": 33,
//     "answer_text": 19,
//     "question_id": 9
// }, {
//     "answer_id": 34,
//     "answer_text": 18,
//     "question_id": 9
// }, {
//     "answer_id": 35,
//     "answer_text": 20,
//     "question_id": 9
// }, {
//     "answer_id": 36,
//     "answer_text": 21,
//     "question_id": 9
// }, {
//     "answer_id": 37,
//     "answer_text": "Jelly",
//     "question_id": 10
// }, {
//     "answer_id": 38,
//     "answer_text": "Foxholes",
//     "question_id": 10
// }, {
//     "answer_id": 39,
//     "answer_text": "Mr Toad",
//     "question_id": 10
// }, {
//     "answer_id": 40,
//     "answer_text": "Benefits fraud",
//     "question_id": 10
// }, {
//     "answer_id": 41,
//     "answer_text": "Jamie",
//     "question_id": 11
// }, {
//     "answer_id": 42,
//     "answer_text": "Sheila from Accounts",
//     "question_id": 11
// }, {
//     "answer_id": 43,
//     "answer_text": "Trevor Cromwell",
//     "question_id": 11
// }, {
//     "answer_id": 44,
//     "answer_text": "Jeff Lamp",
//     "question_id": 11
// }, {
//     "answer_id": 45,
//     "answer_text": "The fire alarm test",
//     "question_id": 12
// }, {
//     "answer_id": 46,
//     "answer_text": "The Hunt for Davids successor",
//     "question_id": 12
// }, {
//     "answer_id": 47,
//     "answer_text": "Invetigation",
//     "question_id": 12
// }, {
//     "answer_id": 48,
//     "answer_text": "Investigation",
//     "question_id": 12
// }];

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