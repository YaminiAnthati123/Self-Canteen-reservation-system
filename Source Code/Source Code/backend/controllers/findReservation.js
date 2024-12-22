// Find One Reservation with ID
const reservations = require("../models/reservation");
const { isValidObjectId } = require("mongoose");

const findReservation = async (req, res) => {
    if (!req.user || !isValidObjectId(req.user._id)) {
        return res.status(400).json({
            message: "Unable to find user please logout and try again!"
        });
    }

    if (!req.body.reservationId) {
        return res.status(400).json({
            message: "Reservation Id is required"
        });
    }

    if (!isValidObjectId(req.body.reservationId)) {
        return res.status(400).json({
            message: "Reservation Id is not valid!"
        });
    }

    try {
        const result = await reservations.findById({ _id: req.body.reservationId }).populate({
            path: "mealReferenceId",
            select: "mealName description"
        });

        if (!result) {
            throw new Error("No Reservation Found!");
        }

        res.status(200).json({
            message: "loading reservation..",
            reservation: result
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


module.exports = findReservation;
