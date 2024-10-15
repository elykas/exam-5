"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddlewareTeacher = exports.authMiddlewareStudent = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET;
const verifyTokenAndRole = (req, res, next, status) => {
    if (!JWT_SECRET) {
        throw new Error("JWT secret is not defined in the environment variables.");
    }
    const token = req.cookies.token;
    if (!token) {
        res.status(401).json({ message: 'Access token missing' });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.user = decoded;
        if (decoded.status !== status) {
            res.status(403).json({ message: `Access denied: Not a ${status}` });
            return;
        }
        next();
    }
    catch (error) {
        res.status(403).json({ message: 'Invalid token' });
    }
};
const authMiddlewareStudent = (req, res, next) => {
    verifyTokenAndRole(req, res, next, 'student');
};
exports.authMiddlewareStudent = authMiddlewareStudent;
const authMiddlewareTeacher = (req, res, next) => {
    verifyTokenAndRole(req, res, next, 'teacher');
};
exports.authMiddlewareTeacher = authMiddlewareTeacher;
