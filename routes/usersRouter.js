const express = require("express");
const router = express.Router();
const {registerUser,loginUser,logOut}=require("../controllers/authController");
const { generateToken } = require('../utils/generateToken');
const userModel = require('../models/user-model');
const passport = require("passport");
router.get("/", (req, res) => {
    res.send("hey");
})
router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google authentication callback route
router.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    async (req, res) => {
        try {
            const user = req.user;

            const token = generateToken(user);

            res.cookie("token", token, { httpOnly: true, secure: false }); 

   
            res.redirect("/shop");
        } catch (error) {
            console.error("Error during Google authentication:", error);
            req.flash("error", "Internal server error");
            res.redirect("/");
        }
    }
);

router.get("/logout",logOut);
module.exports = router