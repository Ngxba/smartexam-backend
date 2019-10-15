const jwt = require("express-jwt");

const getToken = req => {
  const {
    headers: { authorization }
  } = req;
  if (authorization && authorization.split(" ")[0] === "Bearer") {
    return authorization.split(" ")[1];
  } else {
    return null;
  }
};

const auth = {
  require: jwt({
    secret: process.env.JWT_SECRET,
    userProperty: "payload",
    getToken: getToken  
  }),
  optional: jwt({
    secret: process.env.JWT_SECRET,
    userProperty: "payload",
    getToken: getToken,
    credentialsRequired: false
  })
};

module.exports = auth;
