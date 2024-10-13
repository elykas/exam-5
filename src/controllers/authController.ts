import { Request, Response, NextFunction } from "express";
import { loginUser } from "../services/authService";
import Student from "../models/studentModel.js";
import Teacher from "../models/teacherModel.js";
import jwt from "jsonwebtoken";
import cookieParse from "cookie-parser";
import {ResponseStructure} from "../types/response"


import dotenv from "dotenv"


dotenv.config();
const JWT_SECRET: string | undefined = process.env.JWT_SECRET;


export const loginController = async (req: Request, res: Response,next:NextFunction) => {
  try {
    if(!JWT_SECRET){
        throw new Error("Something is wrong with jwt")
    }
    const { email, password } = req.body;
    const result = await loginUser(email, password);
    if (!result) {
       res.status(401).json({ message: "Wrong credentials" });
       return
    }
    const { user, userType } = result; 

    const token = jwt.sign(
      { _id: user._id, status: userType }, 
      JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 360000, 
      sameSite: "strict",
    });
    res.json({ token }); 
  } catch (error: any) {
    next(error); 
};
}