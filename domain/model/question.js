const mongoose = require("../../infrastructure/db");
var Schema = mongoose.Schema;

var questionSchema = new Schema({
  type : String,
  model: String,
  QuizQuestionContent: String,
  Answers: [
    {
      order: Number,
      value: String
    }
  ],
  rightAnswer:String,
  essayQuestionContent: String,
  modelEssayQuestionAnswer: String
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
