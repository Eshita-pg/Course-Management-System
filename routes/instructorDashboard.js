var express = require("express");
var router = express.Router();
var db = require("../connection");

router.get("/", function (req, res, next) {
  res.render("instructorDashboard", { layout: false});
});

//----------------------SHOW COURSE---------------
router.get("/courses", function (req, res, next) {
  db.query(
    "SELECT course_id,course_name,credits,COUNT(student_id) AS count FROM course NATURAL JOIN offers NATURAL JOIN takes WHERE instructor_id=? GROUP BY course_id",
    [req.session.username],
    function (error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {
        res.render("instructorCourse", { layout: false, data: results });
      } else {
        res.send("No results");
      }
    }
  );
});

//----------------------ADD COURSE------------------
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
      else {
        res.render("instructorDashboard", { layout: false });
        console.log("Inserted In offers");
      }
    }
  );
});

//-------------GRADING------------
router.get("/grading", function (req, res, next) {
  db.query(
    "SELECT DISTINCT course_id,assignment_id FROM offers NATURAL JOIN have WHERE instructor_id=?",
    [req.session.username],
    function (error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {
        res.render("instructorShowAssn", { layout: false, data: results });
      } else {
        res.send("No Assignments");
      }
    }
  );
});

router.post("/submissions", function (req, res, next) {
  db.query(
    "SELECT assignment_id,student_id,grade,status FROM have WHERE assignment_id=?",
    [req.body.assignment_id],
    function (error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {
        res.render("giveGrades", {
          layout: false,
          data: results,
          assignment: req.body.assignment_id,
        });
      }
    }
  );
});

router.post("/giveGrades", function (req, res, next) {
  db.query(
    "UPDATE have SET grade=?  WHERE assignment_id=? AND student_id=?",
    [req.body.grade, req.body.assignment_id, req.body.student_id],
    function (error, results, fields) {
      if (error) throw error;
      else {
        console.log("graded");
        res.render("instructorDashboard", { layout: false });
      }
    }
  );
});

//---------------------FEEEDBACK----------------
router.get("/feeds", function (req, res, next) {
  db.query(
    "SELECT course_id,instructor_id,feedback_message FROM gets WHERE instructor_id=?",
    [req.session.username],
    function (error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {
        res.render("instructorShowFeedback", { layout: false, data: results });
      } else {
        res.send("No feedbacks");
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
