
import * as usersService from "../../services/users.service.js"

export async function saveUser(req, res) {
    try {
        const user = await usersService.saveUser(req.body)
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json({ message: "No se pudo guardar el usuario" })
    }
}

export async function loginUser(req, res) {
    try {
        const user = await usersService.login(req.body)

        if (!user) {
            return res.status(400).json({
                message: "Usuario o contraseña incorrectos"
            })
        }

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({
            message: "No se pudo iniciar sesión"
        })
    }
}
