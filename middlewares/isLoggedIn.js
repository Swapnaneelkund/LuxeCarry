const jwt=require("jsonwebtoken");
const userModel=require("../models/user-model");
module.exports=async function(req,res,next){
    if(!req.cookies.token){
        req.flash("error","you need to login first");
        return res.redirect("/");
    }
    try {
        const decode=jwt.verify(req.cookies.token,process.env.JWT_KEY);
        const user=await userModel
        .findOne({email:decode.user})
        .select("-password");

        if (!user) {
            req.flash("error", "Invalid token or user does not exist");
            return res.redirect("/");
        }
        //console.log(req)
        req.user=user;
        //console.log(req.user)
        next();
    } catch (error) {
        req.flash("error","something went wrong");
        res.redirect("/");
    }
}
