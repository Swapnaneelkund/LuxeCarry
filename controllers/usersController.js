import bcrypt from "bcrypt";
import userModel from "../models/user-model.js";
import generateToken from "../utils/generateToken.js";
import {
  userRegisterSchema,
  userLoginSchema,
} from "../validations/userValidation.js";

export const registerUser = async (req, res) => {
  try {
    const { email, password, fullname } = req.body;

    const { error } = userRegisterSchema.validate(
      { email, password, fullname },
      { abortEarly: false },
    );

    if (error) {
      req.flash("error", error.message);
      return res.redirect("/");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await userModel.create({
        fullname,
        email,
        password: hashedPassword,
      });

      const token = generateToken(user);
      return res.cookie("token", token).redirect("/shop");
    } catch (err) {
      if (err.code === 11000) {
        req.flash(
          "error",
          "This email is already registered. Please use a different email.",
        );
        return res.redirect("/");
      } else {
        console.error(err);
        req.flash("error", "Internal server error");
        return res.redirect("/");
      }
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send("Unexpected server error");
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { error } = userLoginSchema.validate(
      { email, password },
      { abortEarly: false },
    );
    if (error) {
      req.flash("error", error.message);
      return res.redirect("/");
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      req.flash("error", "Login: Email or password invalid");
      return res.redirect("/");
    }
    console.log(password);
    console.log(user);
    if (!user.email && user.googleId) {
      req.flash("error", "Login: Already loggedIn with google");
      return res.redirect("/");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      req.flash("error", "Login: Email or password invalid");
      return res.redirect("/");
    }

    const token = generateToken(user);
    return res.cookie("token", token).redirect("/shop");
  } catch (err) {
    console.error(err);
    req.flash("error", "Internal server problem");
    return res.redirect("/");
  }
};

export const logOut = async (req, res) => {
  res.clearCookie("token");
  return res.redirect("/");
};
