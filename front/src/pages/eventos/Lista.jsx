
import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router'
import { useApiEventos } from '../../services/eventos.service'
import { useApiProfesores } from '../../services/profesores.service'
import { useUsuario } from '../../context/session.context'

export default function Eventos() {
    const [eventos, setEventos] = useState([])
    const [profesores, setProfesores] = useState([])
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const usuario = useUsuario()

    const seccion = searchParams.get('seccion') || ''
    const profesor = searchParams.get('profesor') || ''
    const esAdmin = usuario?.rol === 'admin'

    const { getEventos } = useApiEventos()
    const { getProfesores } = useApiProfesores()

    useEffect(() => {
        // el service se encarga de armar la query con los filtros
        getEventos({ seccion, profesor })
            .then(data => setEventos(data))
            .catch(error => console.log(error))

        getProfesores()
            .then(data => setProfesores(data))
            .catch(error => console.log(error))
    }, [seccion, profesor])

    const cambiarFiltro = (nuevaSeccion) => {
        const parametros = new URLSearchParams()

        if (nuevaSeccion) parametros.set('seccion', nuevaSeccion)
        if (profesor) parametros.set('profesor', profesor)

        navigate('/eventos' + (parametros.toString() ? '?' + parametros.toString() : ''))
    }

    const cambiarProfesor = (e) => {
        const parametros = new URLSearchParams()

        if (seccion) parametros.set('seccion', seccion)
        if (e.target.value) parametros.set('profesor', e.target.value)

        navigate('/eventos' + (parametros.toString() ? '?' + parametros.toString() : ''))
    }

    const categorias = [
        { valor: '', nombre: 'Todos' },
        { valor: 'torneos', nombre: 'Torneos' },
        { valor: 'examenes', nombre: 'Exámenes' },
        { valor: 'seminarios', nombre: 'Seminarios' },
        { valor: 'exhibiciones', nombre: 'Exhibiciones' },
        { valor: 'entrenamientos', nombre: 'Entrenamientos' }
    ]

    return (
        <>
            <div className="my-3 d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                    {categorias.map(categoria => (
                        <button
                            key={categoria.valor}
                            type="button"
                            className={`btn ${seccion === categoria.valor ? 'btn-secondary' : 'btn-primary'} m-1`}
                            onClick={() => cambiarFiltro(categoria.valor)}
                        >
                            {categoria.nombre}
                        </button>
                    ))}

                    <div className="ms-3">
                        <select
                            className="form-select"
                            value={profesor}
                            onChange={cambiarProfesor}
                        >
                            <option value="">Todos los profesores</option>

                            {profesores.map(profesorItem => (
                                <option key={profesorItem._id} value={profesorItem._id}>
                                    {profesorItem.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {esAdmin && (
                    <Link to="/eventos/nuevo" className="btn btn-success">
                        Nuevo Evento
                    </Link>
                )}
            </div>

            {eventos.length > 0 ? (
                <div className="table-responsive">
                    <table className="table table-bordered table-hover align-middle">
                        <thead className="table-dark">
                            <tr>
                                <th>Imagen</th>
                                <th className="nombre-evento">Nombre</th>
                                <th className="descripcion-evento">Descripción</th>
                                <th>Fecha</th>
                                <th>Horario</th>
                                <th className="nombre-evento">Lugar</th>
                                <th>Tipo de evento</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {eventos.map(evento => (
                                <tr key={evento._id}>
                                    <td>
                                        <img
                                            src={evento.img}
                                            alt={evento.nombre}
                                            width="100"
                                        />
                                    </td>

                                    <td className="nombre-evento">
                                        {evento.nombre}
                                    </td>

                                    <td className="descripcion-evento">
                                        {evento.descripcion}
                                    </td>

                                    <td>{evento.fecha}</td>

                                    <td>{evento.horario || ''}</td>

                                    <td className="nombre-evento">
                                        {evento.lugar}
                                    </td>

                                    <td>{evento.seccion}</td>

                                    <td>
                                        <div className="d-flex gap-1">
                                            <Link
                                                to={`/eventos/detalle/${evento._id}`}
                                                className="btn btn-secondary btn-sm"
                                            >
                                                Ver
                                            </Link>

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
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="card border-0 shadow-sm mt-4">
                    <div className="card-body text-center py-5">
                        <div className="evento-sin-resultados-icono">
                            <i className="bi bi-emoji-frown fs-1 text-secondary"></i>
                        </div>

                        <h4 className="fw-bold mb-2">
                            No hay eventos para mostrar
                        </h4>

                        <p className="evento-sin-resultados-texto text-muted mb-4 mx-auto">
                            No encontramos eventos que coincidan con los filtros seleccionados.
                            Probá con otra categoría o seleccioná otro profesor.
                        </p>

                        <button
                            type="button"
                            className="btn btn-primary px-4"
                            onClick={() => navigate('/eventos')}
                        >
                            Ver todos los eventos
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}
