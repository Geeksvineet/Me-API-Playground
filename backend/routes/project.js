import express from "express";
import Project from "../models/Project.js";

const router = express.Router();

// GET all projects (with search)
router.get("/", async (req, res) => {
  const { q, skill } = req.query;
  let filter = {};
  if (skill) filter.skills = skill;
  if (q) filter.title = { $regex: q, $options: "i" };

  const projects = await Project.find(filter);
  res.json(projects);
});

// POST new project
router.post("/", async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT project (by ID)
router.put("/:id", async (req, res) => {
  const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE project (by ID)
router.delete("/:id", async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: "Project deleted" });
});

export default router;
