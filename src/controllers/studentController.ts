import { Request, Response, NextFunction } from "express";
import { createStudentService} from "../services/studentService";
import Student from "../models/studentModel";
import jwt from "jsonwebtoken";
import cookieParse from "cookie-parser";
import {ResponseStructure} from "../types/response"


export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const addedUser = await createStudentService(req.body);
      res.status(201).json(new ResponseStructure(true, addedUser));
    } catch (error) {
      next(error);  
    }
  };
