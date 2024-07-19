import { Router } from "express";
import {createProject,getAllProjects,getProjectById} from "../controller/project_controller.js"
import { validateCreateProject,validateGetProjectById } from "../utils/middleware/validator.js";
const router=Router();



router.post('/project/add',validateCreateProject, createProject);
router.get('/projects', getAllProjects);
router.get('/project/:project_id',validateGetProjectById, getProjectById);

export default router;
