import mongoose from "mongoose";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

const SECRET_KEY = process.env.CRYPTO_SECRET_KEY;

const algorithm = "aes-256-cbc"; 
const ivLength = 16; 

const encryptPassword = (password) => {
  const iv = crypto.randomBytes(ivLength);
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(SECRET_KEY, "utf-8"), iv);
  let encrypted = cipher.update(password, "utf-8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + ":" + encrypted; 
};


const decryptPassword = (encrypted) => {
  const [ivHex, encryptedText] = encrypted.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(SECRET_KEY, "utf-8"), iv);
  let decrypted = decipher.update(encryptedText, "hex", "utf-8");
  decrypted += decipher.final("utf-8");
  return decrypted;
};

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true }, 
  },
  { timestamps: true }
);


userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return;
  this.password = encryptPassword(this.password);
});


userSchema.methods.matchPassword = function (enteredPassword) {
  const decrypted = decryptPassword(this.password);
  return decrypted === enteredPassword;
};

const User = mongoose.model("User", userSchema);
export default User;