const jwt = require("jsonwebtoken");

const constants = require("./../config/constant.js");

const verifyAccessToken = (req, res, next) => {
  let token = req.headers?.authorization?.split(" ")[1] || null;
  if (token !== null) {
    jwt.verify(token, process.env.JWTSECRET, (err, user) => {
      if (err) {
        return res.status(401).send("invalid token");
      } else {
        next();
      }
    });
  } else {
    return res.status(401).send("unauthorised");
  }
};


const verifyRefreshToken = (req, res, next) => {
  let token;
  console.log(req.cookies)
  if (req.cookies) {
    token = req.cookies.refreshToken;
    jwt.verify(token, constants.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        if (err.message === "jwt expired") {
          return res.status(401).send("Session Expired");
        }
        return res.status(401).send();
      } else {
        delete user.iat;
        delete user.exp;
        req.auth = user;
        next();
      }
    });
  } else {
    return res.status(401).send("unauthorised " + req.cookies + " " );
  }
};

module.exports = {
  verifyAccessToken,
  verifyRefreshToken,

}
