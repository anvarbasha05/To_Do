import mongoose from "mongoose";
import User from "../models/user.js";
import {generateToken} from "../middleware/auth.js"


export const signup = async (params) => {
  const { username, email, password } = params;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return { success: false, message: "User already exists" };

    const user = await User.create({ username, email, password });
   return { success: true, message: "User created successfully" };
  } catch (err) {
    return { success: false, message: err.message };
  }
};


export const login = async (params) => {
  const { email, password } = params;

  try {
    const user = await User.findOne({ email });
    if (!user) return { success: false, message: "Invalid credentials" };

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return { success: false, message: "Invalid credentials" };

    const token = generateToken(user._id);
   return { success: true, token };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

export default {
login,
signup
};