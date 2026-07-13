
import { Router } from "express";
import { eliminarSession, getUserAdmin, loginView } from "../controllers/auth.controllers.js";

const router = Router();

//vistalogin
router.get("/", loginView);

//usuario admin
router.post("/", getUserAdmin);

//elimina sesion
router.post("/destroy", eliminarSession);

export default router;
