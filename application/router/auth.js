var express = require("express");
var router = express.Router();
var authService = require("../../domain/service/authService");
var auth = require("../../config/auth")
var passport = require("passport")



router.post("/login",auth.optional, async (req, res, next) => {
  const {email, password } = req.body;
  if(!email || !password){
      // return err
  }
  return passport.authenticate("local", {session : false}, (err, user, next)=> {
    if(err){
      return(next(err))
    }
    if(user){
      return res.json({
        user : user,
        token : user.generateJWT()})
    }
    else {
      return res.json({
        user : null
      });
    }
  })(req, res, next);
});

router.post("/getuser", async (req,res) => {
  const {userEmail, roll} = req.body;
  try {
    const user = await authService.findUser(userEmail, roll)
    res.json(user);
  } catch (err) {
    res.status(400);
    res.json({
      user: err.message
    });
  }
})

router.post("/getalluserwithroll", async (req,res) => {
  const {roll} = req.body;
  try {
    const user = await authService.findMany(roll)
    res.json(user);
  } catch (err) {
    res.status(400);
    res.json({
      user: err.message
    });
  }
})


router.post("/register",auth.optional, async (req, res) => {
  const {
    email,
    password,
    name,
    address1,
    address2,
    city,
    state,
    zip,
    agree,
    roll
  } = req.body;
  try {
    const user = await authService.signUp(
      email,
      password,
      name,
      address1,
      address2,
      city,
      state,
      zip,
      agree,
      roll
    );
    res.json({
      token : user.generateJWT()
    });
  } catch (err) {
    res.status(400);
    res.json({
      email: err.message
    });
  }
});

router.get("/me", auth.require, async(req,res) => {
  
  const user = await authService.find(req.payload.email)
  res.json({
    user : user
  })
})

router.post("/logout", (req, res) => {});

module.exports = router;
