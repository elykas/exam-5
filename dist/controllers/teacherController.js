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
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerTeacher = void 0;
const teacherService_1 = require("../services/teacherService");
const response_1 = require("../types/response");
const registerTeacher = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const addedTeacher = yield (0, teacherService_1.createTeacherService)(req.body);
        if (!addedTeacher) {
            res.status(404).json(new response_1.ResponseStructure(false, "teacher falled to create"));
        }
        res.status(201).json(new response_1.ResponseStructure(true, addedTeacher));
    }
    catch (error) {
        next(error);
    }
});
exports.registerTeacher = registerTeacher;
