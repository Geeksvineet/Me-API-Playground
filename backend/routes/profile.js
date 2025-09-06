import express from "express";
import Profile from "../models/Profile.js";
import Skill from "../models/Skills.js";
import Project from "../models/Project.js";

const router = express.Router();

// GET profile (only one)
router.get("/", async (req, res) => {
  const profile = await Profile.findOne();
  res.json(profile);
});

// POST profile (only if none exists)
router.post("/", async (req, res) => {
  try {
    const existing = await Profile.findOne();
    if (existing) {
      return res.status(400).json({ error: "Profile already exists. Use PUT to update." });
    }
    const profile = new Profile(req.body);
    await profile.save();
    res.status(201).json(profile);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT profile (update first one)
router.put("/", async (req, res) => {
  const updated = await Profile.findOneAndUpdate({}, req.body, { new: true });
  res.json(updated);
});


// DELETE profile + all related data
router.delete("/", async (req, res) => {
    try {
        console.log("Deleting profile...");
      await Profile.deleteMany({});
      console.log('dkete skill');
      await Skill.deleteMany({});
      console.log('delete porject');
      await Project.deleteMany({});
      res.json({ message: "Profile and all related skills/projects deleted" });
    } catch (err) {
      console.error("❌ Error deleting profile cascade:", err.message);
      res.status(500).json({ error: err.message });
    }
  });

export default router;
