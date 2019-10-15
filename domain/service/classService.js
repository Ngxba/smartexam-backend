
var newClass = require("../model/newClass");

const classService = {
 
  getClass: async classCode => {
    let result = await newClass.findOne({ classCode: classCode });
    if (result) {
      return result;
    } else {
      throw new Error("error/class_not_found");
    }
  },

  getOwnedClass : async userEmail => {
    let result = await newClass.find({ listOfTeacher : userEmail })
    if (result) {
      return result;
    } else {
      throw new Error("error/class_not_found");
    }
  },

  getEnrolledClass : async userEmail => {
    let result = await newClass.find({ listOfStudent : userEmail })
    if (result) {
      return result;
    } else {
      throw new Error("error/class_not_found");
    }
  },

  createNewClass: async (classCode, listOfStudent, teacher) => {
    const result = await newClass.findOne({ classCode: classCode });
    console.log(newClass({classCode: classCode,
      listOfStudent: listOfStudent,
      listOfTeacher: teacher}))
    if (!result) {
      const createdClass = newClass({
        classCode: classCode,
        listOfStudent: listOfStudent,
        listOfTeacher: teacher
      });
      await createdClass.save();
      return createdClass;
    } else {
      throw new Error("Class_EXISTED");
    }
  },


  addStudent: async (classCode, student) => {
    const result = await newClass.updateOne(
      { classCode: classCode },
      {
        $push: {
          listOfStudent: student
        }
      }
    );
    return result;
    // .nModified === 1;
  },
  addTeacher: async (classCode, teacher) => {
    const result = await newClass.updateOne(
      { classCode: classCode },
      {
        $push: {
          listOfTeacher: teacher
        }
      }
    );
    return result.nModified === 1;
  }
};

module.exports = classService;
