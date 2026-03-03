import express from "express";
import {createTodoSchema} from "../utils/validation.js"
import {validate} from "../middleware/validate.js"
import {verifyAuth} from "../middleware/auth.js"

import {createToDo, getToDo, getToDos, updateToDo, deleteToDo} from "../controllers/to_do.js"

const router = express.Router();

router.post("/create", verifyAuth, validate(createTodoSchema), createToDo);

router.get("/get", verifyAuth, getToDos);

router.get("/get_by_id/:id", verifyAuth, getToDo);

router.patch("/update_by_id/:id", verifyAuth, updateToDo);

router.delete("/delete_by_id/:id", verifyAuth, deleteToDo);

export default router;