import { ObjectId } from "mongodb"
import { db } from "./mongo.service.js"

export async function getEventos(seccion, profesor) {
    let filtro = { eliminado: { $ne: true } }

    if (seccion) filtro.seccion = seccion
    if (profesor) filtro.profesorId = new ObjectId(profesor)

    return await db.collection("eventos").find(filtro).toArray()
}

export async function getEventoById(id) {

    return await db.collection("eventos").findOne({
        _id: new ObjectId(id)
    })
}

export async function saveEvento(evento) {

    if (evento.profesorId) {
        evento.profesorId = new ObjectId(evento.profesorId)
    }

    await db.collection("eventos").insertOne(evento)

    return evento
}

export async function editEvento(id, evento) {

    if (evento.profesorId) {
        evento.profesorId = new ObjectId(evento.profesorId)
    }

    await db.collection("eventos").updateOne(
        { _id: new ObjectId(id) },
        { $set: evento }
    )

    return await getEventoById(id)
}

export async function deleteEventoLogico(id) {

    await db.collection("eventos").updateOne(
        { _id: new ObjectId(id) },
        { $set: { eliminado: true } }
    )

    return await getEventoById(id)
}

export async function updateEvento(id, evento) {

    if (evento.profesorId) {
        evento.profesorId = new ObjectId(evento.profesorId)
    }

    await db.collection("eventos").updateOne(
        { _id: new ObjectId(id) },
        { $set: evento }
    )
}

export async function deleteEvento(id) {

    await db.collection("eventos").deleteOne({
        _id: new ObjectId(id)
    })
}