const express=require("express");
const app=express();
const cookeParser=require("cookie-parser");
const path=require("path");
const expressSession=require("express-session");
const flash=require("connect-flash");
const dotenv=require("dotenv").config();
const passport = require("passport");
const indexRouter=require("./routes/indexRouter");
const ownersRouter=require("./routes/ownersRouter");
const usersRouter=require("./routes/usersRouter");
const productsRouter=require("./routes/productsRouter");
const db=require("./config/mongoose-connection");
require("./controllers/googleOauth");
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookeParser());
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

app.listen(process.env.Port,()=>{
    console.log("running")
});