import { Router } from "express"
import {
    getProfesores,
    getProfesorById,
    crearProfesor,
    getEventosProfesor,
    modificarProfesor,
    eliminarProfesor
} from "../controllers/profesores.controller.js"
import { validateToken, validateRol } from "../../middlewares/auth.validate.js"
import { validateProfesor } from "../../middlewares/profesores.validate.js"

const router = Router()

// consultar es publico
router.get("/api/profesores", getProfesores)
router.get("/api/profesores/:id", getProfesorById)

// los eventos que pertenecen a un profesor en particular
router.get("/api/profesores/:id/eventos", getEventosProfesor)

// alta, modificacion y baja solo para admin
router.post(
    "/api/profesores",
    [validateToken, validateRol(["admin"]), validateProfesor],
    crearProfesor
)

router.put(
    "/api/profesores/:id",
    [validateToken, validateRol(["admin"]), validateProfesor],
    modificarProfesor
)

router.delete(
    "/api/profesores/:id",
    [validateToken, validateRol(["admin"])],
    eliminarProfesor
)

export default router
