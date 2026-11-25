import * as usersService from "../../services/users.service.js"

// si el service le puso un codigo al error, lo uso y muestro su mensaje
// si no, fue algo inesperado: 500 y un mensaje generico
function responderError(res, error, mensajeGenerico) {
    if (error.codigo) {
        return res.status(error.codigo).json({ message: error.message })
    }

    console.error(error)
    res.status(500).json({ message: mensajeGenerico })
}

// POST /api/users
export async function saveUser(req, res) {
    try {
        const user = await usersService.saveUser(req.body)
        res.status(201).json(user)
    } catch (error) {
        responderError(res, error, "No se pudo guardar el usuario")
    }
}

// POST /api/login
export async function loginUser(req, res) {
    try {
        const user = await usersService.login(req.body)
        res.status(200).json(user)
    } catch (error) {
        responderError(res, error, "No se pudo iniciar sesión")
    }
}
