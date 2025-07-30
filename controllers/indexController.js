import asyncHandler from "../utils/AsyncHandler.js";
import productModel from "../models/product-model.js";
import userModel from "../models/user-model.js";
import { ApiError } from "../utils/ApiError.js";
import dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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
    image: product.img.url,
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



export const addToCartMultiple = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const user = await userModel.findOne({ email: req.user.email });
  if (!user) throw new ApiError(404, "User not found");
  const productIdStr = productId.toString();
  const alreadyInCart = user.cart.find(
    (item) => item.product.toString() === productIdStr
  );
  if (alreadyInCart) {
    alreadyInCart.quantity = (alreadyInCart.quantity || 0) + 1;
  } else {
    user.cart.push({
      product: productId,
      quantity: 1
    });
  }
  await user.save();
  req.flash("success", alreadyInCart ? "Added another instance to cart" : "Added to cart");
  res.redirect("/cart");
});
export const addToCartMultiple1 = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const user = await userModel.findOne({ email: req.user.email });
  if (!user) throw new ApiError(404, "User not found");
  const productIdStr = productId.toString();
  const alreadyInCart = user.cart.find(
    (item) => item.product.toString() === productIdStr
  );
  if (alreadyInCart) {
    alreadyInCart.quantity = (alreadyInCart.quantity || 0) + 1;
  } else {
    user.cart.push({
      product: productId,
      quantity: 1
    });
  }
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
  const inCart=user.cart.find(item => item.product.toString() === productId.toString());
  inCart.quantity -= quantityToRemove;
  if (inCart.quantity <= 0) {
    user.cart = user.cart.filter(item => item.product.toString() !== productId.toString());
  }
  await user.save();
  req.flash("success", `${quantityToRemove} product(s) removed from cart.`);
  res.redirect("/cart");
});

export const getCart = asyncHandler(async (req, res) => {
  const user = await userModel.findOne({ email: req.user.email }).populate("cart.product");
  if (!user) throw new ApiError(404, "User not found");
  const cart= user.cart;
 const cart1 = cart
  .filter(item => item.product) 
  .map(item => ({
    quantity: item.quantity,
    id: item.product._id,
    image: item.product.img.url,
    name: item.product.name,
    price: item.product.price,
    discount: item.product.discount,
    bgcolor: item.product.bgcolor,
    panelcolor: item.product.panelcolor,
    textcolor: item.product.textcolor,
  }));

  const totalPrice = cart1.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const success = req.flash("success");
  const error = req.flash("error");
  res.render("cart", { products: cart1, success, error, totalPrice });
});

export const checkout= asyncHandler(async(req,res)=>{
   const user = await userModel.findOne({ email: req.user.email }).populate("cart.product");
    if(!user) throw new ApiError(404,"user not found");
    const cart= user.cart;
    const cart1 = cart.filter(item => item.product).map(item =>({
      price:item.product.price,
      quantity: item.quantity
    }))
    const calculatedAmount=cart1.reduce((sum, item) => sum + item.price * item.quantity, 0);

  res.render("checkout", { amount: calculatedAmount,STRIPE_PUBLISHABLE_KEY:process.env.STRIPE_PUBLISHABLE_KEY});
})

export const payment = asyncHandler(async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.user.email }).populate("cart.product");
    if(!user) throw new ApiError(404,"user not found");
    const cart= user.cart;
    const cart1 = cart.filter(item => item.product).map(item =>({
      price:item.product.price,
      quantity: item.quantity
    }))
    const amount=cart1.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, 
      currency: 'inr',
      automatic_payment_methods: {
        enabled: true, 
      },
    });
    if(paymentIntent){
      const user =req.user;
       user.orders.push(...user.cart);
       user.cart = [];      
       await user.save();
    }
    res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.error("Stripe Error:", err);
    throw new ApiError("Payment failed", 500);
  }
});
export const orders= asyncHandler(async (req,res)=>{
  const user= await userModel.findOne({email: req.user.email}).populate("orders.product");
  if (!user) throw new ApiError(404, "User not found");
  const order= user.orders;
  const order1=order.filter(item => item.product).map(item =>({
    quantity: item.quantity,
    id: item.product._id,
    image: item.product.img.url,
    name: item.product.name,
    price: item.product.price,
    discount: item.product.discount,
    bgcolor: item.product.bgcolor,
    panelcolor: item.product.panelcolor,
    textcolor: item.product.textcolor,
  }))
  res.render("order", { orders: order1 });
})
