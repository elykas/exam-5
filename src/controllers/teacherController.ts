import { Request, Response, NextFunction } from "express";
import { createTeacherService} from "../services/teacherService";
import Student from "../models/studentModel";
import jwt from "jsonwebtoken";
import cookieParse from "cookie-parser";
import {ResponseStructure} from "../types/response"


export const registerTeacher = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const addedTeacher = await createTeacherService(req.body);
      if(!addedTeacher){
        res.status(404).json(new ResponseStructure(false,"teacher falled to create"))
      }
      res.status(201).json(new ResponseStructure(true, addedTeacher));
    } catch (error) {
      next(error);  
    }
  };
