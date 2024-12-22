// API Routes
const router = require("express").Router();

const verifyAccess = require("../middleware/verifyAccess");
const createMeal = require("../controllers/createMeal");
const fetchMeals = require("../controllers/fetchMeals");
const deleteMeal = require("../controllers/deleteMeal");
const findMeal = require("../controllers/findMeal");
const reserveMeal = require("../controllers/reserveMeal");
const fetchReservations = require("../controllers/fetchReservations");
const findReservation = require("../controllers/findReservation");


// METHOD: POST
// NAME: Create New Meal 
router.post("/staff/createMeal", verifyAccess, createMeal);

// METHOD: GET
// NAME: Fetch All Meals
router.get("/fetchMeals", verifyAccess, fetchMeals);

// METHOD: DELETE
// NAME: Delete Meal
router.delete("/staff/deleteMeal", verifyAccess, deleteMeal);

// METHOD: GET
// NAME: Find a Single Meal with ID
router.get("/findMeal", verifyAccess, findMeal);

// METHOD: POST
// NAME: Meal Reservation
router.post("/student/mealReservation", verifyAccess, reserveMeal);

// METHOD: GET
// NAME: Fetch Reservations
router.get("/staff/fetchReservations", verifyAccess, fetchReservations);


// METHOD: GET
// NAME: Find Single Reservation
router.get("/student/findReservation", verifyAccess, findReservation);


module.exports = router;
