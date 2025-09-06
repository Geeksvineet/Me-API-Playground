import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Modal from "./model";

export default function SkillsTab({ profile }) {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState({ name: "", level: 50 });
  const [editing, setEditing] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", level: 50 });

  const API = import.meta.env.VITE_API_URL;

  // fetch skills on mount
  useEffect(() => {
    axios.get(`${API}/skills`).then(res => setSkills(res.data));
  }, []);

  const addSkill = async () => {
    if (!newSkill.name) return;
    try {
      const res = await axios.post(`${API}/skills`, newSkill);
      setSkills([...skills, res.data]);
      setNewSkill({ name: "", level: 50 });
    } catch (err) {
      console.error("❌ Error adding skill:", err.response?.data || err.message);
    }
  };

  const deleteSkill = async (id) => {
    await axios.delete(`${API}/skills/${id}`);
    setSkills(skills.filter(s => s._id !== id));
  };

  const openEdit = (skill) => {
    setEditing(skill);
    setEditForm({ name: skill.name, level: skill.level });
  };

  const saveEdit = async () => {
    const res = await axios.put(`${API}/skills/${editing._id}`, editForm);
    setSkills(skills.map(s => (s._id === editing._id ? res.data : s)));
    setEditing(null);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">💡 Skills</h1>

      {/* Skills List */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6">
        {skills.map((s, i) => (
          <motion.div
            key={s._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="relative bg-gradient-to-r from-purple-600/20 via-pink-500/10 to-indigo-600/20 
                       backdrop-blur-xl border border-purple-900/30 shadow-md rounded-xl p-5 group"
          >
            {/* Glow background */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 opacity-10 group-hover:opacity-20 transition"></div>

            {/* Skill Content */}
            <div className="relative z-10">
              <h3 className="text-lg font-semibold text-black">{s.name}</h3>

              {/* Progress bar */}
              <div className="w-full bg-gray-600 rounded-full h-3 mt-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${s.level}%` }}
                  transition={{ duration: 0.8 }}
                  className="h-3 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 rounded-full shadow-lg"
                ></motion.div>
              </div>
              <p className="text-sm text-black mt-1">{s.level}%</p>

              {/* Actions */}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => openEdit(s)}
                  className="bg-purple-600/70 px-3 py-1 rounded text-sm hover:bg-purple-700 transition text-white"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteSkill(s._id)}
                  className="bg-red-600/70 px-3 py-1 rounded text-sm hover:bg-red-700 transition text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Skill Form */}
      {!profile ? (
        <p className="text-center text-black bg-white/10 p-4 rounded-lg">
          ⚠️ Please create a profile before adding skills.
        </p>
      ) : (
        <div className="bg-white/10 p-6 rounded-xl shadow border border-purple-800/30 backdrop-blur-md">
          <h2 className="font-semibold mb-3 text-black">➕ Add Skill</h2>
          <div className="flex gap-3 items-center">
            <input
              value={newSkill.name}
              onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
              placeholder="Skill name"
              className="flex-1 border p-2 rounded bg-black/30 text-white"
            />
            <input
              type="number"
              min="0"
              max="100"
              value={newSkill.level}
              onChange={(e) => setNewSkill({ ...newSkill, level: Number(e.target.value) })}
              className="w-24 border p-2 rounded bg-black/30 text-white"
            />
            <button
              onClick={addSkill}
              className="bg-purple-600 px-4 py-2 rounded text-white hover:bg-purple-700 transition"
            >
              Add
            </button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      <Modal show={!!editing} onClose={() => setEditing(null)}>
        <h2 className="text-xl font-bold mb-4">✏️ Edit Skill</h2>
        <input
          value={editForm.name}
          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
          placeholder="Skill name"
          className="border p-2 rounded w-full mb-3 bg-black/30 text-white"
        />
        <input
          type="number"
          value={editForm.level}
          onChange={(e) => setEditForm({ ...editForm, level: Number(e.target.value) })}
          className="border p-2 rounded w-full mb-3 bg-black/30 text-white"
        />
        <button
          onClick={saveEdit}
          className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700 transition"
        >
          Save
        </button>
      </Modal>
    </div>
  );
}
