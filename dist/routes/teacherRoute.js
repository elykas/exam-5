"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const teacherController_1 = require("../controllers/teacherController");
const router = express_1.default.Router();
/**
* @swagger
* /api/teacher/register:
*   post:
*     summary: "Register a teacher and create class"
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               fullName:
*                 type: string
*               email:
*                 type: string
*               password:
*                 type: string
*               class:
*                 type: string
*     responses:
*       201:
*         description: "A JSON object id of the class"
*   /student/getGradesAvg:
*   get:
*     summary: "Retrieve user grades avg"
*     responses:
*       200:
*         description: "A JSON array of users"
*       404:
*         description: "No users found"
*       500:
*         description: "Server error"
* @swagger
*   /student/getGrades:
*   get:
*     summary: "Retrieve user grades"
*     responses:
*       200:
*         description: "A JSON array of users"
*       404:
*         description: "No users found"
*       500:
*         description: "Server error"
*/
router.post("/register", teacherController_1.registerTeacher);
//router.get("/getGrades",authMiddlewareStudent,getStudentGrades)
//router.get("/getGradesAvg",authMiddlewareStudent,getStudentGradesAverage)
exports.default = router;
