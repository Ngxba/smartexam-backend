const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../domain/model/user");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    (email, password, done) => {
      User.findOne({ email }).then(user => {
        if (!user || !user.validPassword(password)) {
          return done(null, false, {
            err: "email or password is invalid"
          });
        }
        return done(null, user);
      });
    }
  )
);
