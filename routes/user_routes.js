import express from "express";
import {login,register,userInfo} from "../controller/user_controller.js"
const router=express.Router();


router.post('/login',login);
router.post('/register',register)

export default router;