// --- 1. CONFIGURACIÓN ---
const ZONIFICACION = {
    // Nota: He eliminado "EA" de aquí para que no salga en el menú de filtros
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
    "DEFAULT":     { color: '#9E9E9E', nombre: "Sin Definir" }
};

// --- MATRIZ DE COMPATIBILIDAD (Datos procesados de tu Excel) ---
const MATRIZ_COMPATIBILIDAD = {
    "H2": {
        "permitido": ["Vivienda Unifamiliar (1 viv/lote)", "Vivienda Bifamiliar (2 viv/lote)", "Comercio Vecinal", "Servicios Básicos", "Áreas Verdes y Parques"],
        "condicionado": ["Vivienda Plurifamiliar (3+ viv/lote)", "Comercio Barrial", "Escuelas (Básica)", "Consultorios Médicos"],
        "prohibido": ["Comercio Distrital/Central", "Servicios Especializados", "Talleres y Reparaciones", "Industria (Cualquier tipo)", "Hospitales", "Centros de Espectáculos", "Gasolineras"]
    },
    "H4": {
        "permitido": ["Vivienda Unifamiliar", "Vivienda Bifamiliar", "Vivienda Plurifamiliar (Media densidad)", "Comercio Vecinal", "Comercio Barrial", "Servicios Básicos", "Escuelas (Básica)"],
        "condicionado": ["Comercio Distrital", "Oficinas Pequeñas", "Talleres Artesanales (Bajo Impacto)", "Iglesias/Templos"],
        "prohibido": ["Industria", "Bodegas Grandes", "Centros Nocturnos", "Gasolineras", "Hospitales Regionales"]
    },
    "HM": { // Aplica para HM/4/20 y similares
        "permitido": ["Vivienda (Todo tipo)", "Comercio Vecinal", "Comercio Barrial", "Comercio Distrital", "Oficinas y Servicios Profesionales", "Hoteles y Moteles", "Escuelas (Todos los niveles)", "Hospitales y Clínicas"],
        "condicionado": ["Talleres Mecánicos", "Centros de Espectáculos", "Gasolineras", "Bodegas de Distribución"],
        "prohibido": ["Industria Mediana/Pesada", "Rellenos Sanitarios", "Usos de Alto Riesgo"]
    },
    "CUC": { // Corredor Urbano
        "permitido": ["Comercio (Todo tipo)", "Servicios Especializados", "Oficinas Corporativas", "Hoteles", "Centros Comerciales", "Equipamiento Regional", "Vivienda Vertical (Alta densidad)"],
        "condicionado": ["Gasolineras", "Talleres de Servicio", "Industria Ligera (No contaminante)"],
        "prohibido": ["Industria Pesada", "Vivienda Unifamiliar Aislada", "Granjas/Agropecuario"]
    },
    "CUCO": { // Corredor Costero
        "permitido": ["Hoteles y Resorts", "Restaurantes y Bares Turísticos", "Comercio Turístico", "Clubes de Playa", "Vivienda Vacacional/Turística", "Marinas y Muelles"],
        "condicionado": ["Vivienda Permanente", "Comercio General"],
        "prohibido": ["Industria", "Talleres", "Bodegas", "Usos que obstruyan vista al mar"]
    },
    "I": { // Industria
        "permitido": ["Industria Ligera", "Industria Mediana", "Bodegas y Almacenes", "Parques Industriales", "Talleres Mayores", "Logística y Transporte"],
        "condicionado": ["Industria Pesada (Sujeto a MIA)", "Comercio de Insumos Industriales", "Oficinas Administrativas de la Industria"],
        "prohibido": ["Vivienda", "Escuelas", "Hospitales", "Hoteles", "Comercio Turístico"]
    },
    "E": { // Equipamiento
        "permitido": ["Edificios Públicos", "Escuelas y Universidades", "Hospitales", "Centros Culturales/Deportivos", "Terminales de Transporte", "Mercados Públicos"],
        "condicionado": ["Comercio de Apoyo (Cafeterías, Librerías)", "Vivienda para Conserjes/Vigilancia"],
        "prohibido": ["Industria", "Bares y Cantinas", "Vivienda General"]
    },
    "AV": { // Áreas Verdes / Espacios Abiertos
        "permitido": ["Parques y Jardines", "Plazas Cívicas", "Instalaciones Deportivas al Aire Libre", "Conservación Ecológica", "Viveros"],
        "condicionado": ["Kioscos y Pequeño Comercio (Bebidas/Alimentos)", "Baños Públicos", "Instalaciones Temporales (Ferias)"],
        "prohibido": ["Vivienda", "Industria", "Comercio Establecido Grande", "Cualquier edificación permanente invasiva"]
    }
    // Nota: Si un código no está aquí, el sistema asumirá prohibición general.
};

