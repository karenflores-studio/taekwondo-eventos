import {createPage} from "../page/utils.js"

import {createProfesorFormPage} from "../page/profesores/formulario.js"


export function newProfesorForm(eventoId) {

    return createPage(
        "Nuevo profesor",
        createProfesorFormPage(eventoId)
    )

}