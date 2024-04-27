import mongoose from "mongoose";
import validator from "validator";

const registrationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Provide a valid email!"],
  },
  password: {
    type: String,
    required: true,
    minLength: [6, "Password must contain at least 6 characters!"],
    maxLength: [30, "Password cannot exceed 30 characters!"],
  },
  confirmPassword: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        // 'this' refers to the document
        return value === this.password;
      },
      message: "Passwords do not match!",
    },
  },
});

export const Registration = mongoose.model("Registration", registrationSchema);
