import express from "express";
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
import errorHandler from "./middleares/globalErrorHandler.js";
import configureGoogleStrategy from './configuration/googleOathPassport.js';
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();
await connection();
configureGoogleStrategy(passport);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
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
