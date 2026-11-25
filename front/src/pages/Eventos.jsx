
import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { useApiEventos } from '../services/eventos.service'

export default function Eventos() {
    const [eventos, setEventos] = useState([])
    const { getEventos } = useApiEventos()

    useEffect(() => {
        getEventos()
            .then(res => setEventos(res))
            .catch(error => console.log(error))
    }, [])

    return (
        <div style={{ padding: '30px' }}>
            <h1>Eventos</h1>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '25px',
                marginTop: '25px'
            }}>
                {eventos.map(evento => (
                    <div
                        key={evento._id}
                        style={{
                            border: '1px solid #ddd',
                            borderRadius: '10px',
                            overflow: 'hidden',
                            backgroundColor: '#fff'
                        }}
                    >
                        {evento.img && (
                            <img
                                src={evento.img}
                                alt={evento.nombre}
                                style={{
                                    width: '100%',
                                    height: '200px',
                                    objectFit: 'cover'
                                }}
                            />
                        )}

                        <div style={{ padding: '20px' }}>
                            <h2>{evento.nombre}</h2>

                            <p>{evento.descripcion}</p>

                            <p>
                                <strong>Tema:</strong> {evento.seccion}
                            </p>

                            <Link to={`/eventos-usuario/detalle/${evento._id}`}>
                                Ver detalle
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

