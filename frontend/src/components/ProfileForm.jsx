import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function ProfileForm({ onProfileCreated, existing, onCancel }) {
  const [form, setForm] = useState(
    existing || {
      name: "",
      email: "",
      education: "",
      github: "",
      linkedin: "",
      portfolio: ""
    }
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: form.name,
      email: form.email,
      education: form.education,
      links: {
        github: form.github,
        linkedin: form.linkedin,
        portfolio: form.portfolio,
      },
    };

    const API = import.meta.env.VITE_API_URL;

    let res;
    if (existing?._id) {
      res = await axios.put(`${API}/profile`, payload);
    } else {
      res = await axios.post(`${API}/profile`, payload);
    }
    onProfileCreated(res.data);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-xl border border-purple-500/30 shadow-2xl rounded-xl p-8 space-y-5 max-w-lg mx-auto"
    >
      <h2 className="text-2xl font-bold text-center text-purple-400 mb-4">
        {existing ? "Edit Profile" : "Create Profile"}
      </h2>

      <div className="grid gap-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full border border-purple-500/30 bg-black/30 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
          required
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border border-purple-500/30 bg-black/30 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
          required
        />
        <input
          name="education"
          value={form.education}
          onChange={handleChange}
          placeholder="Education"
          className="w-full border border-purple-500/30 bg-black/30 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
        />
        <input
          name="github"
          value={form.github}
          onChange={handleChange}
          placeholder="GitHub link"
          className="w-full border border-purple-500/30 bg-black/30 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
        />
        <input
          name="linkedin"
          value={form.linkedin}
          onChange={handleChange}
          placeholder="LinkedIn link"
          className="w-full border border-purple-500/30 bg-black/30 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
        />
        <input
          name="portfolio"
          value={form.portfolio}
          onChange={handleChange}
          placeholder="Portfolio link"
          className="w-full border border-purple-500/30 bg-black/30 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
        />
      </div>

      <div className="flex justify-between mt-6">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2 rounded-lg border border-gray-500/30 text-gray-300 hover:bg-gray-700/40 transition"
          >
            Cancel
          </button>
        )}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-purple-500/50 transition"
        >
          {existing ? "Update" : "Save"} Profile
        </motion.button>
      </div>
    </motion.form>
  );
}
