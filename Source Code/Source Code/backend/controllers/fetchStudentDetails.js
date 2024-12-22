// Fetch Student Details 
const students = require("../models/student");
const { isValidObjectId } = require("mongoose");

const fetchStudentDetails = async (req, res) => {
    if (!req.user || !isValidObjectId(req.user._id)) {
        return res.status(400).json({
            message: "Unable to find user please logout and try again!"
        });
    }

    try {
        const result = await students.findById({ _id: req.user._id });

        if (!result) {
            throw new Error("Cannot find user please, logout and try again!");
        }

        res.status(200).json({
            message: "everything is upto date..",
            user: {
                _id: result._id,
                studentId: result.studentId,
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

module.exports = fetchStudentDetails;

