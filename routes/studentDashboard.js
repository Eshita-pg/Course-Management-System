var express = require("express");
var router = express.Router();
var db = require("../connection");

router.get("/", function (req, res, next) {
  res.render("studentDashboard", { layout: false });
});

router.get("/course", function (req, res, next) {
  db.query(
    "SELECT course_id,course_name FROM course NATURAL JOIN assigns WHERE student_id=? and performance IS NULL",
    [req.session.username],
    function (error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {
        console.log(results);
        res.render("studentCourse", { layout: false, data: results });
      } else {
        res.send("No present enrollments");
      }
    }
  );
});

router.get("/assignment", function (req, res, next) {
  db.query(
    "SELECT assignment_id,course_id,grade,status FROM have WHERE student_id=?",
    [req.session.username],
    function (error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {
        res.render("studentAssignment", { layout: false, data: results });
      }
    }
  );
});

router.get("/pastCourse", function (req, res, next) {
  db.query(
    "SELECT course_id,course_name,performance FROM course NATURAL JOIN assigns WHERE student_id=? and performance IS NOT NULL",
    [req.session.username],
    function (error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {
        res.render("studentPastCourse", { layout: false, data: results });
      }
      else {
        res.send("No Past Courses");
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

router.post("/getFile", function (req, res, next) {
  db.query(
    "UPDATE have SET status=1 WHERE student_id=? AND assignment_id=? AND course_id=?",
    [
      parseInt(req.session.username),
      req.body.assignment_id,
      req.body.course_id,
    ],
    function (error, results, fields) {
      if (error) throw error;
      else {
        res.render("studentDashboard", { layout: false });
        console.log("UPDATED");
      }
    }
  );
});
module.exports = router;
