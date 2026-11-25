
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { useApiEventos } from '../services/eventos.service'
import { useApiProfesores } from '../services/profesores.service'

export default function EventoDetalle() {
    const { id } = useParams()
    const [evento, setEvento] = useState(null)

    const { getEventoById } = useApiEventos()
    const { getProfesorById } = useApiProfesores()

    useEffect(() => {
        // pido el evento por su id y despues el profesor que lo dicta
        getEventoById(id)
            .then(async eventoEncontrado => {
                const profesor = eventoEncontrado.profesorId
                    ? await getProfesorById(eventoEncontrado.profesorId)
                    : null

                setEvento({ ...eventoEncontrado, profesor })
            })
            .catch(error => console.log(error))
    }, [id])

    if (!evento) {
        return <p>Cargando evento...</p>
    }

    return (
        <>
            <div className="card shadow-sm border-0">
                <div className="card-body p-4">
                    <div className="row align-items-center g-5">
                        <div className="col-md-5">
                            <div className="evento-imagen">
                                <img
                                    src={evento.img || ""}
                                    className="img-fluid"
                                    alt={evento.nombre || "Imagen del evento"}
                                />
                            </div>
                        </div>

                        <div className="col-md-7">
                            <div className="mb-4">
                                <p className="text-muted mb-2">
                                    Tipo de evento: {evento.seccion || ""}
                                </p>

                                <h1 className="fw-bold mb-3">
                                    {evento.nombre || ""}
                                </h1>

                                <p className="text-muted mb-0">
                                    {evento.descripcion || ""}
                                </p>
                            </div>

                            <section className="row border-top border-bottom py-4 mb-4">
                                <div className="col-md-4">
                                    <dl className="mb-0">
                                        <dt className="fw-semibold">Fecha</dt>
                                        <dd className="mb-0">
                                            {evento.fecha || ""}
                                        </dd>
                                    </dl>
                                </div>

                                <div className="col-md-4">
                                    <dl className="mb-0">
                                        <dt className="fw-semibold">Horario</dt>
                                        <dd className="mb-0">
                                            {evento.horario || ""}
                                        </dd>
                                    </dl>
                                </div>

                                <div className="col-md-4">
                                    <dl className="mb-0">
                                        <dt className="fw-semibold">Lugar</dt>
                                        <dd className="mb-0">
                                            {evento.lugar || ""}
                                        </dd>
                                    </dl>
                                </div>
                            </section>

                            <section className="mb-4">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div>
                                        <p className="text-muted mb-2">
                                            Evento organizado por el profesor
                                        </p>

                                        <div className="d-flex align-items-center gap-3">
                                            <img
                                                src={evento.profesor?.foto || ""}
                                                alt={evento.profesor?.nombre || "Profesor"}
                                                className="profesor-imagen"
                                            />

                                            <p className="fw-semibold mb-0">
                                                {evento.profesor?.nombre || "No especificado"}
                                            </p>
                                        </div>
                                    </div>

                                    <a
                                        href={evento.link || "#"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-primary"
                                    >
                                        Ver inscripción
                                    </a>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-3 text-end">
                <Link to="/eventos-usuario" className="btn btn-secondary">
                    Volver
                </Link>
            </div>
        </>
    )
}
