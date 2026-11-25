import * as profesorController from "../controllers/profesores.controller.js"
import { Router } from "express"

const router = Router()

router.get("/profesores/nuevo", profesorController.newProfesorForm)
router.post("/profesores/nuevo", profesorController.saveNewProfesor)

export default router