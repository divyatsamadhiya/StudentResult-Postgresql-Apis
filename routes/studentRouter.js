const router = require("express").Router();

const {
    addStudent,
    csvUpload,
    studentResult,
    resultStatus,
} = require("../controllers/studentController");

router.post("/students", addStudent);
router.post("/upload", csvUpload);
router.get("/students/:id/result", studentResult);
router.get("/students", resultStatus);

module.exports = router;
