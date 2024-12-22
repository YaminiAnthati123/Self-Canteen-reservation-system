// student signup controller
const students = require("../models/student");
const bcrypt = require("bcryptjs");

// REQUIRED: StudentID, Password, Full Name
const studentSignup = async (req, res) => {
    if (!req.body.studentID || !req.body.fullName || !req.body.password) {
        return res.status(400).json({
            message: "missing required fields!"
        });
    }

    try {
        const newStudent = await students.create({
            studentId: req.body.studentID,
            fullname: req.body.fullName,
            password: bcrypt.hashSync(req.body.password, 10)
        });

        if (!newStudent) {
            throw new Error("Operation Failed Please Try Again Later!");
        }

        res.status(200).json({
            message: "Welcome to Canteen Reservation System"
        });
    } catch(e) {

        if (e.code === 11000) {
            return res.status(403).json({
                message: "Account already exists!",
            });
        }

        if (e.errors.studentId) {
            return res.status(400).json({
                message: e.errors.studentId.message,
            });
        }

        if (e.errors.fullname) {
            return res.status(400).json({
                message: e.errors.fullname.message,
            });
        }

        if (e.errors.password) {
            return res.status(400).json({
                message: e.errors.password.message,
            });
        }

        return res.status(500).json({
            message: "Something went wrong!"
        });
    }
}


module.exports = studentSignup;
