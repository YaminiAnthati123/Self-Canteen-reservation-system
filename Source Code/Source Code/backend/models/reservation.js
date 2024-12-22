// Reservation schema and model for mongodb
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reservationSchema = new Schema(
  {
    studentReferenceId: {
      type: mongoose.Schema.ObjectId,
      ref: "students",
      trim: true,
      required: true,
    },
    mealReferenceId: {
      type: mongoose.Schema.ObjectId,
      ref: "meals",
      trim: true,
      required: true
    },
    timeSlot: {
      type: Date,
      trim: true,
      required: true,
    },
    confirmationCode: {
      type: String,
      trim: true,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);


const reservations = mongoose.model("reservations", reservationSchema);

module.exports = reservations;
