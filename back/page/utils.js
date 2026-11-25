export function createPage(title, content) {

    let html = ""

    html += '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8">'

    html += `<title>${title}</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="/styles.css">
    </head><body>`

    html += `
        <nav class="navbar navbar-expand-lg bg-dark navbar-dark mb-4">
            <div class="container-fluid">

                <a class="navbar-brand" href="/eventos">
                    <img src="/logo.png" alt="Taekwondo Eventos" height="40">
                </a>

            </div>
        </nav>
    `

    html += "<div class='container-fluid contenido'>"

    html += `<h1>${title}</h1>`

    html += content

    html += "</div></body></html>"

    return html
}