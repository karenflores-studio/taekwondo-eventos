import dns from "dns"
import { MongoClient } from "mongodb"

// en algunas maquinas node no lee bien los dns del sistema y usa 127.0.0.1
// mongodb+srv necesita resolver registros SRV, y sin un dns valido no conecta
// si defino DNS_SERVERS en el .env le indico cuales usar
if (process.env.DNS_SERVERS) {
    dns.setServers(process.env.DNS_SERVERS.split(","))
}

// la conexion y el nombre de la base salen del .env
// asi no queda ninguna credencial escrita en el codigo
const MONGO_URI = process.env.MONGO_URI
const DB_NAME = process.env.DB_NAME

if (!MONGO_URI) {
    throw new Error("falta la variable MONGO_URI en el archivo .env")
}

const cliente = new MongoClient(MONGO_URI)

const db = cliente.db(DB_NAME)

export {
    cliente,
    db
}
