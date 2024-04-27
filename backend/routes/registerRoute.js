import express from "express";
import { registerUser } from "../controller/registration.js";

const router = express.Router();

// Define route for user registration
router.post('/register', registerUser);

export default router;
