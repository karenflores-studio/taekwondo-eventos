import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router'
import { useApiEventos } from '../../services/eventos.service'
import { useApiProfesores } from '../../services/profesores.service'
import { useRol } from '../../context/session.context'
import EventoFila from '../../components/eventos/EventoFila'
import TablaCargando from '../../components/TablaCargando'
import TablaError from '../../components/TablaError'

const COLUMNAS = 8

export default function Eventos() {
    const [eventos, setEventos] = useState([])
    const [profesores, setProfesores] = useState([])

    // tres estados posibles: mientras carga, cuando llego bien, o cuando fallo
    const [estado, setEstado] = useState('loading')

    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const rol = useRol()

    const seccion = searchParams.get('seccion') || ''
    const profesor = searchParams.get('profesor') || ''
    // el rol sale del token firmado, no del objeto guardado
    const esAdmin = rol() === 'admin'

    const { getEventos } = useApiEventos()
    const { getProfesores } = useApiProfesores()

    useEffect(() => {
        setEstado('loading')

        // el service se encarga de armar la query con los filtros
        getEventos({ seccion, profesor })
            .then(data => {
                setEventos(data)
                setEstado('ready')
            })
            .catch(() => setEstado('error'))

        getProfesores()
            .then(data => setProfesores(data))
            .catch(() => setProfesores([]))
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

    // elijo que mostrar dentro de la tabla segun en que estado esta el pedido
    let contenido

    switch (estado) {
        case 'loading':
            contenido = <TablaCargando columnas={COLUMNAS} />
            break
        case 'ready':
            contenido = <EventoFila eventos={eventos} esAdmin={esAdmin} />
            break
        default:
            contenido = (
                <TablaError
                    columnas={COLUMNAS}
                    mensaje="No se pudieron cargar los eventos. Revisá que el servidor esté funcionando."
                />
            )
    }

    // si el pedido salio bien pero no hay resultados, muestro un cartel en vez de la tabla
    const sinResultados = estado === 'ready' && eventos.length === 0

    return (
        <>
            <div className="my-3 barra-filtros">
                <div className="d-flex align-items-center filtros-seccion">
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

            {sinResultados ? (
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
            ) : (
                <div className="table-responsive">
                    <table className="table table-hover align-middle">
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
                            {contenido}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    )
}
