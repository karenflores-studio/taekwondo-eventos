import jwt from "jsonwebtoken"

// la clave de firma sale del .env y la comparten este archivo y users.service
// antes estaba escrita en los dos lugares, y si cambiaba en uno se rompia todo
const JWT_SECRET = process.env.JWT_SECRET

// verifica que el pedido traiga un token valido en la cabecera Authorization
export function validateToken(req, res, next) {
    try {
        const auth = req.headers.authorization

        if (!auth) throw new Error("falta la cabecera Authorization")

        const [bearer, token] = auth.split(" ")

        if (bearer !== "Bearer" || !token) throw new Error("formato de token invalido")

        // si el token esta vencido o fue firmado con otra clave, verify lanza error
        const payload = jwt.verify(token, JWT_SECRET)
        req.usuario = payload

        next()
    } catch (error) {
        res.status(401).json({ message: "Token invalido o vencido" })
    }
}

// se usa despues de validateToken: chequea que el rol del usuario este permitido
export function validateRol(roles) {
    return (req, res, next) => {
        if (roles.includes(req.usuario?.rol)) {
            next()
        } else {
            res.status(403).json({ message: "No tenes permisos para esta accion" })
        }
    }
}
