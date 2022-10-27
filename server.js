const express = require("express");
const bodyParser = require("body-parser");
const expressLayouts = require('express-ejs-layouts');
const conn = require("./connection");
const homeRouter = require("./routes/home");
const studentRouter = require("./routes/studentLogin")
const session = require('express-session')


var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.static(__dirname + '/public'));


app.use('/studentLogin', studentRouter);
app.use('/', homeRouter);

app.listen(3000);
