const mongoose = require("../../infrastructure/db");
var Schema = mongoose.Schema;

var authedUser = new Schema({
  userName: String,
  userEmail: String,
  roll: String
});
var testSchema = new Schema({
  classCode: String,
  title: String,
  description: String,
  listOfQuizQuest: [String],
  listOfEssayQuest: [String],
  authedUser: authedUser
});


const Test = mongoose.model("Test", testSchema);

module.exports = Test;
