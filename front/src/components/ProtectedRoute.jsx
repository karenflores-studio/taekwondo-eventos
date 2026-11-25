import { Navigate } from 'react-router'
import { useUsuario, useRol } from '../context/session.context'

// envuelve una pagina para que no se pueda entrar escribiendo la url
// si no hay sesion manda al login, y si el rol no alcanza manda al inicio
export default function ProtectedRoute({ element, roles }) {
    const usuario = useUsuario()
    const rol = useRol()

    // sin sesion no entra a ningun lado
    if (!usuario) return <Navigate to="/login" replace />

    // si no pedi un rol en particular, alcanza con estar logueado
    if (!roles) return element

    // logueado pero sin el rol necesario
    if (!roles.includes(rol())) return <Navigate to="/" replace />

    return element
}
