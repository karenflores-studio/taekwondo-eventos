import { profesoresSchema } from "../schemas/profesores.js"

// reviso el body antes de que llegue al controller
// si algo esta mal corto aca con un 400 y la lista de errores
export async function validateProfesor(req, res, next) {
    try {
        const profesor = await profesoresSchema.parseAsync(req.body)

        // me quedo solo con lo que el esquema deja pasar
        req.body = profesor

        next()
    } catch (errors) {
        const mensajes = errors.issues.map(error => `${error.path}: ${error.message}`)
        res.status(400).json({ message: "Datos invalidos", detalles: mensajes })
    }
}
