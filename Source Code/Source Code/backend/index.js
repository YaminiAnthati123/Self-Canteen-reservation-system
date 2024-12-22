// root of the application
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// Canteen Staff Model
const students = require("./models/student");
const canteenStaff = require("./models/canteenStaff");

// Auth Routes
const authRoutes = require("./routes/auth");
const apiRoutes = require("./routes/api");

// creating express app instance
const app = express();

// express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors("*"));
app.use(morgan("dev"));
app.use(helmet());

// creates a default account for canteen staff member to use
// if it doesn't exist
(async function() {
     try {
          const accounts = await canteenStaff.find();

          if (!accounts || accounts.length < 1) {
               const newAccount = await canteenStaff.create({
                    fullname: process.env.STAFF_ACC_USERNAME,
                    password: bcrypt.hashSync(process.env.STAFF_ACC_PASSWORD, 10)
               });

               // failed to create new staff account
               if (!newAccount) {
                    throw new Error("Failed to create new staff account..")
               }

               // success
               console.log("New Staff Account Created..");
          } else {
               console.log("Staff Account Already Exists..");
          }
     } catch (err) {
          console.log(err);
     }
})();

// creates two default users, if they don't exist
(async function() {
     const users = [
          {id: "1234567", password: "test12345", name: "john doe"},
          {id: "7654321", password: "test12345", name: "jane doe"}
     ];

     try {
          const currentStudents = await students.find();

          if (!currentStudents || currentStudents.length < 1) {
               for (let i = 0; i < users.length; i++) {
                    const user = await students.create({
                         studentId: users[i].id,
                         password: bcrypt.hashSync(users[i].password, 10),
                         fullname: users[i].name
                    });
     
                    if (!user) {
                         console.log(`Failed to create user account for ${users[i].fullname}`);
                    }
     
                    console.log(`Account created for ${user.fullname}`);
               }
          } else {
               throw new Error("Student accounts exists..");
          }
     } catch (err) {
          console.log("Failed to create users: "+err);
     }
})();



// app middleware
app.use("/auth", authRoutes);
app.use("/api", apiRoutes);


// connecting to db
let port = process.env.PORT || 8080;

mongoose
     .connect(process.env.MONGO_URI)
     .then(() => {
          app.listen(port, () =>
               console.log(`SERVER LISTENING ON PORT: ${port}`),
          );
     })
     .catch((error) => {
          console.log(`Error while connecting with DB:\n${error}`);
     });
