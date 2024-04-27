import express from "express";
import { loginUser } from "../controller/login.js";

const router = express.Router();

// Define route for user login
router.post('/login', loginUser);

export default router;
