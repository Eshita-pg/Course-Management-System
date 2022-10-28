var express = require("express");
var router = express.Router();
var db = require("../connection");

router.get("/courses", function (req, res, next) {
    db.query(
        "SELECT course_id,course_name,credits,COUNT(student_id) AS count FROM course NATURAL JOIN offers NATURAL JOIN takes WHERE instructor_id=? GROUP BY course_id",
        [req.session.username],
        function (error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
                res.render("instructorCourse", { layout: false, data: results });
            }
        }
    );

});

router.get("/newCourse", function (req, res, next) {
    res.render("newCourse", { layout: false });
});

router.post("/newCourse", function (req, res, next) {
    const course_id = req.body.course_id;
    const course_name = req.body.course_name;
    const course_description = req.body.course_description;
    const credits = req.body.credits;
    db.query(
        "INSERT INTO course SET course_id = ?, course_name=?, course_description=?,credits=?",
        [course_id, course_name, course_description, credits],
        function (error, results, fields) {
            if (error) throw error;
            else {
                // res.render("studentCourseContent", { layout: false, data: results });
                console.log("Inserted In course");
            }
        }
    );
    db.query(
        "INSERT INTO offers SET course_id = ?, instructor_id=?",
        [course_id, req.session.username],
        function (error, results, fields) {
            if (error) throw error;
            else{
                res.render("instructorDashboard", { layout: false});
                console.log("Inserted In offers");
            }
        }
    );
});

router.get("/grading", function (req, res, next) {
    db.query(
        "SELECT course_id,course_name,performance FROM course NATURAL JOIN assigns WHERE student_id=? and performance IS NOT NULL",
        [req.session.username],
        function (error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
                res.render("studentPastCourse", { layout: false, data: results });
            }
        }
    );
});
router.get("/feeds", function (req, res, next) {
    db.query(
        "SELECT course_id,course_name,performance FROM course NATURAL JOIN assigns WHERE student_id=? and performance IS NOT NULL",
        [req.session.username],
        function (error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
                res.render("studentPastCourse", { layout: false, data: results });
            }
        }
    );
});

router.post("/content", function (req, res, next) {
    db.query(
        "SELECT course_id,course_name,course_description,credits FROM course WHERE course_id=?",
        [req.body.course_id],
        function (error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
                res.render("studentCourseContent", { layout: false, data: results });
            }
        }
    );
});
module.exports = router;

//GET INPUT FILES
//router.post()
