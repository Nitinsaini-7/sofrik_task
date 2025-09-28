import express from "express";
import { authMiddleware } from "../middlewares/auth.js";
import { createProject, deleteProject, getProjects, updateProject } from "../controllers/project-controller.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", getProjects);
router.post("/", createProject);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

export default router;
