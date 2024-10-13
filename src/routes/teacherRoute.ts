import express, { Request, Router, Response, NextFunction } from "express";
import Teacher, {  ITeacher} from "../models/teacherModel";
import {registerTeacher } from "../controllers/teacherController";
const router: Router = express.Router();

/** @swagger 
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

router.post("/register",registerTeacher)
//router.get("/getGrades",authMiddlewareStudent,getStudentGrades)
//router.get("/getGradesAvg",authMiddlewareStudent,getStudentGradesAverage)
export default router;
