const express = require("express");
const dotenv = require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");

// ROUTE 1 : Create a User using: POST "/api/auth/createuser". No login requried
router.post("/createuser", [body("name", "Enter a valid name").isLength({ min: 3 }), body("email", "Enter a valid email").isEmail(), body("password", "Password must be at least 5 characters").isLength({ min: 5 })], async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Check whether the user with this email exists already
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ status: false, error: "User with this email already exists." });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // Create user with request body
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        });

        const data = {
            id: user.id,
        };
        const authToken = jwt.sign(data, process.env.JWT_SECRET);
        console.log(authToken);

        res.json({ status: true, message: "User created successfully", authToken: authToken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 2 : Authenticate a User using POST "/api/auth/login".
router.post("/login", [body("email", "Enter a valid email").isEmail(), body("password", "Password cannot be blank").exists()], async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(500).json({ status: false, error: "Invalid Credentials" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(500).json({ status: false, error: "Invalid Credentials" });
        }

        const data = {
            user: {
                id: user.id,
            },
        };
        const authToken = jwt.sign(data, process.env.JWT_SECRET);
        res.json({ status: true, message: "User login successfull", authToken: authToken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 3 : Get logged in User Details using POST "/api/auth/getuser". Login requried
router.post("/getuser", fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password -__v");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
