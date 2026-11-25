export function createDetailPage(evento) {

    let html = ""

    html += `
        <div class="card shadow-sm border-0">

            <div class="card-body p-4">

                <div class="row align-items-center g-5">

                    <div class="col-md-5">

                        <div class="evento-imagen">

                            <img src="${evento.img || ""}" class="img-fluid" alt="${evento.nombre || "Imagen del evento"}" />

                        </div>

                    </div>


                    <div class="col-md-7">

                        <div class="mb-4">

                            <p class="text-muted mb-2"> Tipo de evento: ${evento.seccion || ""}</p>

                            <h1 class="fw-bold mb-3"> ${evento.nombre || ""}</h1>

                            <p class="text-muted mb-0"> ${evento.descripcion || ""}</p>

                        </div>

                        <section class="row border-top border-bottom py-4 mb-4">

                            <div class="col-md-4">

                                <dl class="mb-0">

                                    <dt class="fw-semibold"> Fecha </dt>

                                    <dd class="mb-0"> ${evento.fecha || ""}</dd>

                                </dl>

                            </div>

                            <div class="col-md-4">

                                <dl class="mb-0">

                                    <dt class="fw-semibold"> Horario </dt>

                                    <dd class="mb-0"> ${evento.horario || ""} </dd>

                                </dl>

                            </div>

                            <div class="col-md-4">

                                <dl class="mb-0">

                                    <dt class="fw-semibold"> Lugar </dt>

                                    <dd class="mb-0"> ${evento.lugar || ""} </dd>

                                </dl>

                            </div>

                        </section>

                        <section class="mb-4">

                            <div class="d-flex align-items-center justify-content-between">

                                <div>

                                    <p class="text-muted mb-2"> Evento organizado por el profesor </p>

                                    <div class="d-flex align-items-center gap-3">

                                        <img src="${evento.profesor?.foto || ""}" alt="${evento.profesor?.nombre || "Profesor"}" class="profesor-imagen"/>

                                        <p class="fw-semibold mb-0">${evento.profesor?.nombre || "No especificado"} </p>

                                    </div>

                                </div>

                                <a href="${evento.link || "#"}" target="_blank" class="btn btn-primary" > Ver inscripción </a>

                            </div>

                        </section>

                    </div>

                </div>

            </div>

        </div>


        <div class="mt-3 text-end">

            <a href="/eventos" class="btn btn-secondary" > Volver </a>

        </div>
    `

    return html
}
