import express from 'express';
import {
    createTask,
    getTasksUnderProject,
    getTaskById,
    getAllTasksUnderProject
} from '../controller/task_controller.js';
import { validateCreateTask, validateGetTaskById } from '../utils/middleware/validator.js';
import verifyToken from '../utils/middleware/verify_token.js';

const router = express.Router();


router.post('/task/:project_id/add', verifyToken,validateCreateTask, createTask);
router.get('/project/:project_id/user/:user_id/tasks',verifyToken, getTasksUnderProject);
router.get('/tasks/:task_id',verifyToken, validateGetTaskById, getTaskById);
router.get('/projects/:project_id/tasks',verifyToken, getAllTasksUnderProject);

export default router;
