import express from "express";
import passport from "passport";
import {
  registerUser,
  loginUser,
  logOut
} from "../controllers/usersController.js";

const router = express.Router();
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  async (req, res) => {
    const token = req.user.generateAuthToken();

    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24 * 30 * 6 
    });

    res.redirect('/shop');
  }
);

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/logout", logOut);

export default router;
