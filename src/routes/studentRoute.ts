import express, { Request, Router, Response, NextFunction } from "express";
import Student, { Grade, IStudent } from "../models/studentModel";
import {authMiddlewareStudent} from "../middleware/authMiddleware";
import {register} from "../controllers/studentController";

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

router.post("/register",register)
//router.get("/getGrades",authMiddlewareStudent,getStudentGrades)
//router.get("/getGradesAvg",authMiddlewareStudent,getStudentGradesAverage)
export default router;
