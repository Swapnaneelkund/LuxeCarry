const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        minLength: 3,
        trim: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true // Allows for either email/password or Google authentication
    },
    cart: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Products" }],
        default: []
    },
    orders: {
        type: Array,
        default: []
    },
    contact: {
        type: String
    },
    picture: {
        type: String
    }
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;