
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useApiEventos } from '../../services/eventos.service'
import { useApiProfesores } from '../../services/profesores.service'
import { useValidacion } from '../../hooks/useValidacion'
import { eventosSchema } from '../../schemas/eventos'

export default function EventosNuevo() {
    const [profesores, setProfesores] = useState([])
    const [imagen, setImagen] = useState("")
    const [errorApi, setErrorApi] = useState("")
    const navigate = useNavigate()

    const { createEvento } = useApiEventos()
    const { getProfesores } = useApiProfesores()
    const { errores, validar } = useValidacion(eventosSchema)

    useEffect(() => {
        getProfesores()
            .then(data => setProfesores(data))
            .catch(error => console.log(error))
    }, [])

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

        const evento = {
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
        const validos = validar(evento)
        if (!validos) return

        try {
            setErrorApi("")
            await createEvento(validos)
            navigate('/eventos')
        } catch (error) {
            setErrorApi(error.message)
        }
    }

    return (
        <>
            <div className="card shadow-sm">
                <div className="card-body">

                    <p className="card-title mb-4">
                        Nuevo evento
                    </p>

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

                                <label className="form-label">
                                    Imagen:
                                </label>

                                <div className="border rounded p-2 text-center mb-2 evento-nuevo-contenedor-imagen">

                                    <img
                                        id="vistaImagen"
                                        className="img-fluid rounded evento-nuevo-imagen"
                                        src={imagen}
                                        alt="Vista previa del evento"
                                    />

                                </div>

                                <input
                                    type="file"
                                    className="form-control"
                                    accept="image/*"
                                    required
                                    onChange={handleImagen}
                                />

                            </div>

                            <div className="col-md-8">

                                <div className="row">

                                    <div className="col-md-6 my-2">

                                        <label className="form-label">
                                            Nombre:
                                        </label>

                                        <input
                                            className="form-control"
                                            name="nombre"
                                            required
                                        />

                                    </div>

                                    <div className="col-md-6 my-2">

                                        <label className="form-label">
                                            Tipo de evento:
                                        </label>

                                        <select
                                            className="form-select"
                                            name="seccion"
                                            required
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

                                    <label className="form-label">
                                        Descripción:
                                    </label>

                                    <textarea
                                        className="form-control"
                                        name="descripcion"
                                        rows="4"
                                        required
                                    />

                                </div>

                                <div className="row">

                                    <div className="col-md-4 my-2">

                                        <label className="form-label">
                                            Lugar:
                                        </label>

                                        <input
                                            className="form-control"
                                            name="lugar"
                                            required
                                        />

                                    </div>

                                    <div className="col-md-4 my-2">

                                        <label className="form-label">
                                            Fecha:
                                        </label>

                                        <input
                                            type="date"
                                            className="form-control"
                                            name="fecha"
                                            required
                                        />

                                    </div>

                                    <div className="col-md-4 my-2">

                                        <label className="form-label">
                                            Horario:
                                        </label>

                                        <input
                                            type="time"
                                            className="form-control"
                                            name="horario"
                                            required
                                        />

                                    </div>

                                </div>

                                <div className="row">

                                    <div className="col-md-6 my-2">

                                        <label className="form-label">
                                            Link de inscripción:
                                        </label>

                                        <input
                                            type="url"
                                            className="form-control"
                                            name="link"
                                            placeholder="https://ejemplo.com"
                                            required
                                        />

                                    </div>

                                    <div className="col-md-6 my-2">

                                        <label className="form-label">
                                            Profesor:
                                        </label>

                                        <div className="d-flex gap-2">

                                            <select
                                                className="form-select"
                                                name="profesorId"
                                                required
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
                                                to="/profesores/nuevo?desde=evento"
                                                className="btn btn-secondary text-nowrap"
                                            >
                                                + Agregar
                                            </Link>

                                        </div>

                                    </div>

                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary mt-2"
                                >
                                    Guardar
                                </button>

                            </div>

                        </div>

                    </form>

                </div>
            </div>

            <Link to="/eventos" className="btn btn-secondary mt-3">
                Volver
            </Link>
        </>
    )
}
