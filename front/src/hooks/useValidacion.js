import { useState } from "react"

// hook propio para validar un formulario contra un esquema de zod
// lo usan los formularios de eventos y profesores, asi la logica esta en un solo lugar
// el backend valida con el mismo esquema, esto es para avisar antes de mandar el pedido
export function useValidacion(schema) {
    const [errores, setErrores] = useState([])

    // devuelve los datos ya validados, o null si algo esta mal
    const validar = (datos) => {
        const resultado = schema.safeParse(datos)

        if (resultado.success) {
            setErrores([])
            return resultado.data
        }

        // junto todos los mensajes para mostrarlos arriba del formulario
        setErrores(resultado.error.issues.map(issue => issue.message))
        return null
    }

    const limpiarErrores = () => setErrores([])

    return { errores, validar, limpiarErrores }
}
