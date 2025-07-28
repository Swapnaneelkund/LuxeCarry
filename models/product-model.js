import mongoose from "mongoose";
const productSchema=mongoose.Schema({
    img: {url: {type: 'string',},
    public_id: {type: 'string',}
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

export default mongoose.model("Products",productSchema);