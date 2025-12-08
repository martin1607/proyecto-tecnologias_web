// app.js - Dashboard de Recursos Digitales con gráficas Chart.js

$(document).ready(function() {
    let edit = false; // false = creando, true = editando

    // Referencias a las gráficas
    let chartDeptos = null;
    let chartExtensiones = null;

    // Ocultar cuadro de resultado al inicio
    $('#product-result').hide();

    // Cargar lista de recursos al inicio
    listarRecursos();

    // ----------- Función: elegir ícono por extensión -----------
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

    // ----------- Limpiar formulario -----------
    function limpiarFormulario() {
        $('#productId').val('');
        $('#nombre').val('');
        $('#autor').val('');
        $('#departamento').val('');
        $('#empresa').val('');
        $('#fecha_creacion').val('');
        $('#descripcion').val('');
        $('#archivo').val(null);
        $('#form-title').text('Agregar recurso digital');
        edit = false;
    }

    $('#btn-clear').click(function() {
        limpiarFormulario();
    });

    // ----------- Listar recursos -----------
    function listarRecursos() {
        console.log("🔄 Cargando recursos...");

        $.ajax({
            url: 'product-list.php',
            type: 'GET',
            dataType: 'json',
            success: function(recursos) {
                console.log("✅ Recursos recibidos:", recursos);

                let template = '';

                if (recursos && recursos.length > 0) {
                    recursos.forEach(recurso => {
                        let icon = getIconByExtension(recurso.extension);

                        let metadatos = '';
                        metadatos += `<li>Autor: ${recurso.autor}</li>`;
                        metadatos += `<li>Departamento: ${recurso.departamento}</li>`;
                        metadatos += `<li>Empresa: ${recurso.empresa}</li>`;
                        metadatos += `<li>Fecha: ${recurso.fecha_creacion}</li>`;

                        template += `
                            <tr productId="${recurso.id}">
                                <td>${recurso.id}</td>
                                <td>
                                    <a href="#" class="product-item">
                                        ${recurso.nombre}
                                    </a>
                                </td>
                                <td>
                                    <ul style="padding-left: 18px; margin-bottom: 0;">
                                        ${metadatos}
                                    </ul>
                                </td>
                                <td class="text-center">
                                    <a href="uploads/${recurso.archivo}" download>
                                        <img src="${icon}" 
                                             alt="${recurso.extension}" 
                                             style="height:32px;">
                                    </a>
                                </td>
                                <td class="text-center">
                                    <button class="product-delete btn btn-danger btn-sm">
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        `;
                    });
                } else {
                    template = `
                        <tr>
                            <td colspan="5" class="text-center">
                                No se encontraron recursos registrados
                            </td>
                        </tr>
                    `;
                }

                $('#products').html(template);

                // 🆕 Cada vez que listamos, actualizamos estadísticas
                cargarEstadisticas();
            },
            error: function(xhr, status, error) {
                console.error("❌ Error al cargar recursos:", error);
                $('#products').html(`
                    <tr>
                        <td colspan="5" class="text-center text-danger">
                            Error al cargar recursos
                        </td>
                    </tr>
                `);
            }
        });
    }

    // ----------- Búsqueda de recursos (dashboard) -----------
    $('#search').keyup(function() {
        let search = $('#search').val().trim();

        if (search.length === 0) {
            $('#product-result').hide();
            listarRecursos();
            return;
        }

        $.ajax({
            url: 'product-search.php',
            type: 'GET',
            dataType: 'json',
            data: { search: search },
            success: function(recursos) {
                console.log("🔍 Resultados búsqueda:", recursos);

                let templateTabla = '';
                let templateBar = '';

                if (recursos && recursos.length > 0) {
                    recursos.forEach(recurso => {
                        let icon = getIconByExtension(recurso.extension);

                        let metadatos = '';
                        metadatos += `<li>Autor: ${recurso.autor}</li>`;
                        metadatos += `<li>Departamento: ${recurso.departamento}</li>`;
                        metadatos += `<li>Empresa: ${recurso.empresa}</li>`;
                        metadatos += `<li>Fecha: ${recurso.fecha_creacion}</li>`;

                        templateTabla += `
                            <tr productId="${recurso.id}">
                                <td>${recurso.id}</td>
                                <td>
                                    <a href="#" class="product-item">
                                        ${recurso.nombre}
                                    </a>
                                </td>
                                <td>
                                    <ul style="padding-left: 18px; margin-bottom: 0;">
                                        ${metadatos}
                                    </ul>
                                </td>
                                <td class="text-center">
                                    <a href="uploads/${recurso.archivo}" download>
                                        <img src="${icon}" 
                                             alt="${recurso.extension}" 
                                             style="height:32px;">
                                    </a>
                                </td>
                                <td class="text-center">
                                    <button class="product-delete btn btn-danger btn-sm">
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        `;

                        templateBar += `
                            <li style="list-style: none;">
                                ${recurso.nombre} (${recurso.autor} - ${recurso.departamento})
                            </li>
                        `;
                    });

                    $('#product-result').show();
                    $('#container').html(templateBar);
                    $('#products').html(templateTabla);
                } else {
                    $('#product-result').show();
                    $('#container').html(`
                        <span class="text-warning">
                            No se encontraron recursos para: "${search}"
                        </span>
                    `);
                    $('#products').html(`
                        <tr>
                            <td colspan="5" class="text-center">
                                Sin resultados
                            </td>
                        </tr>
                    `);
                }

                // También actualizamos estadísticas
                cargarEstadisticas();
            },
            error: function(xhr, status, error) {
                console.error("❌ Error en búsqueda:", error);
                $('#product-result').show();
                $('#container').html(`
                    <span class="text-danger">Error en la búsqueda</span>
                `);
            }
        });
    });

    // ----------- Alta / Edición de recursos -----------
    $('#product-form').submit(function(e) {
        e.preventDefault();

        if (!$('#nombre').val().trim() ||
            !$('#autor').val().trim() ||
            !$('#departamento').val().trim() ||
            !$('#empresa').val().trim() ||
            !$('#fecha_creacion').val().trim()) {

            $('#product-result').show();
            $('#container').html(`
                <li style="list-style:none;" class="text-warning">
                    Por favor llena todos los campos obligatorios.
                </li>
            `);
            return;
        }

        let formData = new FormData();
        formData.append('id', $('#productId').val());
        formData.append('nombre', $('#nombre').val().trim());
        formData.append('autor', $('#autor').val().trim());
        formData.append('departamento', $('#departamento').val().trim());
        formData.append('empresa', $('#empresa').val().trim());
        formData.append('fecha_creacion', $('#fecha_creacion').val().trim());
        formData.append('descripcion', $('#descripcion').val().trim());

        let archivoInput = $('#archivo')[0];

        if (!edit) {
            if (!archivoInput.files.length) {
                $('#product-result').show();
                $('#container').html(`
                    <li style="list-style:none;" class="text-warning">
                        Debes seleccionar un archivo para el recurso.
                    </li>
                `);
                return;
            } else {
                formData.append('archivo', archivoInput.files[0]);
            }
        } else {
            if (archivoInput.files.length > 0) {
                formData.append('archivo', archivoInput.files[0]);
            }
        }

        const url = edit ? 'product-edit.php' : 'product-add.php';

        console.log("📤 Enviando datos a:", url);

        $.ajax({
            url: url,
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                console.log("📥 Respuesta del servidor:", response);

                let respuesta = response;
                if (typeof response === 'string') {
                    try {
                        respuesta = JSON.parse(response);
                    } catch (e) {
                        console.error("❌ Error parseando respuesta JSON:", e);
                    }
                }

                let status = respuesta.status || 'error';
                let message = respuesta.message || 'Respuesta desconocida';

                $('#product-result').show();
                $('#container').html(`
                    <li style="list-style: none;">Status: ${status}</li>
                    <li style="list-style: none;">Mensaje: ${message}</li>
                `);

                if (status === 'success') {
                    limpiarFormulario();
                    listarRecursos();  // Esto también recarga gráficas
                }
            },
            error: function(xhr, status, error) {
                console.error("❌ Error en petición:", error);
                $('#product-result').show();
                $('#container').html(`
                    <span class="text-danger">
                        Error al enviar datos al servidor
                    </span>
                `);
            }
        });
    });

    // ----------- Eliminar recurso -----------
    $(document).on('click', '.product-delete', function(e) {
        e.preventDefault();

        if (!confirm('¿Realmente deseas eliminar el recurso?')) {
            return;
        }

        const element = $(this).closest('tr');
        const id = $(element).attr('productId');

        console.log("🗑️ Eliminando recurso ID:", id);

        $.post('product-delete.php', { id: id }, function(response) {
            console.log("📥 Respuesta eliminación:", response);

            let respuesta = response;
            if (typeof response === 'string') {
                try {
                    respuesta = JSON.parse(response);
                } catch (e) {
                    console.error("❌ Error parseando respuesta:", e);
                }
            }

            let status = respuesta.status || 'error';
            let message = respuesta.message || 'Respuesta desconocida';

            $('#product-result').show();
            $('#container').html(`
                <li style="list-style: none;">Status: ${status}</li>
                <li style="list-style: none;">Mensaje: ${message}</li>
            `);

            if (status === 'success') {
                listarRecursos();  // Esto también recarga gráficas
            }
        }).fail(function(xhr, status, error) {
            console.error("❌ Error en eliminación:", error);
            $('#product-result').show();
            $('#container').html(`
                <span class="text-danger">
                    Error al eliminar recurso
                </span>
            `);
        });
    });

    // ----------- Cargar recurso para edición -----------
    $(document).on('click', '.product-item', function(e) {
        e.preventDefault();

        const element = $(this).closest('tr');
        const id = $(element).attr('productId');

        console.log("✏️ Cargando recurso ID:", id);

        $.post('product-single.php', { id: id }, function(response) {
            console.log("📥 Respuesta cruda (single):", response);

            let recurso = response;
            if (typeof response === 'string') {
                try {
                    recurso = JSON.parse(response);
                } catch (e) {
                    console.error("❌ Error parseando JSON:", e);
                    alert('Error al procesar el recurso. Ver consola para detalles.');
                    return;
                }
            }

            if (recurso && recurso.error) {
                console.error("❌ Error del servidor:", recurso.error);
                alert('Error: ' + recurso.error);
                return;
            }

            if (!recurso || !recurso.nombre) {
                console.error("❌ Datos incompletos:", recurso);
                alert('Error: Datos del recurso incompletos');
                return;
            }

            $('#productId').val(recurso.id);
            $('#nombre').val(recurso.nombre);
            $('#autor').val(recurso.autor);
            $('#departamento').val(recurso.departamento);
            $('#empresa').val(recurso.empresa);
            $('#fecha_creacion').val(recurso.fecha_creacion);
            $('#descripcion').val(recurso.descripcion || '');
            $('#archivo').val(null);

            $('#form-title').text('Editar recurso digital');
            edit = true;

            console.log("✅ Recurso cargado para edición:", recurso.nombre);
        }).fail(function(xhr, status, error) {
            console.error("❌ Error de conexión (single):", error);
            alert('Error de conexión con el servidor');
        });
    });

    // ----------- 🆕 Cargar estadísticas y dibujar gráficas -----------
    function cargarEstadisticas() {
        const canvasDepto = document.getElementById('chartDepartamentos');
        const canvasExt   = document.getElementById('chartExtensiones');

        if (!canvasDepto || !canvasExt) {
            return; // no estamos en el dashboard
        }

        $.getJSON('stats.php', function(data) {
            console.log("📊 Datos estadísticas:", data);

            const porDepto = data.porDepartamento || [];
            const porExt   = data.porExtension || [];

            const labelsDepto = porDepto.map(r => r.departamento || 'Sin depto');
            const dataDepto   = porDepto.map(r => parseInt(r.total));

            const labelsExt = porExt.map(r => (r.extension || 'n/a').toUpperCase());
            const dataExt   = porExt.map(r => parseInt(r.total));

            const ctxDepto = canvasDepto.getContext('2d');
            const ctxExt   = canvasExt.getContext('2d');

            if (chartDeptos) chartDeptos.destroy();
            if (chartExtensiones) chartExtensiones.destroy();

            chartDeptos = new Chart(ctxDepto, {
                type: 'bar',
                data: {
                    labels: labelsDepto,
                    datasets: [{
                        label: 'Recursos por departamento',
                        data: dataDepto
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            precision: 0
                        }
                    }
                }
            });

            chartExtensiones = new Chart(ctxExt, {
                type: 'pie',
                data: {
                    labels: labelsExt,
                    datasets: [{
                        label: 'Recursos por extensión',
                        data: dataExt
                    }]
                },
                options: {
                    responsive: true
                }
            });
        }).fail(function(xhr, status, error) {
            console.error("❌ Error al cargar estadísticas:", error);
        });
    }

});
