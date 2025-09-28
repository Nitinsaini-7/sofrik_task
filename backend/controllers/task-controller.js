import Task from "../models/task-model.js";

// Get tasks for a project
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ projectId: req.params.projectId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

// Create task
export const createTask = async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;
    const task = await Task.create({
      title,
      description,
      status,
      dueDate,
      projectId: req.params.projectId,
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: "Error creating task" });
  }
};

// Update task
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Error updating task" });
  }
};

// Delete task
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting task" });
  }
};
