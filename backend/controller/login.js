import ErrorHandler from "../error/error.js";
import { Login } from "../models/loginSchema.js";

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            throw new ErrorHandler("Please provide both email and password!", 400);
        }

        const login = await Login.findOne({ email });
        if (!login) {
            throw new ErrorHandler("Invalid email or password!", 401);
        }

        const isPasswordMatch = await login.comparePassword(password);
        if (!isPasswordMatch) {
            throw new ErrorHandler("Invalid email or password!", 401);
        }

        res.status(200).json({
            success: true,
            message: "Login successful!",
        });
    } catch (error) {
        next(error);
    }
};
