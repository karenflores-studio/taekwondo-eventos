
import { createContext, useContext, useState } from "react"

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

export function SessionProvider({ children }) {
    const [usuario, setUsuario] = useState(
        JSON.parse(localStorage.getItem("usuario"))
    )

    const onLogin = (usuario) => {
        const datosUsuario = {
            usuario: usuario.email,
            name: usuario.name,
            rol: usuario.rol,
            token: usuario.token
        }

        setUsuario(datosUsuario)

        localStorage.setItem("usuario", JSON.stringify(datosUsuario))
    }

    const onLogout = () => {
        localStorage.removeItem("usuario")
        setUsuario(null)
    }

    const onRol = () => {
        return usuario?.rol
    }

    return (
        <context.Provider value={{ usuario, onLogin, onLogout, onRol }}>
            {children}
        </context.Provider>
    )
}
