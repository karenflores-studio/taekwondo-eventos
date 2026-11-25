export function createEventoFormPage(profesores, profesorNuevoId) {

    let html = ""

    html += `
        <div class="card shadow-sm">
            <div class="card-body">

                <p class="card-title mb-4"> Nuevo evento </p>

                <form action="/eventos/nuevo" method="POST">

                    <div class="row">

                        <div class="col-md-4">

                            <label class="form-label"> Imagen: </label>

                            <div class="border rounded p-2 text-center mb-2  evento-nuevo-contenedor-imagen" >

                                <img id="vistaImagen" class="img-fluid rounded evento-nuevo-imagen"/>

                            </div>

                            <input type="file"
                                class="form-control"
                                accept="image/*"
                                required
                                onchange="
                                    const archivo = this.files[0]

                                    if (archivo) {
                                        const lector = new FileReader()

                                        lector.onload = function(e) {
                                            document.getElementById('vistaImagen').src = e.target.result
                                            document.getElementById('imagenBase64').value = e.target.result
                                        }

                                        lector.readAsDataURL(archivo)
                                    }
                                "
                            />

                            <input type="hidden" name="img" id="imagenBase64"/>

                        </div>

                        <div class="col-md-8">

                            <div class="row">

                                <div class="col-md-6 my-2">

                                    <label class="form-label"> Nombre: </label>

                                    <input class="form-control" name="nombre" required />

                                </div>

                                <div class="col-md-6 my-2">

                                    <label class="form-label"> Tipo de evento: </label>

                                    <select class="form-select" name="seccion" required >

                                        <option value="torneos">
                                            Torneos
                                        </option>

                                        <option value="examenes">
                                            Exámenes
                                        </option>

                                        <option value="seminarios">
                                            Seminarios
                                        </option>

                                        <option value="exhibiciones">
                                            Exhibiciones
                                        </option>

                                        <option value="entrenamientos">
                                            Entrenamientos
                                        </option>

                                    </select>

                                </div>

                            </div>


                            <div class="my-2">

                                <label class="form-label"> Descripción: </label>

                                <textarea class="form-control" name="descripcion" rows="4" required ></textarea>

                            </div>

                            <div class="row">

                                <div class="col-md-4 my-2">

                                    <label class="form-label"> Lugar: </label>

                                    <input class="form-control" name="lugar" required />

                                </div>

                                <div class="col-md-4 my-2">

                                    <label class="form-label"> Fecha: </label>

                                    <input type="date" class="form-control" name="fecha" required >

                                </div>

                                <div class="col-md-4 my-2">

                                    <label class="form-label"> Horario: </label>

                                    <input type="time" class="form-control" name="horario" required >

                                </div>

                            </div>


                            <div class="row">

                                <div class="col-md-6 my-2">

                                    <label class="form-label"> Link de inscripción: </label>

                                    <input type="url" class="form-control" name="link" placeholder="https://ejemplo.com" required >

                                </div>

                                <div class="col-md-6 my-2">

                                    <label class="form-label"> Profesor: </label>

                                    <div class="d-flex gap-2">

                                        <select class="form-select" name="profesorId" required >

                                            ${profesores.map(profesor => `
                                                <option
                                                    value="${profesor._id}"
                                                    ${
                                                        profesorNuevoId?.toString() === profesor._id.toString()
                                                        ? "selected"
                                                        : ""
                                                    }
                                                >
                                                    ${profesor.nombre}
                                                </option>
                                            `).join("")}

                                        </select>

                                        <a  href="/profesores/nuevo" class="btn btn-secondary text-nowrap">
                                            + Agregar
                                        </a>

                                    </div>

                                </div>

                            </div>

                            <button type="submit" class="btn btn-primary mt-2">
                                Guardar
                            </button>

                        </div>

                    </div>

                </form>

            </div>
        </div>
    `

    html += `
        <a href="/eventos" class="btn btn-secondary mt-3" >
            Volver
        </a>
    `

    return html
}