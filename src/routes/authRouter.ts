import express,{Router} from "express";
import { loginController } from "../controllers/authController"; 

const router:Router = express.Router();

/**
 * @swagger
 * /register:
 *   post:
 *     summary: "Register a user"
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
 *         description: "A JSON object of the user"
 *
 * /login:
 *   post:
 *     summary: "Log in a user"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: "Successful login"
 *       401:
 *         description: "Unauthorized"
*/

router.route('/login').post(loginController);

export default router;