import express from "express";
import { authMiddleware } from "../middlewares/auth.js";
import { createTask, deleteTask, getTasks, updateTask } from "../controllers/task-controller.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/:projectId", getTasks);
router.post("/:projectId", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
