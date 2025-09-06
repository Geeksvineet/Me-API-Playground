import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  skills: [String], // array of skill names
  links: {
    github: String,
    demo: String,
  },
});

export default mongoose.model("Project", ProjectSchema);