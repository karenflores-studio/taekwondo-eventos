
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { useApiEventos } from '../../services/eventos.service'

export default function EventosEliminar() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [evento, setEvento] = useState(null)
    const [error, setError] = useState('')

    const { getEventoById, deleteEvento } = useApiEventos()

    useEffect(() => {
        getEventoById(id)
            .then(eventoEncontrado => setEvento(eventoEncontrado))
            .catch(error => setError(error.message))
    }, [id])

    const handleEliminar = async () => {
        try {
            await deleteEvento(id)
            navigate('/eventos')
        } catch (error) {
            setError(error.message)
        }
    }

    if (!evento) {
        return <p>Cargando evento...</p>
    }

    return (
        <>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="row justify-content-center">

                <div className="col-lg-10">

                    <div className="card shadow-sm border-0">

                        <div className="card-body p-5">

                            <div className="text-center mb-5 border-bottom pb-4">

                                <h2 className="fw-bold mb-2">
                                    ¿Desea borrar este evento?
                                </h2>

                                <p className="text-muted mb-0">
                                    Esta acción eliminará el evento de la lista.
                                </p>

                            </div>

                            <div className="row align-items-center g-5">

                                <div className="col-md-5 text-center">

                                    <img
                                        src={evento.img || ""}
                                        alt={evento.nombre || "Imagen del evento"}
                                        className="img-fluid rounded evento-eliminar-imagen"
                                    />

                                </div>

                                <div className="col-md-7">

                                    <h2 className="fw-bold mb-4">
                                        {evento.nombre}
                                    </h2>

                                    <p className="text-muted mb-4">
                                        {evento.descripcion}
                                    </p>

                                    <div className="row">

                                        <div className="col-sm-6">

                                            <p className="mb-3">
                                                <strong>Fecha</strong>
                                                <br />
                                                {evento.fecha}
                                            </p>

                                            <p className="mb-3">
                                                <strong>Horario</strong>
                                                <br />
                                                {evento.horario || ""}
                                            </p>

                                        </div>

                                        <div className="col-sm-6">

                                            <p className="mb-3">
                                                <strong>Lugar</strong>
                                                <br />
                                                {evento.lugar}
                                            </p>

                                            <p className="mb-3">
                                                <strong>Tipo de evento</strong>
                                                <br />
                                                {evento.seccion}
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            </div>

                            <div className="d-flex justify-content-end gap-2 mt-5">

                                <Link
                                    to="/eventos"
                                    className="btn btn-secondary"
                                >
                                    Volver
                                </Link>

                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={handleEliminar}
                                >
                                    Borrar evento
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </>
    )
}
