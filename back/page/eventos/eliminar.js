export function createDetailDelete(evento) {

    let html = ""

    html += `
        <div class="row justify-content-center">

            <div class="col-lg-10">

                <div class="card shadow-sm border-0">

                    <div class="card-body p-5">

                        <div class="text-center mb-5 border-bottom pb-4">

                            <h2 class="fw-bold mb-2">¿Desea borrar este evento?</h2>

                            <p class="text-muted mb-0"> Esta acción eliminará el evento de la lista. </p>

                        </div>

                        <div class="row align-items-center g-5">

                            <div class="col-md-5 text-center">

                                <img src="${evento.img || ""}" alt="${evento.nombre || "Imagen del evento"}" class="img-fluid rounded evento-eliminar-imagen">

                            </div>

                            <div class="col-md-7">

                                <h2 class="fw-bold mb-4">${evento.nombre} </h2>

                                <p class="text-muted mb-4"> ${evento.descripcion} </p>

                                <div class="row">

                                    <div class="col-sm-6">

                                        <p class="mb-3"> <strong>Fecha</strong><br> ${evento.fecha} </p>

                                        <p class="mb-3"><strong>Horario</strong><br> ${evento.horario || ""} </p>

                                    </div>


                                    <div class="col-sm-6">

                                        <p class="mb-3"> <strong>Lugar</strong><br> ${evento.lugar} </p>

                                        <p class="mb-3"> <strong>Tipo de evento</strong><br> ${evento.seccion} </p>

                                    </div>

                                </div>

                            </div>

                        </div>


                        <div class="d-flex justify-content-end gap-2 mt-5">

                            <a href="/eventos" class="btn btn-secondary"> Volver </a>

                            <form action="/eventos/borrar/${evento._id}" method="POST" >

                                <button type="submit" class="btn btn-danger">
                                    Borrar evento
                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    `

    return html
}
