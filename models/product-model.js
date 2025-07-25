import mongoose from "mongoose";
const productSchema=mongoose.Schema({
    img: {public_id: {type: 'string',},
    secure_url: {type: 'string',}
    },
    name:String,
    price:Number, 
    discount:{
        type:Number,
        default:0
    },
    bgcolor:{
        type:String
    },
    panelcolor:String,
    textcolor:String
});

module.exports=mongoose.model("Products",productSchema);