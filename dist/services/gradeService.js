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
exports.checkIfTeacherClass = exports.editGradeService = exports.addGradeService = exports.findStudentByEmail = void 0;
const studentModel_1 = __importDefault(require("../models/studentModel"));
const teacherModel_1 = __importDefault(require("../models/teacherModel"));
const findStudentByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield studentModel_1.default.findOne({ email: email });
    if (!user) {
        return null;
    }
    return user;
});
exports.findStudentByEmail = findStudentByEmail;
const addGradeService = (data, teacherId, student) => __awaiter(void 0, void 0, void 0, function* () {
    const isSameClass = yield (0, exports.checkIfTeacherClass)(teacherId, student);
    if (!isSameClass) {
        return null;
    }
    student.grades.push(data);
    yield student.save();
    return student;
});
exports.addGradeService = addGradeService;
const editGradeService = (data, teacherId, student) => __awaiter(void 0, void 0, void 0, function* () {
    const isSameClass = yield (0, exports.checkIfTeacherClass)(teacherId, student);
    if (!isSameClass) {
        return null;
    }
    yield studentModel_1.default.updateOne({ email: student.email }, { $set: { "grades.$.grade": data.grade } });
    return student;
});
exports.editGradeService = editGradeService;
const checkIfTeacherClass = (teacherId, student) => __awaiter(void 0, void 0, void 0, function* () {
    const teacher = yield teacherModel_1.default.findById(teacherId);
    if (!teacher) {
        return null;
    }
    if (teacher.class._id !== student.class._id) {
        throw new Error("Teacher does not in this class");
        return;
    }
    return true;
});
exports.checkIfTeacherClass = checkIfTeacherClass;
