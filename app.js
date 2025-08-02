import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import expressSession from "express-session";
import flash from "connect-flash";
import passport from "passport";
import indexRouter from "./routes/indexRouter.js";
import ownersRouter from "./routes/ownersRouter.js";
import usersRouter from "./routes/usersRouter.js";
import productsRouter from "./routes/productsRouter.js";
import connection from "./configuration/dbConnection.js";
import errorHandler from "./middleares/globalErrorHandler.js";
import configureGoogleStrategy from './configuration/googleOathPassport.js';
import MongoStore from "connect-mongo";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { cloudinaryConfig } from "./configuration/cloudinaryConfig.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
await connection();
configureGoogleStrategy(passport);
cloudinaryConfig();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
    store: MongoStore.create({
    mongoUrl: process.env.dataBaseURL,  
    ttl: 60 * 60 
  }),
  cookie: {
    maxAge: 5 * 60 * 1000, 
    httpOnly: true,
    secure: false
  }
  })
);

app.use(passport.initialize());
app.use(flash());
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

app.use("/", indexRouter);
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

app.use(errorHandler);

export default app;
