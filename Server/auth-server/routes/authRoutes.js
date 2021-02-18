/****
 * @method One
 */
// module.exports=(app)=>{
//     app.post("/", (req, res) => {
//   console.log(req.body);
//   res.send("hello");
// });app.post
// }

/****
 * @method two
 */
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { jwtKey } = require("../keys");
const router = express.Router();
const User = mongoose.model("User"); //use same name as use in export of User.js model

router.post("/signup", async (req, res) => {
  const { email, password } = req.body; //destructuring
  try {
    const user = new User({ email, password });
    await user.save();
    const token = jwt.sign({ userId: user._id }, jwtKey); //user._id is from mongodb
    res.send({ token: token });
  } catch (err) {
    return res.status(422).send(err.message); //422 for invalid values
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(422)
      .send({ error: "You must provide a email or password" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(422)
      .send({ error: "You must provide a email or password" });
  }
  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, jwtKey); //user._id is from mongodb
    res.send({ token: token });
  } catch (error) {
    return res
      .status(422)
      .send({ error: "You must provide a email or password" });
  }
});

module.exports = router;
