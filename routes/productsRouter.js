const express=require("express");
const router=express.Router();
const joi=require("joi")
const upload=require("../config/multer-config");
const productModel=require("../models/product-model")
router.post("/create",upload.single("image"),async(req,res)=>{
  try {
    
    const {name,price,discount,bgcolor,panelcolor,textcolor}=req.body;
    const Schema=joi.object({
        name:joi.string().required(),
        price:joi.number().required(),
        discount:joi.number().required(),
        bgcolor:joi.string().required(),
        panelcolor:joi.string().required(),
        textcolor:joi.string().required()
    })
    const {error}=Schema.validate(
        {name,price,discount,bgcolor,panelcolor,textcolor},
        {abortEarly:false}
    )
    if(error){
        req.flash("error",error.message);
        res.redirect("/owners/admin");
    }
    const product=await productModel.create({
        image:{
          data:req.file.buffer,
          contentType:req.file.mimetype
        },
        name,
        price,
        discount,
        bgcolor,
        panelcolor,
        textcolor,
    })
    req.flash("success","product created sucessfully")
    res.redirect("/owners/admin");  
  } catch (error) {
    req.flash("error","internal server problem")
    res.redirect("/owners/admin");
  }
})
router.get("/delete/:id",async(req,res)=>{
  try{
    const id=req.params.id;
    await productModel.findByIdAndDelete(id)
    req.flash("success","product deleted successfully")
    res.redirect("/owners/admin")
  }catch(error){
    req.flash("error","internal server problem")
    res.redirect("/owners/admin")
  }
})
// Delete all products
router.post('/product', async (req, res) => {
  try {
      await productModel.deleteMany({});
      req.flash("success","products deleted successfully")
      res.redirect("/owners/admin")
  } catch (err) {
    console.error("Error deleting products:", err)
    req.flash("error","internal server problem")
    res.redirect("/owners/admin")
  }
});

module.exports=router