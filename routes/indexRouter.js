import express from "express";
import isLoggedIn from "../middleares/isLoggedIn.js";
import {
  getHome,
  getShop,
  addToCart,
  addToCartMultiple,
  removeFromCart,
  getCart,
  getCheckout,
} from "../controllers/indexController.js";

const router = express.Router();

router.get("/", getHome);
router.get("/shop", isLoggedIn, getShop);
router.get("/addtocart/:id", isLoggedIn, addToCart);
router.get("/addtocarts/:id", isLoggedIn, addToCartMultiple);
router.post("/removefromcart/:id/:quantity", isLoggedIn, removeFromCart);
router.get("/cart", isLoggedIn, getCart);
router.get("/checkout", isLoggedIn, getCheckout);

export default router;
