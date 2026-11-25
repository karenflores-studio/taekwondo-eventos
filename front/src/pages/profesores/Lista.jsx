import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { useApiProfesores } from '../../services/profesores.service'
import ProfesorFila from '../../components/profesores/ProfesorFila'
import TablaCargando from '../../components/TablaCargando'
import TablaError from '../../components/TablaError'

const COLUMNAS = 4

export default function Lista() {
    const [profesores, setProfesores] = useState([])

    // tres estados posibles: mientras carga, cuando llego bien, o cuando fallo
    const [estado, setEstado] = useState('loading')

    const { getProfesores } = useApiProfesores()

    useEffect(() => {
        cargarProfesores()
    }, [])

    const cargarProfesores = () => {
        setEstado('loading')

        getProfesores()
            .then(data => {
                setProfesores(data)
                setEstado('ready')
            })
            .catch(() => setEstado('error'))
    }

    // elijo que mostrar dentro de la tabla segun en que estado esta el pedido
    let contenido

    switch (estado) {
        case 'loading':
            contenido = <TablaCargando columnas={COLUMNAS} />
            break
        case 'ready':
            contenido = <ProfesorFila profesores={profesores} />
            break
        default:
            contenido = (
                <TablaError
                    columnas={COLUMNAS}
                    mensaje="No se pudieron cargar los profesores. Revisá que el servidor esté funcionando."
                />
            )
    }

    // si el pedido salio bien pero no hay resultados, muestro un cartel en vez de la tabla
    const sinResultados = estado === 'ready' && profesores.length === 0

    return (
        <div className="container my-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Profesores</h2>
                <Link to="/profesores/nuevo" className="btn btn-success">
                    Nuevo profesor
                </Link>
            </div>

            {sinResultados ? (
                <div className="card border-0 shadow-sm">
                    <div className="card-body text-center py-5">
                        <h4 className="fw-bold mb-2">
                            No hay profesores para mostrar
                        </h4>
                        <p className="text-muted mb-4">
                            Todavía no se registraron profesores.
                        </p>
                        <Link to="/profesores/nuevo" className="btn btn-primary">
                            Crear profesor
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-hover align-middle tabla-profesores">
                        <thead className="table-dark">
                            <tr>
                                <th>Foto</th>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contenido}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
