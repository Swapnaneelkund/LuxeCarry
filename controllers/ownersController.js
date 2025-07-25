import bcrypt from "bcrypt";
import { ownerRegisterSchema, ownerLoginSchema } from "../validations/ownerValidation.js";
import  generateToken  from "../utils/generateToken.js";
import OwnerModel from "../models/owner-model.js";
import productModel from "../models/product-model.js";
import asyncHandler from "../middlewares/asyncHandler.js";

export const renderLogin = (req, res) => {
  const error = req.flash("error");
  res.render("ownerLogin", { error });
};

export const renderRegister = (req, res) => {
  const error = req.flash("error");
  res.render("ownerRegister", { error });
};

export const registerOwner = asyncHandler(async (req, res) => {
  const owners = await OwnerModel.find();
  if (owners.length > 0) {
    req.flash("error", "Owner already exists");
    return res.redirect("/owners/register");
  }

  const { fullname, email, password } = req.body;

  const { error } = ownerRegisterSchema.validate({ fullname, email, password }, { abortEarly: false });
  if (error) {
    req.flash("error", error.message);
    return res.redirect("/owners/register");
  }

  const hashed = await bcrypt.hash(password, 10);
  const createdOwner = await OwnerModel.create({ fullname, email, password: hashed });

  const token = generateToken(createdOwner);
  req.flash("success", "Owner registration successful");
  res.cookie("token", token).redirect("/owners/admin");
});

export const loginOwner = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const { error } = ownerLoginSchema.validate({ email, password }, { abortEarly: false });
  if (error) {
    req.flash("error", "Login: " + error.message);
    return res.redirect("/owners");
  }

  const owner = await OwnerModel.findOne({ email });
  if (!owner || !(await bcrypt.compare(password, owner.password))) {
    req.flash("error", "Login: Email or password invalid");
    return res.redirect("/owners");
  }

  const token = generateToken(owner);
  res.cookie("token", token).redirect("/owners/admin");
});

export const renderAdminDashboard = asyncHandler(async (req, res) => {
  const success = req.flash("success");
  const error = req.flash("error");
  const products = await productModel.find();

  const formatted = products.map((product) => ({
    id: product._id,
    image: product.image.data.toString("base64"),
    mimeType: product.image.contentType || "image/jpeg",
    name: product.name,
    price: product.price,
    discount: product.discount,
    bgcolor: product.bgcolor,
    panelcolor: product.panelcolor,
    textcolor: product.textcolor,
  }));

  res.render("admin", { success, error, products: formatted });
});

export const renderCreateProduct = (req, res) => {
  res.render("createproducts");
};

export const logoutOwner = (req, res) => {
  res.clearCookie("token");
  res.redirect("/owners");
};
