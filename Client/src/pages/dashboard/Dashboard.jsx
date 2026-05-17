import { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import MainLayout from "../../layouts/MainLayout";

import { AuthContext } from "../../context/AuthContext";

import {
  getTasks,
  deleteTask,
} from "../../api/taskApi";

import TaskCard from "../../components/TaskCard";

function Dashboard() {
  const navigate = useNavigate();

  const { logout } = useContext(AuthContext);

  // task state
  const [tasks, setTasks] = useState([]);

  // loading state
  const [loading, setLoading] = useState(true);

  // fetch tasks
  const fetchTasks = async () => {
    try {
      const data = await getTasks();

      setTasks(data.tasks || []);
    } catch (error) {
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  // delete task
  const handleDelete = async (id) => {
    try {
      await deleteTask(id);

      toast.success("Task deleted");

      fetchTasks();

    } catch (error) {
      toast.error("Delete failed");
    }
  };

  // logout
  const handleLogout = () => {
    logout();

    navigate("/");
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <MainLayout>

      {/* top section */}
      <div className="flex items-center justify-between mb-8">

        <div>

          <h1 className="text-4xl font-bold">
            Task Dashboard
          </h1>

          <p className="text-gray-400 mt-2">
            Manage your workflow
          </p>

        </div>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 transition px-5 py-3 rounded-xl"
        >
          Logout
        </button>

      </div>

      {/* stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">

        <div className="bg-white/10 border border-white/10 p-6 rounded-2xl">

          <h2 className="text-gray-400 mb-3">
            Total Tasks
          </h2>

          <h1 className="text-4xl font-bold">
            {tasks.length}
          </h1>

        </div>

        <div className="bg-white/10 border border-white/10 p-6 rounded-2xl">

          <h2 className="text-gray-400 mb-3">
            Completed
          </h2>

          <h1 className="text-4xl font-bold text-green-400">
            {
              tasks.filter(
                (task) =>
                  task.status === "completed"
              ).length
            }
          </h1>

        </div>

        <div className="bg-white/10 border border-white/10 p-6 rounded-2xl">

          <h2 className="text-gray-400 mb-3">
            Pending
          </h2>

          <h1 className="text-4xl font-bold text-yellow-400">
            {
              tasks.filter(
                (task) =>
                  task.status === "pending"
              ).length
            }
          </h1>

        </div>

      </div>

      {/* tasks */}
      <div>

        <h2 className="text-2xl font-bold mb-5">
          Your Tasks
        </h2>

        {
          loading ? (
            <p>Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <p className="text-gray-400">
              No tasks found
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

              {
                tasks.map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onDelete={handleDelete}
                  />
                ))
              }

            </div>
          )
        }

      </div>

    </MainLayout>
  );
}

export default Dashboard;