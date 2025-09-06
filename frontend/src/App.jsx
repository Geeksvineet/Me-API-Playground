import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import ProfileTab from "./components/ProfileTab";
import SkillsTab from "./components/SkillsTab";
import ProjectsTab from "./components/ProjectsTab";
import ApiExplorerTab from "./components/ApiExplorerTab";
import profilePic from "./assets/hero.png";

export default function App() {
  const [tab, setTab] = useState("profile");
  const [profile, setProfile] = useState(null);
  const API = import.meta.env.VITE_API_URL;
  
  // fetch profile once
  useEffect(() => {
    axios.get(`${API}/profile`).then(res => setProfile(res.data));
  }, []);

  return (
    <div className="relative min-h-screen text-black">
      {/* background */}
      <div className="absolute inset-0 -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

      <div className="flex h-screen">
        {/* Sidebar (unchanged) */}
        <aside className="w-64 bg-white backdrop-blur-lg border-r border-purple-500/30 p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-10 tracking-wide">👤 Vineet Suman</h1>
            <nav className="space-y-4">
              <button onClick={() => setTab("profile")}
                className={`block w-full text-left px-3 py-2 rounded-lg transition ${tab === "profile" ? "bg-purple-600/70 text-white" : "hover:bg-purple-500/20"}`}>
                👤 Profile
              </button>
              <button onClick={() => setTab("skills")}
                className={`block w-full text-left px-3 py-2 rounded-lg transition ${tab === "skills" ? "bg-purple-600/70 text-white" : "hover:bg-purple-500/20"}`}>
                💡 Skills
              </button>
              <button onClick={() => setTab("projects")}
                className={`block w-full text-left px-3 py-2 rounded-lg transition ${tab === "projects" ? "bg-purple-600/70 text-white" : "hover:bg-purple-500/20"}`}>
                📂 Projects
              </button>
              <button onClick={() => setTab("apiExplorer")}
                className={`block w-full text-left px-3 py-2 rounded-lg transition ${tab === "apiExplorer" ? "bg-purple-600/70 text-white" : "hover:bg-purple-500/20"}`}>
                &lt;/&gt; API Explorer
              </button>
            </nav>
          </div>
          <p className="text-sm text-gray-400"></p>
        </aside>

        {/* Main Content + Header */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="flex justify-between items-center px-6 py-4 bg-white/90 border-b border-purple-500/30 backdrop-blur-md">
            
            {/* Dynamic Tagline */}
            <div className="flex-1 text-center">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-800 via-pink-800 to-indigo-800 bg-clip-text text-transparent animate-gradient">
                👋 Welcome {profile?.name ? profile.name : "Guest"}
              </h2>
            </div>

            {/* Profile Photo */}
            <motion.img
              src={profilePic}
              alt="Profile"
              className="w-12 h-12 rounded-full border-2 border-purple-400 shadow-lg"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 200 }}
            />
          </header>

          {/* Content */}
          <main className="flex-1 overflow-y-auto p-10 bg-white">
            {tab === "profile" && <ProfileTab profile={profile} setProfile={setProfile} />}
            {tab === "skills" && <SkillsTab profile={profile} />}
            {tab === "projects" && <ProjectsTab profile={profile} />}
            {tab === "apiExplorer" && <ApiExplorerTab profile={profile} />}
          </main>
        </div>
      </div>
    </div>
  );
}
