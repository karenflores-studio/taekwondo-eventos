import { call } from "./api.service.js"

// toda la logica de llamadas a la api de profesores vive aca
export function useApiProfesores() {

    const getProfesores = () => call("/profesores")

    const getProfesorById = (id) => call("/profesores/" + id)

    // devuelve { profesor, total, eventos }: la relacion entre las dos colecciones
    const getEventosDelProfesor = (id) => call("/profesores/" + id + "/eventos")

    const createProfesor = (profesor) => call("/profesores", "POST", profesor)

    const updateProfesor = (id, profesor) => call("/profesores/" + id, "PUT", profesor)

    const deleteProfesor = (id) => call("/profesores/" + id, "DELETE")

    return {
        getProfesores,
        getProfesorById,
        getEventosDelProfesor,
        createProfesor,
        updateProfesor,
        deleteProfesor
    }
}
