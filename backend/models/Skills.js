import mongoose from "mongoose";

const SkillSchema = new mongoose.Schema({
  name: String,
  level: Number, // e.g. 1–10 or %
});

export default mongoose.model("Skill", SkillSchema);