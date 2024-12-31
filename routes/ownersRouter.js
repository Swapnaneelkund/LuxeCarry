const express=require("express");
const router=express.Router();
const joi=require("joi");
const bcrypt=require("bcrypt");
const {generateToken}=require("../utils/generateToken");
const OwnerModel=require("../models/owner-model");
const productModel=require("../models/product-model")
const isLoggedIn=require("../middlewares/isLoggedIn");
//const { default: imageType } = require("image-type");
router.get("/",(req,res)=>{
  const error=req.flash("error")  
  res.render("ownerLogin",{error}); 
})
router.get("/register",(req,res)=>{
  const error=req.flash("error")
  res.render("ownerRegister",{error})
})

if(process.env.NODE_ENV==="development"){
    router.post("/register/create",async(req,res)=>{

      try {
        let owners=await OwnerModel.find();
        if(owners.length>0){
          req.flash("error","owner already exists");
          return res.redirect("/register");
        }
        let {fullname,email,password}=req.body;
        const registration = joi.object({
          fullname: joi.string().min(3).max(30).required(),
          email: joi.string().email().required(),
          password: joi.string().min(6).required()
        })
        const {error}=registration.validate(
          {fullname,password,email},
          {abortEarly:false}
        )
        if(error){
          req.flash("error",error.message);
          return res.redirect("/register")
          
        }
        const salt=await bcrypt.genSalt(10);
        const hashpassword=await bcrypt.hash(password,salt);

        const createdOwner=await OwnerModel.create({
             fullname,
             email,
             password:hashpassword
 
            })
            const token=generateToken(createdOwner)
            req.flash("Success","Owner registration Successfull")
            return res.cookie("token",token).redirect("/admin");
        } catch (error) {
         req.flash("error","internal error");
         return res.redirect("/register")
      }
})
router.post("/login",async(req,res)=>{
  const {email,password}=req.body
    if(!email||!password) {
        req.flash("error","Login:Enter the field properly")
        return res.redirect("/owners")
    }
    const owners=await OwnerModel.findOne({email:email});
    if(!owners) {
        req.flash("error","Login:email or password invalid")
        return res.redirect("/owners")
    }
    bcrypt.compare(password,owners.password,(err,result)=>{
        if(err){
           console.log("err",err)
           req.flash("error","Internal server problem")
           return res.redirect("/owners")
        }
        if(!result){
            req.flash("error","Login:email or password invalid")
            return res.redirect("/owners")
        }
        const token=generateToken(owners);
        res.cookie("token",token)
        return res.redirect("/admin");
        
    })
})


}
router.get("/admin",async(req,res)=>{
  const success=req.flash("success")
  const error=req.flash("error")
  const products = await productModel.find();
  const formattedproducts = products.map((product) => ({
      id:product._id,
      image: product.image.data.toString('base64'),
      mimeType: product.image.contentType || 'image/jpeg',
      name: product.name,
      price: product.price,
      discount: product.discount,
      bgcolor: product.bgcolor,
      panelcolor: product.panelcolor,
      textcolor: product.textcolor,
  }));
  res.render("admin",{success,error,products:formattedproducts})
})
router.get("/admin/createproduct",(req,res)=>{
 res.render("createproducts");
})
router.post("/logout",(req,res)=>{
  res.clearCookie("token");
  res.redirect("/owners")
})
console.log(process.env.NODE_ENV);
module.exports=router