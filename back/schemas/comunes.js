import z from "zod"

// las secciones validas de un evento
// las comparten el esquema, el filtro del listado y el select del formulario
export const SECCIONES = [
    "torneos",
    "examenes",
    "seminarios",
    "exhibiciones",
    "entrenamientos"
]

// un ObjectId de mongo son 24 caracteres hexadecimales
export const FORMATO_ID = /^[0-9a-fA-F]{24}$/

// las imagenes pueden llegar de dos formas:
// subidas desde el formulario, que viajan como data:image/...;base64,...
// o como una direccion de internet
export const imagenSchema = z.string("La imagen es requerida")
    .refine(
        valor =>
            /^data:image\/[a-zA-Z+.-]+;base64,/.test(valor) ||
            /^https?:\/\//.test(valor),
        { error: "La imagen tiene que ser un archivo subido o una URL http" }
    )

// el id de mongo llega como texto desde la url o el formulario
export const idSchema = z.string("Tenes que elegir un profesor")
    .regex(FORMATO_ID, "El identificador no es valido")
