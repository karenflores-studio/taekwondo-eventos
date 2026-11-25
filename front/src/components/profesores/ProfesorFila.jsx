import { Link } from 'react-router'

// las filas de la tabla de profesores
export default function ProfesorFila({ profesores }) {
    return (
        <>
            {profesores.map(profesor => (
                <tr key={profesor._id}>
                    <td>
                        <img src={profesor.foto} alt={profesor.nombre} width="100" />
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
        </>
    )
}
