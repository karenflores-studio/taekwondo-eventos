
import { Link, useNavigate } from 'react-router'
import { useUsuario, useLogout } from '../context/session.context'

export default function Nav() {
    const usuario = useUsuario()
    const logout = useLogout()
    const navigate = useNavigate()

    const cerrarSesion = () => {
        logout()
        navigate('/login')
    }

    if (!usuario) {
        return null
    }

    return (
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark mb-4">
            <div className="container-fluid">

                <Link
                    className="navbar-brand"
                    to={usuario.rol === 'user' ? '/eventos-usuario' : '/eventos'}
                >
                    <img src="/logo.png" alt="Taekwondo Eventos" height="40" />
                </Link>

                {usuario.rol !== 'user' && (
                    <div className="navbar-nav me-auto">
                        <Link className="nav-link" to="/">
                            Home
                        </Link>

                        <Link className="nav-link" to="/eventos">
                            Eventos
                        </Link>

                        {usuario.rol === 'admin' && (
                            <Link className="nav-link" to="/profesores">
                                Profesores
                            </Link>
                        )}
                    </div>
                )}

                <div className="d-flex align-items-center gap-3">
                    {usuario.rol !== 'user' && (
                        <span className="navbar-text">
                            {usuario.name}
                        </span>
                    )}

                    <button
                        className="btn btn-outline-light"
                        onClick={cerrarSesion}
                    >
                        Cerrar sesión
                    </button>
                </div>

            </div>
        </nav>
    )
}
