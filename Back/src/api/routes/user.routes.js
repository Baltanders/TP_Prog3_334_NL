import { Router } from "express";
import { createUserAdmin } from "../controllers/user.controllers.js";
const router = Router();


router.post("/", createUserAdmin);


export default router;