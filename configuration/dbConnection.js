import mongoose from "mongoose"
import logger from "../utils/logger.js"
const connection = async()=>{
   await mongoose.connect(`${process.env.dataBaseURL}/Luxecarry`)
   .then(()=>{
      logger.info("database connected")
   })
   .catch(()=>{
    logger.warn("mongodb connection error");
    process.exit(1);
   })
}
export default connection;