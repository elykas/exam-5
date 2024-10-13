"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = void 0;
const authService_1 = require("../services/authService");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET;
const loginController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!JWT_SECRET) {
            throw new Error("Something is wrong with jwt");
        }
        const { email, password } = req.body;
        const result = yield (0, authService_1.loginUser)(email, password);
        if (!result) {
            res.status(401).json({ message: "Wrong credentials" });
            return;
        }
        const { user, userType } = result;
        const token = jsonwebtoken_1.default.sign({ _id: user._id, status: userType }, JWT_SECRET, { expiresIn: "1d" });
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 360000,
            sameSite: "strict",
        });
        res.json({ token });
    }
    catch (error) {
        next(error);
    }
    ;
});
exports.loginController = loginController;
