import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import { updateTask } from "../api/taskApi";

function EditTaskModal({
  isOpen,
  onClose,
  task,
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

  // set task data
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        status: task.status || "pending",
        priority: task.priority || "medium",
        dueDate: task.dueDate
          ? task.dueDate.split("T")[0]
          : "",
      });
    }
  }, [task]);

  // input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // update task
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await updateTask(
        task._id,
        formData
      );

      toast.success("Task updated");

      refreshTasks();

      onClose();

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Update failed"
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
            Edit Task
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

              <option value="in-progress">
                In Progress
              </option>

              <option value="completed">
                Completed
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
                ? "Updating..."
                : "Update Task"
            }
          </button>

        </form>

      </div>
    </div>
  );
}

export default EditTaskModal;