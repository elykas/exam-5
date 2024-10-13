import express from "express";
import { authMiddlewareTeacher } from "../middleware/authMiddleware.js";
import { addGrade, editGrade, getAllUsers as getAllStudents, getAllUsersGrades as getStudentGrade, getAllUsersGradesAverage, removeGrade, removeStudent } from "../controllers/teacherController.js";
const router = express.Router();
/**
 * @swagger
 *  /api/grades:
 *   post:
 *     summary: "Add grade"
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
 *                 type:string
 *     responses:
 *       200:
 *         description: "Successfully added grade"
 *       401:
 *         description: "Unauthorized"
 *
 
 *   put:
 *     summary: "Update grade"
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
 *
 * @swagger
 * /api/grades:
 *   get:
 *     summary: "Retrieve all users"
 *     responses:
 *       200:
 *         description: "A JSON array of users and them grades"
 *       404:
 *         description: "No users found"
 *       500:
 *         description: "Server error"
 *
 * @swagger
 * /api/grades/averageGrades:
 *   get:
 *     summary: "Retrieve all average grades"
 *     responses:
 *       200:
 *         description: "A JSON array of users"
 *       404:
 *         description: "No users found"
 *       500:
 *         description: "Server error"
 * @swagger
 * /api/grades/:email
 *   get:
 *     summary: "Retrieve a student grade for teacher"
 *     responses:
 *       200:
 *         description: "A JSON array of users"
 *       404:
 *         description: "No users found"
 *       500:
 *         description: "Server error"
 *
 */
router.use(authMiddlewareTeacher);
router.post("/", addGrade);
router.put("/", editGrade);
router.get("/", getAllStudents);
router.get("/:email", getStudentGrade);
router.get("/averageGrades", getAllUsersGradesAverage);
export default router;
