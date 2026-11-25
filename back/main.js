import express from "express"
import cors from "cors"
import { cliente } from "./services/mongo.service.js"

// rutas de la api rest, es la interfaz principal del backend
import eventosApiRoutes from "./api/routes/eventos.routes.js"
import profesoresApiRoutes from "./api/routes/profesores.routes.js"
import usersApiRoutes from "./api/routes/user.routes.js"

// rutas que devuelven html, quedaron del trabajo anterior
import eventosWebRoutes from "./routes/eventos.routes.js"
import profesoresWebRoutes from "./routes/profesores.routes.js"

const app = express()
const PORT = process.env.PORT || 3333

// dejo pasar los pedidos del front de react, que corre en otro puerto
app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173"
}))

app.use("/", express.static("public"))

app.use(express.urlencoded({ extended: true }))

// el limite alto es porque las imagenes viajan en base64 dentro del json
app.use(express.json({ limit: "10mb" }))

app.use(eventosApiRoutes)
app.use(profesoresApiRoutes)
app.use(usersApiRoutes)

app.use(eventosWebRoutes)
app.use(profesoresWebRoutes)

// si el pedido era a la api y ninguna ruta matcheo, respondo json y no html
app.use("/api", (req, res) => {
    res.status(404).json({ message: "Endpoint no encontrado" })
})

// me conecto a la base antes de levantar el servidor
// si la conexion falla no tiene sentido aceptar pedidos
cliente.connect()
    .then(() => {
        console.log("mongodb conectado - base:", process.env.DB_NAME)
        app.listen(PORT, () => console.log(`api funcionando en http://localhost:${PORT}`))
    })
    .catch(error => {
        console.error("no se pudo conectar a mongodb:", error.message)
        process.exit(1)
    })
