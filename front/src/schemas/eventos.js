import z from "zod"
import { SLUGS_SECCIONES, imagenSchema, idSchema } from "./comunes.js"

// mismo esquema que valida el backend
// lo repito en el front para avisarle a la persona antes de mandar el pedido
export const eventosSchema = z.object({
    img: imagenSchema,

    nombre: z.string("El nombre es requerido")
        .min(3, "El nombre debe tener como mínimo 3 caracteres")
        .max(120, "El nombre no puede superar los 120 caracteres"),

    seccion: z.enum(SLUGS_SECCIONES, "El tipo de evento no es válido"),

    descripcion: z.string("La descripción es requerida")
        .min(10, "La descripción debe tener como mínimo 10 caracteres")
        .max(1000, "La descripción no puede superar los 1000 caracteres"),

    lugar: z.string("El lugar es requerido")
        .min(3, "El lugar debe tener como mínimo 3 caracteres")
        .max(150, "El lugar no puede superar los 150 caracteres"),

    fecha: z.string("La fecha es requerida")
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Tenés que elegir una fecha"),

    horario: z.string("El horario es requerido")
        .regex(/^\d{2}:\d{2}$/, "Tenés que elegir un horario"),

    link: z.url("El link de inscripción tiene que ser una URL válida"),

    profesorId: idSchema
})
