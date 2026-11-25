import { db } from "./mongo.service.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

// misma clave que usa el middleware para verificar, sale del .env
const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES = process.env.JWT_EXPIRES || "2h"

// armo un error con el codigo http que le corresponde
// asi el controller sabe si fue culpa del cliente o del servidor
function errorCon(codigo, mensaje) {
    const error = new Error(mensaje)
    error.codigo = codigo
    return error
}

export async function saveUser(usuario) {
    const existe = await db.collection("users").findOne({
        email: usuario.email
    })

    if (existe) throw errorCon(409, "Ya existe una cuenta con ese email")

    // la contraseña nunca se guarda en claro
    usuario.password = await bcrypt.hash(usuario.password, 10)

    // el rol lo decide el servidor, no el cliente
    usuario.rol = "user"

    delete usuario.confirmPassword

    await db.collection("users").insertOne(usuario)

    return {
        email: usuario.email,
        name: usuario.name,
        rol: usuario.rol
    }
}

export async function login(usuario) {
    const usuarioDB = await db.collection("users").findOne({
        email: usuario.email
    })

    // uso el mismo mensaje si el mail no existe o si la clave esta mal
    // asi nadie puede averiguar que direcciones estan registradas
    const invalidas = () => errorCon(401, "Email o contraseña incorrectos")

    if (!usuarioDB) throw invalidas()

    const valido = await bcrypt.compare(usuario.password, usuarioDB.password)

    if (!valido) throw invalidas()

    const rol = usuarioDB.rol || "user"

    const token = jwt.sign(
        { email: usuarioDB.email, rol: rol },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES }
    )

    return {
        email: usuarioDB.email,
        name: usuarioDB.name,
        rol: rol,
        token: token
    }
}
