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
      } else {
        res.send("No Students");
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
        res.render("adminDashboard", { layout: false });
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
        res.render("adminDashboard", { layout: false });
        console.log("Inserted In instructor");
      }
    }
  );
});

router.get("/assignInstructor", function (req, res, next) {
  db.query(
    "SELECT course_id FROM course WHERE course_id NOT IN (SELECT course_id FROM offers)",
    function (error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {
        res.render("assignInstructor", { layout: false, data: results });
      }
      else {
        res.send("All courses are already assigned to instructor");
      }
    }
  );
});

router.post("/assignInstructor", function (req, res, next) {
  const instructor_id = parseInt(req.body.instructor_id);
  const course_id = req.body.course_id;
  db.query(
    "INSERT INTO offers SET instructor_id=?, course_id=?",
    [instructor_id, course_id],
    function (error, results, fields) {
      if (error) throw error;
      else {
        res.render("adminDashboard", { layout: false });
        console.log("Inserted In offers");
      }
    }
  );
});

router.get("/assignStudentbyAdmin", function (req, res, next) {
  var student_result;
  db.query(
    "SELECT student_id FROM student",
    [req.session.username],
    function (error, results, fields) {
      if (error) {
        throw error;
      } else if (results.length > 0) {
        student_result = results;
      }
      else {
        res.send("Student does not exist");
      }
    }
  );
  db.query(
    "SELECT course_id FROM course",
    [req.session.username],
    function (error, results, fields) {
      if (error) {
        throw error;
      } else if (results.length > 0) {
        res.render("assignStudentbyAdmin", {
          layout: false,
          data: results,
          data_student: student_result,
        });
      }
    }
  );
});

router.post("/assignStudentbyAdmin", function (req, res, next) {
  const student_id = parseInt(req.body.student_id);
  const course_id = req.body.course_id;
  db.query(
    "INSERT INTO takes SET student_id=?, course_id=?",
    [student_id, course_id],
    function (error, results, fields) {
      if (error) {
        res.send('<h2>Selected Student is already Enrolled in Selected Course!!</h2>');
      } else {
        console.log("Inserted In takes");
        db.query(
          "INSERT INTO assigns SET student_id=?, course_id=? ,admin_id=?",
          [student_id, course_id, req.session.username],
          function (error, results, fields) {
            if (error) {
                res.send('<h2>Selected Student is already Enrolled in Selected Course!!</h2>');
            } else {
              res.render("adminDashboard", { layout: false });
              console.log("Inserted In assigns");
            }
          }
        );
      }
    }
  );
});

router.get("/showCourse", function (req, res, next) {
  db.query(
    "SELECT course_id,course_name,credits FROM course",
    function (error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {
        res.render("showCourse", { layout: false, data: results });
      } else {
        res.send("No Course");
      }
    }
  );
});

router.get("/newAdminCourse", function (req, res, next) {
  res.render("newAdminCourse", { layout: false });
});

router.post("/newAdminCourse", function (req, res, next) {
  const course_id = req.body.course_id;
  const course_name = req.body.course_name;
  const credits = req.body.credits;
  const course_description = req.body.course_description;
  db.query(
    "INSERT INTO course SET course_id=?, course_name=?, credits=?, course_description=?",
    [course_id, course_name, credits, course_description],
    function (error, results, fields) {
      if (error) throw error;
      else {
        res.render("adminDashboard", { layout: false, data: results });
        console.log("Inserted In Course");
      }
    }
  );
});

router.get("/finalGrading", function (req, res, next) {
  db.query("SELECT * FROM assigns", function (error, results, fields) {
    if (error) throw error;
    else {
      res.render("finalGrading", { layout: false, data: results });
    }
  });
});

router.post("/finalGrading", function (req, res, next) {
  db.query(
    "UPDATE assigns SET performance=? WHERE course_id=? AND student_id=?",
    [req.body.grade, req.body.course_id, req.body.student_id],
    function (error, results, fields) {
      if (error) throw error;
      else {
        db.query(
          "DELETE FROM have WHERE course_id=? AND student_id=?",
          [req.body.course_id, req.body.student_id],
          function (error, results, fields) {
            if (error) throw error;
            else {
              console.log("deleted from have");
              db.query(
                "DELETE FROM takes WHERE course_id=? AND student_id=?",
                [req.body.course_id, req.body.student_id],
                function (error, results, fields) {
                  if (error) throw error;
                  else {
                    console.log("deleted from takes");
                    res.render("adminDashboard", { layout: false });
                  }
                }
              );
            }
          }
        );
      }
    }
  );
});

module.exports = router;
