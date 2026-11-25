// capa unica que habla con el backend
// todas las paginas pasan por aca, asi el token y los errores se manejan en un solo lugar

// la direccion del backend sale del .env
// en vite las variables tienen que empezar con VITE_ para llegar al navegador
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3333/api"

export async function call(uri, method = "GET", body = undefined) {
    const usuario = JSON.parse(localStorage.getItem("usuario"))

    const headers = {
        "Content-Type": "application/json"
    }

    // si hay sesion abierta mando el token en cada pedido
    if (usuario?.token) {
        headers.Authorization = "Bearer " + usuario.token
    }

    const respuesta = await fetch(API_URL + uri, {
        headers: headers,
        method: method,
        body: body ? JSON.stringify(body) : undefined
    })

    // si el servidor contesto con un error, leo el mensaje que mando
    // asi la pagina puede mostrarselo a la persona en vez de un error generico
    if (!respuesta.ok) {
        let mensaje = "No se pudo completar la operacion"

        try {
            const error = await respuesta.json()

            if (error.detalles) {
                mensaje = error.detalles.join(" - ")
            } else if (error.message) {
                mensaje = error.message
            }
        } catch {
            // si la respuesta no era json me quedo con el mensaje generico
        }

        throw new Error(mensaje)
    }

    // un 204 no trae cuerpo
    if (respuesta.status === 204) return null

    return await respuesta.json()
}
