import express from "express";
import { validateLogin,validateRegister } from "../utils/middleware/validator.js";
import {login,register} from "../controller/user_controller.js"
const router=express.Router();


router.post('/login',validateLogin,login);
router.post('/register',validateRegister,register)

export default router;