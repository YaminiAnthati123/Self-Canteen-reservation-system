// Student Login Controller
const students = require("../models/student");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


// REQUIRED: StudentID, Password
const studentLogin = async (req, res) => {
    if (!req.body.studentID || !req.body.password) {
        return res.status(400).json({
            message: "missing required fields!"
        });
    }

    try {
        // looking up for student with given id
        const studentFound = await students.findOne({ studentId: req.body.studentID });

        if (!studentFound) {
            throw new Error("Account doesn't exists");
        }

        // comparing passwords
        if (!bcrypt.compareSync(req.body.password, studentFound.password)) {
            throw new Error("incorrect password");
        }

        // sign jwt 
        const token = jwt.sign({
            _id: studentFound._id,
            studentId: studentFound.studentId,
            fullname: studentFound.fullname,
            createdAt: studentFound.createdAt,
            updatedAt: studentFound.updatedAt
        }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({
            message: "Logged-in..",
            token: token,
            user: {
                _id: studentFound._id,
                studentId: studentFound.studentId,
                fullname: studentFound.fullname,
                createdAt: studentFound.createdAt,
                updatedAt: studentFound.updatedAt
            }
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


module.exports = studentLogin;
