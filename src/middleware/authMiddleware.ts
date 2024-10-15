import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv"
import { log } from 'console';

dotenv.config();


const JWT_SECRET :string | undefined = process.env.JWT_SECRET;

const verifyTokenAndRole = (req: Request, res: Response, next: NextFunction, status: string): void => {
    
    if (!JWT_SECRET) {
        throw new Error("JWT secret is not defined in the environment variables.");
    }
    const token: string = req.cookies.token;
    if (!token) {
        
        res.status(401).json({ message: 'Access token missing' });
        return;
    }
    
    try {
        const decoded: any = jwt.verify(token, JWT_SECRET);
        (req as any).user = decoded;
        
        if (decoded.status !== status) {
            res.status(403).json({ message: `Access denied: Not a ${status}` });
            return;
        }
        
        next();
    } catch (error: any) {
        res.status(403).json({ message: 'Invalid token' });
    }
};


export const authMiddlewareStudent = (req: Request, res: Response, next: NextFunction): void => {
    verifyTokenAndRole(req, res, next, 'student');
};


export const authMiddlewareTeacher = (req: Request, res: Response, next: NextFunction): void => {
    verifyTokenAndRole(req, res, next, 'teacher');
};
 
