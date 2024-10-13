import { Request, Response, NextFunction } from "express";
import { createStudentService} from "../services/studentService";
import Student,{IStudent} from "../models/studentModel";
import jwt from "jsonwebtoken";
import cookieParse from "cookie-parser";
import {ResponseStructure} from "../types/response"


export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const addedUser = await createStudentService(req.body);
      if(!addedUser){
        res.status(404).json(new ResponseStructure(false,"user not found"))
      }
      res.status(201).json(new ResponseStructure(true, addedUser));
    } catch (error) {
      next(error);  
    }
  };

  export const getStudentGrades = async(req: any, res: Response) => {
    try {
        
        const studentEmail = req.body.email;
        const student: IStudent | null = await Student.findOne(
          { email: studentEmail },
          { fullName: 1, grades: 1 } 
        );
        if (!student) {
             res.status(404).json(new ResponseStructure(false, "Student not found"));
             return
          }
          res.status(200).json(new ResponseStructure(true,"all grades"));
    } catch (error) {
        res.status(500).json({ message: "Server error", success: false });
    }
  }
 
  
