
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { useApiEventos } from '../../services/eventos.service'
import { useApiProfesores } from '../../services/profesores.service'
import { useValidacion } from '../../hooks/useValidacion'
import { eventosSchema } from '../../schemas/eventos'

export default function EventosEditar() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [evento, setEvento] = useState(null)
    const [profesores, setProfesores] = useState([])
    const [imagen, setImagen] = useState("")
    const [errorApi, setErrorApi] = useState("")

    const { getEventoById, updateEvento } = useApiEventos()
    const { getProfesores } = useApiProfesores()
    const { errores, validar } = useValidacion(eventosSchema)

    useEffect(() => {
        // pido el evento por su id, no toda la lista
        Promise.all([
            getEventoById(id),
            getProfesores()
        ])
            .then(([eventoEncontrado, listaProfesores]) => {
                setEvento(eventoEncontrado)
                setProfesores(listaProfesores)
                setImagen(eventoEncontrado?.img || "")
            })
            .catch(error => setErrorApi(error.message))
    }, [id])

    const handleImagen = (e) => {
        const archivo = e.target.files[0]

        if (archivo) {
            const lector = new FileReader()

            lector.onload = (e) => {
                setImagen(e.target.result)
            }

            lector.readAsDataURL(archivo)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formulario = e.target

        const eventoModificado = {
            img: imagen,
            nombre: formulario.nombre.value,
            seccion: formulario.seccion.value,
            descripcion: formulario.descripcion.value,
            lugar: formulario.lugar.value,
            fecha: formulario.fecha.value,
            horario: formulario.horario.value,
            link: formulario.link.value,
            profesorId: formulario.profesorId.value
        }

        // valido con el mismo esquema que usa el backend
        const validos = validar(eventoModificado)
        if (!validos) return

        try {
            setErrorApi("")
            await updateEvento(id, validos)
            navigate('/eventos')
        } catch (error) {
            setErrorApi(error.message)
        }
    }

    if (!evento) {
        return <p>Cargando evento...</p>
    }

    return (
        <>
            <div className="card shadow-sm">
                <div className="card-body">

                    <form onSubmit={handleSubmit}>

                        {/* mensajes de validacion y errores que devuelve la api */}
                        {(errores.length > 0 || errorApi) && (
                            <div className="alert alert-danger">
                                {errorApi && <p className="mb-0">{errorApi}</p>}
                                {errores.map((mensaje, i) => (
                                    <p key={i} className="mb-0">{mensaje}</p>
                                ))}
                            </div>
                        )}

                        <div className="row">

                            <div className="col-md-4">

                                <label className="form-label">Imagen:</label>

                                <div className="border rounded p-2 text-center mb-2 evento-editar-contenedor-imagen">

                                    <img
                                        id="vistaImagen"
                                        className="img-fluid rounded evento-editar-imagen"
                                        src={imagen}
                                        alt="Imagen del evento"
                                    />

                                </div>

                                <input
                                    type="file"
                                    className="form-control"
                                    accept="image/*"
                                    onChange={handleImagen}
                                />

                            </div>

                            <div className="col-md-8">

                                <div className="row">

                                    <div className="col-md-6 my-2">

                                        <label className="form-label">Nombre:</label>

                                        <input
                                            className="form-control"
                                            name="nombre"
                                            defaultValue={evento.nombre || ""}
                                        />

                                    </div>

                                    <div className="col-md-6 my-2">

                                        <label className="form-label">Tipo de evento:</label>

                                        <select
                                            className="form-select"
                                            name="seccion"
                                            defaultValue={evento.seccion}
                                        >
                                            <option value="torneos">Torneos</option>
                                            <option value="examenes">Exámenes</option>
                                            <option value="seminarios">Seminarios</option>
                                            <option value="exhibiciones">Exhibiciones</option>
                                            <option value="entrenamientos">Entrenamientos</option>
                                        </select>

                                    </div>

                                </div>

                                <div className="my-2">

                                    <label className="form-label">Descripción:</label>

                                    <textarea
                                        className="form-control"
                                        name="descripcion"
                                        rows="4"
                                        defaultValue={evento.descripcion || ""}
                                    />

                                </div>

                                <div className="row">

                                    <div className="col-md-4 my-2">

                                        <label className="form-label">Lugar:</label>

                                        <input
                                            className="form-control"
                                            name="lugar"
                                            defaultValue={evento.lugar || ""}
                                        />

                                    </div>

                                    <div className="col-md-4 my-2">

                                        <label className="form-label">Fecha:</label>

                                        <input
                                            className="form-control"
                                            name="fecha"
                                            defaultValue={evento.fecha || ""}
                                        />

                                    </div>

                                    <div className="col-md-4 my-2">

                                        <label className="form-label">Horario:</label>

                                        <input
                                            className="form-control"
                                            name="horario"
                                            defaultValue={evento.horario || ""}
                                        />

                                    </div>

                                </div>

                                <div className="row">

                                    <div className="col-md-6 my-2">

                                        <label className="form-label">Link de inscripción:</label>

                                        <input
                                            className="form-control"
                                            name="link"
                                            defaultValue={evento.link || ""}
                                        />

                                    </div>

                                    <div className="col-md-6 my-2">

                                        <label className="form-label">Profesor:</label>

                                        <div className="d-flex gap-2">

                                            <select
                                                className="form-select"
                                                name="profesorId"
                                                defaultValue={evento.profesorNuevoId || evento.profesorId || ""}
                                            >
                                                {profesores.map(profesor => (
                                                    <option
                                                        key={profesor._id}
                                                        value={profesor._id}
                                                    >
                                                        {profesor.nombre}
                                                    </option>
                                                ))}
                                            </select>

                                            <Link
                                                to={`/profesores/nuevo?evento=${evento._id}`}
                                                className="btn btn-secondary text-nowrap"
                                            >
                                                + Agregar
                                            </Link>

                                        </div>

                                    </div>

                                </div>

                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary mt-2"
                            >
                                Guardar cambios
                            </button>

                        </div>

                    </form>

                </div>
            </div>

            <div className="text-end mt-3">
                <Link to="/eventos" className="btn btn-secondary">
                    Volver
                </Link>
            </div>
        </>
    )
}
