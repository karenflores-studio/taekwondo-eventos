import * as eventoService from "../services/eventos.service.js"
import * as eventoView from "../views/eventos.views.js"
import { getProfesores, getProfesorById } from "../services/profesores.service.js"


export async function getEventos(req, res) {

    try {
        const filtros = req.query
        const eventos = await eventoService.getEventos(
            filtros.seccion,
            filtros.profesor
        )

        const profesores = await getProfesores()
        res.send(
            eventoView.eventosList(
                eventos,
                filtros.seccion,
                profesores,
                filtros.profesor
            )
        )

    } catch (error) {
        res.send(eventoView.page404())

    }

}

export async function getEventoById(req, res) {

    try {
        const id = req.params?.id
        const evento = await eventoService.getEventoById(id)

        if (evento.profesorId) {
            evento.profesor = await getProfesorById(evento.profesorId)
        }

        res.send(eventoView.evento(evento))

    } catch (error) {

        res.send(eventoView.page404())

    }

}

export async function newEventoForm(req, res) {

    try {
        const profesores = await getProfesores()
        const profesorNuevoId = req.query.profesor

        res.send(eventoView.newEventoForm( profesores, profesorNuevoId ))

    } catch (error) {
        res.send(eventoView.page404())

    }

}

export async function editEventoForm(req, res) {

    try {
        const id = req.params?.id
        const evento = await eventoService.getEventoById(id)
        const profesores = await getProfesores()

        if (req.query.profesor) {
            evento.profesorNuevoId = req.query.profesor
        }

        res.send( eventoView.editEventoForm( evento, profesores))

    } catch (error) {
        res.send(eventoView.page404())

    }

}

export async function saveEvento(req, res) {
    try {
        const evento = await eventoService.saveEvento(req.body)

        if (evento.profesorId) {
            evento.profesor = await getProfesorById(evento.profesorId)
        }

        res.send(eventoView.evento(evento))
    } catch (error) {
        res.send(eventoView.page404())
    }
}

export async function editEvento(req, res) {
    try {
        const id = req.params?.id

        const evento = await eventoService.editEvento(id, req.body)

        if (evento.profesorId) {
            evento.profesor = await getProfesorById(evento.profesorId)
        }

        res.send(eventoView.evento(evento))

    } catch (error) {
        res.send(eventoView.page404())
    }
}

export async function deleteEventoForm(req, res) {

    try {
        const id = req.params?.id
        const evento = await eventoService.getEventoById(id)

        res.send( eventoView.createDetailDeletePage(evento))

    } catch (error) {
        res.send(eventoView.page404())

    }

}

export async function deleteEvento(req, res) {

    try {
        const id = req.params?.id

        await eventoService.deleteEventoLogico(id)

        res.redirect("/eventos")

    } catch (error) {

        res.send(eventoView.page404())

    }

}