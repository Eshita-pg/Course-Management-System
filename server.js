const express = require("express");
const bodyParser = require("body-parser");
const expressLayouts = require('express-ejs-layouts');
const conn = require("./connection");
const homeRouter = require("./routes/home");
const studentRouter = require("./routes/studentLogin");
const studentCourseRouter = require("./routes/studentDashboard");
const session = require('express-session');
const feedbackRouter = require("./routes/feedback");
const instructorRouter = require("./routes/instructorLogin");
const adminRouter = require("./routes/adminLogin");
const instructorCourseRouter = require("./routes/instructorDashboard")
const adminCourseRouter = require("./routes/adminDashboard")
const facultyCourseRouter = require("./routes/facultyCourse")

const flash = require('connect-flash');
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(flash());
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true,
	cookie: {secure: true}
}));
app.use(express.static(__dirname + '/public'));

app.use('/feedback',feedbackRouter);
app.use('/studentDashboard',studentCourseRouter);
app.use('/studentLogin', studentRouter);
app.use('/adminLogin', adminRouter);
app.use('/instructorDashboard',instructorCourseRouter);
app.use('/adminDashboard',adminCourseRouter);
app.use('/instructorLogin', instructorRouter);
app.use('/facultyCourse', facultyCourseRouter);
app.use('/', homeRouter);

app.listen(3000);
