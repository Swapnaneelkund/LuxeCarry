const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");

router.get("/", (req, res) => {
    let error = req.flash("error");

    res.render("index", { error, loggedin: false });
});

router.get("/shop", isLoggedIn, async (req, res) => {
    const { search } = req.query;

    let query = {};

    if (search) {
        query.name = { $regex: new RegExp(search, 'i') }; 
    }

    try {
        const products = await productModel.find(query);
        const formattedProducts = products.map((product) => ({
            id: product._id,
            image: product.image.data.toString('base64'),
            mimeType: product.image.contentType || 'image/jpeg',
            name: product.name,
            price: product.price,
            discount: product.discount,
            bgcolor: product.bgcolor,
            panelcolor: product.panelcolor,
            textcolor: product.textcolor,
        }));

        let success = req.flash("success");
        res.render("shop", { products: formattedProducts, search, success });
    } catch (error) {
        console.error(error);
        req.flash("error", "Something went wrong.");
        res.redirect("/shop");
    }
});

router.get("/addtocart/:id", isLoggedIn, async (req, res) => {
    try {
        const productId = req.params.id;
        const user = await userModel.findOne({ email: req.user.email });
        user.cart.push(productId);
        await user.save();
        res.redirect("/cart");

    } catch (error) {
        console.error(error);
        req.flash("error", "Internal server problem");
        res.redirect("/cart");
    }
});
router.get("/addtocarts/:id", isLoggedIn, async (req, res) => {
    try {
        const productId = req.params.id;
        const user = await userModel.findOne({ email: req.user.email });
        const isProductInCart = user.cart.includes(productId);
        user.cart.push(productId);
        await user.save();
        if (isProductInCart) {
            req.flash("success", "Added another instance to cart");
            res.redirect("/shop");
        } else {
            req.flash("success", "Added to cart");
            res.redirect("/shop"); 
        }
    } catch (error) {
        console.error(error);
        req.flash("error", "Internal server problem");
        res.redirect("/shop");
    }
});

router.post("/removefromcart/:id/:quantity", isLoggedIn, async (req, res) => {
    try {
        const productId = req.params.id;
        const quantityToRemove = parseInt(req.params.quantity);
        const user = await userModel.findOne({ email: req.user.email });

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
    } catch (error) {
        console.error(error);
        req.flash("error", "Unable to remove product from cart.");
        res.redirect("/cart");
    }
});

router.get("/cart", isLoggedIn, async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.user.email }).populate("cart");

        // Group cart items by product ID and count quantities
        const cartItemsMap = user.cart.reduce((acc, product) => {
            const productId = product._id.toString();
            if (!acc[productId]) {
                acc[productId] = { product, quantity: 0 };
            }
            acc[productId].quantity++;
            return acc;
        }, {});

        const cartItems = Object.values(cartItemsMap).map(item => ({
            id: item.product._id,
            image: item.product.image.data.toString('base64'),
            mimeType: item.product.image.contentType || 'image/jpeg',
            name: item.product.name,
            price: item.product.price,
            discount: item.product.discount,
            bgcolor: item.product.bgcolor,
            panelcolor: item.product.panelcolor,
            textcolor: item.product.textcolor,
            quantity: item.quantity
        }));

        const totalPrice = cartItems.reduce((sum, item) => {
            return sum + item.price * item.quantity;
        }, 0);

        let success = req.flash("success");
        let error = req.flash("error");

        res.render("cart", { products: cartItems, success, error, totalPrice });
    } catch (error) {
        console.error(error);
        req.flash("error", "Unable to fetch cart.");
        res.redirect("/shop");
    }
});
router.get("/checkout",isLoggedIn,async(req,res)=>{
    res.render("payment");
})

module.exports = router;