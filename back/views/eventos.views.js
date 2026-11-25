import {createPage} from "../page/utils.js"

import {createListPage} from "../page/eventos/lista.js"

import {createDetailPage} from "../page/eventos/detalle.js"

import {createEventoFormPage} from "../page/eventos/nuevo.js"

import {createEventoFormEditPage} from "../page/eventos/editar.js"

import {createDetailDelete} from "../page/eventos/eliminar.js"


export function eventosList( eventos, seccion, profesores, profesor) {
    return createPage(
        "Eventos de Taekwondo",
        createListPage(
            eventos,
            seccion,
            profesores,
            profesor
        )
    )

}

export function evento(evento) {

    return createPage(
        "",
        createDetailPage(evento)
    )

}

export function page404() {

    return createPage(
        "404",
        "Página no encontrada"
    )

}

export function newEventoForm(profesores, profesorNuevoId) {

    return createPage(
        "Nuevo evento",
        createEventoFormPage(
            profesores,
            profesorNuevoId
        )
    )

}

export function editEventoForm(evento, profesores) {

    return createPage(
        "Editar evento",
        createEventoFormEditPage(
            evento,
            profesores
        )
    )

}

export function createDetailDeletePage(evento) {

    return createPage(
        "",
        createDetailDelete(evento)
    )

}