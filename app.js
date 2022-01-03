const express = require("express");
const app = express();
const path = require("path");
const PUERTO = 3000;
const mainRoutes = require("./src/routes/mainRoutes");
var cookieParser = require('cookie-parser');
const session = require('express-session')


app.use(session({
  secret: 'secret word!',
  resave: false,
  saveUninitialized: true,
}))


app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(cookieParser());
app.set("view engine", "ejs");
app.set('views', './src/views')


app.use(express.json());
app.use("/", mainRoutes);



app.listen(PUERTO, () => {
    console.log("Andando sin problema");
  });
  