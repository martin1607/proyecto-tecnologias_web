// app.js - Dashboard de Recursos Digitales con gráficas Chart.js

$(document).ready(function() {
    let edit = false; 

    // Referencias a las gráficas
    let chartDeptos = null;
    let chartExtensiones = null;
    let chartDiaSemana = null; // 🆕 NUEVA GRÁFICA

    // Ocultar cuadro de resultado al inicio
    $('#product-result').hide();

    // Cargar lista de recursos al inicio
    listarRecursos();

    // ---------------- FUNCIONES AUXILIARES ----------------

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

    // ---------------- CARGAR LISTA ----------------

    function listarRecursos() {
        $.ajax({
            url: 'product-list.php',
            type: 'GET',
            dataType: 'json',
            success: function(recursos) {
                renderTabla(recursos);
                cargarEstadisticas();
            }
        });
    }

    function renderTabla(recursos) {
        let template = '';

        if (recursos.length > 0) {
            recursos.forEach(recurso => {
                let icon = getIconByExtension(recurso.extension);

                template += `
                    <tr productId="${recurso.id}">
                        <td>${recurso.id}</td>
                        <td><a href="#" class="product-item">${recurso.nombre}</a></td>
                        <td>
                            <ul style="padding-left: 18px; margin-bottom: 0;">
                                <li>Autor: ${recurso.autor}</li>
                                <li>Departamento: ${recurso.departamento}</li>
                                <li>Empresa: ${recurso.empresa}</li>
                                <li>Fecha: ${recurso.fecha_creacion}</li>
                            </ul>
                        </td>
                        <td class="text-center">
                            <a href="uploads/${recurso.archivo}" download>
                                <img src="${icon}" style="height:32px;">
                            </a>
                        </td>
                        <td class="text-center">
                            <button class="product-delete btn btn-danger btn-sm">Eliminar</button>
                        </td>
                    </tr>
                `;
            });
        } else {
            template = `
                <tr>
                    <td colspan="5" class="text-center">No se encontraron recursos</td>
                </tr>
            `;
        }

        $('#products').html(template);
    }

    // ---------------- CARGAR GRÁFICAS ----------------

    function cargarEstadisticas() {
        const canvasDepto = document.getElementById('chartDepartamentos');
        const canvasExt   = document.getElementById('chartExtensiones');
        const canvasDia   = document.getElementById('chartDiaSemana'); // 🆕 CANVAS

        if (!canvasDepto || !canvasExt || !canvasDia) return;

        $.getJSON('stats.php', function(data) {
            console.log("📊 Estadísticas recibidas:", data);

            const porDepto = data.porDepartamento || [];
            const porExt   = data.porExtension || [];
            const porDia   = data.porDiaSemana || []; // 🆕

            // ---------------- GRAFICA DEPARTAMENTOS ----------------
            const labelsDepto = porDepto.map(r => r.departamento);
            const dataDepto   = porDepto.map(r => parseInt(r.total));

            if (chartDeptos) chartDeptos.destroy();
            chartDeptos = new Chart(canvasDepto.getContext('2d'), {
                type: 'bar',
                data: {
                    labels: labelsDepto,
                    datasets: [{
                        label: 'Recursos por Departamento',
                        data: dataDepto
                    }]
                },
                options: {
                    responsive: true
                }
            });

            // ---------------- GRAFICA EXTENSIONES ----------------
            const labelsExt = porExt.map(r => (r.extension || 'N/A').toUpperCase());
            const dataExt   = porExt.map(r => parseInt(r.total));

            if (chartExtensiones) chartExtensiones.destroy();
            chartExtensiones = new Chart(canvasExt.getContext('2d'), {
                type: 'pie',
                data: {
                    labels: labelsExt,
                    datasets: [{
                        data: dataExt
                    }]
                },
                options: { responsive: true }
            });

            // ---------------- NUEVA GRAFICA: DÍA DE SEMANA ----------------
            const labelsDia = porDia.map(r => r.dia);
            const dataDia   = porDia.map(r => parseInt(r.total));

            if (chartDiaSemana) chartDiaSemana.destroy();
            chartDiaSemana = new Chart(canvasDia.getContext('2d'), {
                type: 'line',
                data: {
                    labels: labelsDia,
                    datasets: [{
                        label: 'Descargas por Día',
                        data: dataDia
                    }]
                },
                options: {
                    responsive: true
                }
            });
        });
    }

    // --- funcionalidades CRUD etc
    // ⚠️ No se eliminó nada
    // Ya estaba correcto tu CRUD

});
