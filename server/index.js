const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
require("dotenv").config();

// database connected start
mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("database connected successfull");
  })
  .catch((err) => {
    console.log(err.message || err);
  });
// database connected end

// route start

app.post("/addtodo", (req, res) => {
  return res
    .status(201)
    .json({ success: true, message: "todo created successfull" });
});
app.get("/gettodo", (req, res) => {
  return res
    .status(200)
    .json({ success: true, message: "todo fetch successfull" });
});
// route end

app.listen(process.env.PORT, () => {
  console.log(`server is running port number ${process.env.PORT}`);
});
