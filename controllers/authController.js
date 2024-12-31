const joi = require("joi");
const bcrypt=require("bcrypt");
const userModel=require("../models/user-model");
const {generateToken}=require("../utils/generateToken");
module.exports.registerUser=async function(req,res){
    try {
        const { email, password, fullname } = req.body;
        const registration = joi.object({
            fullname: joi.string().min(3).max(30).required(),
            email: joi.string().email().required(),
            password: joi.string().min(6).required()
        })
        const {error}=registration.validate(
            {email,password,fullname},
            {abortEarly:false}
        )
        if(error){
            req.flash('error', error.message);
            return res.redirect('/');
        }
        const salt=await bcrypt.genSalt(10);
        const hashpassword=await bcrypt.hash(password,salt);
        try{
            const user=await userModel.create({
                fullname,
                password:hashpassword,
                email
            });
             const token=generateToken(user);
             //return res.status(200).send(token);
             return res.cookie("token",token).redirect("/shop")
        }catch(error){
            if(error.code===11000){
                req.flash('error', 'This email is already registered. Please use a different email.');
                return res.redirect('/');
            }else{
                req.flash('error', 'Internal server error');
                console.log(error)
                return res.redirect('/');            }
        }
        
        

    } catch (error) {
       return res.send(error.message)
    }
}
module.exports.loginUser=async function(req,res){
    let {email,password}=req.body
    if(!email||!password) {
        req.flash("error","Login:Enter the field properly")
        return res.redirect("/")
    }
    const user=await userModel.findOne({email:email});
    if(!user) {
        req.flash("error","Login:email or password invalid")
        return res.redirect("/")
    }
    bcrypt.compare(password,user.password,(err,result)=>{
        if(err){
           console.log("err",err)
           req.flash("error","Internal server problem")
           return res.redirect("/")
        }
        if(!result){
            req.flash("error","Login:email or password invalid")
            return res.redirect("/")
        }
        const token=generateToken(user);
        res.cookie("token",token)
        return res.redirect("/shop");
        
    })
}
module.exports.logOut=async (req,res)=>{
    res.cookie("token","");
    return res.redirect("/");
}