export function createListPage( 
    eventos, 
    seccion, 
    profesores, 
    profesor 
) { 
 
    let html = "" 
 
    html += ` 
        <div class="my-3 d-flex justify-content-between align-items-center"> 
 
            <div class="d-flex align-items-center"> 
 
                <a href="/eventos${profesor ? "?profesor=" + profesor : ""}" class="btn ${!seccion ? "btn-secondary" : "btn-primary"} m-1" > 
                 Todos  
                </a> 
 
                <a href="/eventos?seccion=torneos${profesor ? "&profesor=" + profesor : ""}" class="btn ${seccion === "torneos" ? "btn-secondary" : "btn-primary"} m-1"> 
                    Torneos 
                </a> 
 
                <a href="/eventos?seccion=examenes${profesor ? "&profesor=" + profesor : ""}" class="btn ${seccion === "examenes" ? "btn-secondary" : "btn-primary"} m-1"> 
                    Exámenes 
                </a> 
 
                <a href="/eventos?seccion=seminarios${profesor ? "&profesor=" + profesor : ""}" class="btn ${seccion === "seminarios" ? "btn-secondary" : "btn-primary"} m-1"> 
                    Seminarios 
                </a> 
 
                <a href="/eventos?seccion=exhibiciones${profesor ? "&profesor=" + profesor : ""}" class="btn ${seccion === "exhibiciones" ? "btn-secondary" : "btn-primary"} m-1"> 
                    Exhibiciones 
                </a> 
 
                <a href="/eventos?seccion=entrenamientos${profesor ? "&profesor=" + profesor : ""}" class="btn ${seccion === "entrenamientos" ? "btn-secondary" : "btn-primary"} m-1"> 
                    Entrenamientos 
                </a> 
 
                <div class="ms-3"> 
 
                    <select class="form-select" onchange="window.location.href=this.value" > 
 
                        <option value="/eventos${seccion ? "?seccion=" + seccion : ""}" ${!profesor ? "selected" : ""} > 
                            Todos los profesores 
                        </option> 
 
                        ${profesores.map(profesorItem => ` 
                            <option value="/eventos?${seccion ? "seccion=" + seccion + "&" : ""}profesor=${profesorItem._id}" ${profesor === profesorItem._id.toString() ? "selected" : ""} > 
                                ${profesorItem.nombre} 
                            </option> 
                        `).join("")} 
 
                    </select> 
 
                </div> 
 
            </div> 
 
            <a href="/eventos/nuevo" class="btn btn-success"> Nuevo Evento </a> 
 
        </div> 
 
    ` 
 
 
    if (eventos.length > 0) { 
 
        html += ` 
            <div class="table-responsive"> 
 
                <table class="table table-bordered table-hover align-middle"> 
 
                    <thead class="table-dark"> 
 
                        <tr> 
                            <th>Imagen</th> 
                            <th class="nombre-evento">Nombre</th> 
                            <th class="descripcion-evento">Descripción</th> 
                            <th>Fecha</th> 
                            <th>Horario</th> 
                            <th class="nombre-evento">Lugar</th> 
                            <th>Tipo de evento</th> 
                            <th>Acciones</th> 
                        </tr> 
 
                    </thead> 
 
                    <tbody> 
        ` 
 
        eventos.forEach(evento => { 
 
            if (evento._id) { 
 
                html += ` 
                    <tr> 
 
                        <td> 
                            <img src="${evento.img}" alt="${evento.nombre}" width="100" > 
                        </td> 
 
                        <td class="nombre-evento"> 
                            ${evento.nombre} 
                        </td> 
 
                        <td class="descripcion-evento"> 
                            ${evento.descripcion} 
                        </td> 
 
                        <td> 
                            ${evento.fecha} 
                        </td> 
 
                        <td> 
                            ${evento.horario || ""} 
                        </td> 
 
                        <td class="nombre-evento"> 
                            ${evento.lugar} 
                        </td> 
 
                        <td> 
                            ${evento.seccion} 
                        </td> 
 
                        <td> 
 
                            <a href="/eventos/${evento._id}" class="btn btn-secondary btn-sm"> 
                                Ver 
                            </a> 
 
                            <a  href="/eventos/editar/${evento._id}" class="btn btn-warning btn-sm" > 
                                Editar 
                            </a> 
 
                            <a href="/eventos/borrar/${evento._id}" class="btn btn-danger btn-sm" > 
                                Borrar 
                            </a> 
 
                        </td> 
 
                    </tr> 
                ` 
            } 
 
        }) 
 
        html += ` 
                    </tbody> 
 
                </table> 
 
            </div> 
        ` 
 
    } else { 
 
        html += ` 
            <div class="card border-0 shadow-sm mt-4"> 
 
                <div class="card-body text-center py-5"> 
 
                    <div class="evento-sin-resultados-icono"> 
 
                        <i class="bi bi-emoji-frown fs-1 text-secondary"></i> 
 
                    </div> 
 
 
                    <h4 class="fw-bold mb-2"> 
                        No hay eventos para mostrar 
                    </h4> 
 
 
                    <p class="evento-sin-resultados-texto text-muted mb-4 mx-auto"> 
                        No encontramos eventos que coincidan con los filtros seleccionados. 
                        Probá con otra categoría o seleccioná otro profesor. 
                    </p> 
 
 
                    <a 
                        href="/eventos" 
                        class="btn btn-primary px-4" 
                    > 
                        Ver todos los eventos 
                    </a> 
 
                </div> 
 
            </div> 
        ` 
 
    } 
 
 
    return html 
}
