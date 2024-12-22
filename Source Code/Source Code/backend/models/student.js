// student schema and model for mongodb
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { isNumeric } = require("validator");

const studentSchema = new Schema({
     studentId: {
          type: String,
          trim: true,
          lowercase: true,
          validate: [isNumeric, "invalid student ID"],
          maxlength: [7, "student ID is too long"],
          minlength: [7, "student ID is too short"],
          required: [true, "student ID is required"],
     },
     fullname: {
          type: String,
          trim: true,
          lowercase: true,
          maxlength: [32, "name is too long"],
          minlength: [4, "name is too short"],
          required: [true, "name is required"],
     },
     password: {
          type: String,
          trim: true,
          minlength: [8, "password is too short"],
          required: [true, "password is required"],
     },
}, { timestamps: true },);

const students = mongoose.model("students", studentSchema);

module.exports = students;
