const Task = require("../models/Task");

// create new task
exports.createTask = async (req, res, next) => {
  try {
    const {
      title,
      description,
      status,
      priority,
      dueDate,
      assignedTo,
    } = req.body;

    // uploaded files
    const attachments = req.files?.map((file) => ({
      fileName: file.filename,
      filePath: file.path,
      fileSize: file.size,
    }));

    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,
      assignedTo,
      attachments,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    next(error);
  }
};

// get all tasks
exports.getTasks = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    // filters
    const filter = {};

    if (req.query.status) {
      filter.status = req.query.status;
    }

    if (req.query.priority) {
      filter.priority = req.query.priority;
    }

    // normal users only see their tasks
    if (req.user.role !== "admin") {
      filter.$or = [
        { assignedTo: req.user._id },
        { createdBy: req.user._id },
      ];
    }

    // sorting
    let sortBy = {};

    if (req.query.sortBy === "dueDate") {
      sortBy.dueDate = 1;
    } else {
      sortBy.createdAt = -1;
    }

    const totalTasks = await Task.countDocuments(filter);

    const tasks = await Task.find(filter)
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email")
      .skip(skip)
      .limit(limit)
      .sort(sortBy);

    res.status(200).json({
      success: true,
      count: tasks.length,
      totalTasks,
      currentPage: page,
      totalPages: Math.ceil(totalTasks / limit),
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

// get single task
exports.getSingleTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email");

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    next(error);
  }
};

// update task
exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // ownership check
    if (
      req.user.role !== "admin" &&
      task.createdBy.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to update this task",
      });
    }

    Object.assign(task, req.body);

    await task.save();

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    next(error);
  }
};

// delete task
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // ownership check
    if (
      req.user.role !== "admin" &&
      task.createdBy.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to delete this task",
      });
    }

    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};