// --- 2. MAPA Y CONTROLES ---
// Inicializamos el mapa con ZOOM 16 (Más cerca, como pediste)
var map = L.map('map', { zoomControl: false }).setView([19.34, -90.71], 14);

// 2º Definimos los Mapas Base
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map); // .addTo(map) hace que este sea el predeterminado

var sat = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri'
});

var dark = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; CARTO'
});

// 3º Control de Capas (Arriba a la derecha)
L.control.layers({ 
    "Callejero (OSM)": osm, 
    "Satélite": sat,
    "Modo Oscuro": dark 
}, null, { position: 'topright' }).addTo(map);

// 2º AGREGAMOS BOTÓN GPS (Para que quede EN MEDIO)
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
                map.setView([lat, lng], 16);
                L.marker([lat, lng]).addTo(map).bindPopup("Estás aquí").openPopup();
                btn.innerHTML = '<i class="fa-solid fa-location-dot" style="color:#106b3d;"></i>';
            }, () => {
                alert("No se pudo obtener ubicación");
                btn.innerHTML = '<i class="fa-solid fa-location-crosshairs"></i>';
            });
        };
        return container;
    }
});
map.addControl(new GpsControl());

// 3º AGREGAMOS ZOOM (Para que quede ABAJO)
L.control.zoom({ position: 'topright' }).addTo(map);


// --- 3. VARIABLES GLOBALES ---
var usoData = null;
var geojsonLayer;
var estadoFiltros = {};
var currentOpacity = 0.9;
var selectedLayer = null;

// --- 4. LÓGICA DE DATOS ("TRUCO" DE FUSIÓN EA -> AV) ---

// Función auxiliar para normalizar el código (Aquí ocurre la magia de la fusión)
function normalizarCodigo(codigoOriginal) {
    var cod = codigoOriginal ? codigoOriginal.trim() : "DEFAULT";
    // Si es "EA" (Espacio Abierto), lo transformamos en "AV" (Área Verde)
    if (cod === "EA") return "AV";
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
        weight: 0.2, 
        opacity: 0.4, 
        color: 'white',
        fillOpacity: currentOpacity
    };
}

var highlightStyle = { weight: 3, color: '#00FFFF', fillOpacity: 0.8 };

// --- 5. RENDERIZADO DEL MAPA ---
function renderMap() {
    if(geojsonLayer) map.removeLayer(geojsonLayer);
    if (!usoData) return;

    geojsonLayer = L.geoJSON(usoData, {
        renderer: L.canvas(), 
        style: style,
        
        filter: function(feature) {
            // Usamos el código normalizado para filtrar
            // Así, si desactiva "Área Verde", también se ocultan los "Espacio Abierto"
            var cod = normalizarCodigo(feature.properties['Uso/suelo']);
            return estadoFiltros[cod] !== false;
        },
        
        onEachFeature: function(feature, layer) {
            var cod = feature.properties['Uso/suelo'];
            // Tooltip muestra el nombre "Área Verde" incluso si es "EA" en los datos originales
            layer.bindTooltip(getNombreUso(cod), { sticky: true, direction: 'top' });
            
            layer.on('click', function(e) {
                L.DomEvent.stopPropagation(e);
                if (selectedLayer) geojsonLayer.resetStyle(selectedLayer);
                
                selectedLayer = e.target;
                selectedLayer.setStyle(highlightStyle);
                selectedLayer.bringToFront();
                
                updateInfoPanel(feature.properties, layer.getBounds());
                
                var btnDetalle = document.querySelector('.nav-btn[data-target="panel-detalle"]');
                if(btnDetalle) btnDetalle.click();
                map.fitBounds(layer.getBounds(), {padding:[50,50], maxZoom: 17});
            });
        }
    }).addTo(map);
}

