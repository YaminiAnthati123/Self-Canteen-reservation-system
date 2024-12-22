// Canteen Staff Login
const canteenStaff = require("../models/canteenStaff");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// REQUIRED: Password
const staffLogin = async (req, res) => {
    if (!req.body.password) {
        return res.status(400).json({
            message: "Password is required!"
        });
    }

    try {
        const users = await canteenStaff.find();

        if (!users || users.length < 1) {
            throw new Error("no account found!");
        }

        const user = users[0];

        // comparing the passwords
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            throw new Error("incorrect password")
        }

        // sign jwt 
        const token = jwt.sign({
            _id: user._id,
            fullname: user.fullname,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({
            message: "Logged-in..",
            token: token,
            user: {
                _id: user._id,
                fullname: user.fullname,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
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


module.exports = staffLogin;
