import mongoose from "mongoose";

const { Schema, model } = mongoose;

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [200, "Title cannot exceed 200 characters"]
    },

    description: {
      type: String,
      trim: true,
      maxlength: [1000, "Description too long"]
    },

    completed: {
      type: Boolean,
      default: false
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium"
    },

    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending"
    },

    dueDate: {
      type: Date
    },

    is_deleted: {
     type: Boolean,
     default: false
   }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

todoSchema.index({ updatedAt: -1 });
;

const Todo = model("Todo", todoSchema);

export default Todo;