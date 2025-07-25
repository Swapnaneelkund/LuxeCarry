const mongoose=require('mongoose');
const ownerSchema=mongoose.Schema({
    fullname:{
        type:String,
        required:true,
        minLength:3,
        trim:true
    
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String
    },

    products:{
        type:Array,
        default:[]
    },
    picture:{
        type:String
    },
    gstin:{
        type:String
    }
})
const OwnerModel=mongoose.model("Owner",ownerSchema);
module.exports=OwnerModel;