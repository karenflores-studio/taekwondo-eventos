import z from "zod"
import { imagenSchema } from "./comunes.js"

// mismo esquema que valida el backend
export const profesoresSchema = z.object({
    foto: imagenSchema,

    nombre: z.string("El nombre es requerido")
        .min(3, "El nombre debe tener como mínimo 3 caracteres")
        .max(100, "El nombre no puede superar los 100 caracteres"),

    descripcion: z.string("La descripción es requerida")
        .min(10, "La descripción debe tener como mínimo 10 caracteres")
        .max(600, "La descripción no puede superar los 600 caracteres")
})
