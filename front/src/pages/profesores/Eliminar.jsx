
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { useApiProfesores } from '../../services/profesores.service'

export default function Eliminar() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [profesor, setProfesor] = useState(null)
    const [error, setError] = useState('')

    const { getProfesorById, deleteProfesor } = useApiProfesores()

    useEffect(() => {
        getProfesorById(id)
            .then(profesorEncontrado => setProfesor(profesorEncontrado))
            .catch(error => setError(error.message))
    }, [id])

    const handleEliminar = async () => {
        try {
            await deleteProfesor(id)
            navigate('/profesores')
        } catch (error) {
            // el backend no deja borrar un profesor que tenga eventos asociados
            setError(error.message)
        }
    }

    if (!profesor) {
        return <p className="text-center mt-4">Cargando profesor...</p>
    }

    return (
        <>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-5">
                    <div className="card shadow-sm border-0">
                        <div className="card-body p-4 text-center">
                            <h4 className="mb-3">Eliminar profesor</h4>

                            <p>
                                ¿Estás seguro de que querés eliminar al profesor
                                <strong> {profesor.nombre}</strong>?
                            </p>

                            <div className="d-flex gap-2 mt-4">
                                <button
                                    type="button"
                                    className="btn btn-danger flex-grow-1"
                                    onClick={handleEliminar}
                                >
                                    Eliminar
                                </button>

                                <Link to="/profesores" className="btn btn-secondary">
                                    Volver
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
