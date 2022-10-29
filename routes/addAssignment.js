var express = require("express");
var router = express.Router();
var db = require("../connection");

router.get("/addForm", function (req, res, next) {
  res.render("addAssignment", { layout: false });
});


router.post("/add", function (req, res, next) {
    db.query(
        "INSERT INTO assignment SET assignment_id=?",
        [req.body.assignment_id],
        function (error, results, fields) {
            if (error) throw error;
            else {
                console.log("Assignment Inserted");
            }
        }
    );
    
    db.query(
        "SELECT DISTINCT student_id FROM have  WHERE course_id=?",
        [req.body.course_id],
        function (error, results, fields) {
            if (error) throw error;
            else {
                var resultArray = Object.values(JSON.parse(JSON.stringify(results)));
                resultArray.forEach(element => {
                    console.log(parseInt(element.student_id));
                    db.query(
                        "INSERT INTO have (assignment_id,course_id,student_id) values (?,?,?)",
                        [req.body.assignment_id,req.body.course_id,parseInt(element.student_id)],
                        function (error, results, fields) {
                            if (error) throw error;
                            else {
                                console.log("Inserted");
                            }
                        }
                    );
                });

               res.render("instructorDashboard", { layout: false });
            }
        }
    );
});

router.get("/removeForm", function (req, res, next) {
    res.render("RemoveAssignment", { layout: false });
  });
  
  

router.post("/remove", function (req, res, next) {
    db.query(
        "DELETE FROM have WHERE assignment_id=?",
        [req.body.assignment_id],
        function (error, results, fields) {
            if (error) throw error;
            else {
                console.log("Assignment removed");
            }
        }
    );
    db.query(
        "DELETE FROM assignment WHERE assignment_id=?",
        [req.body.assignment_id],
        function (error, results, fields) {
            if (error) throw error;
            else {
                console.log("Assignment removed");
                 res.render("instructorDashboard", { layout: false });

            }
        }
    );
});

module.exports = router;
