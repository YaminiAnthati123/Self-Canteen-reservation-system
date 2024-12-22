// Fetches All Reservations for Staff
const reservations = require("../models/reservation");
const { isValidObjectId } = require("mongoose");

const fetchReservations = async (req, res) => {
    if (!req.user || !isValidObjectId(req.user._id)) {
        return res.status(400).json({
            message: "Unable to find user please logout and try again!"
        });
    }

    try {
        const result = await reservations.find().populate({
            path: "mealReferenceId",
            select: "mealName description"
        });

        if (!result) {
            throw new Error("Reservations not found!");
        }

        res.status(200).json({
            message: "loading reservations..",
            data: result
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

module.exports = fetchReservations;
