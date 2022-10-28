var express = require("express");
var router = express.Router();
var db = require("../connection");

router.get("/showStudent", function (req, res, next) {
    db.query(
        "SELECT student_id,fname,lname FROM student",
        [req.session.username],
        function (error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
                res.render("showStudent", { layout: false, data: results });
            }
        }
    );
});
router.get("/newStudent", function (req, res, next) {
    res.render("newStudent", { layout: false });
});

router.post("/newStudent", function (req, res, next) {
    const student_id = parseInt(req.body.student_id);
    const password = req.body.fname + "@" + req.body.instructor_id;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const street = req.body.street;
    const state = req.body.state;
    const pincode = parseInt(req.body.pincode);
    db.query(
        "INSERT INTO student SET student_id=?, password=?, fname=?, lname=?, street=?, state=?, pincode=?",
        [student_id, password, fname, lname, street, state, pincode],
        function (error, results, fields) {
            if (error) throw error;
            else {
                res.render("adminDashboard", { layout: false});
                console.log("Inserted In Student");
            }
        }
    );
});

router.get("/showInstructor", function (req, res, next) {
    db.query(
        "SELECT instructor_id,fname,lname FROM instructor",
        [req.session.username],
        function (error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
                res.render("showInstructor", { layout: false, data: results });
            }
        }
    );
});

router.get("/newInstructor", function (req, res, next) {
    res.render("newInstructor", { layout: false });
});

router.post("/newInstructor", function (req, res, next) {
    const instructor_id = parseInt(req.body.instructor_id);
    const password = req.body.fname + "@" + req.body.instructor_id;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const phone = req.body.phone;
    db.query(
        "INSERT INTO instructor SET instructor_id=?, password=?, fname=?, lname=?, email=?, phone=?",
        [instructor_id, password, fname, lname, email, phone],
        function (error, results, fields) {
            if (error) throw error;
            else {
                res.render("adminDashboard", { layout: false});
                console.log("Inserted In instructor");
            }
        }
    );
});

router.get("/showCourse", function (req, res, next) {
    db.query(
        "SELECT course_id,course_name FROM course",
        [req.session.username],
        function (error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
                res.render("showCourse", { layout: false, data: results });
            }
        }
    );
});

router.get("/newCourse", function (req, res, next) {
    res.render("newCourse", { layout: false });
});

router.post("/newCourse", function (req, res, next) {
    const instructor_id = parseInt(req.body.instructor_id);
    const password = req.body.fname + "@" + req.body.instructor_id;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const phone = req.body.phone;
    db.query(
        "INSERT INTO instructor SET instructor_id=?, password=?, fname=?, lname=?, email=?, phone=?",
        [instructor_id, password, fname, lname, email, phone],
        function (error, results, fields) {
            if (error) throw error;
            else {
                res.render("adminDashboard", { layout: false});
                console.log("Inserted In instructor");
            }
        }
    );
});


module.exports = router;

//GET INPUT FILES
//router.post()
