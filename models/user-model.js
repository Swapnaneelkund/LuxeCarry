import mongoose from  "mongoose";
import bcrypt from "bcrypt.js";
import jwt from "jsonwebtoken";
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
        sparse: true 
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
userSchema.pre("save", function (next){
    if(!this.isModified("password")) return  next();
    bcrypt.hash(this.password,process.env.salt)
    .then((hash)=>{
        this.password=hash;
    }).catch((err)=>{return next(err);})
})
userSchema.methods.comparePassword = function (password){
     bcrypt.comparePassword(this.password,password)
    .then((results)=>{
        return results;
    }).catch((err)=>{
        next(err);
    })
}
userSchema.methods.generateAuthToken=function (){
const token = jwt.sign(
  { id: this.id },
  process.env.JWT_KEY,
  { expiresIn: '180d' } // 6 months = 180 days
 );
 return token;
}
export default userModel;