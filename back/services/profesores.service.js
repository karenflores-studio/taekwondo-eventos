import { ObjectId } from "mongodb"
import { db } from "./mongo.service.js"

export async function getProfesores() {
    return await db.collection("profesores").find().toArray()
}

export async function saveProfesor(profesor) {
    await db.collection("profesores").insertOne(profesor)
    return profesor
}

export async function getEventosByProfesor(id) {
    return await db.collection("eventos").find({
        profesorId: new ObjectId(id)
    }).toArray()
}

export async function getProfesorById(id) {
    return await db.collection("profesores").findOne({
        _id: new ObjectId(id)
    })
}

export async function updateProfesor(id, profesor) {
    await db.collection("profesores").updateOne(
        { _id: new ObjectId(id) },
        { $set: profesor }
    )

    return await getProfesorById(id)
}

export async function deleteProfesor(id) {
    await db.collection("profesores").deleteOne({
        _id: new ObjectId(id)
    })
}
