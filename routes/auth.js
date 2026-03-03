import express from "express";
import {signupSchema, loginSchema} from "../utils/validation.js"
import {validate} from "../middleware/validate.js"

import {signUpUser, loginUser} from "../controllers/user.js"

const router = express.Router();

router.route("/signup").post(validate(signupSchema), signUpUser);
router.route("/login").post(validate(loginSchema), loginUser);

export default router;