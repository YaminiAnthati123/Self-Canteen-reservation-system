// Fetch All Meals
const meals = require("../models/meal");


const fetchMeals = async (req, res) => {
    try {
        const records = await meals.find();

        if (!records) {
            throw new Error("No Records Found!");
        }

        res.status(200).json({
            message: "loading meals..",
            data: records
        });
    } catch(e) {
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


module.exports = fetchMeals;

