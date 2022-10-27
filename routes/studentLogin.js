var express = require("express");
var router = express.Router();
var db = require("../connection");

router.get("/loginForm", function (req, res, next) {
    res.render("studentLogin", { layout: false });
});


router.post('/loginCheck', function(request, response) {
	// Capture the input fields
	let username = request.body.uname;
	let password = request.body.psw;
	// Ensure the input fields exists and are not empty
	if (username && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		db.query('SELECT * FROM student WHERE student_id = ? AND password = ?', [username, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				request.session.loggedin = true;
				request.session.username = username;
				// Redirect to home page
				//response.redirect('/home');
                response.render("studentDashboard", { layout: false });
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});
module.exports=router;