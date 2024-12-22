// Fetch Student Details 
const canteenStaff = require("../models/canteenStaff");
const { isValidObjectId } = require("mongoose");

const fetchStaffDetails = async (req, res) => {
    if (!req.user || !isValidObjectId(req.user._id)) {
        return res.status(400).json({
            message: "Unable to find user please logout and try again!"
        });
    }

    try {
        const result = await canteenStaff.findById({ _id: req.user._id });

        if (!result) {
            throw new Error("Cannot find user please, logout and try again!");
        }

        res.status(200).json({
            message: "everything is upto date..",
            user: {
                _id: result._id,
                fullname: result.fullname,
                createdAt: result.createdAt,
                updatedAt: result.updatedAt
            }
        });
    } catch (e) {
        console.log(e);

        res.status(500).json({
            message: "something went wrong!"
        });
    }
}

module.exports = fetchStaffDetails;

