import { Router } from "express";
import {createProject,getAllProjects,getProjectById} from "../controller/project_controller.js"
import { validateCreateProject,validateGetProjectById } from "../utils/middleware/validator.js";
import verifyToken from "../utils/middleware/verify_token.js";
const router=Router();



router.post('/project/add',verifyToken,validateCreateProject, createProject);
router.get('/projects', verifyToken,getAllProjects);
router.get('/project/:project_id',verifyToken,validateGetProjectById, getProjectById);

export default router;
