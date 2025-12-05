// --- 1. CONFIGURACIÓN DE ZONIFICACIÓN ---
const ZONIFICACION = {
    "AV":          { color: '#166e19', nombre: "Área Verde" },
    "CS":          { color: '#ca3a6a', nombre: "Comercio y Servicio" },
    "CUC":         { color: '#d63c0d', nombre: "Corredor Urbano" },
    "CUCO":        { color: '#a51c1c', nombre: "Corredor Urbano Costero" },
    "Centro His":  { color: '#855e4f', nombre: "Centro Histórico" },
    "E":           { color: '#166aaf', nombre: "Equipamiento" },
    "HM/4/20":     { color: '#e6c42c', nombre: "Habitacional Mixto" },
    "I":           { color: '#881e9b', nombre: "Industrial" },
    "Urbanizabl":  { color: '#CFD8DC', nombre: "Urbanizable" },
    "VS":          { color: '#ffc061', nombre: "Vivienda Social" },
    "EA":          { color: '#037e71', nombre: "Espacio Abierto" },
    "DEFAULT":     { color: '#9E9E9E', nombre: "Sin Definir" }
};

// --- 2. MATRIZ DE COMPATIBILIDAD (Datos Completos del Excel) ---
const MATRIZ_COMPATIBILIDAD = {
    "Centro His": {
        "permitido": ["Bienes de consumo, alimentos y bebidas, servicios personales, profesionales y financieros", "Plazas comerciales menores a 1000m²", "Clubes sociales y salones para banquetes", "Salones de baile y centros nocturnos", "Hoteles (<25 hab)", "Hoteles (>25 hab)", "Casas de huéspedes y plataformas", "Asistencia Social", "Vivienda Unifamiliar", "Vivienda Plurifamiliar", "Consultorios y unidades de primer contacto", "Centros de salud y clínicas", "Hospitales generales y especialidades", "Jardín de niños y guarderías", "Educación elemental y básica", "Centros de capacitación", "Centros culturales", "Galerías de arte", "Auditorios", "Cines y teatros", "Museos", "Bibliotecas", "Módulos de seguridad", "Estaciones de policía", "Orfanatos y asilos", "Parques y jardines", "Plazas y explanadas", "Mercados públicos", "Oficinas de gobierno", "Inmuebles de justicia"],
        "condicionado": [],
        "prohibido": ["Plazas comerciales >1,000 m²", "Supermercados", "Tiendas departamentales", "Centrales de abasto", "Gasolineras", "Depósitos de gas/combustibles", "Renta/Venta de maquinaria pesada", "Oficinas >500m²", "Estacionamientos públicos", "Moteles", "Industria (Cualquier tipo)", "Talleres grandes", "Bodegas industriales", "Terminales de carga", "Encierros de vehículos", "Rastros"]
    },
    "HM/4/20": {
        "permitido": ["Bienes de consumo y servicios básicos", "Plazas comerciales <1000m²", "Supermercados <1,000 m²", "Casas de huéspedes", "Asistencia Social", "Administración pública", "Vivienda Unifamiliar", "Vivienda Plurifamiliar", "Industria y manufactura hasta 500m²", "Consultorios médicos", "Clínicas y maternidades", "Hospitales de urgencias", "Jardín de niños", "Escuelas primarias", "Centros de capacitación", "Escuelas secundarias", "Preparatorias y vocacionales", "Universidades e investigación", "Centros culturales", "Galerías", "Auditorios", "Cines", "Museos", "Bibliotecas", "Bomberos", "Seguridad pública", "Templos y capillas", "Cementerios", "Parques y jardines", "Plazas", "Instalaciones deportivas", "Mercados públicos"],
        "condicionado": ["Talleres mecánicos", "Centros de espectáculos masivos"],
        "prohibido": ["Plazas comerciales >1,000 m²", "Supermercados >1,000 m²", "Tiendas departamentales", "Centrales de abasto", "Gasolineras", "Depósitos de combustible", "Clubes sociales y fiestas", "Centros nocturnos", "Maquinaria pesada", "Oficinas >500m²", "Estacionamientos públicos", "Hoteles", "Moteles", "Industria pesquera", "Industria mediana y pesada (>500m²)", "Residuos peligrosos", "Terminales de carga", "Rastros", "Instalaciones militares", "Extracción de materia prima"]
    },
    "CS": {
        "permitido": ["Comercios y Servicios generales", "Plazas comerciales (Todas)", "Supermercados (Todos)", "Tiendas departamentales", "Mayoreo y abarrotes", "Centrales de abasto", "Gasolineras", "Clubes sociales", "Centros nocturnos", "Venta de maquinaria", "Oficinas en general", "Estacionamientos públicos", "Hoteles (Todos)", "Moteles", "Casas de huéspedes", "Asistencia Social", "Administración pública", "Industria ligera (<500m²)", "Industria pesquera (<500m²)", "Salud (Todos los niveles)", "Educación (Todos los niveles)", "Cultura y recreación (Todo tipo)", "Seguridad pública", "Templos", "Cementerios", "Parques y Plazas", "Deportes", "Mercados", "Terminales de transporte", "Telecomunicaciones"],
        "condicionado": [],
        "prohibido": ["Depósitos de gas/combustibles", "Vivienda Unifamiliar", "Vivienda Plurifamiliar", "Industria pesquera >500m²", "Industria mediana y pesada (>500m²)", "Residuos peligrosos", "Industria eléctrica fósil", "Fundición y metalurgia", "Rastros", "Rellenos sanitarios", "Generación de energía", "Instalaciones militares", "Minería"]
    },
    "VS": {
        "permitido": ["Vivienda Plurifamiliar", "Consultorios de primer contacto", "Jardín de niños y guarderías", "Centros de rehabilitación", "Parques y jardines vecinales", "Plazas", "Canchas deportivas", "Infraestructura de agua potable"],
        "condicionado": [],
        "prohibido": ["Comercio y servicios generales", "Plazas comerciales", "Supermercados", "Tiendas departamentales", "Mayoreo", "Gasolineras", "Centros nocturnos", "Oficinas", "Hoteles y Moteles", "Asistencia social", "Administración pública", "Vivienda Unifamiliar", "Industria (Cualquier tipo)", "Hospitales y clínicas", "Escuelas (Primaria en adelante)", "Cultura y recreación", "Seguridad pública", "Templos", "Cementerios", "Terminales de transporte", "Mercados", "Rastros", "Infraestructura mayor"]
    },
    "CUC": {
        "permitido": ["Comercio y servicios generales", "Plazas comerciales", "Supermercados", "Tiendas departamentales", "Mayoreo", "Centrales de abasto", "Gasolineras", "Clubes sociales", "Centros nocturnos", "Venta de maquinaria", "Oficinas", "Estacionamientos", "Hoteles", "Moteles", "Vivienda Plurifamiliar (Vertical)", "Industria ligera (<1000m²)", "Salud (Todos)", "Educación (Todos)", "Cultura (Todos)", "Seguridad", "Templos", "Deportes", "Terminales de transporte", "Mercados"],
        "condicionado": ["Industria pesquera (>500m²)"],
        "prohibido": ["Vivienda Unifamiliar", "Depósitos de combustible", "Industria Pesada (>1000m²)", "Residuos peligrosos", "Industria metalúrgica", "Rastros", "Rellenos sanitarios", "Minería"]
    },
    "CUCO": {
        "permitido": ["Bienes de consumo básico", "Plazas comerciales", "Supermercados", "Clubes sociales", "Centros nocturnos", "Oficinas", "Estacionamientos", "Hoteles (Todos)", "Moteles", "Casas de huéspedes", "Asistencia Social", "Administración pública", "Vivienda Plurifamiliar", "Industria ligera (<500m²)", "Salud (Todos)", "Educación (Todos)", "Cultura (Todos)", "Seguridad", "Templos", "Parques y Plazas", "Deportes", "Mercados"],
        "condicionado": ["Industria pesquera (>500m²)"],
        "prohibido": ["Vivienda Unifamiliar", "Gasolineras", "Depósitos de combustible", "Maquinaria pesada", "Industria mediana y pesada", "Residuos", "Terminales de carga", "Rastros", "Infraestructura pesada"]
    },
    "I": {
        "permitido": ["Comercio mayorista", "Gasolineras", "Depósitos de combustible/químicos", "Venta de maquinaria", "Oficinas", "Estacionamientos", "Industria manufacturera (Todas las escalas)", "Industria pesquera", "Depósitos de residuos", "Industria eléctrica/fósil", "Metalurgia", "Materiales de demolición", "Seguridad pública", "Terminales de carga", "Talleres de transporte", "Rastros", "Plantas de tratamiento y energía"],
        "condicionado": ["Comercios y servicios básicos (para empleados)"],
        "prohibido": ["Vivienda (Cualquier tipo)", "Plazas comerciales", "Supermercados", "Clubes sociales", "Hoteles", "Escuelas (Básica/Media)", "Hospitales", "Cultura y recreación", "Deportes", "Cementerios", "Áreas naturales protegidas"]
    },
    "E": {
        "permitido": ["Asistencia Social", "Administración pública", "Consultorios", "Clínicas", "Hospitales", "Educación (Todos los niveles)", "Centros de investigación", "Centros culturales", "Auditorios", "Museos", "Bibliotecas", "Seguridad pública", "Bomberos", "Parques", "Deportes", "Mercados", "Terminales de transporte", "Cementerios"],
        "condicionado": ["Comercio básico de apoyo"],
        "prohibido": ["Vivienda", "Industria", "Comercio gran escala", "Gasolineras", "Centros nocturnos", "Hoteles", "Rastros", "Basureros"]
    },
    "AV": {
        "permitido": ["Parques y jardines", "Plazas y explanadas", "Jardines botánicos", "Canchas deportivas al aire libre", "Áreas de preservación ambiental", "Viveros"],
        "condicionado": ["Kioscos", "Baños públicos", "Comercio temporal (ferias)"],
        "prohibido": ["Vivienda (Cualquier tipo)", "Industria", "Comercio establecido", "Oficinas", "Hoteles", "Escuelas", "Hospitales", "Gasolineras", "Cualquier edificación permanente invasiva"]
    },
     "EA": { // Igual que AV
        "permitido": ["Parques y jardines", "Plazas y explanadas", "Jardines botánicos", "Canchas deportivas al aire libre", "Áreas de preservación ambiental", "Viveros"],
        "condicionado": ["Kioscos", "Baños públicos", "Comercio temporal (ferias)"],
        "prohibido": ["Vivienda (Cualquier tipo)", "Industria", "Comercio establecido", "Oficinas", "Hoteles", "Escuelas", "Hospitales", "Gasolineras", "Cualquier edificación permanente invasiva"]
    }
};

