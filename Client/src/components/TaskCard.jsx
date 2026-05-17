function TaskCard({
  task,
  onDelete,
  onEdit,
}) {
  // priority colors
  const priorityColors = {
    low: "bg-green-600",
    medium: "bg-yellow-500",
    high: "bg-red-600",
  };

  return (
    <div className="bg-white/10 border border-white/10 p-5 rounded-2xl">

      {/* top */}
      <div className="flex items-start justify-between gap-3 mb-4">

        <div>

          <h2 className="text-xl font-semibold">
            {task.title}
          </h2>

          <p className="text-gray-400 mt-2">
            {task.description}
          </p>

        </div>

      </div>

      {/* badges */}
      <div className="flex items-center gap-3 mb-5">

        <span className="bg-blue-600 px-3 py-1 rounded-lg text-sm">
          {task.status}
        </span>

        <span
          className={`${priorityColors[task.priority]} px-3 py-1 rounded-lg text-sm`}
        >
          {task.priority}
        </span>

      </div>

      {/* footer */}
      <div className="flex items-center justify-between">

        <p className="text-sm text-gray-400">
          Due:{" "}
          {
            new Date(
              task.dueDate
            ).toLocaleDateString()
          }
        </p>

        <div className="flex items-center gap-3">

          <button
            onClick={() => onEdit(task)}
            className="bg-yellow-500 hover:bg-yellow-600 transition px-4 py-2 rounded-lg text-sm"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(task._id)}
            className="bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded-lg text-sm"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default TaskCard;