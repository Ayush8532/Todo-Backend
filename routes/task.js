import express from "express";
import { deletetask, getAlltask, newTask, updatetask } from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();


router.post("/new", isAuthenticated, newTask);
router.get("/my", isAuthenticated, getAlltask);
router.route("/:id").put(isAuthenticated,updatetask).delete(isAuthenticated,deletetask);

export default router;
