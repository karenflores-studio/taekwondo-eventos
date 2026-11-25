import z from "zod"
import { imagenSchema } from "./comunes.js"

// valida un profesor completo, lo uso al crear y al modificar
export const profesoresSchema = z.object({
    foto: imagenSchema,

    nombre: z.string("El nombre es requerido")
        .min(3, "El nombre debe tener como minimo 3 caracteres")
        .max(100, "El nombre no puede superar los 100 caracteres"),

    descripcion: z.string("La descripcion es requerida")
        .min(10, "La descripcion debe tener como minimo 10 caracteres")
        .max(600, "La descripcion no puede superar los 600 caracteres")
})
