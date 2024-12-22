// canteen staff schema and model for mongodb
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const canteenStaffSchema = new Schema(
     {
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
     },
     { timestamps: true },
);

const canteenStaff = mongoose.model("canteenStaff", canteenStaffSchema);

module.exports = canteenStaff;
