import { call } from "./api.service.js"

// toda la logica de llamadas a la api de eventos vive aca
// las paginas no saben que existe fetch ni como son las urls
export function useApiEventos() {

    // acepta filtros opcionales por seccion y por profesor
    const getEventos = (filtros = {}) => {
        const params = new URLSearchParams()

        if (filtros.seccion) params.set("seccion", filtros.seccion)
        if (filtros.profesor) params.set("profesor", filtros.profesor)

        const query = params.toString()

        return call("/eventos" + (query ? "?" + query : ""))
    }

    const getEventoById = (id) => call("/eventos/" + id)

    const createEvento = (evento) => call("/eventos", "POST", evento)

    const updateEvento = (id, evento) => call("/eventos/" + id, "PUT", evento)

    const deleteEvento = (id) => call("/eventos/" + id, "DELETE")

    return {
        getEventos,
        getEventoById,
        createEvento,
        updateEvento,
        deleteEvento
    }
}
