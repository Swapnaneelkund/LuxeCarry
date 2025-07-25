import express from "express";
const app = express();
import cookieParser from "cookie-parser";
import path from "path";
import expressSession from "express-session";
import flash from "connect-flash";
import dotenv from "dotenv";
import passport from "passport";
import indexRouter from "./routes/indexRouter.js";
import ownersRouter from "./routes/ownersRouter.js";
import usersRouter from "./routes/usersRouter.js";
import productsRouter from "./routes/productsRouter.js";
import connection from "./configuration/dbConnection.js";
import "./controllers/googleOauth.js";
import errorHandler from "./middleares/globalErrorHandler.js"
dotenv.config();
const connect=connection();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.use(expressSession({
    resave:false,
    saveUninitialized:false,
    secret:process.env.EXPRESS_SESSION_SECRET
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash())
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");
app.use("/",indexRouter)
app.use("/owners",ownersRouter);
app.use("/users",usersRouter);
app.use("/products",productsRouter);
app.use(errorHandler);

export default app;