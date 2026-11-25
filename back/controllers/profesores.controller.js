import * as profesorView from "../views/profesores.views.js"
import { saveProfesor } from "../services/profesores.service.js"

export function newProfesorForm(req, res) {
    
    try {
        const eventoId = req.query.evento

        res.send(profesorView.newProfesorForm(eventoId))

    } catch (error) {
        res.send("Página no encontrada")
        
    }
}

export async function saveNewProfesor(req, res) {

    try {
        const profesor = await saveProfesor(req.body)
        const eventoId = req.query.evento

        if (eventoId) {
            res.redirect("/eventos/editar/" + eventoId + "?profesor=" + profesor._id)
        } else {
            res.redirect("/eventos/nuevo?profesor=" + profesor._id)
        }

    } catch (error) {
        res.send("Página no encontrada")

    }

}