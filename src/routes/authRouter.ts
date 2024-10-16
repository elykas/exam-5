import express,{Router} from "express";
import { loginController } from "../controllers/authController"; 

const router:Router = express.Router();

/**
 * @swagger
 * /api/login:
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

router.route('/').post(loginController);

export default router;