// --- 6. ACTUALIZACIÓN DE PANELES ---
function updateInfoPanel(props, bounds) {
    document.getElementById('info-default').style.display = 'none';
    document.getElementById('info-panel').style.display = 'block';
    
    // 1. Datos Básicos
    var codOriginal = props['Uso/suelo'];
    
    // Lógica para buscar en la matriz (usando la raíz del código si es necesario)
    var claveMatriz = codOriginal.split('/')[0]; 
    if (!MATRIZ_COMPATIBILIDAD[claveMatriz]) claveMatriz = codOriginal;
    
    var nombreUso = getNombreUso(codOriginal);
    
    document.getElementById('dash-titulo').innerText = nombreUso;
    document.getElementById('dash-uso-suelo').innerText = codOriginal;
    
    var area = parseFloat(props['Área Ha']);
    document.getElementById('dash-area-ha').innerText = isNaN(area) ? '0' : area.toFixed(4);
    
    // 2. Generar Contenido Dinámico (Botones + Compatibilidad + Aviso)
    var containerBtn = document.querySelector('.action-buttons-container');
    
    if(bounds) {
        var center = bounds.getCenter();
        
        // A. Botones de Acción
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
        
        // B. Sección de Compatibilidad
        var datosCompatibilidad = MATRIZ_COMPATIBILIDAD[claveMatriz];
        var htmlCompatibilidad = "";

        if (datosCompatibilidad) {
            const crearLista = (items, icono, clase) => {
                if (!items || items.length === 0) return "";
                return `
                    <div class="compat-section">
                        <h5 class="${clase}"><i class="${icono}"></i> ${clase.toUpperCase()}</h5>
                        <ul>${items.map(i => `<li>${i}</li>`).join('')}</ul>
                    </div>
                `;
            };

            htmlCompatibilidad = `
                <div class="compatibilidad-container">
                    <hr style="margin: 15px 0; border: 0; border-top: 1px solid #eee;">
                    <h4 style="color:#333; margin-bottom:10px; font-size:0.9rem;">Compatibilidad de Usos</h4>
                    ${crearLista(datosCompatibilidad.permitido, "fa-solid fa-check", "permitido")}
                    ${crearLista(datosCompatibilidad.condicionado, "fa-solid fa-triangle-exclamation", "condicionado")}
                    ${crearLista(datosCompatibilidad.prohibido, "fa-solid fa-ban", "prohibido")}
                </div>
            `;
        } else {
            htmlCompatibilidad = `<div class="compatibilidad-container"><hr><p style="color:#999; font-style:italic; font-size:0.8rem;">Sin información de compatibilidad específica para esta zona.</p></div>`;
        }

        // C. Aviso Legal
        var htmlAviso = `
            <div style="margin-top: 20px; padding: 10px; background: #fff3cd; border-left: 4px solid #ffc107; border-radius: 4px; font-size: 0.75rem; color: #856404;">
                <i class="fa-solid fa-circle-info"></i>
                <strong>Nota Legal:</strong> La información mostrada es de carácter indicativo. Para trámites oficiales y validación normativa, consulte directamente a la <b>Dirección de Desarrollo Urbano</b>.
            </div>
        `;

        // D. Inserción Final (Unimos las 3 partes)
        containerBtn.innerHTML = htmlBotones + htmlCompatibilidad + htmlAviso;
    }
}

