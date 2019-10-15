const mongoose = require("../../infrastructure/db");
var Schema = mongoose.Schema;
const crypto = require("crypto")
const jwt = require("jsonwebtoken")

var userSchema = new Schema({
  email: String,
  name : String,
  address1: String,
  address2: String,
  city: String,
  state: String,
  zip: String,
  roll : String,
  hash : String,
  salt : String
});

var question = new Schema({
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
  modelEssayQuestionAnswer: String,
  userAnswer : String
});

var takenExam = new Schema({
  grade : String,
  quest : [question],
})

var user = new Schema({
  email: String,
  password : String,
  userInfo : userSchema, // with out email,password
  listClass : [String], // luu id cua class
  takenExam : takenExam , //mot cai schema ve takenexam
})

userSchema.methods.validPassword = function(password){
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, "sha512").toString("hex")
  return this.hash === hash
}

userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, "sha512").toString("hex")
}

userSchema.methods.generateJWT = function(){
  const now = new Date();
  const expirationDate = new Date();
  expirationDate.setDate(now.getDate() + 1)
  
  return jwt.sign({
    email : this.email,
    exp : parseInt(expirationDate.getTime() / 1000, 10)
  }, process.env.JWT_SECRET)
}
const User = mongoose.model("User", userSchema);

module.exports = User;
