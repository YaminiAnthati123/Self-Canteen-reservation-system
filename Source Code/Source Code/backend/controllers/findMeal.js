// Find a Specific Meal
const { isValidObjectId } = require("mongoose");
const meals = require("../models/meal");


const findMeal = async (req, res) => {
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
        const result = await meals.findById({ _id: req.body.mealId });

        if (!result) {
            throw new Error("Meal Not Found!")
        }

        res.status(200).json({
            message: "Loading Meal..",
            meal: result
        });
    } catch (e) {
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


module.exports = findMeal;

