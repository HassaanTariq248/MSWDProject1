import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./error/error.js";
import reservationRouter from "./routes/reservationRoute.js";
import registrationRouter from "./routes/registerRoute.js";
import loginRouter from "./routes/loginRoute.js";

const app = express();
dotenv.config({ path: "./config/config.env" });

// Enable CORS for specific origin and methods
app.use(
    cors({
        origin: [process.env.FRONTEND_URL],
        methods: ["POST"],
        credentials: true,
    })
);

// Middleware to parse JSON and urlencoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/reservation", reservationRouter);
app.use("/api/v1/register", registrationRouter);
app.use("/api/v1/login", loginRouter);

// Establish database connection
dbConnection();

// Error handling middleware
app.use(errorMiddleware);

export default app;
