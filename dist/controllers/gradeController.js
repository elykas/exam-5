"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGradesByEmail = exports.getClassGradesAverage = exports.getAllUsersGrades = exports.editGrade = exports.addGrade = void 0;
const studentModel_1 = __importDefault(require("../models/studentModel"));
const gradeService_1 = require("../services/gradeService");
const response_1 = require("../types/response");
const teacherModel_1 = __importDefault(require("../models/teacherModel"));
const addGrade = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body.email;
        const user = yield (0, gradeService_1.findStudentByEmail)(userId);
        if (!user) {
            res.status(404).json(new response_1.ResponseStructure(false, "student not found"));
            return;
        }
        const { grade, message } = req.body;
        const addedGrade = yield (0, gradeService_1.addGradeService)(req.body, req.user._id, user);
        res.status(200).json(new response_1.ResponseStructure(true, exports.addGrade));
    }
    catch (error) {
        res.status(500).json({ message: "Server error", success: false });
    }
});
exports.addGrade = addGrade;
const editGrade = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body.email;
        const student = yield (0, gradeService_1.findStudentByEmail)(userId);
        if (!student) {
            res.status(404).json(new response_1.ResponseStructure(false, "student not found"));
            return;
        }
        const updatedGrade = yield (0, gradeService_1.editGradeService)(student, req.user._id, student);
        if (!updatedGrade) {
            res
                .status(400)
                .json(new response_1.ResponseStructure(false, "grade are required"));
            return;
        }
        res
            .status(200)
            .json(new response_1.ResponseStructure(true, "grade updated successfully"));
    }
    catch (error) {
        res.status(500).json({ message: "Server error", success: false });
    }
});
exports.editGrade = editGrade;
const getAllUsersGrades = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teacher = yield teacherModel_1.default.findById(req.user._id).populate({
            path: "class",
            select: "className"
        });
        if (!teacher) {
            res.status(404).json(new response_1.ResponseStructure(false, "teacher not found"));
            return;
        }
        const students = yield studentModel_1.default.find({ class: teacher.class._id }, { grades: 1, _id: 0 });
        if (students.length === 0) {
            res.status(404).json({ message: "No users found", success: false });
            return;
        }
        res.status(200).json(new response_1.ResponseStructure(true, "all grades"));
    }
    catch (error) {
        res.status(500).json({ message: "Server error", success: false });
    }
});
exports.getAllUsersGrades = getAllUsersGrades;
const getClassGradesAverage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teacher = yield teacherModel_1.default.findById(req.user._id).populate({
            path: "class",
            select: "className"
        });
        if (!teacher) {
            res.status(404).json(new response_1.ResponseStructure(false, "teacher not found"));
            return;
        }
        const averages = yield studentModel_1.default.aggregate([
            { $match: { class: teacher.class._id } },
            { $unwind: { path: "$grades", preserveNullAndEmptyArrays: true } },
            {
                $group: {
                    _id: "$_id",
                    averageGrade: { $avg: "$grades.grade" },
                },
            },
            {
                $project: {
                    userId: "$_id",
                    averageGrade: 1,
                    _id: 0,
                },
            },
        ]);
        if (averages.length === 0) {
            res.status(404).json({ message: "No users found", success: false });
            return;
        }
        res.status(200).json(new response_1.ResponseStructure(true, averages));
    }
    catch (error) {
        res.status(500).json({ message: "Server error", success: false });
    }
});
exports.getClassGradesAverage = getClassGradesAverage;
const getGradesByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teacher = yield teacherModel_1.default.findById(req.user._id).populate({
            path: "class",
            select: "className"
        });
        if (!teacher) {
            res.status(404).json(new response_1.ResponseStructure(false, "teacher not found"));
            return;
        }
        const email = req.params.email;
        const student = yield studentModel_1.default.findOne({ email: email }, { fullName: 1, grades: 1 });
        if (!student) {
            res.status(404).json(new response_1.ResponseStructure(false, "Student not found"));
            return;
        }
        if (student.class.toString() !== teacher.class._id.toString()) {
            res.status(400).json(new response_1.ResponseStructure(false, "You are not allowed"));
            return;
        }
        res.status(200).json(new response_1.ResponseStructure(true, "all grades"));
    }
    catch (error) {
        res.status(500).json({ message: "Server error", success: false });
    }
});
exports.getGradesByEmail = getGradesByEmail;
