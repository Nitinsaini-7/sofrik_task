import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import TaskCard from "../components/TaskCard";
import { Delete } from "lucide-react";

type Task = {
  _id: string;
  title: string;
  description?: string;
  status: string;
  dueDate?: string;
};

type Project = {
  _id: string;
  title: string;
  description?: string;
  status?: string;
};

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const fetchProject = async () => {
    // Projects endpoint returns only user's projects; fetch all and find id
    const res = await API.get("/api/projects");
    const found = res.data.find((p: Project) => p._id === id);
    setProject(found || null);
  };

  const fetchTasks = async () => {
    if (!id) return;
    const res = await API.get(`/api/tasks/${id}`);
    setTasks(res.data);
  };

  useEffect(() => {
    fetchProject();
    fetchTasks();
  }, [id]);

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    const res = await API.post(`/api/tasks/${id}`, { title, description: desc, status: "todo" });
    setTasks((t) => [res.data, ...t]);
    setTitle(""); setDesc("");
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!confirm("Delete task?")) return;
    await API.delete(`/api/tasks/${taskId}`);
    setTasks(t => t.filter(x => x._id !== taskId));
  };

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks(t => t.map(task => task._id === updatedTask._id ? updatedTask : task));
  };

  const filtered = tasks.filter(t => statusFilter === "all" ? true : t.status === statusFilter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Project Header */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            {project?.title || "Project"}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            {project?.description}
          </p>
        </div>

        {/* Add Task Form */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add New Task
          </h2>
          <form onSubmit={handleAddTask} className="flex flex-col sm:flex-row gap-4">
            <input 
              required 
              value={title} 
              onChange={e=>setTitle(e.target.value)} 
              placeholder="Task title" 
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 outline-none" 
            />
            <input 
              value={desc} 
              onChange={e=>setDesc(e.target.value)} 
              placeholder="Task description" 
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 outline-none" 
            />
            <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg whitespace-nowrap">
              Add Task
            </button>
          </form>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h3 className="text-lg font-semibold text-gray-800">Tasks</h3>
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-gray-700">Filter:</label>
              <select 
                value={statusFilter} 
                onChange={e=>setStatusFilter(e.target.value)} 
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 outline-none bg-white"
              >
                <option value="all">All</option>
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tasks List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map(t => (
            <div key={t._id} className="relative group bg-white p-4 shadow-lg rounded-xl">
              <TaskCard 
                id={t._id}
                title={t.title} 
                description={t.description} 
                status={t.status} 
                dueDate={t.dueDate}
                onUpdate={handleUpdateTask}
              />
              <div className="absolut opacity-100 transition-opacity duration-200">
                <button 
                  onClick={() => handleDeleteTask(t._id)} 
                  className="flex items-center justify-center w-full p-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition-all cursor-pointer duration-300 transform hover:scale-105"
                  title="Delete project"
                >
                  Delete
                 <Delete/>
                </button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No tasks to show</h3>
                <p className="text-gray-600">Start by creating your first task using the form above.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}