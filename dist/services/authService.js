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
exports.loginUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const teacherModel_1 = __importDefault(require("../models/teacherModel"));
const studentModel_1 = __importDefault(require("../models/studentModel"));
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield studentModel_1.default.findOne({ email });
    let userType = "student";
    if (!user) {
        user = yield teacherModel_1.default.findOne({ email });
        userType = "teacher";
    }
    if (!user)
        return null;
    const isMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!isMatch)
        return null;
    return { user, userType };
});
exports.loginUser = loginUser;
