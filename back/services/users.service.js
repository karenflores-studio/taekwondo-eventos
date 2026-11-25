
import { db } from "./mongo.service.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

// misma clave que usa el middleware para verificar, sale del .env
const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES = process.env.JWT_EXPIRES || "2h"

export async function saveUser(usuario) {
    const existe = await db.collection("users").findOne({
        email: usuario.email
    })

    if (existe) throw new Error()

    usuario.password = await bcrypt.hash(usuario.password, 10)
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

    if (!usuarioDB) throw new Error()

    const valido = await bcrypt.compare(
        usuario.password,
        usuarioDB.password
    )

    if (!valido) throw new Error()

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