// --- 3. MAPA Y CONTROLES (ORDEN CORREGIDO: CAPAS -> GPS -> ZOOM) ---
// Inicializamos el mapa sin controles por defecto
var map = L.map('map', { zoomControl: false }).setView([19.3510, -90.7226], 14);

// 1. CAPAS (TopRight - Primero en la pila)
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OSM' }).addTo(map);
var sat = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { attribution: 'Tiles © Esri' });
var dark = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { attribution: '© CARTO' });

L.control.layers({ "Callejero": osm, "Satélite": sat, "Oscuro": dark }, null, { position: 'topright' }).addTo(map);

// 2. BOTÓN GPS (TopRight - Segundo en la pila)
var GpsControl = L.Control.extend({
    options: { position: 'topright' },
    onAdd: function(map) {
        var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
        var btn = L.DomUtil.create('a', '', container);
        btn.href = "#";
        btn.title = "Mi Ubicación";
        btn.innerHTML = '<i class="fa-solid fa-location-crosshairs" style="font-size:1.2em; line-height:30px;"></i>';
        btn.style.backgroundColor = "white"; 
        btn.style.width = "30px"; 
        btn.style.height = "30px"; 
        btn.style.display = "block"; 
        btn.style.textAlign = "center";
        
        btn.onclick = function(e) {
            e.preventDefault();
            if(!navigator.geolocation) { alert("GPS no soportado"); return; }
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>'; 
            navigator.geolocation.getCurrentPosition(pos => {
                var lat = pos.coords.latitude;
                var lng = pos.coords.longitude;
                map.setView([lat, lng], 18);
                L.marker([lat, lng]).addTo(map).bindPopup("Estás aquí").openPopup();
                btn.innerHTML = '<i class="fa-solid fa-location-dot" style="color:#106b3d;"></i>';
            }, () => {
                alert("No se pudo obtener ubicación. Revisa los permisos.");
                btn.innerHTML = '<i class="fa-solid fa-location-crosshairs"></i>';
            });
        };
        return container;
    }
});
map.addControl(new GpsControl());

