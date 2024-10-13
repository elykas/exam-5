import express from "express";
import { authMiddlewareTeacher } from "../middleware/authMiddleware.js";
import { addGrade, editGrade, getAllUsers, getAllUsersGrades, getAllUsersGradesAverage, removeGrade, removeStudent } from "../controllers/teacherController.js";
const router = express.Router();
/**
 * @swagger
 *  /teacher:
 *   post:
 *     summary: "Add grade"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               passportId:
 *                 type: string
 *               subject:
 *                 type: string
 *               grade:
 *                 type: number
 *     responses:
 *       200:
 *         description: "Successfully added grade"
 *       401:
 *         description: "Unauthorized"
 *
 *   delete:
 *     summary: "Delete grade"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               passportId:
 *                 type: string
 *               subject:
 *                 type: string
 *               grade:
 *                 type: number
 *     responses:
 *       200:
 *         description: "Successfully deleted grade"
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
 *               passportId:
 *                 type: string
 *               subject:
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
 *   /teacher/users:
 *   get:
 *     summary: "Retrieve all users"
 *     responses:
 *       200:
 *         description: "A JSON array of users"
 *       404:
 *         description: "No users found"
 *       500:
 *         description: "Server error"
 *
 * @swagger
 *   /teacher/userGrades:
 *   get:
 *     summary: "Retrieve all users"
 *     responses:
 *       200:
 *         description: "A JSON array of users"
 *       404:
 *         description: "No users found"
 *       500:
 *         description: "Server error"
 * @swagger
 *   /teacher/userGradesAvg:
 *   get:
 *     summary: "Retrieve all users"
 *     responses:
 *       200:
 *         description: "A JSON array of users"
 *       404:
 *         description: "No users found"
 *       500:
 *         description: "Server error"
 *
 * @swagger
 *   /teacher/user:
 *   delete:
 *     summary: "Delete user"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               passportId:
 *                 type: string
 *     responses:
 *       200:
 *         description: "Successfully deleted grade"
 *       401:
 *         description: "Unauthorized"
 */
router.use(authMiddlewareTeacher);
router.post("/", addGrade);
router.delete("/", removeGrade);
router.put("/", editGrade);
router.get("/users", getAllUsers);
router.get("/userGrades", getAllUsersGrades);
router.get("/userGradesAvg", getAllUsersGradesAverage);
router.delete("/user", removeStudent);
export default router;
