import {
    getEventos as obtenerEventos,
    getEventoById as obtenerEventoById,
    saveEvento,
    updateEvento,
    deleteEvento
} from "../../services/eventos.service.js"
import { FORMATO_ID } from "../../schemas/comunes.js"

// mongo lanza una excepcion si le paso un id con formato invalido
// por eso lo chequeo antes de consultar
function esIdValido(id) {
    return FORMATO_ID.test(id)
}

// GET /api/eventos
// trae todos, con los filtros opcionales que vengan en la query
const getEventos = async (req, res) => {
    try {
        const { seccion, profesor } = req.query

        if (profesor && !esIdValido(profesor)) {
            return res.status(400).json({ message: "El id del profesor no es valido" })
        }

        const eventos = await obtenerEventos(seccion, profesor)
        res.status(200).json(eventos)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "No se pudo obtener el listado de eventos" })
    }
}

// GET /api/eventos/:id
const getEventoById = async (req, res) => {
    try {
        const id = req.params.id

        if (!esIdValido(id)) {
            return res.status(400).json({ message: "El id no es valido" })
        }

        const evento = await obtenerEventoById(id)

        if (!evento) {
            return res.status(404).json({ message: "Evento no encontrado" })
        }

        res.status(200).json(evento)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "No se pudo obtener el evento" })
    }
}

// POST /api/eventos
const crearEvento = async (req, res) => {
    try {
        const evento = await saveEvento(req.body)
        res.status(201).json(evento)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "No se pudo crear el evento" })
    }
}

// PUT /api/eventos/:id
const modificarEvento = async (req, res) => {
    try {
        const id = req.params.id

        if (!esIdValido(id)) {
            return res.status(400).json({ message: "El id no es valido" })
        }

        const existe = await obtenerEventoById(id)

        if (!existe) {
            return res.status(404).json({ message: "Evento no encontrado" })
        }

        await updateEvento(id, req.body)

        // devuelvo el evento ya actualizado y no el body, asi el front ve lo que quedo guardado
        const actualizado = await obtenerEventoById(id)
        res.status(200).json(actualizado)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "No se pudo modificar el evento" })
    }
}

// DELETE /api/eventos/:id
const eliminarEvento = async (req, res) => {
    try {
        const id = req.params.id

        if (!esIdValido(id)) {
            return res.status(400).json({ message: "El id no es valido" })
        }

        const evento = await obtenerEventoById(id)

        if (!evento) {
            return res.status(404).json({ message: "Evento no encontrado" })
        }

        await deleteEvento(id)

        res.status(200).json({ message: "Evento eliminado", evento })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "No se pudo eliminar el evento" })
    }
}

export { getEventos, getEventoById, crearEvento, modificarEvento, eliminarEvento }
