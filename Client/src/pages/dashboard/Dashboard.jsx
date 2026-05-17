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

import CreateTaskModal from "../../components/CreateTaskModal";

import EditTaskModal from "../../components/EditTaskModal";

function Dashboard() {
  const navigate = useNavigate();

  const { logout } = useContext(AuthContext);

  // task state
  const [tasks, setTasks] = useState([]);

  // loading state
  const [loading, setLoading] = useState(true);

  // create modal state
  const [openModal, setOpenModal] = useState(false);

  // edit modal state
  const [openEditModal, setOpenEditModal] =
    useState(false);

  // selected task for editing
  const [selectedTask, setSelectedTask] =
    useState(null);

  // fetch tasks from backend
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

  // open edit modal
  const handleEdit = (task) => {
    setSelectedTask(task);

    setOpenEditModal(true);
  };

  // logout user
  const handleLogout = () => {
    logout();

    navigate("/");
  };

  // fetch tasks initially
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <MainLayout>

        {/* top section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

          <div>

            <h1 className="text-4xl font-bold">
              Task Dashboard
            </h1>

            <p className="text-gray-400 mt-2">
              Manage your workflow smarter
            </p>

          </div>

          {/* buttons */}
          <div className="flex items-center gap-4">

            <button
              onClick={() => setOpenModal(true)}
              className="bg-blue-600 hover:bg-blue-700 transition px-5 py-3 rounded-xl font-medium"
            >
              + Create Task
            </button>

            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 transition px-5 py-3 rounded-xl font-medium"
            >
              Logout
            </button>

          </div>

        </div>

        {/* stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">

          {/* total tasks */}
          <div className="bg-white/10 border border-white/10 p-6 rounded-2xl">

            <h2 className="text-gray-400 mb-3">
              Total Tasks
            </h2>

            <h1 className="text-4xl font-bold">
              {tasks.length}
            </h1>

          </div>

          {/* completed */}
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

          {/* pending */}
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

        {/* task section */}
        <div>

          <div className="flex items-center justify-between mb-5">

            <h2 className="text-2xl font-bold">
              Your Tasks
            </h2>

          </div>

          {/* loading state */}
          {
            loading ? (
              <p className="text-gray-400">
                Loading tasks...
              </p>
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
                      onEdit={handleEdit}
                    />
                  ))
                }

              </div>
            )
          }

        </div>

      </MainLayout>

      {/* create task modal */}
      <CreateTaskModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        refreshTasks={fetchTasks}
      />

      {/* edit task modal */}
      <EditTaskModal
        isOpen={openEditModal}
        onClose={() => setOpenEditModal(false)}
        task={selectedTask}
        refreshTasks={fetchTasks}
      />
    </>
  );
}

export default Dashboard;