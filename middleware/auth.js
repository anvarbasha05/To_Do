import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

export const verifyAuth = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: "Not authorized, token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("_id");
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Not authorized, token invalid" });
  }
};

export const getUserIdFromToken = async (token) => {
  if (!token) throw new Error("Token missing");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("_id");
    if (!user) throw new Error("User not found");
    return user._id;
  } catch (err) {
    throw new Error("Invalid token");
  }
};