
import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { useApiProfesores } from '../../services/profesores.service'

export default function Lista() {
    const [profesores, setProfesores] = useState([])
    const { getProfesores } = useApiProfesores()

    useEffect(() => {
        cargarProfesores()
    }, [])

    const cargarProfesores = () => {
        getProfesores()
            .then(data => setProfesores(data))
            .catch(error => console.log(error))
    }

    return (
        <div className="container my-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Profesores</h2>
                <Link to="/profesores/nuevo" className="btn btn-success">
                    Nuevo profesor
                </Link>
            </div>

            {profesores.length > 0 ? (
                <div className="table-responsive">
                    <table className="table table-bordered table-hover align-middle">
                        <thead className="table-dark">
                            <tr>
                                <th>Foto</th>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {profesores.map(profesor => (
                                <tr key={profesor._id}>
                                    <td>
                                        <img
                                            src={profesor.foto}
                                            alt={profesor.nombre}
                                            width="100"
                                        />
                                    </td>
                                    <td>{profesor.nombre}</td>
                                    <td>{profesor.descripcion}</td>
                                    <td>
                                        <div className="d-flex gap-1">
                                            <Link
                                                to={`/profesores/editar/${profesor._id}`}
                                                className="btn btn-warning btn-sm"
                                            >
                                                Editar
                                            </Link>
                                            <Link
                                                to={`/profesores/eliminar/${profesor._id}`}
                                                className="btn btn-danger btn-sm"
                                            >
                                                Borrar
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="card border-0 shadow-sm">
                    <div className="card-body text-center py-5">
                        <h4 className="fw-bold mb-2">
                            No hay profesores para mostrar
                        </h4>
                        <p className="text-muted mb-4">
                            Todavía no se registraron profesores.
                        </p>
                        <Link to="/profesores/nuevo" className="btn btn-primary">
                            Crear profesor
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}
