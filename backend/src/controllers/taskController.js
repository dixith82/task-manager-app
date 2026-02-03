import { Task } from "../models/index.js";
import { TASK_STATUS, TASK_PRIORITY } from "../utils/constants.js";

// Get all tasks for the authenticated user
export const getTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const { status, priority, search, page = 1, limit = 10 } = req.query;

    // Build filter
    const filter = { userId };
    
    if (status && Object.values(TASK_STATUS).includes(status)) {
      filter.status = status;
    }
    
    if (priority && Object.values(TASK_PRIORITY).includes(priority)) {
      filter.priority = priority;
    }
    
    if (search) {
      filter.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Get tasks with pagination
    const [tasks, total] = await Promise.all([
      Task.findMany({
        where: filter,
        orderBy: { createdAt: "desc" },
        skip: skip,
        take: parseInt(limit),
      }),
      Task.count({ where: filter }),
    ]);

    res.json({
      tasks,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get tasks error:", error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

// Get single task
export const getTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const task = await Task.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({ task });
  } catch (error) {
    console.error("Get task error:", error);
    res.status(500).json({ error: "Failed to fetch task" });
  }
};

// Create new task
export const createTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, description, status, priority, dueDate } = req.body;

    // Validate required fields
    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    // Validate status and priority if provided
    if (status && !Object.values(TASK_STATUS).includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }
    
    if (priority && !Object.values(TASK_PRIORITY).includes(priority)) {
      return res.status(400).json({ error: "Invalid priority value" });
    }

    const task = await Task.create({
      data: {
        title,
        description,
        status: status || TASK_STATUS.PENDING,
        priority: priority || TASK_PRIORITY.MEDIUM,
        dueDate: dueDate ? new Date(dueDate) : null,
        userId,
      },
    });

    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    console.error("Create task error:", error);
    res.status(500).json({ error: "Failed to create task" });
  }
};

// Update task
export const updateTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { title, description, status, priority, dueDate } = req.body;

    // Check if task exists and belongs to user
    const existingTask = await Task.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!existingTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Validate status and priority if provided
    if (status && !Object.values(TASK_STATUS).includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }
    
    if (priority && !Object.values(TASK_PRIORITY).includes(priority)) {
      return res.status(400).json({ error: "Invalid priority value" });
    }

    const task = await Task.update({
      where: { id },
      data: {
        title: title !== undefined ? title : existingTask.title,
        description: description !== undefined ? description : existingTask.description,
        status: status !== undefined ? status : existingTask.status,
        priority: priority !== undefined ? priority : existingTask.priority,
        dueDate: dueDate !== undefined ? new Date(dueDate) : existingTask.dueDate,
      },
    });

    res.json({
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    console.error("Update task error:", error);
    res.status(500).json({ error: "Failed to update task" });
  }
};

// Delete task
export const deleteTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    // Check if task exists and belongs to user
    const existingTask = await Task.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!existingTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    await Task.delete({
      where: { id },
    });

    res.json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("Delete task error:", error);
    res.status(500).json({ error: "Failed to delete task" });
  }
};
