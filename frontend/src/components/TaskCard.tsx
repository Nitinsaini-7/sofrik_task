import React, { useState } from "react";
import API from "../api/axios";

type Props = {
  id: string;
  title: string;
  description?: string;
  status: string;
  dueDate?: string;
  onUpdate?: (updatedTask: any) => void;
};

export default function TaskCard({ id, title, description, status, dueDate, onUpdate }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description || "");
  const [editStatus, setEditStatus] = useState(status);
  const [editDueDate, setEditDueDate] = useState(dueDate ? dueDate.split('T')[0] : "");

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await API.put(`/api/tasks/${id}`, {
        title: editTitle,
        description: editDescription,
        status: editStatus,
        dueDate: editDueDate || undefined
      });
      onUpdate?.(res.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleCancel = () => {
    setEditTitle(title);
    setEditDescription(description || "");
    setEditStatus(status);
    setEditDueDate(dueDate ? dueDate.split('T')[0] : "");
    setIsEditing(false);
  };

  const isOverdue = dueDate && new Date(dueDate) < new Date() && status !== "done";

  if (isEditing) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 transform transition-all duration-200 hover:shadow-xl">
        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Task Title</label>
            <input
              required
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 outline-none"
              placeholder="Enter task title"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 outline-none resize-none h-20"
              placeholder="Enter task description"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Status</label>
              <select
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 outline-none bg-white"
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Due Date</label>
              <input
                type="date"
                value={editDueDate}
                onChange={(e) => setEditDueDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 outline-none"
              />
            </div>
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
    <div className=" p-4 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 group">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-3 mb-3">
            {/* Status Icon */}
            <div className={`flex-shrink-0 w-5 h-5 mt-0.5 rounded-full flex items-center justify-center`}>
              
            </div>
            
            <div className="flex-1">
              <h4 className={`text-lg font-semibold mb-1 group-hover:text-blue-600 transition-colors duration-200 ${
                status === "done" ? "line-through text-gray-500" : "text-gray-900"
              }`}>
                {title}
              </h4>
              {description && (
                <p className={`text-sm leading-relaxed ${
                  status === "done" ? "text-gray-400" : "text-gray-600"
                }`}>
                  {description}
                </p>
              )}
            </div>
          </div>

          {/* Due Date */}
          {dueDate && (
            <div className={`flex items-center gap-2 text-xs font-medium ${
              isOverdue 
                ? "text-red-600 bg-red-50 border border-red-200" 
                : status === "done"
                ? "text-gray-400 bg-gray-50 border border-gray-200"
                : "text-blue-600 bg-blue-50 border border-blue-200"
            } px-3 py-1.5 rounded-lg inline-flex w-fit`}>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {isOverdue ? "Overdue:" : "Due:"} {new Date(dueDate).toLocaleDateString()}
            </div>
          )}
        </div>

        {/* Right Side - Status Badge & Edit Button */}
        <div className="flex flex-col items-end gap-3">
          <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide border ${
            status === "done" 
              ? "bg-emerald-100 text-emerald-800 border-emerald-200" 
              : status === "in-progress"
              ? "bg-amber-100 text-amber-800 border-amber-200"
              : "bg-slate-100 text-slate-700 border-slate-200"
          }`}>
            {status === "todo" ? "To Do" : status === "in-progress" ? "In Progress" : "Done"}
          </span>

          <button
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 font-medium rounded-lg transition-all duration-200 text-sm opacity-100"
          >
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}