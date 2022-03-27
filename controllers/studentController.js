const Student = require("../models/studentModel");
const studentSchema = require("../validators");
const csvtojson = require("csvtojson");

const addStudent = async (req, res) => {
    const { error } = studentSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0]);
    try {
        const { Name, Age, Mark1, Mark2, Mark3 } = req.body;
        const student = await Student.create(req.body);
        res.status(201).json({ student });
    } catch (error) {
        console.log(error);
    }
};

const csvUpload = async (req, res) => {
    try {
        var studentArr = [];
        csvtojson()
            .fromFile("./students.csv")
            .then((source) => {
                for (let i = 0; i < source.length; i++) {
                    const oneRow = {
                        Name: source[i]["Name"],
                        Age: source[i]["Age"],
                        Mark1: source[i]["Mark1"],
                        Mark2: source[i]["Mark2"],
                        Mark3: source[i]["Mark3"],
                    };
                    studentArr.push(oneRow);
                }
                Student.bulkCreate(studentArr)
                    .then((result) => res.status(201).json({ result }))
                    .catch((error) =>
                        res.status(400).send("Invalid data format")
                    );
            });
    } catch (error) {
        console.log(error);
    }
};

const studentResult = async (req, res) => {
    try {
        const id = req.params.id;
        const student = await Student.findAll({ where: { id: id } });
        if (student.length > 0) {
            const { Name, Mark1, Mark2, Mark3 } = student[0];
            if (Mark1 + Mark2 + Mark3 > 140) {
                var result = "Passed";
            } else {
                var result = "Failed";
            }
            res.status(200).json({ Name, Mark1, Mark2, Mark3, Result: result });
        } else {
            res.status(200).json({ msg: "No Student found" });
        }
    } catch (error) {
        console.log(error);
    }
};

const resultStatus = async (req, res) => {
    try {
        const search = req.query.resultStatus;
        var students = await Student.findAll({});
        students = students.filter((student) => {
            if (search === "passed")
                return student.Mark1 + student.Mark2 + student.Mark3 >= 140;
            else if (search === "failed")
                return student.Mark1 + student.Mark2 + student.Mark3 < 140;
            else return;
        });
        res.status(200).json({ students });
    } catch (error) {
        console.log(error);
    }
};

module.exports = { addStudent, csvUpload, studentResult, resultStatus };
