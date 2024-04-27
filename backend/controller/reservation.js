import ErrorHandler from "../error/error.js";
import { Reservation } from "../models/reservationSchema.js";

export const sendReservation = async (req, res, next) => {
    const { firstName, lastName, email, phone, date, time } = req.body;
    
    // Validate incoming data
    if (!firstName || !lastName || !email || !phone || !date || !time) {
        return next(new ErrorHandler("Please fill the full reservation form!", 400));
    }

    try {
        // Create a new reservation in the database
        await Reservation.create({ firstName, lastName, email, phone, date, time });
        // Send success response
        res.status(200).json({
            success: true,
            message: "Reservation sent successfully!"
        });
    } catch (error) {
        // Handle validation errors
        if (error.name === "ValidationError") {
            const validationErrors = Object.values(error.errors).map(err => err.message);
            return next(new ErrorHandler(validationErrors.join(" , "), 400));
        }
        // Pass other errors to the error handler middleware
        return next(error);
    }
};

