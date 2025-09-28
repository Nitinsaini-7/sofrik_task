import React, { useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

type Props = {
  id: string;
  title: string;
  description?: string;
  status?: string;
  onUpdate?: (updatedProject: any) => void;
};

export default function ProjectCard({ id, title, description, status, onUpdate }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description || "");
  const [editStatus, setEditStatus] = useState(status || "active");

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await API.put(`/api/projects/${id}`, {
        title: editTitle,
        description: editDescription,
        status: editStatus
      });
      onUpdate?.(res.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  

  const handleCancel = () => {
    setEditTitle(title);
    setEditDescription(description || "");
    setEditStatus(status || "active");
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 transform transition-all duration-200 hover:shadow-xl">
        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Project Title</label>
            <input
              required
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 outline-none"
              placeholder="Enter project title"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 outline-none resize-none h-20"
              placeholder="Enter project description"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Status</label>
            <select
              value={editStatus}
              onChange={(e) => setEditStatus(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 outline-none bg-white"
            >
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="on-hold">On Hold</option>
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <button 
              type="submit" 
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              Save Changes
            </button>
            <button 
              type="button" 
              onClick={handleCancel} 
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-6 py-3 rounded-lg transition-all duration-200 border border-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="p-4 transform transition-all duration-300 hover:shadow-xl group">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1 min-w-0 pr-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2 truncate group-hover:text-blue-600 transition-colors duration-200">
            {title}
          </h3>
          <p className="text-gray-600 leading-relaxed line-clamp-3">
            {description || "No description provided"}
          </p>
        </div>
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide whitespace-nowrap ${
          status === "completed" 
            ? "bg-emerald-100 text-emerald-800 border border-emerald-200" 
            : status === "on-hold"
            ? "bg-amber-100 text-amber-800 border border-amber-200"
            : "bg-blue-100 text-blue-800 border border-blue-200"
        }`}>
          {status}
        </span>
      </div>
      
      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
        <Link 
          to={`/projects/${id}`} 
          className="inline-flex items-center px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium rounded-lg transition-colors duration-200 text-sm border border-blue-200 hover:border-blue-300"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          Open Project
        </Link>
        <button
          onClick={() => setIsEditing(true)}
          className="inline-flex items-center px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 font-medium rounded-lg transition-colors duration-200 text-sm"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Edit
        </button>
      </div>
    </div>
  );
}