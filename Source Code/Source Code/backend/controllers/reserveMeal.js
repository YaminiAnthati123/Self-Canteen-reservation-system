// Meal Reservation
const crypto = require("crypto");
const { isValidObjectId } = require("mongoose");
const students = require("../models/student");
const meals = require("../models/meal");
const reservations = require("../models/reservation");

function generateSixDigitCode() {
    // Generate random bytes and convert them to an integer
    const code = crypto.randomInt(100000, 1000000); // 6-digit range: 100000 to 999999
    return code;
}

const reserveMeal = async (req, res) => {
    console.log(req.user);
    if (!req.user || !isValidObjectId(req.user._id)) {
        return res.status(400).json({
            message: "Unable to find user please logout and try again!"
        });
    }

    if (!req.body.mealId) {
        return res.status(400).json({
            message: "Meal Id is required!"
        });
    }

    if (!isValidObjectId(req.body.mealId)) {
        return res.status(400).json({
            message: "Meal Id is not valid!"
        });
    }

    try {
        const foundStudent = await students.findById({ _id: req.user._id });

        if (!foundStudent) {
            throw new Error("unable to verify user id");
        }

        const foundMeal = await meals.findById({ _id: req.body.mealId });

        if (!foundMeal) {
            throw new Error("unable to verify meal id");
        }

        // check if meal is enough
        if (foundMeal.quantity < 1) {
            throw new Error("Sorry, we ran out!");
        }

        // estimate which hours will apply
        let amountToApply = 0;

        const timeSlotDate = new Date(req.body.timeslot); // Parse timeslot to Date object
        const hour = timeSlotDate.getUTCHours(); // Extract hour in UTC

        if (hour >= 9 && hour < 17) {
            // It's peak hours
            amountToApply = foundMeal.peakHoursRate;
        } else {
            // It's off-peak hours
            amountToApply = foundMeal.offPeakHoursRate;
        }

        // all verified now we can create reservation with timeslot
        const sixDigitCode = generateSixDigitCode();

        const reservationResult = await reservations.create({
            studentReferenceId: foundStudent._id,
            mealReferenceId: foundMeal._id,
            timeSlot: req.body.timeslot,
            amount: amountToApply,
            confirmationCode: sixDigitCode
        });

        if (!reservationResult) {
            throw new Error("Unable to create reservation..");
        }

        // update quantity
        const updatedMealResult = await meals.findByIdAndUpdate({ _id: foundMeal._id }, { quantity: foundMeal.quantity-1 });

        if (!updatedMealResult) {
            throw new Error("Operation Failed!!");
        }

        res.status(200).json({
            message: "Reservation confirmed..",
            confirmationCode: reservationResult.confirmationCode
        });
    } catch (e) {
        console.log(e);
        if (e.code === 11000) {
            return res.status(403).json({
                message: "You've already booked a meal for today!"
            });
        }
        
        if (e.message) {
            return res.status(403).json({
                message: e.message
            });
        } else {
            res.status(500).json({
                message: "Something went wrong!"
            });
        }
    }
}


module.exports = reserveMeal;

