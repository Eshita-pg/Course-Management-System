var express = require("express");
var router = express.Router();
var db = require("../connection");

router.get("/course", function (req, res, next) {
  db.query(
    "SELECT course_id,course_name FROM course NATURAL JOIN assigns WHERE student_id=? and performance IS NULL",
    [req.session.username],
    function (error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {
        res.render("studentCourse", { layout: false, data: results });
      }
    }
  );
});

router.get("/assignment", function (req, res, next) {
  db.query(
    "SELECT assignment_id,course_id,grade FROM have WHERE student_id=?",
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
