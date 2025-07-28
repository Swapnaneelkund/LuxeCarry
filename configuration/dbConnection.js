import mongoose from "mongoose"
import logger from "../utils/logger.js"
const connection = async()=>{
   await mongoose.connect(`${process.env.dataBaseURL}/Luxecarry`)
   .then(()=>{
      logger.info("database connected")
   })
   .catch((err)=>{
    logger.warn(err.message);
    process.exit(1);
   })
}
export default connection;