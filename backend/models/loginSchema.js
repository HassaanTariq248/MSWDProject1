import mongoose from "mongoose";
import validator from "validator";

const loginSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Provide a valid email!"],
  },
  password: {
    type: String,
    required: true,
    minLength: [6, "Password must contain at least 6 characters!"],
    maxLength: [30, "Password cannot exceed 30 characters!"],
  },
});

export const Login = mongoose.model("Login", loginSchema);
