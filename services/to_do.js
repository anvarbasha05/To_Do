import mongoose from "mongoose";
import Todo from "../models/to_do.js";
import {sendNotificationToUser} from "../socket.js"

const { Types } = mongoose;

export const createToDo = async (params) => {
  try {
    let { data } = params;

    if (typeof data !== "object" || Array.isArray(data)) {
      throw new Error("Data must be an object");
    }

    const result = await Todo.create(data);
    sendNotificationToUser(data.userId,{ event: "todo_created", data:{message:"To do Created Successfully"}});

    return {
      insertedCount: 1,
      insertedId: result._id,
      message: "Inserted successfully",
    };
    
  } catch (err) {
    throw new Error("Error creating data: " + err.message);
  }
};

export const getToDos = async (params = {}) => {
  try {
    const {
      sortBy = "updatedAt",
      order = "desc",
      status,
      priority,
      completed,
      page = 1,
      limit = 10,
      userId
    } = params;

    const filter = {
      is_deleted: { $ne: true },
      userId,
    };

    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (completed !== undefined) filter.completed = completed;

    const sortOrder = order === "asc" ? 1 : -1;

    const skip = (page - 1) * limit;

    const todos = await Todo.find(filter)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit);

    return todos;
  } catch (err) {
    throw new Error("Error fetching data: " + err.message);
  }
};

export const getToDoById = async (params) => {
  try {
    let { id, userId } = params;

    if (!Types.ObjectId.isValid(id)) {
      throw new Error("Invalid ID format");
    }

    return await Todo.findOne({
      _id: id,
      userId: userId,
      is_deleted: { $ne: true },
    });
  } catch (err) {
    throw new Error("Error fetching data by ID: " + err.message);
  }
};

export const updateToDoById = async (params) => {
  try {
    let { id, userId, data } = params;

    if (!Types.ObjectId.isValid(id)) {
      throw new Error("Invalid ID format");
    }

    const result = await Todo.updateOne(
      { _id: id },
      {
        $set: {
          ...data,
          updatedAt: new Date(),
        },
      },
    );
    sendNotificationToUser(userId, { event: "todo_updated", data:{message:"To do updated Successfully"}});

    return {
      modified: result.modifiedCount > 0,
      data: result,
    };
  } catch (err) {
    throw new Error("Error updating data by ID: " + err.message);
  }
};

export const DeleteToDoById = async (params) => {
  try {
    let { id, userId } = params;

    if (!Types.ObjectId.isValid(id)) {
      throw new Error("Invalid ID format");
    }

    const result = await Todo.updateOne(
      { _id: id },
      {
        $set: {
          is_deleted: true,
          updatedAt: new Date(),
        },
      },
    );
     sendNotificationToUser(userId, { event: "todo_deleted", data:{message:"To do deleted Successfully"}});

    return {
      modified: result.modifiedCount > 0,
      data: result,
    };
  } catch (err) {
    throw new Error("Error deleting data by ID: " + err.message);
  }
};

export default {
  createToDo,
  getToDos,
  getToDoById,
  updateToDoById,
  DeleteToDoById,
};
