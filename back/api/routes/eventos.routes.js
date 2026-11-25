import { Router } from "express"
import {
    getEventos,
    getEventoById,
    crearEvento,
    modificarEvento,
    eliminarEvento
} from "../controllers/eventos.controller.js"
import { validateToken, validateRol } from "../../middlewares/auth.validate.js"
import { validateEvento } from "../../middlewares/eventos.validate.js"

const router = Router()

// consultar es publico: cualquiera puede ver la cartelera de eventos
router.get("/api/eventos", getEventos)
router.get("/api/eventos/:id", getEventoById)

// modificar la cartelera es solo para admin
// primero valido el token, despues el rol y por ultimo los datos
router.post(
    "/api/eventos",
    [validateToken, validateRol(["admin"]), validateEvento],
    crearEvento
)

router.put(
    "/api/eventos/:id",
    [validateToken, validateRol(["admin"]), validateEvento],
    modificarEvento
)

router.delete(
    "/api/eventos/:id",
    [validateToken, validateRol(["admin"])],
    eliminarEvento
)

export default router