// --- 7. CARGA Y ESTADÍSTICAS ---
async function cargarDatos() {
    const statusEl = document.getElementById('stats-container');
    statusEl.innerHTML = '<p style="padding:10px;"><i class="fa-solid fa-spinner fa-spin"></i> Cargando mapa...</p>';

    try {
        const response = await fetch('uso.geojson');
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        usoData = await response.json();
        
        statusEl.innerHTML = ''; 
        generarControles();
        renderMap();
        calcularEstadisticas();
        
        if (geojsonLayer) {
            map.fitBounds(geojsonLayer.getBounds());
        }

    } catch (error) {
        console.error(error);
        statusEl.innerHTML = '<div style="padding:15px; color:red;">Error cargando datos.</div>';
    }
}

function generarControles() {
    var container = document.getElementById('capas-container');
    container.innerHTML = '';
    Object.keys(ZONIFICACION).forEach(key => {
        if(key === 'DEFAULT') return;
        
        estadoFiltros[key] = true;
        var div = document.createElement('div');
        div.className = 'layer-control-row';
        div.innerHTML = `
            <input type="checkbox" checked id="chk-${key}" style="margin-right:8px; cursor:pointer;">
            <span style="width:12px;height:12px;background:${ZONIFICACION[key].color};margin-right:8px;display:inline-block;border-radius:50%"></span>
            <label for="chk-${key}" style="cursor:pointer;font-size:0.9em;user-select:none;">${ZONIFICACION[key].nombre}</label>
        `;
        div.querySelector('input').addEventListener('change', (e) => {
            estadoFiltros[key] = e.target.checked;
            renderMap();
        });
        container.appendChild(div);
    });
}

function calcularEstadisticas() {
    var counts = {};
    var total = 0;
    usoData.features.forEach(f => {
        // Usamos normalizarCodigo aquí también para sumar "EA" dentro de "AV"
        var c = normalizarCodigo(f.properties['Uso/suelo']);
        counts[c] = (counts[c] || 0) + 1;
        total++;
    });
    
    var html = `<div style="padding:10px; background:#e3f2fd; margin-bottom:10px;"><b>Total Predios:</b> ${total.toLocaleString()}</div>`;
    for (var key in counts) {
        // Solo mostramos los que están en nuestra configuración ZONIFICACION
        if (ZONIFICACION[key]) {
            var nombre = ZONIFICACION[key].nombre;
            var color = ZONIFICACION[key].color;
            html += `<div class="stat-row"><span style="border-left: 4px solid ${color}; padding-left:5px;">${nombre}</span><strong>${counts[key]}</strong></div>`;
        }
    }
    document.getElementById('stats-container').innerHTML = html;
}

// --- 8. EVENTOS DOM ---
document.addEventListener('DOMContentLoaded', function() {
    cargarDatos();

    const slider = document.getElementById('opacity-slider');
    if(slider) {
        slider.addEventListener('input', (e) => {
            currentOpacity = e.target.value;
            if(geojsonLayer) geojsonLayer.setStyle(style);
        });
    }

    const sidebar = document.getElementById('sidebar-content');
    document.querySelectorAll('.nav-btn[data-target]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.sidebar-pane').forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(btn.dataset.target).classList.add('active');
            if(sidebar.classList.contains('collapsed')) sidebar.classList.remove('collapsed');
        });
    });
    
    var toggleBtn = document.getElementById('toggle-sidebar-btn');
    if(toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
        });
    }

    // Modales
    const overlay = document.getElementById('modal-overlay');
    document.querySelectorAll('.tab-link').forEach(btn => {
        btn.addEventListener('click', () => overlay.style.display = 'flex');
    });
    document.getElementById('modal-close-btn').addEventListener('click', () => overlay.style.display = 'none');
});

function toggleTodosFiltros(activar) {
    document.querySelectorAll('#capas-container input').forEach(chk => {
        chk.checked = activar;
        var key = chk.id.replace('chk-', '');
        estadoFiltros[key] = activar;
    });
    renderMap();
}