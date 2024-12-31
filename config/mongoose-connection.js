const mongoose=require("mongoose");
const dbgr=require("debug")("development:mongoose");
const config=require("config");
mongoose.connect(`${config.get("MONGODB_URI")}/LuxeCarry`).then(()=>{
    dbgr("connected")
}).catch((err)=>console.error(err));
module.exports=mongoose.connection;