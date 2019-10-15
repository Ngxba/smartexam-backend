const mongoose = require("../../infrastructure/db");
var Schema = mongoose.Schema;

var questionSchema = new Schema({
  model: String,
  QuizQuestionContent: String,
  Answers: [
    {
      order: Number,
      value: String
    }
  ],
  rightAnswer: String,
  essayQuestionContent: String,
  modelEssayQuestionAnswer: String
});


var classSchema = new Schema({
  classCode: String,
  poolQuest: [questionSchema],
  listOfStudent: [String],
  listOfTeacher: [String]
});

const Class = mongoose.model("newclass", classSchema);

module.exports = Class;
