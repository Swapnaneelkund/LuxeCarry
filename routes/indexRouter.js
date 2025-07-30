import express from "express";
import isLoggedIn from "../middleares/isLoggedIn.js";
import {
  getHome,
  getShop,
  addToCartMultiple,
  removeFromCart,
  getCart,
  checkout,
  payment,
  addToCartMultiple1,
  orders
} from "../controllers/indexController.js";
const router = express.Router();
router.get("/", getHome);
router.get("/shop", isLoggedIn, getShop);
router.get("/addtocarts/:id", isLoggedIn, addToCartMultiple);
router.get("/addtocarts1/:id", isLoggedIn, addToCartMultiple1);
router.post("/removefromcart/:id/:quantity", isLoggedIn, removeFromCart);
router.get("/cart", isLoggedIn, getCart);
router.post("/checkout", isLoggedIn, checkout);
router.post("/payment", isLoggedIn ,payment);
router.get("/order",isLoggedIn,orders)

export default router;
