class ErrorHandler extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode= statusCode;

    }
}
// error.js (error handling middleware)
export const errorMiddleware = (err, req, res, next) => {
    // Handle errors here
    console.error(err); // Log the error for debugging purposes

    // Send an appropriate error response
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
};

export default ErrorHandler;