import app from "./app.js";
import logger from "./utils/logger.js";
app.listen(process.env.Port,()=>{
    logger.info('server started on port'+ process.env.Port);
})