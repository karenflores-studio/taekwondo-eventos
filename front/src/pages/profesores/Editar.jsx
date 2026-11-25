
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { useApiProfesores } from '../../services/profesores.service'
import { useValidacion } from '../../hooks/useValidacion'
import { profesoresSchema } from '../../schemas/profesores'

export default function Editar() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [profesor, setProfesor] = useState({
        foto: '',
        nombre: '',
        descripcion: ''
    })

    const [vistaFoto, setVistaFoto] = useState('')
    const [errorApi, setErrorApi] = useState('')

    const { getProfesorById, updateProfesor } = useApiProfesores()
    const { errores, validar } = useValidacion(profesoresSchema)

    useEffect(() => {
        // pido el profesor por su id, no toda la lista
        getProfesorById(id)
            .then(profesorEncontrado => {
                setProfesor(profesorEncontrado)
                setVistaFoto(profesorEncontrado.foto)
            })
            .catch(error => setErrorApi(error.message))
    }, [id])

    const handleFoto = (e) => {
        const archivo = e.target.files[0]

        if (archivo) {
            const lector = new FileReader()

            lector.onload = (e) => {
                setVistaFoto(e.target.result)
                setProfesor({
                    ...profesor,
                    foto: e.target.result
                })
            }

            lector.readAsDataURL(archivo)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formulario = e.target

        const profesorModificado = {
            foto: profesor.foto,
            nombre: formulario.nombre.value,
            descripcion: formulario.descripcion.value
        }

        // valido con el mismo esquema que usa el backend
        const validos = validar(profesorModificado)
        if (!validos) return

        try {
            setErrorApi('')
            await updateProfesor(id, validos)
            navigate('/profesores')
        } catch (error) {
            setErrorApi(error.message)
        }
    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
                <div className="card shadow-sm border-0">
                    <div className="card-body p-4">
                        <p className="text-center mb-4">Editar profesor</p>

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
                                        src={vistaFoto}
                                        alt="Foto del profesor"
                                        className="profesor-foto"
                                    />
                                </div>

                                <label htmlFor="archivoFoto" className="btn btn-secondary mt-3">
                                    Seleccionar foto
                                </label>

                                <input
                                    type="file"
                                    id="archivoFoto"
                                    accept="image/*"
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
                                    value={profesor.nombre}
                                    onChange={e => setProfesor({
                                        ...profesor,
                                        nombre: e.target.value
                                    })}
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
                                    value={profesor.descripcion}
                                    onChange={e => setProfesor({
                                        ...profesor,
                                        descripcion: e.target.value
                                    })}
                                    required
                                />
                            </div>

                            <div className="d-flex gap-2">
                                <button
                                    type="submit"
                                    className="btn btn-primary flex-grow-1"
                                >
                                    Guardar cambios
                                </button>

                                <Link to="/profesores" className="btn btn-secondary">
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
