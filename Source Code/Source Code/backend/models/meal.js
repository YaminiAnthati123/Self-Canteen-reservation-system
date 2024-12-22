// meal schema and model for mongodb
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const mealSchema = new Schema(
     {
          mealName: {
               type: String,
               trim: true,
               lowercase: true,
               maxlength: [120, "meal name is too long"],
               minlength: [4, "meal name is too short"],
               required: [true, "meal name is required"],
          },
          description: {
               type: String,
               trim: true,
               lowercase: true,
               maxlength: [600, "meal description is too long"],
               minlength: [10, "meal description is too short"],
               required: [true, "meal description is required"],
          },
          quantity: {
               type: Number,
               max: [100, "meal quantity is too high"],
               min: [5, "meal quantity is too short"],
               required: [true, "quantity is required"],
          },
          peakHoursRate: {
               type: Number,
               max: [40.0, "meal rate is too high"],
               min: [1.0, "meal rate is too low"],
               required: [true, "meal rate is required"],
          },
          offPeakHoursRate: {
               type: Number,
               max: [40.0, "meal rate is too high"],
               min: [1.0, "meal rate is too low"],
               required: [true, "meal rate is required"],
          },
     },
     { timestamps: true },
);

const meals = mongoose.model("meals", mealSchema);

module.exports = meals;
