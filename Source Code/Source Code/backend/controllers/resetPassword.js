// Student Password Reset
const students = require("../models/student");
const { isValidObjectId } = require("mongoose");
const bcrypt = require("bcryptjs");

// REQUIRED: AuthToken, NewPassword
const studentPasswordReset = async (req,  res) => {
    if (!req.body.newPassword) {
        return res.status(400).json({
            message: "New Password is required!"
        });
    }

    // verifying user id
    if (!isValidObjectId(req.user._id)) {
        return res.status(400).json({
            message: "Operation Failed, Credentials failed validation!"
        });
    }

    try {
        const result = await students.findByIdAndUpdate({ _id: req.user._id }, {
            password: bcrypt.hashSync(req.body.newPassword, 10)
        });

        if (!result) {
            throw new Error("Operation failed, Please try again later!");
        }

        res.status(200).json({
            message: "Password updated. Pleasde logout and login again!"
        });
    } catch(e) {
        console.log(e);


        res.status(500).json({
            message: "Something went wrong!"
        });
    }
}


module.exports = studentPasswordReset;

