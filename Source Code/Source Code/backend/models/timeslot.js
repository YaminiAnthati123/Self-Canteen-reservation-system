// Timeslot Schema and Model
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const timeSlotSchema = new Schema({
    startTime: {
        type: String, // Store in "HH:mm" format
        required: true
    },
    endTime: {
        type: String, // Store in "HH:mm" format
        required: true
    },
    isPeakHour: {
        type: Boolean, // true for peak hours, false for off-peak hours
        required: true
    },
    discountPercentage: {
        type: Number, // Percentage discount for off-peak hours, 0 for peak hours
        required: true,
        default: 0,
        validate: {
            validator: function (v) {
                return v >= 0 && v <= 100;
            },
            message: props => `${props.value} is not a valid discount percentage!`
        }
    }
}, { timestamps: true });


const timeslots = mongoose.model("timeslots", timeSlotSchema);


module.exports = timeslots;