// 3. ZOOM (TopRight - Tercero en la pila)
L.control.zoom({ position: 'topright' }).addTo(map);

// --- 4. VARIABLES Y LÓGICA ---
var usoData = null;
var geojsonLayer;
var estadoFiltros = {};
var currentOpacity = 1;
var selectedLayer = null;

function normalizarCodigo(codigoOriginal) {
    var cod = codigoOriginal ? codigoOriginal.trim() : "DEFAULT";
    if (cod === "EA") return "AV"; // Truco: EA se visualiza como AV
    return cod;
}

function getColor(codigo) { 
    var cod = normalizarCodigo(codigo);
    return (ZONIFICACION[cod] || ZONIFICACION['DEFAULT']).color; 
}

function getNombreUso(codigo) { 
    var cod = normalizarCodigo(codigo);
    return (ZONIFICACION[cod] || ZONIFICACION['DEFAULT']).nombre; 
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties['Uso/suelo']),
        weight: 0.1,      // Borde fino
        opacity: 0.8,     // Borde sutil
        color: 'white',
        fillOpacity: currentOpacity
    };
}

var highlightStyle = { weight: 3, color: '#00FFFF', fillOpacity: 0.8 };

// --- 5. RENDERIZADO ---
function renderMap() {
    if(geojsonLayer) map.removeLayer(geojsonLayer);
    if (!usoData) return;

    geojsonLayer = L.geoJSON(usoData, {
        renderer: L.canvas(), // Optimización
        style: style,
        
        filter: function(feature) {
            var cod = normalizarCodigo(feature.properties['Uso/suelo']);
            return estadoFiltros[cod] !== false;
        },
        
        onEachFeature: function(feature, layer) {
            var cod = feature.properties['Uso/suelo'];
            layer.bindTooltip(getNombreUso(cod), { sticky: true, direction: 'top' });
            
            layer.on('click', function(e) {
                L.DomEvent.stopPropagation(e);
                if(selectedLayer) geojsonLayer.resetStyle(selectedLayer);
                selectedLayer = e.target;
                selectedLayer.setStyle(highlightStyle);
                selectedLayer.bringToFront();
                
                updateInfoPanel(feature.properties, layer.getBounds());
                
                document.querySelector('.nav-btn[data-target="panel-detalle"]').click();
                map.fitBounds(layer.getBounds(), {padding:[50,50], maxZoom:19});
            });
        }
    }).addTo(map);
}

