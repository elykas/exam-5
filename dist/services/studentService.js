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
exports.createStudentService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const studentModel_1 = __importDefault(require("../models/studentModel"));
const teacherModel_1 = require("../models/teacherModel");
const createStudentService = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = bcrypt_1.default.hashSync(userData.password, 10);
    const existClass = yield teacherModel_1.Class.findOne({ className: userData.class });
    if (!existClass) {
        return null;
    }
    const newStudent = yield studentModel_1.default.create({
        fullName: userData.fullName,
        email: userData.email,
        password: hashedPassword,
        class: existClass._id,
        grades: []
    });
    existClass.students.push(newStudent._id);
    existClass.save();
    return newStudent;
});
exports.createStudentService = createStudentService;
