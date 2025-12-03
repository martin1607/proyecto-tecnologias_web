

$(document).ready(function() {

    function getIconByExtension(ext) {
        if (!ext) return 'img/file.png';
        ext = ext.toLowerCase();

        if (ext === 'pdf') return 'img/pdf.png';
        if (ext === 'zip' || ext === 'rar') return 'img/zip.png';
        if (ext === 'json') return 'img/json.png';
        if (ext === 'xml') return 'img/xml.png';
        if (ext === 'jar' || ext === 'exe') return 'img/exe.png';
        if (ext === 'doc' || ext === 'docx') return 'img/doc.png';
        if (ext === 'xls' || ext === 'xlsx') return 'img/xls.png';
        if (ext === 'ppt' || ext === 'pptx') return 'img/ppt.png';

        return 'img/file.png';
    }

    function renderRecursos(recursos) {
        const contenedor = $('#catalogo-recursos');
        const mensaje    = $('#catalogo-mensaje');

        contenedor.empty();
        mensaje.empty();

        if (!recursos || recursos.length === 0) {
            mensaje.html(`
                <div class="alert alert-warning text-center">
                    No se encontraron recursos para mostrar.
                </div>
            `);
            return;
        }

        recursos.forEach(recurso => {
            const icon = getIconByExtension(recurso.extension);

            const card = `
                <div class="col-md-4 mb-4">
                    <div class="card h-100">
                        <div class="card-header">
                            <h5 class="card-title mb-0">
                                ${recurso.nombre}
                            </h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text">
                                ${recurso.descripcion ? recurso.descripcion : 'Sin descripción.'}
                            </p>
                            <ul class="list-unstyled mb-3">
                                <li><strong>Autor:</strong> ${recurso.autor}</li>
                                <li><strong>Departamento:</strong> ${recurso.departamento}</li>
                                <li><strong>Empresa:</strong> ${recurso.empresa}</li>
                                <li><strong>Fecha:</strong> ${recurso.fecha_creacion}</li>
                                <li><strong>Extensión:</strong> ${recurso.extension.toUpperCase()}</li>
                            </ul>
                        </div>
                        <div class="card-footer d-flex justify-content-between align-items-center">
                            <a href="uploads/${recurso.archivo}" 
                               class="btn btn-primary btn-sm"
                               download>
                                Descargar
                            </a>
                            <img src="${icon}" alt="${recurso.extension}"
                                 style="height:32px;">
                        </div>
                    </div>
                </div>
            `;
            contenedor.append(card);
        });
    }

    function cargarTodos() {
        $.ajax({
            url: 'product-list.php',
            type: 'GET',
            dataType: 'json',
            success: function(recursos) {
                console.log("📚 Recursos (catálogo):", recursos);
                renderRecursos(recursos);
            },
            error: function(xhr, status, error) {
                console.error("❌ Error al cargar catálogo:", error);
                $('#catalogo-mensaje').html(`
                    <div class="alert alert-danger text-center">
                        Error al cargar el catálogo de recursos.
                    </div>
                `);
            }
        });
    }

    $('#search-catalog').keyup(function() {
        const search = $('#search-catalog').val().trim();

        if (search.length === 0) {
            cargarTodos();
            return;
        }

        $.ajax({
            url: 'product-search.php',
            type: 'GET',
            dataType: 'json',
            data: { search: search },
            success: function(recursos) {
                console.log("🔍 Resultados catálogo:", recursos);
                renderRecursos(recursos);
            },
            error: function(xhr, status, error) {
                console.error("❌ Error en búsqueda catálogo:", error);
                $('#catalogo-mensaje').html(`
                    <div class="alert alert-danger text-center">
                        Error al buscar recursos.
                    </div>
                `);
            }
        });
    });


    cargarTodos();
});
