const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const todoShema = require("./modals/todoShema");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());
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
//create task api
app.post("/addtodo", async (req, res) => {
  try {
    let { name, age } = req.body;
    let todo = new todoShema({
      name,
      age,
    });
    await todo.save();

    return res
      .status(201)
      .json({ success: true, message: "todo created successfull", data: todo });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: err.nessage || err });
  }
});

// getall task api
app.get("/getalltodo", async (req, res) => {
  try {
    let alltodo = await todoShema.find({});
    return res.status(200).json({
      success: true,
      message: "todo fetch successfull",
      data: alltodo,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: err.nessage || err });
  }
});

// single task api
app.get("/gettask/:name", async (req, res) => {
  try {
    let { name } = req.params;
    let singletask = await todoShema.findOne({ name });
    return res.status(200).json({
      success: true,
      message: "single task fetch successfull",
      data: singletask,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: err.nessage || err });
  }
});

// todo update api
app.patch("/edittask/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let { name, age } = req.body;

    let edittask = await todoShema.findOneAndUpdate(
      { _id: id },
      { name: name, age: age },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "updated data successful",
      data: edittask,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || error,
    });
  }
});

// deleted data api
app.delete("/deletetask/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let deletedtask = await todoShema.findOneAndDelete(
      { _id: id },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Deleted data successfully",
      data: deletedtask,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || error,
    });
  }
});

// route end

app.listen(process.env.PORT, () => {
  console.log(`server is running port number ${process.env.PORT}`);
});
