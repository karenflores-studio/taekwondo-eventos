export function createProfesorFormPage(eventoId) {

    return `
        <div class="row justify-content-center">

            <div class="col-md-6 col-lg-5">

                <div class="card shadow-sm border-0">

                    <div class="card-body p-4">

                        <p class="text-center mb-4">
                            Nuevo profesor
                        </p>

                        <form  action="/profesores/nuevo?evento=${eventoId || ""}" method="POST" >

                            <div class="text-center mb-4">

                                <div class="d-flex align-items-center justify-content-center mx-auto profesor-foto-contenedor">

                                    <img id="vistaFotoProfesor" src="" alt="" class="profesor-foto" />

                                </div>

                                <label for="archivoFoto" class="btn btn-secondary mt-3">Seleccionar foto</label>

                                <input type="file" id="archivoFoto" accept="image/*" required class="profesor-input-foto"
                                    
                                    onchange="
                                        const archivo = this.files[0]

                                        if (archivo) {

                                            const lector = new FileReader()

                                            lector.onload = function(e) {

                                                document.getElementById('vistaFotoProfesor').src = e.target.result

                                                document.getElementById('fotoBase64').value = e.target.result

                                            }

                                            lector.readAsDataURL(archivo)

                                        }
                                    "
                                />

                                <input type="hidden" name="foto" id="fotoBase64" />

                            </div>

                            <div class="mb-3">

                                <label class="form-label fw-semibold"> Nombre: </label>

                                <input class="form-control" name="nombre" required />

                            </div>

                            <div class="mb-4">

                                <label class="form-label fw-semibold"> Descripción: </label>

                                <textarea class="form-control" name="descripcion" rows="4" required ></textarea>

                            </div>

                            <div class="d-flex gap-2">

                                <button type="submit" class="btn btn-primary flex-grow-1" >
                                    Guardar profesor
                                </button>

                                <a href="/eventos/nuevo" class="btn btn-secondary" >
                                    Volver
                                </a>

                            </div>

                        </form>

                    </div>

                </div>

            </div>

        </div>
    `
}