function updateInfoPanel(props, bounds) {
    document.getElementById('info-default').style.display = 'none';
    document.getElementById('info-panel').style.display = 'block';
    
    var codOriginal = props['Uso/suelo'];
    // Buscar clave en matriz (usando split por si acaso viene compleja, pero priorizando la exacta)
    var claveMatriz = codOriginal;
    // Si no existe exacta, intentar normalizar o buscar raíz
    if (!MATRIZ_COMPATIBILIDAD[claveMatriz]) {
        if (MATRIZ_COMPATIBILIDAD[normalizarCodigo(claveMatriz)]) {
            claveMatriz = normalizarCodigo(claveMatriz);
        } else if (MATRIZ_COMPATIBILIDAD[claveMatriz.split('/')[0]]) {
            claveMatriz = claveMatriz.split('/')[0];
        }
    }

    var nombreUso = getNombreUso(codOriginal);
    document.getElementById('dash-titulo').innerText = nombreUso;
    document.getElementById('dash-uso-suelo').innerText = codOriginal;
    
    var area = parseFloat(props['Área Ha']);
    document.getElementById('dash-area-ha').innerText = isNaN(area) ? '0' : area.toFixed(4);
    
    var containerBtn = document.querySelector('.action-buttons-container');
    if(bounds) {
        var center = bounds.getCenter();
        
        // 1. Botones
        var htmlBotones = `
            <div class="btn-group-vertical">
                <a href="http://googleusercontent.com/maps.google.com/maps?q=${center.lat},${center.lng}" 
                   target="_blank" class="btn-action google">
                   <i class="fa-solid fa-map-location-dot"></i> Ver en Google Maps
                </a>
                <a href="https://portales.municipiocampeche.gob.mx/#/portal" 
                   target="_blank" class="btn-action tramites">
                   <i class="fa-solid fa-file-signature"></i> Trámites Municipales
                </a>
            </div>
        `;
        
        // 2. Compatibilidad Completa
        var datos = MATRIZ_COMPATIBILIDAD[claveMatriz];
        var htmlCompat = "";

        if (datos) {
            const crearLista = (items, icono, clase) => {
                if (!items || items.length === 0) return "";
                // Convertir array a lista HTML
                return `
                    <div class="compat-section">
                        <h5 class="${clase}"><i class="${icono}"></i> ${clase.toUpperCase()}</h5>
                        <ul>${items.map(i => `<li>${i}</li>`).join('')}</ul>
                    </div>
                `;
            };

            htmlCompat = `
                <div class="compatibilidad-container">
                    <hr style="margin: 15px 0; border: 0; border-top: 1px solid #eee;">
                    <h4 style="color:#333; margin-bottom:10px; font-size:0.9rem;">Compatibilidad de Usos</h4>
                    ${crearLista(datos.permitido, "fa-solid fa-check-circle", "permitido")}
                    ${crearLista(datos.condicionado, "fa-solid fa-triangle-exclamation", "condicionado")}
                    ${crearLista(datos.prohibido, "fa-solid fa-ban", "prohibido")}
                </div>
            `;
        } else {
            htmlCompat = `<div class="compatibilidad-container"><hr><p style="color:#999; font-style:italic; font-size:0.8rem;">Sin información de compatibilidad específica para: ${claveMatriz}</p></div>`;
        }

        // 3. Aviso Legal Completo
        var htmlAviso = `
            <div style="margin-top: 20px; padding: 10px; background: #fff3cd; border-left: 4px solid #ffc107; border-radius: 4px; font-size: 0.75rem; color: #856404; text-align: justify;">
                <i class="fa-solid fa-circle-info"></i>
                <strong>Aviso Legal:</strong> La información contenida en este visor es de carácter indicativo y tiene como propósito facilitar la consulta de la Zonificación Secundaria. Para cualquier trámite oficial, validación normativa, alineamiento o número oficial, es indispensable consultar directamente a la Dirección de Desarrollo Urbano del H. Ayuntamiento de Champotón. Este visor no sustituye los documentos oficiales impresos y sellados por la autoridad competente.
            </div>
        `;

        containerBtn.innerHTML = htmlBotones + htmlCompat + htmlAviso;
    }
}

