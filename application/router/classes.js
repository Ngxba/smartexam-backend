var express = require("express");
var router = express.Router();
var classService = require("../../domain/service/classService");
var testService = require("../../domain/service/testService")

router.post("/createTest", async (req, res) => {
  const { classCode, title, description, listOfQuizQuest, listOfEssayQuest,  authedUser} = req.body;
  try {
    const newTest = await testService.createTest(
      classCode,
      title,
      description,
      listOfQuizQuest,
      listOfEssayQuest,
      authedUser
    );
    res.json(newTest);
  } catch (err) {
    res.status(400);
    res.json({
      err: err.message
    });
  }
});

router.get("/getTest", async (req, res) => {
  const classCode = req.query.q
  try {
    const testList = await testService.getTest(classCode)
    res.json(testList)
  } catch (err) {
    res.status(400)
    res.json({
      err: err.message
    })
  }
})

router.post("/deleteTest", async (req, res) => {
  const {testID} = req.body
  try {
    await testService.deleteTest(testID)
    res.json({
      success: true
    })
  } catch (err) {
    res.status(400)
    res.json({
      err: err.message
    })
  }
})

router.post("/addTakenTest", async (req, res) => {
  const {testID, studentEmail, studentName, quizScore, essayScore, quest} = req.body
  try {
    await testService.addTakenTest(testID, studentEmail, studentName, quizScore, essayScore, quest)
    res.json({
      success: true
    })
  } catch (err) {
    res.status(400)
    res.json({
      err: err.message
    })
  }
})

router.post("/getTakenTest", async (req, res) => {
  const {testID} = req.body
  try {
    let test = await testService.getTakenTest(testID)
    test = test.map(test=>test)
    res.json({
      test
    })
  } catch (err) {
    res.status(400)
    res.json({
      err: err.message
    })
  }
})

router.post("/markTakenTest", async (req, res) => {
  const {takenTestID, quizScore, essayScore, quest} = req.body
  try {
    let test = await testService.markTakenTest(takenTestID, quizScore, essayScore, quest)
    res.json({
      test
    })
  } catch (err) {
    res.status(400)
    res.json({
      err: err.message
    })
  }
})

router.post("/", async (req,res) => {
  const classCode = req.query.q
  try {
    const takenClass = await classService.getClass(classCode)
    res.json(takenClass)
  }
  catch(err){
    res.status(400);
    res.json({
      err : err.message
    })
  }
})

router.post("/getownedclasses", async (req,res) => {
  const userEmail = req.query.q
  const userRoll = req.body.roll
  try {
    if(userRoll === "Teacher"){
      const ownedClasses = await classService.getOwnedClass(userEmail)
      res.json(ownedClasses)
    }
    else if(userRoll === "Student"){
      const enrolledClass = await classService.getEnrolledClass(userEmail)
      res.json(enrolledClass)
    }
  }
  catch(err){
    res.status(400);
    res.json({
      err : err.message
    })
  }
})

router.post("/createnewclass", async (req,res)=>{
  const {classCode, listOfStudent, teacher} = req.body;
  try {
    const newClass = await classService.createNewClass(classCode,listOfStudent,teacher);
    res.json(newClass)
  } catch(err) {
    res.status(400);
    res.json({
      err : err.message
    })
  }
})

router.post("/adduser", async (req,res)=>{
  const {classCode, userEmail, roll} = req.body;
  try {
    let modifiedClass;
    if(roll ==="Teacher"){modifiedClass = await classService.addTeacher(classCode,userEmail)}
    else if ( roll === "Student"){modifiedClass = await classService.addStudent(classCode,userEmail)}
    res.json(modifiedClass)
  } catch(err) {
    res.status(400);
    res.json({
      err : err.message
    })
  }
})

module.exports = router;
