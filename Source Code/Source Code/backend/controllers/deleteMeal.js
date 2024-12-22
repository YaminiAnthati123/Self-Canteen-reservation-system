// Staff member can delete a meal
const { isValidObjectId } = require("mongoose");
const meals = require("../models/meal");


const deleteMeal = async (req, res) => {
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
        const result = await meals.findByIdAndUpdate({ _id: req.body.mealId }, { quantity: 0 });

        if (!result) {
            throw new Error("Operation failed!")
        }

        res.status(200).json({
            message: "Meal is made out of stock, it needs to be removed manually."
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


module.exports = deleteMeal;
