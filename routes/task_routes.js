import express from 'express';
import {
    createTask,
    getTasksUnderProject,
    getTaskById,
    getAllTasksUnderProject
} from '../controller/task_controller.js';
import { validateCreateTask, validateGetTaskById } from '../utils/middleware/validator.js';

const router = express.Router();


router.post('/task/:project_id/add', validateCreateTask, createTask);
router.get('/project/:project_id/user/:user_id/tasks', getTasksUnderProject);
router.get('/tasks/:task_id', validateGetTaskById, getTaskById);
router.get('/projects/:project_id/tasks', getAllTasksUnderProject);

export default router;
