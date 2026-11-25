import { eventosSchema } from "../schemas/eventos.js"

// reviso el body antes de que llegue al controller
// si algo esta mal corto aca con un 400 y la lista de errores
export async function validateEvento(req, res, next) {
    try {
        const evento = await eventosSchema.parseAsync(req.body)

        // me quedo solo con lo que el esquema deja pasar
        // asi un campo de mas que mande el cliente no llega a la base
        req.body = evento

        next()
    } catch (errors) {
        const mensajes = errors.issues.map(error => `${error.path}: ${error.message}`)
        res.status(400).json({ message: "Datos invalidos", detalles: mensajes })
    }
}
