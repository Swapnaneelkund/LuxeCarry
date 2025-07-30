import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema({
  fullname: {
    type: String,
    minLength: 3,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
cart: [
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
      required: true
    },
    quantity: {
      type: Number,
      default: 1,
      min: 1
    }
  }
]
,
  orders: {
    type: Array,
    default: [],
  },
  contact: {
    type: String,
  },
  picture: {
    type: String,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { id: this._id },
    process.env.JWT_KEY,
    { expiresIn: "180d" }
  );
};

const userModel = mongoose.model("User", userSchema);
export default userModel;