// --- 7. CARGA DE DATOS Y ESTADÍSTICAS ---
async function cargarDatos() {
    const statusEl = document.getElementById('stats-container');
    statusEl.innerHTML = '<p style="padding:10px;"><i class="fa-solid fa-spinner fa-spin"></i> Cargando mapa...</p>';

    try {
        const res = await fetch('uso.geojson');
        if(!res.ok) throw new Error("Error al cargar uso.geojson");
        usoData = await res.json();
        
        generarControles();
        renderMap();
        calcularEstadisticas();
        
        if(geojsonLayer) map.fitBounds(geojsonLayer.getBounds());

    } catch (e) {
        document.getElementById('stats-container').innerHTML = `<p style="color:red; padding:10px">Error: ${e.message}. Asegúrate de que uso.geojson está en la carpeta.</p>`;
    }
}

function generarControles() {
    var div = document.getElementById('capas-container');
    div.innerHTML = '';
    Object.keys(ZONIFICACION).forEach(k => {
        if(k === 'DEFAULT') return;
        estadoFiltros[k] = true;
        div.innerHTML += `
            <div class="layer-control-row">
                <input type="checkbox" checked id="chk-${k}" onchange="toggleFiltro('${k}', this.checked)">
                <span style="width:12px;height:12px;background:${ZONIFICACION[k].color};margin:0 8px;border-radius:50%"></span>
                <label for="chk-${k}">${ZONIFICACION[k].nombre}</label>
            </div>
        `;
    });
}

function toggleFiltro(key, checked) {
    estadoFiltros[key] = checked;
    renderMap();
}

function toggleTodosFiltros(val) {
    Object.keys(estadoFiltros).forEach(k => estadoFiltros[k] = val);
    document.querySelectorAll('#capas-container input').forEach(c => c.checked = val);
    renderMap();
}

