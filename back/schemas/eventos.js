import z from "zod"
import { SECCIONES, imagenSchema, idSchema } from "./comunes.js"

// valida un evento completo, lo uso al crear y al modificar
export const eventosSchema = z.object({
    img: imagenSchema,

    nombre: z.string("El nombre es requerido")
        .min(3, "El nombre debe tener como minimo 3 caracteres")
        .max(120, "El nombre no puede superar los 120 caracteres"),

    seccion: z.enum(SECCIONES, "El tipo de evento no es valido"),

    descripcion: z.string("La descripcion es requerida")
        .min(10, "La descripcion debe tener como minimo 10 caracteres")
        .max(1000, "La descripcion no puede superar los 1000 caracteres"),

    lugar: z.string("El lugar es requerido")
        .min(3, "El lugar debe tener como minimo 3 caracteres")
        .max(150, "El lugar no puede superar los 150 caracteres"),

    // el input date del navegador manda el formato aaaa-mm-dd
    fecha: z.string("La fecha es requerida")
        .regex(/^\d{4}-\d{2}-\d{2}$/, "La fecha tiene que tener el formato aaaa-mm-dd"),

    // el input time manda hh:mm
    horario: z.string("El horario es requerido")
        .regex(/^\d{2}:\d{2}$/, "El horario tiene que tener el formato hh:mm"),

    link: z.url("El link de inscripcion tiene que ser una URL valida"),

    profesorId: idSchema
})
