// Create New Meal 
const { isValidObjectId } = require("mongoose");
const meals = require("../models/meal");


// Create New Meal
const createMeal = async (req, res) => {
    // verifying user id
    if (!isValidObjectId(req.user._id)) {
        return res.status(400).json({
            message: "Operation Failed, Credentials failed validation!"
        });
    }

    try {
        const result = await meals.create({
            mealName: req.body.mealName,
            description: req.body.description,
            quantity: req.body.quantity,
            peakHoursRate: req.body.peakHoursRate,
            offPeakHoursRate: req.body.offPeakHoursRate
        });

        if (!result) {
            throw new Error("Failed to create new meal record..");
        }

        res.status(200).json({
            message: "Meal record created.."
        });
    } catch (e) {
        if (e.code === 11000) {
            return res.status(402).json({
                message: "Meal name is already in use!"
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


module.exports = createMeal;
