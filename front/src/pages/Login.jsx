import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useApiUsuarios } from '../services/usuarios.service'
import { useLogin } from '../context/session.context'

export default function Login() {
    const navigate = useNavigate()
    const { login } = useApiUsuarios()
    const auth = useLogin()

    const [error, setError] = useState('')
    const [enviando, setEnviando] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const email = e.target.email.value
        const pass = e.target.pass.value

        setError('')
        setEnviando(true)

        try {
            const usuario = await login({ email, password: pass })

            // guardo la sesion en el context y en localStorage
            auth(usuario)

            // cada rol arranca en su pantalla
            if (usuario.rol === 'admin') {
                navigate('/eventos')
            } else {
                navigate('/eventos-usuario')
            }
        } catch {
            // el mensaje viene del backend, no muestro si fallo el mail o la clave
            setError('Usuario o contraseña incorrectos')
        } finally {
            setEnviando(false)
        }
    }

    return (
        <div className="row justify-content-center py-5">
            <div className="col-md-5 col-lg-4">
                <div className="card shadow-sm border-0">
                    <div className="card-body p-4">

                        <h1 className="h4 text-center mb-4">Iniciar sesión</h1>

                        {error && (
                            <div className="alert alert-danger">{error}</div>
                        )}

                        <form onSubmit={handleSubmit}>

                            <div className="mb-3">
                                <label className="form-label" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    className="form-control"
                                    type="email"
                                    name="email"
                                    id="email"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="form-label" htmlFor="pass">
                                    Contraseña
                                </label>
                                <input
                                    className="form-control"
                                    type="password"
                                    name="pass"
                                    id="pass"
                                    required
                                />
                            </div>

                            <button
                                className="btn btn-primary w-100"
                                type="submit"
                                disabled={enviando}
                            >
                                {enviando ? 'Ingresando...' : 'Ingresar'}
                            </button>

                        </form>

                        <p className="text-center mt-3 mb-0 small">
                            ¿No tenés cuenta? <Link to="/register">Registrate</Link>
                        </p>

                    </div>
                </div>
            </div>
        </div>
    )
}
