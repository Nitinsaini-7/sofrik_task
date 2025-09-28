import Project from "../models/project-model.js";

// Get all projects of a user
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.userId });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Error fetching projects" });
  }
};

// Create project
export const createProject = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const project = await Project.create({
      title,
      description,
      status,
      userId: req.userId,
    });
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: "Error creating project" });
  }
};

// Update project
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: "Error updating project" });
  }
};

// Delete project
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting project" });
  }
};