function calcularEstadisticas() {
    var counts = {};
    var areas = {};
    var totalPredios = 0;
    var totalHa = 0;

    if (!usoData) return;

    // 1. Contar y sumar áreas
    usoData.features.forEach(f => {
        var c = normalizarCodigo(f.properties['Uso/suelo']);
        var a = parseFloat(f.properties['Área Ha']) || 0;

        if (!counts[c]) { counts[c] = 0; areas[c] = 0; }
        counts[c]++;
        areas[c] += a;

        totalPredios++;
        totalHa += a;
    });

    // 2. Convertir a lista para poder ORDENAR
    var listaOrdenada = [];
    for (var key in counts) {
        if (ZONIFICACION[key]) {
            listaOrdenada.push({
                clave: key,
                nombre: ZONIFICACION[key].nombre,
                color: ZONIFICACION[key].color,
                cantidad: counts[key],
                area: areas[key]
            });
        }
    }

    // 3. Ordenar de Mayor a Menor Área (Descendente)
    listaOrdenada.sort((a, b) => b.area - a.area);

    // 4. Generar HTML (Tarjeta Azul + Lista)
    var html = `
        <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin-bottom: 15px; border-left: 5px solid #2196F3;">
            <h4 style="margin:0 0 10px 0; color:#1565C0; font-size:1rem;">Resumen de la Ciudad</h4>
            <div style="display:flex; justify-content:space-between; margin-bottom:5px; font-size:0.9rem;">
                <span style="color:#555;">Total Predios:</span> 
                <strong style="font-size:1.1em;">${totalPredios.toLocaleString()}</strong>
            </div>
            <div style="display:flex; justify-content:space-between; font-size:0.9rem;">
                <span style="color:#555;">Superficie Total:</span> 
                <strong style="font-size:1.1em;">${totalHa.toLocaleString(undefined, {maximumFractionDigits: 2})} Ha</strong>
            </div>
        </div>
        <div class="stats-list" style="display:flex; flex-direction:column; gap:5px;">
    `;

    // 5. Generar filas alineadas
    listaOrdenada.forEach(item => {
        html += `
            <div class="stat-row" style="
                display: grid; 
                grid-template-columns: 4px 1fr auto auto; 
                gap: 10px; 
                align-items: center;
                padding: 8px 5px; 
                border-bottom: 1px solid #eee;
                font-size: 0.85rem;">
                
                <div style="background:${item.color}; height:100%; border-radius:2px;"></div>
                <div style="font-weight:600; color:#333;">${item.nombre}</div>
                <div style="color:#666; text-align:right;">${item.cantidad.toLocaleString()} <span style="font-size:0.7em">lotes</span></div>
                <div style="color:#333; font-weight:bold; text-align:right; min-width:60px;">${item.area.toLocaleString(undefined, {maximumFractionDigits: 1})} <span style="font-size:0.7em">Ha</span></div>
            </div>
        `;
    });
    html += "</div>";

    document.getElementById('stats-container').innerHTML = html;
}

// --- 8. EVENTOS DOM ---
document.addEventListener('DOMContentLoaded', function() {
    cargarDatos();

    // Slider Opacidad
    document.getElementById('opacity-slider').addEventListener('input', e => {
        currentOpacity = e.target.value;
        if(geojsonLayer) geojsonLayer.setStyle(style);
    });

    // Sidebar Toggle
    const sidebar = document.getElementById('sidebar-content');
    const toggleBtn = document.getElementById('toggle-sidebar-btn');
    const icon = toggleBtn.querySelector('i');

    toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        if (sidebar.classList.contains('collapsed')) {
            icon.classList.replace('fa-chevron-left', 'fa-chevron-right');
        } else {
            icon.classList.replace('fa-chevron-right', 'fa-chevron-left');
        }
        setTimeout(() => map.invalidateSize(), 300);
    });

    // Botones Sidebar
    document.querySelectorAll('.nav-btn[data-target]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.sidebar-pane').forEach(p => p.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(btn.dataset.target).classList.add('active');
            
            if(sidebar.classList.contains('collapsed')) {
                toggleBtn.click(); 
            }
        });
    });

    // Modales
    window.openModal = function(id) {
        document.getElementById('modal-overlay').style.display = 'flex';
        document.querySelectorAll('.modal-body').forEach(b => b.style.display = 'none');
        document.getElementById(id).style.display = 'block';
    };
});