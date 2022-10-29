var express = require("express");
var router = express.Router();
var db = require("../connection");

router.get("/faculty", function (req, res, next) {
    db.query(
        "SELECT * FROM instructor",
        [req.session.username],
        function (error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
                res.render("faculty", { layout: false, data: results });
            }
        }
    );
});

router.get("/course_instructor", function (req, res, next) {
    db.query(
        "SELECT * FROM course NATURAL JOIN offers NATURAL JOIN instructor",
        [req.session.username],
        function (error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
                res.render("course_instructor", { layout: false, data: results });
            }
        }
    );
});


module.exports = router;
