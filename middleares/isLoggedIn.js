import jwt from "jsonwebtoken";
import userModel from "../models/user-model.js";
const isLoggedIn=async function(req,res,next){
    if(!req.cookies.token){
        req.flash("error","you need to login first");
        return res.redirect("/");
    }
    try {
        const decode=jwt.verify(req.cookies.token,process.env.JWT_KEY);
        const user=await userModel
        .findById(decode.id)
        .select("-password");

        if (!user) {
            req.flash("error", "Invalid token or user does not exist");
            return res.redirect("/");
        }
        req.user=user;
        next();
    } catch (error) {
        req.flash("error","something went wrong");
        res.redirect("/");
    }
}
 export default isLoggedIn;