
import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router'
import { useApiProfesores } from '../../services/profesores.service'
import { useValidacion } from '../../hooks/useValidacion'
import { profesoresSchema } from '../../schemas/profesores'

export default function Nuevo() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const eventoId = searchParams.get('evento')
    const desdeEvento = searchParams.get('desde') === 'evento'

    const [foto, setFoto] = useState('')
    const [vistaFoto, setVistaFoto] = useState('')
    const [errorApi, setErrorApi] = useState('')

    const { createProfesor } = useApiProfesores()
    const { errores, validar } = useValidacion(profesoresSchema)

    const handleFoto = (e) => {
        const archivo = e.target.files[0]

        if (archivo) {
            const lector = new FileReader()

            lector.onload = (e) => {
                setVistaFoto(e.target.result)
                setFoto(e.target.result)
            }

            lector.readAsDataURL(archivo)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formulario = e.target

        const profesor = {
            foto: foto,
            nombre: formulario.nombre.value,
            descripcion: formulario.descripcion.value
        }

        // valido con el mismo esquema que usa el backend
        const validos = validar(profesor)
        if (!validos) return

        try {
            setErrorApi('')
            await createProfesor(validos)

            if (eventoId) {
                navigate(`/eventos/editar/${eventoId}`)
            } else if (desdeEvento) {
                navigate('/eventos/nuevo')
            } else {
                navigate('/profesores')
            }
        } catch (error) {
            setErrorApi(error.message)
        }
    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
                <div className="card shadow-sm border-0">
                    <div className="card-body p-4">
                        <p className="text-center mb-4">
                            Nuevo profesor
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

                            <div className="text-center mb-4">
                                <div className="d-flex align-items-center justify-content-center mx-auto profesor-foto-contenedor">
                                    <img
                                        id="vistaFotoProfesor"
                                        src={vistaFoto}
                                        alt="Foto del profesor"
                                        className="profesor-foto"
                                    />
                                </div>

                                <label
                                    htmlFor="archivoFoto"
                                    className="btn btn-secondary mt-3"
                                >
                                    Seleccionar foto
                                </label>

                                <input
                                    type="file"
                                    id="archivoFoto"
                                    accept="image/*"
                                    required
                                    className="profesor-input-foto"
                                    onChange={handleFoto}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-semibold">
                                    Nombre:
                                </label>

                                <input
                                    className="form-control"
                                    name="nombre"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="form-label fw-semibold">
                                    Descripción:
                                </label>

                                <textarea
                                    className="form-control"
                                    name="descripcion"
                                    rows="4"
                                    required
                                />
                            </div>

                            <div className="d-flex gap-2">
                                <button
                                    type="submit"
                                    className="btn btn-primary flex-grow-1"
                                >
                                    Guardar profesor
                                </button>

                                <Link
                                    to={
                                        eventoId
                                            ? `/eventos/editar/${eventoId}`
                                            : desdeEvento
                                                ? '/eventos/nuevo'
                                                : '/profesores'
                                    }
                                    className="btn btn-secondary"
                                >
                                    Volver
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
