import { useState } from "react";

import toast from "react-hot-toast";

import { createTask } from "../api/taskApi";

function CreateTaskModal({
  isOpen,
  onClose,
  refreshTasks,
}) {
  // form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
    priority: "medium",
    dueDate: "",
  });

  // loading state
  const [loading, setLoading] = useState(false);

  // input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // submit task
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createTask(formData);

      toast.success("Task created");

      refreshTasks();

      onClose();

      // clear form
      setFormData({
        title: "",
        description: "",
        status: "pending",
        priority: "medium",
        dueDate: "",
      });

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Task creation failed"
      );
    } finally {
      setLoading(false);
    }
  };

  // modal hidden
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">

      <div className="bg-[#111827] border border-white/10 w-full max-w-lg rounded-3xl p-7">

        {/* heading */}
        <div className="flex items-center justify-between mb-6">

          <h1 className="text-2xl font-bold">
            Create Task
          </h1>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>

        </div>

        {/* form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >

          <input
            type="text"
            name="title"
            placeholder="Task title"
            value={formData.title}
            onChange={handleChange}
            className="bg-white/10 border border-white/10 p-4 rounded-xl outline-none"
            required
          />

          <textarea
            name="description"
            placeholder="Task description"
            value={formData.description}
            onChange={handleChange}
            className="bg-white/10 border border-white/10 p-4 rounded-xl outline-none h-[120px]"
            required
          />

          {/* selects */}
          <div className="grid grid-cols-2 gap-4">

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="bg-white/10 border border-white/10 p-4 rounded-xl outline-none"
            >
              <option value="pending">
                Pending
              </option>

              <option value="completed">
                Completed
              </option>

              <option value="in-progress">
                In Progress
              </option>
            </select>

            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="bg-white/10 border border-white/10 p-4 rounded-xl outline-none"
            >
              <option value="low">
                Low
              </option>

              <option value="medium">
                Medium
              </option>

              <option value="high">
                High
              </option>
            </select>

          </div>

          {/* date */}
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="bg-white/10 border border-white/10 p-4 rounded-xl outline-none"
            required
          />

          {/* button */}
          <button
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 transition p-4 rounded-xl font-semibold"
          >
            {
              loading
                ? "Creating..."
                : "Create Task"
            }
          </button>

        </form>

      </div>
    </div>
  );
}

export default CreateTaskModal;