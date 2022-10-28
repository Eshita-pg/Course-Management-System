var express = require("express");
var router = express.Router();
var db = require("../connection");
var course_id;
var instructor_id;
var feedback;
var rate = 4;
router.post("/", function (req, res, next) {
 course_id = req.body.course_id;
 console.log("1111" + course_id);
  res.render("feedback", { layout: false});

});

router.post("/giveFeedback", function (req, res, next) {
    db.query(
        "SELECT instructor_id FROM offers WHERE course_id=?",[course_id],
        function (error, results, fields) {
          if (error) {
            console.log("error ocurred", error);
          } else {
            var resultArray = Object.values(JSON.parse(JSON.stringify(results)));
            instructor_id = parseInt(resultArray[0].instructor_id);
            console.log("###" + instructor_id);
          }
        }
      );
    db.query(
        "SELECT MAX(feedback_id) AS A FROM feedback",
        function (error, results, fields) {
          if (error) {
            console.log("error ocurred", error);
          } else {
            var resultArray = Object.values(JSON.parse(JSON.stringify(results)));
            feedback = parseInt(resultArray[0].A) +1 ;
            console.log(resultArray[0].A);
            console.log("###" + feedback);
          }
        }
      );
     
      db.query(
        "INSERT INTO feedback SET rate=?, feedback_id=?", [rate, feedback],
        function (error, results, fields) {
          if (error) {console.log(error); 
             } 
          else {
            // res.render("studentDashboard", { layout: false });
            console.log("DONE");
          }
        }
      );

    //   db.query(
    //     "INSERT INTO gets SET instructor_id=?, course_id=?, feedback_id=?, feedback_message=? ",
    //     [req.body.feedbackText],
    //     function (error, results, fields) {
    //       if (error) throw error;
    //       if (results.length > 0) {
    //         res.render("studentDashboard", { layout: false });
    //       }
    //     }
    //   );
    res.render("studentDashboard", { layout: false });
    });
    


module.exports=router;