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
exports.getStudentGrades = exports.register = void 0;
const studentService_1 = require("../services/studentService");
const studentModel_1 = __importDefault(require("../models/studentModel"));
const response_1 = require("../types/response");
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const addedUser = yield (0, studentService_1.createStudentService)(req.body);
        if (!addedUser) {
            res.status(404).json(new response_1.ResponseStructure(false, "user not found"));
        }
        res.status(201).json(new response_1.ResponseStructure(true, addedUser));
    }
    catch (error) {
        next(error);
    }
});
exports.register = register;
const getStudentGrades = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentEmail = req.body.email;
        const student = yield studentModel_1.default.findOne({ email: studentEmail }, { fullName: 1, grades: 1 });
        if (!student) {
            res.status(404).json(new response_1.ResponseStructure(false, "Student not found"));
            return;
        }
        res.status(200).json(new response_1.ResponseStructure(true, "all grades"));
    }
    catch (error) {
        res.status(500).json({ message: "Server error", success: false });
    }
});
exports.getStudentGrades = getStudentGrades;
