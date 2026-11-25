import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { usersSchema } from '../schemas/users'
import { useApiUsuarios } from '../services/usuarios.service'

export default function Register() {
    const navigate = useNavigate()
    const [errorApi, setErrorApi] = useState('')

    // react-hook-form valida contra el esquema de zod antes de mandar el pedido
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: zodResolver(usersSchema),
        criteriaMode: 'all'
    })

    const { register: registerApi } = useApiUsuarios()

    const onSubmit = async (usuario) => {
        setErrorApi('')

        try {
            await registerApi(usuario)
            navigate('/login')
        } catch (error) {
            setErrorApi(error.message)
        }
    }

    return (
        <div className="row justify-content-center py-5">
            <div className="col-md-6 col-lg-5">
                <div className="card shadow-sm border-0">
                    <div className="card-body p-4">

                        <h1 className="h4 text-center mb-4">Crear cuenta</h1>

                        {errorApi && (
                            <div className="alert alert-danger">{errorApi}</div>
                        )}

                        <form onSubmit={handleSubmit(onSubmit)}>

                            <div className="mb-3">
                                <label className="form-label" htmlFor="email">Email</label>
                                <input
                                    className="form-control"
                                    id="email"
                                    type="email"
                                    {...register('email')}
                                />
                                {errors.email && (
                                    <div className="text-danger small mt-1">
                                        {errors.email.message}
                                    </div>
                                )}
                            </div>

                            <div className="mb-3">
                                <label className="form-label" htmlFor="name">Nombre</label>
                                <input
                                    className="form-control"
                                    id="name"
                                    type="text"
                                    {...register('name')}
                                />
                                {errors.name && (
                                    <div className="text-danger small mt-1">
                                        {errors.name.message}
                                    </div>
                                )}
                            </div>

                            <div className="mb-3">
                                <label className="form-label" htmlFor="password">Contraseña</label>
                                <input
                                    className="form-control"
                                    id="password"
                                    type="password"
                                    {...register('password')}
                                />

                                {/* la contrasena puede romper varias reglas a la vez,
                                    por eso muestro todos los mensajes y no solo el primero */}
                                <div className="text-danger small mt-1">
                                    {Array.isArray(errors.password?.types?.invalid_format)
                                        ? errors.password.types.invalid_format.map((mensaje, i) => (
                                            <div key={i}>{mensaje}</div>
                                        ))
                                        : errors.password?.message && <div>{errors.password.message}</div>
                                    }
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="form-label" htmlFor="confirmPassword">
                                    Confirmar contraseña
                                </label>
                                <input
                                    className="form-control"
                                    id="confirmPassword"
                                    type="password"
                                    {...register('confirmPassword')}
                                />
                                {errors.confirmPassword && (
                                    <div className="text-danger small mt-1">
                                        {errors.confirmPassword.message}
                                    </div>
                                )}
                            </div>

                            <button
                                className="btn btn-primary w-100"
                                disabled={isSubmitting}
                                type="submit"
                            >
                                {isSubmitting ? 'Creando cuenta...' : 'Registrarse'}
                            </button>

                        </form>

                        <p className="text-center mt-3 mb-0 small">
                            ¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link>
                        </p>

                    </div>
                </div>
            </div>
        </div>
    )
}
