import { createContext, useContext, useState } from "react"
import { jwtDecode } from "jwt-decode"

export const context = createContext()

export function useSession() {
    return useContext(context)
}

export function useLogin() {
    const { onLogin } = useSession()
    return onLogin
}

export function useLogout() {
    const { onLogout } = useSession()
    return onLogout
}

export function useUsuario() {
    const { usuario } = useSession()
    return usuario
}

export function useRol() {
    const { onRol } = useSession()
    return onRol
}

// leo la sesion guardada al abrir la aplicacion
// si el token ya vencio no la restauro: el backend la iba a rechazar igual
function leerSesionGuardada() {
    try {
        const guardado = JSON.parse(localStorage.getItem("usuario"))

        if (!guardado?.token) return null

        const payload = jwtDecode(guardado.token)

        // exp viene en segundos y Date.now() en milisegundos
        if (payload.exp * 1000 < Date.now()) {
            localStorage.removeItem("usuario")
            return null
        }

        return guardado
    } catch {
        // si el token esta roto o no es un jwt, arranco sin sesion
        localStorage.removeItem("usuario")
        return null
    }
}

export function SessionProvider({ children }) {
    const [usuario, setUsuario] = useState(leerSesionGuardada)

    const onLogin = (usuario) => {
        // guardo solo lo necesario para mostrar y para autenticar
        // el rol no lo guardo aparte: sale del token cada vez que hace falta
        const datosUsuario = {
            usuario: usuario.email,
            name: usuario.name,
            token: usuario.token
        }

        setUsuario(datosUsuario)
        localStorage.setItem("usuario", JSON.stringify(datosUsuario))
    }

    const onLogout = () => {
        localStorage.removeItem("usuario")
        setUsuario(null)
    }

    // el rol se lee del token, que viene firmado por el backend
    // si lo leyera de localStorage cualquiera podria editarlo desde la consola
    // y ver la interfaz de administrador sin serlo
    const onRol = () => {
        if (!usuario?.token) return null

        try {
            return jwtDecode(usuario.token).rol
        } catch {
            return null
        }
    }

    return (
        <context.Provider value={{ usuario, onLogin, onLogout, onRol }}>
            {children}
        </context.Provider>
    )
}
