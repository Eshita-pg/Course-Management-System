var express = require("express");
var router = express.Router();
var db = require("../connection");

router.get("/loginForm", function (req, res, next) {
  res.render("studentLogin", { layout: false });
});

var username = "";
var user;
router.post("/loginCheck", function (request, response) {
  username = request.body.uname;
  user =  request.body.uname;
  let password = request.body.psw;
  if (username && password) {
    db.query(
      "SELECT * FROM student WHERE student_id = ? AND password = ?",
      [username, password],
      function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
          request.session.loggedin = true;
          request.session.username = username;
		  request.session.save();
          response.render("studentDashboard", { layout: false });
        } else {
          response.send("Incorrect Username and/or Password!");
        }
        response.end();
      }
    );
  } else {
    response.send("Please enter Username and Password!");
    response.end();
  }
});
module.exports = router;
