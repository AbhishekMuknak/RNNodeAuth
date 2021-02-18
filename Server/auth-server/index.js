const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const { mongoUrl } = require("./keys");

const PORT = 3000;

require("./models/User");

const requireToken = require("./middleware/requireToken");
const authRoutes = require("./routes/authRoutes"); //alway import route after importing modal
app.use(bodyParser.json());
app.use(authRoutes);

mongoose.connect(mongoUrl, {
  useNewUrlParser: true, // removing warning optional
  useUnifiedTopology: true, // removing warning optional
});
mongoose.connection.on("connected", () => {
  console.log("connected to mongo");
});
mongoose.connection.on("error", (err) => {
  console.log("this is error: ", err);
});

/*********************
 * this code will execute after checking middlewarw
 * this is a default route which show email and password
 * because you have token
 */
app.get("/", requireToken, (req, res) => {
  res.send({email: req.body.email});
});

app.listen(PORT, () => {
  console.log("server running" + PORT);
});
