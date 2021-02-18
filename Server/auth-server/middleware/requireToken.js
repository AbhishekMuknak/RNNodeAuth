/**************************************
 * @middleware is used for modifing incoming request
 * and
 */

const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const { jwtKey } = require("../keys");

module.exports = (res, req, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send({ error: "you must be logged in" });
  }
  const token = authorization.replace("Bearer ", ""); //to replace Bearer with null to get only token
  //verify token is correct or not
  jwt.verify(token, jwtKey, async (err, payload) => {
    if (err) {
      return res.status(401).send({ error: "wrong token" });
    }
    const { userId } = payload; //retrive userId from token
    const user = await User.findById(userId); //to find a user is available or not
    req.user = user;
    next();
  });
};
