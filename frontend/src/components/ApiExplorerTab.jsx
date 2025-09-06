import React, { useState } from "react";
import { Play, Copy, Check, Code, Database } from "lucide-react";

const BASE_URL = "https://me-api-playground-r3ox.onrender.com"; // 👈 apna base URL yahan daal do

const apiDocs = [
  {
    method: "GET",
    path: "/health",
    description: "Check if API server is running",
  },
  {
    method: "GET",
    path: "/profile",
    description: "Fetch profile details",
  },
  {
    method: "GET",
    path: "/skills",
    description: "Fetch all Skills",
  },
  {
    method: "GET",
    path: "/skills/top",
    description: "Fetch toppest skill",
  },
  {
    method: "GET",
    path: "/projects",
    description: "Fetch all projects",
  },
  {
    method: "GET",
    path: "/projects?skills={skillName}",
    description: "Fetch all projects on basis of specific skill",
  },
];

export default function ApiDocsAndExplorer() {
  const [endpoint, setEndpoint] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedURL, setCopiedURL] = useState(false);

  const handleFetch = async () => {
    if (!endpoint) return;
    try {
      setLoading(true);
      setResponse(null);
      const res = await fetch(endpoint, { method: "GET" });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      setResponse({ error: "Failed to fetch API response" });
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (response) {
      navigator.clipboard.writeText(JSON.stringify(response, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    }
  };

  const handleCopyURL = async () => {
    try {
      await navigator.clipboard.writeText(BASE_URL);
      setCopiedURL(true);
      setTimeout(() => setCopiedURL(false), 1000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Base URL */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between">
        <h2 className="text-lg font-semibold text-blue-700 flex items-center gap-2">
          🔗 Base URL:{" "}
          <span className="font-mono text-gray-800">{BASE_URL}</span>
        </h2>

        <button
          onClick={handleCopyURL}
          className="ml-4 flex items-center gap-2 px-3 py-1 rounded-md border border-blue-400 bg-blue-100 hover:bg-blue-200 text-blue-700 transition"
        >
          {copiedURL ? (
            <>
              <Check size={16} /> Copied!
            </>
          ) : (
            <>
              <Copy size={16} /> Copy
            </>
          )}
        </button>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* API Explorer */}
        <div className="p-6 bg-white shadow-lg rounded-2xl">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Database className="w-6 h-6 text-blue-600" />
            API Explorer (GET Only)
          </h2>

          {/* Input for API endpoint */}
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
              placeholder={`Enter GET API endpoint (e.g. ${BASE_URL}/api/users)`}
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleFetch}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Play className="w-4 h-4" />
              Send
            </button>
          </div>

          {/* API Response */}
          <div className="bg-gray-100 p-4 rounded-lg relative">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold flex items-center gap-2">
                <Code className="w-4 h-4 text-gray-700" /> Response
              </h3>
              {response && (
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" /> Copy
                    </>
                  )}
                </button>
              )}
            </div>

            <pre className="text-sm bg-white p-3 rounded-lg overflow-x-auto border">
              {loading
                ? "Loading..."
                : response
                ? JSON.stringify(response, null, 2)
                : "No response yet"}
            </pre>
          </div>
        </div>

        {/* API Docs */}
        <div className="p-6 bg-white shadow-lg rounded-2xl">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Database className="w-6 h-6 text-blue-600" />
            API Documentation (GET Only)
          </h2>

          <div className="space-y-4">
            {apiDocs.map((api, idx) => (
              <div
                key={idx}
                className="p-4 border rounded-lg bg-gray-50 hover:shadow-md"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 text-sm font-bold bg-green-200 text-green-800 rounded-md">
                    {api.method}
                  </span>
                  <span className="font-mono text-gray-700">
                    {/* {BASE_URL} */}
                    {api.path}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{api.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
