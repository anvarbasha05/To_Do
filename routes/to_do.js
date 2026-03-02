import express from "express";
import {createTodoSchema} from "../utils/validation.js"
import {validate} from "../middleware/validate.js"

import {createToDo, getToDo, getToDos, updateToDo, deleteToDo} from "../controllers/to_do.js"

const router = express.Router();

router.route("/create").post(validate(createTodoSchema), createToDo);
router.route("/get").get(getToDos);
router.route("/get_by_id/:id").get(getToDo);
router.route("/update_by_id/:id").patch(updateToDo);
router.route("/delete_by_id/:id").delete(deleteToDo);

export default router;