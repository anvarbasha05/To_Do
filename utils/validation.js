import Joi from "joi";

export const createTodoSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(200)
    .required()
    .messages({
      "string.empty": "Title is required",
      "string.min": "Title must be at least 3 characters",
      "string.max": "Title cannot exceed 200 characters",
    }),

  description: Joi.string()
    .max(1000)
    .allow("")
    .optional(),

  completed: Joi.boolean().optional(),

  priority: Joi.string()
    .valid("low", "medium", "high")
    .optional(),

  status: Joi.string()
    .valid("pending", "in-progress", "completed")
    .optional(),

  dueDate: Joi.date().optional(),
});

export const updateTodoSchema = Joi.object({
  title: Joi.string()
    .trim()
    .min(3)
    .max(200)
    .messages({
      "string.min": "Title must be at least 3 characters",
      "string.max": "Title cannot exceed 200 characters",
    }),

  description: Joi.string()
    .trim()
    .max(1000)
    .allow("", null),

  completed: Joi.boolean(),

  priority: Joi.string()
    .valid("low", "medium", "high"),

  status: Joi.string()
    .valid("pending", "in-progress", "completed"),

  dueDate: Joi.date()
})
  .min(1)
  .messages({
    "object.min": "At least one field must be provided for update"
  });

  export const signupSchema = Joi.object({
  username: Joi.string()
    .min(3)
    .max(50)
    .required()
    .messages({
      "string.empty": "Username is required",
      "string.min": "Username must be at least 3 characters",
      "string.max": "Username cannot exceed 50 characters",
    }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Email must be a valid email address",
    }),

  password: Joi.string()
    .min(6)
    .max(100)
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 6 characters",
      "string.max": "Password cannot exceed 100 characters",
    }),
});

export const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Email must be a valid email address",
    }),

  password: Joi.string()
    .required()
    .messages({
      "string.empty": "Password is required",
    }),
});