import express from "express";
import passport from "passport";
import {
  registerUser,
  loginUser,
  logOut
} from "../controllers/usersController.js";

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get(
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

const router = express.Router();
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: true, 
  }),
  (req, res) => {
    res.cookie("jwt", req.token, {
      httpOnly: true,      
      secure: false,       
      maxAge: 1000 * 60 * 60 * 24 * 30 * 6 
    });

    res.redirect("/shop"); 
  }
);


router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/logout", logOut);

export default router;
