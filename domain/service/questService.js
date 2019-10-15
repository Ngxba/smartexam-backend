var Question = require("../model/question");

const questService = {
  getQuest: () => {
    return Question.find({});
  },
  pushQuiz: async (type, model, QuizQuestionContent, Answers, rightAnswer) => {
    const result = await Question.findOne({
      type : type,
      model: model,
      QuizQuestionContent: QuizQuestionContent
    });
    if (!result) {
      const newQuest = Question({
        type,
        model,
        QuizQuestionContent,
        Answers,
        rightAnswer
      });
      await newQuest.save();
      return newQuest;
    } else {
      throw new Error("QUESTION_QUIZ_EXISTED");
    }
  },
  pushEssayQuest: async (
    type,
    model,
    essayQuestionContent,
    modelEssayQuestionAnswer
  ) => {
    let result = await Question.findOne({
      type : type,
      model: model,
      essayQuestionContent: essayQuestionContent
    });
    if (!result) {
      const newQuest = Question({
        type,
        model,
        essayQuestionContent,
        modelEssayQuestionAnswer
      });
      await newQuest.save();
      return newQuest;
    } else {
      throw new Error("QUESTION_ESSAY_EXISTED");
    }
  },
  delQuest: async questIDs => {
    await Question.deleteMany({ _id: { $in: questIDs } });
  },
  editEssay: async (
    questID,
    model,
    essayQuestionContent,
    modelEssayQuestionAnswer
  ) => {
    let result = await Question.findOne({
      model,
      essayQuestionContent
    });
    if (result === null || result._id.toString() === questID) {
      const essay = await Question.findById(questID);
      essay.essayQuestionContent = essayQuestionContent;
      essay.modelEssayQuestionAnswer = modelEssayQuestionAnswer;
      await essay.save();
    } else {
      throw new Error("QUESTION_ESSAY_EXISTED");
    }
  },
  editQuiz: async (
    questID,
    model,
    QuizQuestionContent,
    Answers,
    rightAnswer
  ) => {
    let result = await Question.findOne({
      model,
      QuizQuestionContent
    });
    if (result === null || result._id.toString() === questID) {
      const quiz = await Question.findById(questID);
      quiz.QuizQuestionContent = QuizQuestionContent;
      quiz.Answers = Answers;
      quiz.rightAnswer = rightAnswer;
      await quiz.save();
    } else {
      throw new Error("Question_QUIZ_EXISTED");
    }
  },
  getListQuest: async (listOfQuizQuest, listOfEssayQuest) => {
    const quiz = await Question.find({ _id: {$in: listOfQuizQuest}})
    const essay = await Question.find({ _id: {$in: listOfEssayQuest}})
    if (quiz && essay) {
      const listQuiz = quiz.map(quiz => quiz)
      const listEssay = essay.map(essay => essay)
      return [listQuiz, listEssay]
    } else {
      throw new Error("NO QUESTION FOUND")
    }
  }
};

module.exports = questService;
