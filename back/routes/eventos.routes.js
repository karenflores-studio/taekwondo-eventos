import * as eventoController from "../controllers/eventos.controller.js"
import { Router } from "express"

const router = Router()

router.get("/eventos", eventoController.getEventos)
router.get("/eventos/nuevo", eventoController.newEventoForm)
router.get("/eventos/editar/:id", eventoController.editEventoForm)
router.post("/eventos/editar/:id", eventoController.editEvento)
router.get("/eventos/borrar/:id", eventoController.deleteEventoForm)
router.post("/eventos/borrar/:id", eventoController.deleteEvento)
router.post("/eventos/nuevo", eventoController.saveEvento)
router.get("/eventos/:id", eventoController.getEventoById)

export default router