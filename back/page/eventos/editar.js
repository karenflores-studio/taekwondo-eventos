export function createEventoFormEditPage(evento, profesores) {

    let html = ""

    html += `
        <div class="card shadow-sm">

            <div class="card-body">

                <form action="/eventos/editar/${evento._id}" method="POST">

                    <div class="row">

                        <div class="col-md-4">

                            <label class="form-label"> Imagen: </label>

                            <div class="border rounded p-2 text-center mb-2 evento-editar-contenedor-imagen" >

                                <img id="vistaImagen" class="img-fluid rounded evento-editar-imagen" src="${evento.img || ""}" />

                            </div>

                            <input type="file" class="form-control" accept="image/*" onchange="
                            
                                    const archivo = this.files[0]

                                    if (archivo) {
                                        const lector = new FileReader()

                                        lector.onload = function(e) {
                                            document.getElementById('vistaImagen').src = e.target.result
                                        }

                                        lector.readAsDataURL(archivo)
                                    }
                                "
                            />

                        </div>

                        <div class="col-md-8">

                            <div class="row">

                                <div class="col-md-6 my-2">

                                    <label class="form-label"> Nombre: </label>

                                    <input class="form-control" name="nombre" value="${evento.nombre || ""}" />

                                </div>

                                <div class="col-md-6 my-2">

                                    <label class="form-label"> Tipo de evento: </label>

                                    <select class="form-select" name="seccion" >

                                        <option value="torneos" ${evento.seccion === "torneos" ? "selected" : ""} >
                                            Torneos
                                        </option>

                                        <option value="examenes" ${evento.seccion === "examenes" ? "selected" : ""} >
                                            Exámenes
                                        </option>

                                        <option value="seminarios" ${evento.seccion === "seminarios" ? "selected" : ""}>
                                            Seminarios
                                        </option>

                                        <option value="exhibiciones" ${evento.seccion === "exhibiciones" ? "selected" : ""}>
                                            Exhibiciones
                                        </option>

                                        <option value="entrenamientos" ${evento.seccion === "entrenamientos" ? "selected" : ""}>
                                            Entrenamientos
                                        </option>

                                    </select>

                                </div>

                            </div>

                            <div class="my-2">

                                <label class="form-label"> Descripción: </label>

                                <textarea class="form-control" name="descripcion" rows="4" >${evento.descripcion || ""}</textarea>

                            </div>


                            <div class="row">

                                <div class="col-md-4 my-2">

                                    <label class="form-label"> Lugar: </label>

                                    <input class="form-control" name="lugar" value="${evento.lugar || ""}" />

                                </div>


                                <div class="col-md-4 my-2">

                                    <label class="form-label"> Fecha: </label>

                                    <input class="form-control" name="fecha" value="${evento.fecha || ""}"/>

                                </div>

                                <div class="col-md-4 my-2">

                                    <label class="form-label"> Horario: </label>

                                    <input class="form-control" name="horario"  value="${evento.horario || ""}" />

                                </div>

                            </div>

                            <div class="row">

                                <div class="col-md-6 my-2">

                                    <label class="form-label"> Link de inscripción: </label>

                                    <input class="form-control" name="link" value="${evento.link || ""}" />

                                </div>

                                <div class="col-md-6 my-2">

                                    <label class="form-label"> Profesor: </label>

                                    <div class="d-flex gap-2">

                                        <select class="form-select" name="profesorId" >

                                            ${profesores.map(profesor => `
                                                <option
                                                    value="${profesor._id}"
                                                    ${
                                                        evento.profesorNuevoId?.toString() === profesor._id.toString() ||
                                                        (!evento.profesorNuevoId && evento.profesorId?.toString() === profesor._id.toString())
                                                        ? "selected"
                                                        : ""
                                                    }
                                                >
                                                    ${profesor.nombre}
                                                </option>
                                            `).join("")}

                                        </select>

                                        <a  href="/profesores/nuevo?evento=${evento._id}" class="btn btn-secondary text-nowrap" > + Agregar </a>

                                    </div>

                                </div>

                            </div>

                            

                        </div>

                        <button type="submit" class="btn btn-primary mt-2" > Guardar cambios </button>

                    </div>

                </form>

            </div>

        </div>
    `

   html += `
        <div class="text-end mt-3">
            <a href="/eventos" class="btn btn-secondary">Volver</a>
        </div>
    `

    return html
}