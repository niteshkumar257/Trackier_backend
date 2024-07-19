import { Router } from "express";
import {createProject,getAllProjects,getProjectById} from "../controller/project_controller.js"
const router=Router();



router.post('/projects', createProject);
router.get('/projects', getAllProjects);
router.get('/projects/:project_id', getProjectById);

export default router;
