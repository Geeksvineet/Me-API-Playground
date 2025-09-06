import express from "express";
import Skill from "../models/Skills.js";
import Profile from "../models/Profile.js";


const router = express.Router();

// GET all skills
router.get("/", async (req, res) => {
  const skills = await Skill.find();
  res.json(skills);
});

// GET top skills
router.get("/top", async (req, res) => {
  const skills = await Skill.find().sort({ level: -1 }).limit(1);
  res.json(skills);
});

// POST new skill
// POST new skill
router.post("/", async (req, res) => {
    try {
      const profileExists = await Profile.findOne();
      if (!profileExists) {
        return res.status(400).json({ error: "Cannot add skills without a profile" });
      }
      const skill = new Skill(req.body);
      await skill.save();
      res.status(201).json(skill);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

// PUT skill (by ID)
router.put("/:id", async (req, res) => {
  const updated = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE skill (by ID)
router.delete("/:id", async (req, res) => {
  await Skill.findByIdAndDelete(req.params.id);
  res.json({ message: "Skill deleted" });
});

export default router;
