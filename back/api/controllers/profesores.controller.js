import {
    getProfesores as obtenerProfesores,
    getProfesorById as obtenerProfesorById,
    saveProfesor,
    getEventosByProfesor,
    updateProfesor,
    deleteProfesor
} from "../../services/profesores.service.js"
import { FORMATO_ID } from "../../schemas/comunes.js"

// mongo lanza una excepcion si le paso un id con formato invalido
function esIdValido(id) {
    return FORMATO_ID.test(id)
}

// GET /api/profesores
const getProfesores = async (_req, res) => {
    try {
        const profesores = await obtenerProfesores()
        res.status(200).json(profesores)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "No se pudo obtener el listado de profesores" })
    }
}

// GET /api/profesores/:id
const getProfesorById = async (req, res) => {
    try {
        const id = req.params.id

        if (!esIdValido(id)) {
            return res.status(400).json({ message: "El id no es valido" })
        }

        const profesor = await obtenerProfesorById(id)

        if (!profesor) {
            return res.status(404).json({ message: "Profesor no encontrado" })
        }

        res.status(200).json(profesor)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "No se pudo obtener el profesor" })
    }
}

// POST /api/profesores
const crearProfesor = async (req, res) => {
    try {
        const profesor = await saveProfesor(req.body)
        res.status(201).json(profesor)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "No se pudo crear el profesor" })
    }
}

// GET /api/profesores/:id/eventos
// los eventos que pertenecen a este profesor, es la relacion entre las dos colecciones
const getEventosProfesor = async (req, res) => {
    try {
        const id = req.params.id

        if (!esIdValido(id)) {
            return res.status(400).json({ message: "El id no es valido" })
        }

        // primero verifico que el profesor exista
        // asi distingo "no existe" de "existe pero no tiene eventos"
        const profesor = await obtenerProfesorById(id)

        if (!profesor) {
            return res.status(404).json({ message: "Profesor no encontrado" })
        }

        const eventos = await getEventosByProfesor(id)

        res.status(200).json({
            profesor,
            total: eventos.length,
            eventos
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "No se pudo obtener los eventos del profesor" })
    }
}

// PUT /api/profesores/:id
const modificarProfesor = async (req, res) => {
    try {
        const id = req.params.id

        if (!esIdValido(id)) {
            return res.status(400).json({ message: "El id no es valido" })
        }

        const existe = await obtenerProfesorById(id)

        if (!existe) {
            return res.status(404).json({ message: "Profesor no encontrado" })
        }

        const profesorModificado = await updateProfesor(id, req.body)
        res.status(200).json(profesorModificado)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "No se pudo modificar el profesor" })
    }
}

// DELETE /api/profesores/:id
const eliminarProfesor = async (req, res) => {
    try {
        const id = req.params.id

        if (!esIdValido(id)) {
            return res.status(400).json({ message: "El id no es valido" })
        }

        const profesor = await obtenerProfesorById(id)

        if (!profesor) {
            return res.status(404).json({ message: "Profesor no encontrado" })
        }

        // no dejo borrar un profesor que tenga eventos asociados
        // si no, esos eventos quedarian apuntando a alguien que ya no existe
        const eventos = await getEventosByProfesor(id)

        if (eventos.length > 0) {
            return res.status(409).json({
                message: `No se puede eliminar: el profesor tiene ${eventos.length} evento(s) asociado(s)`
            })
        }

        await deleteProfesor(id)

        res.status(200).json({ message: "Profesor eliminado", profesor })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "No se pudo eliminar el profesor" })
    }
}

export {
    getProfesores,
    getProfesorById,
    crearProfesor,
    getEventosProfesor,
    modificarProfesor,
    eliminarProfesor
}
