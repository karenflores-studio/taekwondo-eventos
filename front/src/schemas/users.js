
import z from "zod"

export const usersSchema = z.object({
    email: z.email("El correo tiene que ser válido"),
    name: z.string("El nombre es requerido")
        .min(3, "El nombre debe tener como mínimo 3 caracteres"),
    password: z.string("La contraseña es requerida")
        .min(8, "Como mínimo debe tener 8 caracteres")
        .regex(/[A-Z]/, "Debe tener una mayúscula")
        .regex(/[a-z]/, "Debe tener una minúscula")
        .regex(/[0-9]/, "Debe tener números")
        .regex(/[@_.,_!"·$%&/(=)]/, "Debe tener un carácter especial"),
    confirmPassword: z.string("La confirmación de contraseña es obligatoria")
})
    .refine((data) => data.password === data.confirmPassword, {
        error: "Las contraseñas no coinciden",
        path: ["confirmPassword"],
    })
