import z from "zod"

// las secciones validas de un evento
// las usa el esquema y tambien el select del formulario, asi no se desincronizan
export const SECCIONES = [
    { slug: "torneos", nombre: "Torneos" },
    { slug: "examenes", nombre: "Exámenes" },
    { slug: "seminarios", nombre: "Seminarios" },
    { slug: "exhibiciones", nombre: "Exhibiciones" },
    { slug: "entrenamientos", nombre: "Entrenamientos" }
]

export const SLUGS_SECCIONES = SECCIONES.map(s => s.slug)

// las imagenes se suben desde el formulario y viajan como data:image/...;base64,...
// tambien acepto una direccion de internet
export const imagenSchema = z.string("La imagen es requerida")
    .refine(
        valor =>
            /^data:image\/[a-zA-Z+.-]+;base64,/.test(valor) ||
            /^https?:\/\//.test(valor),
        { error: "Tenes que elegir una imagen" }
    )

export const idSchema = z.string("Tenes que elegir un profesor")
    .regex(/^[0-9a-fA-F]{24}$/, "Tenes que elegir un profesor")
