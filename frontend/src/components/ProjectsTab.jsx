import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Modal from "./model";

export default function ProjectsTab({ profile }) {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [skills, setSkills] = useState([]);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    github: "",
    demo: "",
    skills: [],
  });
  const [editing, setEditing] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    github: "",
    demo: "",
  });

  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await fetch(`${API}/skills`);
        const data = await res.json();
        setSkills(data);
      } catch (err) {
        console.error("Error fetching skills:", err);
      }
    };
    fetchSkills();
  }, []);

  useEffect(() => {
    axios.get(`${API}/projects`).then((res) => setProjects(res.data));
  }, []);

  const searchProjects = async () => {
    try {
      let res;

      if (search.trim() === "") {
        // agar empty search hai to sab projects lao
        res = await axios.get(`${API}/projects`);
      } else {
        // agar skill search karni hai (yahan tum decide kar sakte ho)
        res = await axios.get(`${API}/projects?q=${search}`);
        if (res.data.length === 0) {
          // agar title/desc search se kuch nahi mila, skill search karo
          res = await axios.get(`${API}/projects?skills=${search}`);
        }
      }

      setProjects(res.data);
    } catch (err) {
      console.error("❌ Error searching projects:", err);
    }
  };

  const fetchAllProjects = async () => {
    const res = await axios.get(`${API}/projects`);
    setProjects(res.data);
  };

  const addProject = async () => {
    if (!newProject.title) return;
    try {
      const res = await axios.post(`${API}/projects`, {
        title: newProject.title,
        description: newProject.description,
        skills: newProject.skills,
        links: { github: newProject.github, demo: newProject.demo },
      });
      setProjects([...projects, res.data]);
      setNewProject({
        title: "",
        description: "",
        skills: [],
        github: "",
        demo: "",
      });
    } catch (err) {
      console.error(
        "❌ Error adding project:",
        err.response?.data || err.message
      );
    }
  };

  const deleteProject = async (id) => {
    await axios.delete(`${API}/projects/${id}`);
    setProjects(projects.filter((p) => p._id !== id));
  };

  const openEdit = (proj) => {
    setEditing(proj);
    setEditForm({
      title: proj.title,
      description: proj.description,
      github: proj.links?.github || "",
      demo: proj.links?.demo || "",
      skills: proj.skills || [], // ✅ empty array agar skills na mile
    });
  };

  const saveEdit = async () => {
    const res = await axios.put(`${API}/projects/${editing._id}`, {
      title: editForm.title,
      description: editForm.description,
      links: { github: editForm.github, demo: editForm.demo },
      skills: editForm.skills, // ✅ send skills also
    });

    setProjects(projects.map((p) => (p._id === editing._id ? res.data : p)));
    setEditing(null);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">📂 Projects</h1>

      {!profile ? (
        <p className="text-center text-black bg-white/10 p-4 rounded-lg">
          ⚠️ Please create a profile before adding projects.
        </p>
      ) : (
        <>
          {/* Search */}
          <div className="flex gap-2 mb-6">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search across projects and Skills..."
              className="flex-1 p-2 rounded bg-black/30 text-black"
            />
            <button
              onClick={searchProjects}
              className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700 transition text-white"
            >
              Search
            </button>
            <button
              onClick={fetchAllProjects}
              className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition text-white"
            >
              All Projects
            </button>
          </div>

          {/* Project List */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {projects.length === 0 ? (
              <p className="text-center text-gray-600 col-span-2">
                🚫 This project not here
              </p>
            ) : (
              projects.map((p, i) => (
                <motion.div
                  key={p._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="relative bg-gradient-to-r from-purple-600/20 via-pink-500/10 to-indigo-600/20 
                   backdrop-blur-xl border border-purple-800/30 shadow-md rounded-xl p-5 group"
                >
                  {/* Glow background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 opacity-10 group-hover:opacity-20 transition"></div>

                  {/* Project Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-semibold text-black">
                      {p.title}
                    </h3>
                    <p className="text-gray-700 mt-2">{p.description}</p>
                    <h2 className="text-lg font-semibold text-blue-700">
                      {p.skills.join(", ")}
                    </h2>

                    <div className="flex gap-3 mt-3">
                      {p.links?.github && (
                        <a
                          href={p.links.github}
                          target="_blank"
                          rel="noreferrer"
                          className="text-purple-800 underline hover:text-purple-400"
                        >
                          GitHub
                        </a>
                      )}
                      {p.links?.demo && (
                        <a
                          href={p.links.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="text-indigo-800 underline hover:text-indigo-400"
                        >
                          Demo
                        </a>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => openEdit(p)}
                        className="bg-purple-600/70 px-3 py-1 rounded text-sm hover:bg-purple-700 transition text-white"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteProject(p._id)}
                        className="bg-red-600/70 px-3 py-1 rounded text-sm hover:bg-red-700 transition text-white"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Add Project Form */}
          <div className="bg-white/10 p-6 rounded-xl shadow border border-purple-800/30 backdrop-blur-md">
            <h2 className="font-semibold mb-3 text-black">➕ Add Project</h2>
            <input
              value={newProject.title}
              onChange={(e) =>
                setNewProject({ ...newProject, title: e.target.value })
              }
              placeholder="Title"
              className="p-2 rounded w-full mb-2 bg-black/30 text-black"
            />
            <textarea
              value={newProject.description}
              onChange={(e) =>
                setNewProject({ ...newProject, description: e.target.value })
              }
              placeholder="Description"
              className="p-2 rounded w-full mb-2 bg-black/30 text-black"
            />
            <div className="mb-4">
              <label className="block font-semibold text-gray-800 mb-2 text-lg">
                Select Skills
              </label>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill) => {
                  const isSelected = newProject.skills.includes(skill.name);
                  return (
                    <button
                      type="button"
                      key={skill._id}
                      onClick={() => {
                        if (isSelected) {
                          setNewProject((prev) => ({
                            ...prev,
                            skills: prev.skills.filter((s) => s !== skill.name),
                          }));
                        } else {
                          setNewProject((prev) => ({
                            ...prev,
                            skills: [...prev.skills, skill.name],
                          }));
                        }
                      }}
                      className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200
            ${
              isSelected
                ? "bg-blue-600 text-white border-blue-600 shadow-md"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
                    >
                      {skill.name}
                    </button>
                  );
                })}
              </div>
            </div>

            <input
              value={newProject.github}
              onChange={(e) =>
                setNewProject({ ...newProject, github: e.target.value })
              }
              placeholder="GitHub link"
              className="p-2 rounded w-full mb-2 bg-black/30 text-black"
            />
            <input
              value={newProject.demo}
              onChange={(e) =>
                setNewProject({ ...newProject, demo: e.target.value })
              }
              placeholder="Demo link"
              className="p-2 rounded w-full mb-2 bg-black/30 text-black"
            />
            <button
              onClick={addProject}
              className="bg-purple-600 px-4 py-2 rounded text-white hover:bg-purple-700 transition"
            >
              Add Project
            </button>
          </div>

          {/* Edit Modal */}
          <Modal show={!!editing} onClose={() => setEditing(null)}>
            <h2 className="text-xl font-bold mb-4">✏️ Edit Project</h2>
            <input
              value={editForm.title}
              onChange={(e) =>
                setEditForm({ ...editForm, title: e.target.value })
              }
              className="border p-2 rounded w-full mb-3 bg-black/30 text-white"
            />
            <textarea
              value={editForm.description}
              onChange={(e) =>
                setEditForm({ ...editForm, description: e.target.value })
              }
              className="border p-2 rounded w-full mb-3 bg-black/30 text-white"
            />
            <input
              value={editForm.github}
              onChange={(e) =>
                setEditForm({ ...editForm, github: e.target.value })
              }
              className="border p-2 rounded w-full mb-3 bg-black/30 text-white"
            />
            <input
              value={editForm.demo}
              onChange={(e) =>
                setEditForm({ ...editForm, demo: e.target.value })
              }
              className="border p-2 rounded w-full mb-3 bg-black/30 text-white"
            />
            <div className="mb-4">
              <label className="block font-semibold text-gray-200 mb-2">
                Select Skills
              </label>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill) => {
                  const isSelected = (editForm.skills || []).includes(
                    skill.name
                  ); // ✅ safe check
                  return (
                    <button
                      type="button"
                      key={skill._id}
                      onClick={() => {
                        if (isSelected) {
                          setEditForm((prev) => ({
                            ...prev,
                            skills: prev.skills.filter((s) => s !== skill.name),
                          }));
                        } else {
                          setEditForm((prev) => ({
                            ...prev,
                            skills: [...prev.skills, skill.name],
                          }));
                        }
                      }}
                      className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200
        ${
          isSelected
            ? "bg-blue-600 text-white border-blue-600 shadow-md"
            : "bg-white/20 text-gray-200 border-gray-400 hover:bg-white/30"
        }`}
                    >
                      {skill.name}
                    </button>
                  );
                })}
              </div>
            </div>
            <button
              onClick={saveEdit}
              className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700 transition"
            >
              Save
            </button>
          </Modal>
        </>
      )}
    </div>
  );
}
