import asyncHandler from "../utils/AsyncHandler.js";
import productModel from "../models/product-model.js";
import userModel from "../models/user-model.js";
import { ApiError } from "../utils/ApiError.js";

// GET /
export const getHome = asyncHandler(async (req, res) => {
  const error = req.flash("error");
  res.render("index", { error, loggedin: false });
});

// GET /shop
export const getShop = asyncHandler(async (req, res) => {
  const { search } = req.query;
  const query = search ? { name: { $regex: new RegExp(search, "i") } } : {};

  const products = await productModel.find(query);
  const formattedProducts = products.map(product => ({
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

  const success = req.flash("success");
  res.render("shop", { products: formattedProducts, search, success });
});

// GET /addtocart/:id
export const addToCart = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const user = await userModel.findOne({ email: req.user.email });
  if (!user) throw new ApiError(404, "User not found");
  user.cart.push(productId);
  await user.save();
  res.redirect("/cart");
});

// GET /addtocarts/:id
export const addToCartMultiple = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const user = await userModel.findOne({ email: req.user.email });
  if (!user) throw new ApiError(404, "User not found");
  const alreadyInCart = user.cart.includes(productId);
  user.cart.push(productId);
  await user.save();
  req.flash("success", alreadyInCart ? "Added another instance to cart" : "Added to cart");
  res.redirect("/shop");
});

// POST /removefromcart/:id/:quantity
export const removeFromCart = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const quantityToRemove = parseInt(req.params.quantity);
  const user = await userModel.findOne({ email: req.user.email });
  if (!user) throw new ApiError(404, "User not found");
  let removedCount = 0;
  user.cart = user.cart.filter(item => {
    if (item.toString() === productId && removedCount < quantityToRemove) {
      removedCount++;
      return false;
    }
    return true;
  });
  await user.save();
  req.flash("success", `${quantityToRemove} product(s) removed from cart.`);
  res.redirect("/cart");
});

// GET /cart
export const getCart = asyncHandler(async (req, res) => {
  const user = await userModel.findOne({ email: req.user.email }).populate("cart");
  if (!user) throw new ApiError(404, "User not found");
  const cartItemsMap = user.cart.reduce((acc, product) => {
    const id = product._id.toString();
    if (!acc[id]) acc[id] = { product, quantity: 0 };
    acc[id].quantity++;
    return acc;
  }, {});
  const cartItems = Object.values(cartItemsMap).map(item => ({
    id: item.product._id,
    image: item.product.image.data.toString("base64"),
    mimeType: item.product.image.contentType || "image/jpeg",
    name: item.product.name,
    price: item.product.price,
    discount: item.product.discount,
    bgcolor: item.product.bgcolor,
    panelcolor: item.product.panelcolor,
    textcolor: item.product.textcolor,
    quantity: item.quantity,
  }));
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const success = req.flash("success");
  const error = req.flash("error");
  res.render("cart", { products: cartItems, success, error, totalPrice });
});

// GET /checkout
export const getCheckout = asyncHandler(async (req, res) => {
  res.render("payment");
});
