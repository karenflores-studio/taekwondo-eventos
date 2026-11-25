// fila que avisa que la consulta fallo
// es distinto de "no hay datos": aca el pedido no llego a buen puerto
export default function TablaError({ columnas, mensaje }) {
    return (
        <tr>
            <td colSpan={columnas} className="text-center text-danger py-4">
                {mensaje || "No se pudieron cargar los datos. Probá de nuevo."}
            </td>
        </tr>
    )
}
