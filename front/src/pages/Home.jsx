import { Link } from 'react-router'
import { useUsuario } from '../context/session.context'

// pagina de inicio
// muestra accesos distintos segun el rol de quien entro
export default function Home() {
    const usuario = useUsuario()
    const esAdmin = usuario?.rol === 'admin'

    return (
        <div className="container py-4">

            <div className="text-center mb-5">
                <h1 className="mb-2">Hola, {usuario?.name}</h1>
                <p className="text-muted">
                    Cartelera de eventos de taekwondo: torneos, exámenes, seminarios,
                    exhibiciones y entrenamientos.
                </p>
            </div>

            <div className="row g-4 justify-content-center">

                <div className="col-md-5">
                    <div className="card h-100 shadow-sm">
                        <div className="card-body text-center p-4">
                            <h2 className="h5">Eventos</h2>
                            <p className="text-muted small">
                                {esAdmin
                                    ? 'Ver la cartelera y administrar los eventos.'
                                    : 'Mirá todos los eventos disponibles.'}
                            </p>
                            <Link
                                className="btn btn-primary"
                                to={esAdmin ? '/eventos' : '/eventos-usuario'}
                            >
                                Ver eventos
                            </Link>
                        </div>
                    </div>
                </div>

                {esAdmin && (
                    <div className="col-md-5">
                        <div className="card h-100 shadow-sm">
                            <div className="card-body text-center p-4">
                                <h2 className="h5">Profesores</h2>
                                <p className="text-muted small">
                                    Administrar los profesores que dictan los eventos.
                                </p>
                                <Link className="btn btn-primary" to="/profesores">
                                    Ver profesores
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

            </div>

        </div>
    )
}
