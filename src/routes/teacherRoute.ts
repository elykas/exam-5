import express, { Request, Router, Response, NextFunction } from "express";
import Teacher, {  ITeacher} from "../models/teacherModel";
import {registerTeacher } from "../controllers/teacherController";
const router: Router = express.Router();

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

router.post("/register",registerTeacher)

export default router;
