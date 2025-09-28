import React, { useEffect, useState } from "react";
import API from "../api/axios";
import ProjectCard from "../components/ProjectCard";
import { Delete } from "lucide-react";

type Project = {
  _id: string;
  title: string;
  description?: string;
  status?: string;
};

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchProjects = async () => {
    const res = await API.get("/api/projects");
    setProjects(res.data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await API.post("/api/projects", { title, description: desc });
      setProjects((p) => [res.data, ...p]);
      setTitle(""); setDesc("");
    } catch (err) {
      console.error(err);
    } finally { setLoading(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete project?")) return;
    await API.delete(`/api/projects/${id}`);
    setProjects(p => p.filter(pr => pr._id !== id));
  };

  const handleUpdateProject = (updatedProject: Project) => {
    setProjects(p => p.map(project => project._id === updatedProject._id ? updatedProject : project));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Your Projects
          </h1>
          <p className="text-gray-600 text-lg">Manage and organize your projects efficiently</p>
        </div>

        {/* Create Project Form */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create New Project
            </h2>
            <form onSubmit={handleCreate} className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input 
                  required 
                  value={title} 
                  onChange={e=>setTitle(e.target.value)} 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 outline-none" 
                  placeholder="Enter project title" 
                />
              </div>
              <div className="flex-1">
                <input 
                  value={desc} 
                  onChange={e=>setDesc(e.target.value)} 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 outline-none" 
                  placeholder="Description (optional)" 
                />
              </div>
              <button 
                disabled={loading} 
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none whitespace-nowrap"
              >
                {loading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Project
                  </div>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(p => (
            <div key={p._id} className="relative group border border-gray-50 p-4 rounded-xl shadow-lg">
              <ProjectCard 
                id={p._id} 
                title={p.title} 
                description={p.description} 
                status={p.status}
                onUpdate={handleUpdateProject}
              />
              <div className="absolut opacity-100 transition-opacity duration-200">
                <button 
                  onClick={() => handleDelete(p._id)} 
                  className="flex items-center justify-center w-full p-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition-all cursor-pointer duration-300 transform hover:scale-105"
                  title="Delete project"
                >
                  Delete
                 <Delete/>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {projects.length === 0 && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No projects yet</h3>
              <p className="text-gray-600 mb-6">Get started by creating your first project using the form above.</p>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
                <p className="text-sm text-gray-700">💡 <strong>Tip:</strong> Organize your work by creating projects for different tasks or goals.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}