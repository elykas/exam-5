"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const gradeController_1 = require("../controllers/gradeController");
const router = express_1.default.Router();
/**
 * @swagger
 * /api/grades:
 *   post:
 *     summary: "Add a grade"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               grade:
 *                 type: number
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: "Successfully added grade"
 *       401:
 *         description: "Unauthorized"
 */
/**
 * @swagger
 * /api/grades:
 *   put:
 *     summary: "Update a grade"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               grade:
 *                 type: number
 *     responses:
 *       200:
 *         description: "Successfully updated grade"
 *       401:
 *         description: "Unauthorized"
 */
/**
 * @swagger
 * /api/grades:
 *   get:
 *     summary: "Retrieve all users and their grades"
 *     responses:
 *       200:
 *         description: "A JSON array of users and their grades"
 *       404:
 *         description: "No users found"
 *       500:
 *         description: "Server error"
 */
/**
 * @swagger
 * /api/grades/averageGrades:
 *   get:
 *     summary: "Retrieve average grades for all users"
 *     responses:
 *       200:
 *         description: "A JSON array of users with their average grades"
 *       404:
 *         description: "No users found"
 *       500:
 *         description: "Server error"
 */
/**
 * @swagger
 * /api/grades/{email}:
 *   get:
 *     summary: "Retrieve a student's grades by email"
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: "The email of the student"
 *     responses:
 *       200:
 *         description: "A JSON object of the student's grades"
 *       404:
 *         description: "Student not found"
 *       500:
 *         description: "Server error"
 */
router.use(authMiddleware_1.authMiddlewareTeacher);
router.post("/", gradeController_1.addGrade);
router.put("/", gradeController_1.editGrade);
router.get("/", gradeController_1.getAllUsersGrades);
router.get("/:email", gradeController_1.getGradesByEmail);
router.get("/averageGrades", gradeController_1.getClassGradesAverage);
exports.default = router;
