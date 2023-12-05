// Configuring Express.JS
const express = require("express");
const app = express();
const cors = require("cors");
const port = 3582;

app.use(cors());
app.use(express.json());

// Configuring Mongoose
const mongoose = require("mongoose");

// Connecting to MongoBD
const url = `mongodb+srv://abydev2012:SQ2UTyzih6UgMK0W@cluster0.lsr6h4m.mongodb.net/School`;
const connectDB = async () => {
  try {
    await mongoose.connect(url);
    console.log(
      "Succesfully connected to your Database: " + mongoose.connection.name
    );
  } catch (error) {
    console.error(error);
  }
};

//Creating Schema
const Students = new mongoose.Schema({
  studentName: String,
  class: Number,
  roll: Number,
  admited: {
    type: Date,
    default: Date.now,
  },
});

//Creating Model
const Student = mongoose.model("students", Students);

// First get method
app.get("/", (req, res) => {
  res.send("Welcome!");
});

// Adding students
app.post("/addStudent", async (req, res) => {
  try {
    const userData = req.body;
    console.log(userData);
    const newStudent = new Student({
      studentName: userData.studentName,
      class: userData.class,
      roll: userData.roll,
    });
    await newStudent.save();
    res.send({
      message: "Succesfully sent Post request",
    });
  } catch (error) {
    console.log(error);
  }
});

// Getting all students
app.get("/students", async (req, res) => {
  try {
    const allStudents = await Student.find();
    res.send(allStudents);
  } catch (error) {
    res.send(error);
  }
});

// Finding students by their respective ID
app.get("/students/:id", async (req, res) => {
  try {
    const ID = req.params.id;
    const student = await Student.findById(ID);
    res.send(student);
  } catch (error) {
    console.log(error);
  }
});

// Deleting students
app.delete("/delete/:id", async (req, res) => {
  try {
    const student = req.params.id;
    const deleteStudent = await Student.findByIdAndDelete(student);
    res.send({ message: "Successful" });
  } catch (error) {
    res.send(error);
  }
});

// Updating student information
app.put("/update/:id", async (req, res) => {
  try {
    const updatedInfo = req.body;
    const id = req.params.id;
    const updateData = await Student.findByIdAndUpdate(id, updatedInfo)
    res.send({message: 'Successful!'})
  } catch (error) {
    res.send(error);
  }
});

// Listening our App
app.listen(port, async () => {
  console.log(`Your app is listening on port: ${port}`);
  await connectDB();
});
