import { Link } from 'react-router'

// las filas de la tabla de eventos
// solo recibe datos y los dibuja, no consulta nada
export default function EventoFila({ eventos, esAdmin }) {
    return (
        <>
            {eventos.map(evento => (
                <tr key={evento._id}>
                    <td>
                        <img src={evento.img} alt={evento.nombre} width="100" />
                    </td>

                    <td className="nombre-evento">{evento.nombre}</td>

                    <td className="descripcion-evento">{evento.descripcion}</td>

                    <td>{evento.fecha}</td>

                    <td>{evento.horario || ''}</td>

                    <td className="nombre-evento">{evento.lugar}</td>

                    <td>{evento.seccion}</td>

                    <td>
                        <div className="d-flex gap-1">
                            <Link
                                to={`/eventos/detalle/${evento._id}`}
                                className="btn btn-secondary btn-sm"
                            >
                                Ver
                            </Link>

                            {/* editar y borrar solo los ve un administrador */}
                            {esAdmin && (
                                <>
                                    <Link
                                        to={`/eventos/editar/${evento._id}`}
                                        className="btn btn-warning btn-sm"
                                    >
                                        Editar
                                    </Link>

                                    <Link
                                        to={`/eventos/eliminar/${evento._id}`}
                                        className="btn btn-danger btn-sm"
                                    >
                                        Borrar
                                    </Link>
                                </>
                            )}
                        </div>
                    </td>
                </tr>
            ))}
        </>
    )
}
