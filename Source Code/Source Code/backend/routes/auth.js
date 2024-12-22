// Authentication Routes
const router = require("express").Router();

const studentSignup = require("../controllers/signup");
const verifyAccess = require("../middleware/verifyAccess");
const studentLogin = require("../controllers/login");
const staffLogin = require("../controllers/staffLogin");
const studentPasswordReset = require("../controllers/resetPassword");
const fetchStudentDetails = require("../controllers/fetchStudentDetails");
const fetchStaffDetails = require("../controllers/fetchStaffDetails");

// METHOD: POST
// NAME: Student Signup
router.post("/student/signup", studentSignup);

// METHOD: POST
// NAME: Student Login
router.post("/student/login", studentLogin);

// METHOD: PUT
// NAME: Student Password Reset
router.put("/student/passwordReset", verifyAccess, studentPasswordReset);

// METHOD: GET
// NAME: Fetching Students Profile Data
router.get("/student/fetch", verifyAccess, fetchStudentDetails);

// METHOD: POST
// NAME: Staff Login
router.post("/staff/login", staffLogin);

// METHOD: GET
// NAME: Fetching Staff Profile Data
router.get("/staff/fetch", verifyAccess, fetchStaffDetails);


module.exports = router;
