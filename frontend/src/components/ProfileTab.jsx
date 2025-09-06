import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";
import Modal from "./model";

export default function ProfileTab({ profile, setProfile }) {
  const [editing, setEditing] = useState(false);
  const [creating, setCreating] = useState(false);

  const [form, setForm] = useState({
    name: profile?.name || "",
    email: profile?.email || "",
    education: profile?.education || "",
    github: profile?.links?.github || "",
    linkedin: profile?.links?.linkedin || "",
    portfolio: profile?.links?.portfolio || "",
  });

  const API = import.meta.env.VITE_API_URL;

  // Create profile
  const createProfile = async () => {
    try {
      console.log("📤 Creating profile with:", form);
      const res = await axios.post(`${API}/profile`, {
        name: form.name,
        email: form.email,
        education: form.education,
        links: {
          github: form.github,
          linkedin: form.linkedin,
          portfolio: form.portfolio,
        },
      });
      setProfile(res.data);
      setCreating(false);
    } catch (err) {
      console.error(
        "❌ Create profile failed:",
        err.response?.data || err.message
      );
    }
  };

  // Edit profile
  const saveEdit = async () => {
    try {
      console.log("📤 Updating profile with:", form);
      const res = await axios.put(`${API}/profile`, {
        name: form.name,
        email: form.email,
        education: form.education,
        links: {
          github: form.github,
          linkedin: form.linkedin,
          portfolio: form.portfolio,
        },
      });
      setProfile(res.data);
      setEditing(false);
    } catch (err) {
      console.error(
        "❌ Update profile failed:",
        err.response?.data || err.message
      );
    }
  };

  // Delete profile
  const deleteProfile = async () => {
    try {
      const confirmDelete = window.confirm(
        "⚠️ Are you sure you want to delete your profile? This action cannot be undone."
      );

      if (!confirmDelete) return; // agar user ne cancel kiya to function yahin se return ho jaayega

      await axios.delete(`${API}/profile`);
      setProfile(null);
      window.location.reload(); // also clears skills/projects cascade
    } catch (err) {
      console.error(
        "❌ Delete profile failed:",
        err.response?.data || err.message
      );
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">👤 Profile</h1>

      {/* No Profile → Show Create Button */}
      {!profile ? (
        <div className="text-center">
          <p className="text-gray-800 mb-4">
            ⚠️ No profile found. Please create one.
          </p>
          <button
            onClick={() => {
              setForm({
                name: "",
                email: "",
                education: "",
                github: "",
                linkedin: "",
                portfolio: "",
              });
              setCreating(true);
            }}
            className="bg-purple-600 px-4 py-2 rounded-lg text-white hover:bg-purple-700 transition"
          >
            ➕ Create Profile
          </button>
        </div>
      ) : (
        // Profile Card
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-to-r from-purple-600/30 via-pink-500/20 to-indigo-600/30 
                     backdrop-blur-xl border border-purple-800/30 shadow-xl rounded-2xl p-6 overflow-hidden"
        >
          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Avatar */}
            {/* <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 
                            flex items-center justify-center text-white font-bold text-2xl shadow-lg mb-4">
              {profile.name ? profile.name[0] : "?"}
            </div> */}

            <h2 className="text-2xl font-bold text-black">{profile.name}</h2>
            <p className="text-gray-700">{profile.email}</p>
            {profile.education && (
              <p className="text-gray-600 italic mt-1">{profile.education}</p>
            )}

            {/* Links */}
            <div className="flex gap-4 mt-4">
              {profile.links?.github && (
                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-gray-800/70 text-white rounded-lg shadow hover:bg-black transition"
                >
                  GitHub
                </a>
              )}
              {profile.links?.linkedin && (
                <a
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-blue-600/80 text-white rounded-lg shadow hover:bg-blue-700 transition"
                >
                  LinkedIn
                </a>
              )}
              {profile.links?.portfolio && (
                <a
                  href={profile.links.portfolio}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-green-600/80 text-white rounded-lg shadow hover:bg-green-700 transition"
                >
                  Portfolio
                </a>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setForm({
                    name: profile.name,
                    email: profile.email,
                    education: profile.education || "",
                    github: profile.links?.github || "",
                    linkedin: profile.links?.linkedin || "",
                    portfolio: profile.links?.portfolio || "",
                  });
                  setEditing(true);
                }}
                className="bg-purple-600/80 px-4 py-2 rounded-lg text-white hover:bg-purple-700 transition"
              >
                ✏️ Edit
              </button>
              <button
                onClick={deleteProfile}
                className="bg-red-600/80 px-4 py-2 rounded-lg text-white hover:bg-red-700 transition"
              >
                🗑 Delete
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Create Profile Modal */}
      <Modal show={creating} onClose={() => setCreating(false)}>
        <h2 className="text-xl font-bold mb-4">➕ Create Profile</h2>
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Name"
          required
          className="border p-2 rounded w-full mb-3 bg-black/30 text-white"
        />
        <input
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Email"
          required
          className="border p-2 rounded w-full mb-3 bg-black/30 text-white"
        />
        <input
          value={form.education}
          onChange={(e) => setForm({ ...form, education: e.target.value })}
          placeholder="Education"
          className="border p-2 rounded w-full mb-3 bg-black/30 text-white"
        />
        <input
          value={form.github}
          onChange={(e) => setForm({ ...form, github: e.target.value })}
          placeholder="GitHub"
          className="border p-2 rounded w-full mb-3 bg-black/30 text-white"
        />
        <input
          value={form.linkedin}
          onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
          placeholder="LinkedIn"
          className="border p-2 rounded w-full mb-3 bg-black/30 text-white"
        />
        <input
          value={form.portfolio}
          onChange={(e) => setForm({ ...form, portfolio: e.target.value })}
          placeholder="Portfolio"
          className="border p-2 rounded w-full mb-3 bg-black/30 text-white"
        />
        <button
          onClick={createProfile}
          className="bg-green-600 px-4 py-2 rounded text-white hover:bg-green-700 transition"
        >
          Create
        </button>
      </Modal>

      {/* Edit Profile Modal */}
      <Modal show={editing} onClose={() => setEditing(false)}>
        <h2 className="text-xl font-bold mb-4">✏️ Edit Profile</h2>
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Name"
          required
          className="border p-2 rounded w-full mb-3 bg-black/30 text-white"
        />
        <input
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Email"
          required
          className="border p-2 rounded w-full mb-3 bg-black/30 text-white"
        />
        <input
          value={form.education}
          onChange={(e) => setForm({ ...form, education: e.target.value })}
          placeholder="Education"
          className="border p-2 rounded w-full mb-3 bg-black/30 text-white"
        />
        <input
          value={form.github}
          onChange={(e) => setForm({ ...form, github: e.target.value })}
          placeholder="GitHub"
          className="border p-2 rounded w-full mb-3 bg-black/30 text-white"
        />
        <input
          value={form.linkedin}
          onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
          placeholder="LinkedIn"
          className="border p-2 rounded w-full mb-3 bg-black/30 text-white"
        />
        <input
          value={form.portfolio}
          onChange={(e) => setForm({ ...form, portfolio: e.target.value })}
          placeholder="Portfolio"
          className="border p-2 rounded w-full mb-3 bg-black/30 text-white"
        />
        <button
          onClick={saveEdit}
          className="bg-purple-600 px-4 py-2 rounded text-white hover:bg-purple-700 transition"
        >
          Save
        </button>
      </Modal>
    </div>
  );
}
