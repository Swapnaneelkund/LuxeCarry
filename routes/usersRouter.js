import express from "express";
import passport from "passport";
import {
  registerUser,
  loginUser,
  logOut
} from "../controllers/usersController.js";
import googleOath from "../controllers/googleOathController.js";

const router = express.Router();
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  googleOath
);

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/logout", logOut);

export default router;
