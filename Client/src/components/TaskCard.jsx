function TaskCard({ task, onDelete }) {
  return (
    <div className="bg-white/10 border border-white/10 p-5 rounded-2xl">

      {/* title */}
      <div className="flex items-start justify-between mb-4">

        <div>

          <h2 className="text-xl font-semibold">
            {task.title}
          </h2>

          <p className="text-gray-400 mt-2">
            {task.description}
          </p>

        </div>

      </div>

      {/* status */}
      <div className="flex items-center justify-between mt-6">

        <span className="bg-blue-600 px-3 py-1 rounded-lg text-sm">
          {task.status}
        </span>

        <button
          onClick={() => onDelete(task._id)}
          className="bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded-lg text-sm"
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default TaskCard;