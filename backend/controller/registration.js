import ErrorHandler from "../error/error.js";
import { Registration } from "../models/registerSchema.js";

export const registerUser = async (req, res, next) => {
    const { email, password, confirmPassword } = req.body;

    // Validate incoming data
    if (!email || !password || !confirmPassword) {
        // If any of the required fields are missing, return a bad request error
        return next(new ErrorHandler("Please fill the entire registration form!", 400));
    }

    try {
        // Check if the user already exists
        const existingUser = await Registration.findOne({ email });
        if (existingUser) {
            // If a user with the provided email already exists, return a conflict error
            return next(new ErrorHandler("User with this email already exists!", 409));
        }

        // Create a new user in the database
        await Registration.create({ email, password, confirmPassword });

        // Send success response
        res.status(201).json({
            success: true,
            message: "Registration successful!"
        });
    } catch (error) {
        // Pass any errors to the error handler middleware
        return next(error);
    }
};
