const Task = require("../models/Task");

// dashboard stats
exports.getDashboardStats = async (req, res, next) => {
  try {
    // filter based on user role
    let filter = {};

    // normal users only see their own stats
    if (req.user.role !== "admin") {
      filter.$or = [
        { assignedTo: req.user._id },
        { createdBy: req.user._id },
      ];
    }

    // total tasks
    const totalTasks = await Task.countDocuments(filter);

    // completed tasks
    const completedTasks = await Task.countDocuments({
      ...filter,
      status: "completed",
    });

    // pending tasks
    const pendingTasks = await Task.countDocuments({
      ...filter,
      status: "pending",
    });

    // in-progress tasks
    const inProgressTasks = await Task.countDocuments({
      ...filter,
      status: "in-progress",
    });

    // high priority tasks
    const highPriorityTasks = await Task.countDocuments({
      ...filter,
      priority: "high",
    });

    // recent tasks
    const recentTasks = await Task.find(filter)
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("assignedTo", "name email");

    // completion percentage
    const completionRate =
      totalTasks > 0
        ? ((completedTasks / totalTasks) * 100).toFixed(1)
        : 0;

    res.status(200).json({
      success: true,

      stats: {
        totalTasks,
        completedTasks,
        pendingTasks,
        inProgressTasks,
        highPriorityTasks,
        completionRate,
      },

      recentTasks,
    });
  } catch (error) {
    next(error);
  }
};