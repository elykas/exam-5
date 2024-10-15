import express from "express";
import dotenv from "dotenv";
import studentRouter from "./routes/studentRoute";
import teacherRouter from "./routes/teacherRoute";
import gradesRoutes from "./routes/gradeRoutes"
import authRouter from "./routes/authRouter";
import { errorHandler } from "./middleware/errorHandler";
import connectDB from "./config/db";
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from "./swagger";
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();
// Middleware
app.use(express.json());
app.use(cookieParser());
app.use('/swagger',swaggerUi.serve,swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api/login",authRouter)
app.use("/api/student", studentRouter);
app.use("/api/teacher", teacherRouter);
app.use("/api/grades",gradesRoutes)

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
