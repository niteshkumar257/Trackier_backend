import { body, param, validationResult } from "express-validator";

export const validateCreateTask = [
  param("project_id").isInt().withMessage("Project ID must be an integer"),
  body("name").isString().notEmpty().withMessage("Name is required"),
  body("description").isString().optional(),
  body("status_id").isInt().withMessage("Status ID must be an integer"),
  body("tags").isString().optional(),
  body("due_date").isDate().withMessage("Due date must be a valid date"),
  body("assigned_to")
    .isInt()
    .withMessage("Assigned user ID must be an integer"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[1].msg });
    }
    next();
  },
];

export const validateGetTaskById = [
  param("task_id").isInt().withMessage("Task ID must be an integer"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[1].msg });
    }
    next();
  },
];

export const validateCreateProject = [
  body("name").isString().notEmpty().withMessage("Name is required"),
  body("description").isString().optional(),
  body("created_by").isInt().withMessage("Created by must be an integer"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateGetProjectById = [
  param("project_id").isInt().withMessage("Project ID must be an integer"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateLogin = [
  body("email").isEmail().notEmpty().withMessage("Enter a valid Email Id"),
  body("password").isString().notEmpty().withMessage("Password is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[1].msg });
    }
    next();
  },
];

export const validateRegister = [
  body("email").isString().notEmpty().withMessage("Email is required"),
  body("password").isString().notEmpty().withMessage("Password is required"),
  body("name").isString().notEmpty().withMessage("Name is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[1].msg });
    }
    next();
  },
];
