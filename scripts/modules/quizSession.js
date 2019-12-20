module.exports = function (account_taking_id, session_id, quiz_id, start_date, score, questions) {
    this.account_taking_id = account_taking_id;
    this.session_id = session_id;
    this.quiz_id = quiz_id;
    this.start_date = start_date;
    this.score = score;
    this.questions = questions;
}
