// filas grises que se muestran mientras los datos viajan
// sirve para cualquier tabla: le paso cuantas columnas tiene
export default function TablaCargando({ columnas, filas = 4 }) {
    return (
        <>
            {Array.from({ length: filas }).map((_, fila) => (
                <tr key={fila} className="placeholder-glow">
                    {Array.from({ length: columnas }).map((_, columna) => (
                        <td key={columna}>
                            <span className="placeholder col-10"></span>
                        </td>
                    ))}
                </tr>
            ))}
        </>
    )
}
