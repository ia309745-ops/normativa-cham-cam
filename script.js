// --- 1. INICIALIZACIÓN DEL MAPA ---
var centroChampoton = [19.3510, -90.7226]; 
var map = L.map('map', { zoomControl: true }).setView(centroChampoton, 14);

// --- CAPAS BASE ---
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '© OSM' });
var cartoLight = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', { maxZoom: 19, attribution: '© CARTO' });
var cartoDark = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { maxZoom: 19, attribution: '© CARTO' }); // Asegúrate de que esta línea exista
var satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { maxZoom: 19, attribution: 'Tiles © Esri' });

osm.addTo(map); // Capa por defecto

// REEMPLAZAR ESTE CONTROL DE CAPAS:
L.control.layers({ 
    "Calles": osm, 
    "Claro": cartoLight, 
    "Oscuro": cartoDark,  /* <-- AGREGAMOS ESTA OPCIÓN */
    "Satélite": satellite 
}, null, { position: 'bottomleft' }).addTo(map);
// --- 2. VARIABLES GLOBALES ---
var usoData = null; // Cambié el nombre de variable para ser consistente
var geojsonLayer; 
var selectedLayer = null; 

// Elementos DOM
var infoDefault = document.getElementById('info-default');
var infoPanel = document.getElementById('info-panel');
var usoSueloEl = document.getElementById('dash-uso-suelo'); 
var areaM2El = document.getElementById('dash-area-m2');   
var areaHaEl = document.getElementById('dash-area-ha');   
var modalOverlay = document.getElementById('modal-overlay');
var modalCloseBtn = document.getElementById('modal-close-btn');

// --- DICCIONARIO DE USOS DE SUELO ---
const descripciones = {
    "AV": "Área Verde",
    "CS": "Comercio y Servicio",
    "CUC": "Corredor Urbano Champotón",
    "CUCO": "Corredor Urbano Costero",
    "Centro His": "Centro Histórico",
    "E": "Equipamiento",
    "HM/4/20": "Habitacional Mixto",
    "I": "Industrial",
    "Urbanizabl": "Urbanizable",
    "VS": "Vivienda Social",
    "EA": "Espacio Abierto" 
};

// --- FUNCIÓN DE PALETA DE COLORES ---
function getColor(uso) {
    switch (uso) {
        case 'HM/4/20': return '#FDD835'; // Amarillo Oru
        case 'VS': return '#FFB74D';      // Naranja Claro
        case 'Centro His': return '#8D6E63'; // Marrón
        case 'CS': return '#EC407A';      // Rosa Mexicano
        case 'CUC': return '#FF5722';     // Naranja Intenso
        case 'CUCO': return '#D32F2F';    // Rojo Oscuro
        case 'AV': return '#4CAF50';      // Verde
        case 'E': return '#2196F3';       // Azul
        case 'I': return '#9C27B0';       // Púrpura
        case 'Urbanizabl': return '#CFD8DC'; // Gris Claro
        case 'EA': return '#009688';      // Verde Azulado
        default: return '#cccccc';        // Gris neutro
    }
}

// --- 3. ESTILOS (CON CONTORNO TENUE) ---
function style(feature) {
    return { 
        fillColor: getColor(feature.properties['Uso/suelo']), 
        stroke: true,         // Activamos el borde
        color: '#ffffff',     // Color blanco
        weight: 0.5,          // Muy delgado
        opacity: 0.4,         // Transparente (tenue)
        fillOpacity: 0.9, 
        interactive: true 
    };
}

var highlightStyle = { 
    weight: 4, 
    color: '#FFFF00', 
    dashArray: '', 
    fillOpacity: 1,
    stroke: true,
    opacity: 1 
};

// --- 4. FUNCIONES AUXILIARES ---

function updatePanel(props, center) {
    var codigo = props['Uso/suelo'];
    var nombreCompleto = descripciones[codigo] || codigo;

    usoSueloEl.innerHTML = `<b>Uso/Suelo:</b> ${codigo || "No definido"}`; 
    areaM2El.innerHTML = `<b>Área:</b> ${parseFloat(props['Área m2']).toLocaleString('es-MX', { maximumFractionDigits: 2 }) || "0"} m²`;
    areaHaEl.innerHTML = `<b>Área:</b> ${parseFloat(props['Área Ha']).toFixed(3) || "0"} ha`;
    
    document.getElementById('dash-titulo').innerText = nombreCompleto;

    // Botón Google Maps
    if (center) {
        var lat = center.lat;
        var lng = center.lng;
        var gmapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
        var btnGmaps = document.getElementById('btn-gmaps');
        if (btnGmaps) {
            btnGmaps.href = gmapsUrl;
        }
    }

    infoDefault.style.display = 'none';
    infoPanel.style.display = 'block';
}

function resetHighlight() {
    if (selectedLayer) {
        geojsonLayer.resetStyle(selectedLayer);
        selectedLayer = null;
    }
    infoDefault.style.display = 'block';
    infoPanel.style.display = 'none';
}

// --- 5. RENDERIZADO DEL MAPA ---
function renderMap(featuresToRender) {
    resetHighlight();
    if (geojsonLayer) map.removeLayer(geojsonLayer);
    
    geojsonLayer = L.geoJSON(featuresToRender, {
        style: style,
        onEachFeature: function (feature, layer) {
            layer.on('click', function (e) {
                L.DomEvent.stopPropagation(e);
                resetHighlight();
                selectedLayer = e.target;
                selectedLayer.setStyle(highlightStyle);
                selectedLayer.bringToFront();
                
                updatePanel(feature.properties, layer.getBounds().getCenter());
                
                map.fitBounds(selectedLayer.getBounds(), { padding: [20, 20] });
            });
            
            // Popup simple
            var nom = descripciones[feature.properties['Uso/suelo']] || feature.properties['Uso/suelo'];
            layer.bindPopup(`<b>${nom}</b><br>${parseFloat(feature.properties['Área Ha']).toFixed(3)} ha`);
        }
    }).addTo(map);
}

// --- 6. CARGA DE DATOS (NOMBRE ACTUALIZADO A uso.geojson) ---
async function cargarDatos() {
    try {
        // AQUÍ ESTÁ EL CAMBIO IMPORTANTE
        const response = await fetch('uso.geojson'); 
        
        if (!response.ok) throw new Error("Falta 'uso.geojson' o error de carga");
        const data = await response.json();
        usoData = data;

        renderMap(usoData);
        
        // Cálculos
        var statsPorUso = {};
        var granTotalPredios = 0;
        var granTotalHa = 0;

        usoData.features.forEach(function(feature) {
            var uso = feature.properties['Uso/suelo'] || "Sin Definir";
            var areaHa = parseFloat(feature.properties['Área Ha']) || 0;

            granTotalPredios++;
            granTotalHa += areaHa;

            if (!statsPorUso[uso]) { statsPorUso[uso] = { count: 0, totalHa: 0 }; }
            statsPorUso[uso].count++;
            statsPorUso[uso].totalHa += areaHa;
        });

        // Dashboard Global
        var container = document.getElementById('stats-container');
        var htmlContent = `
            <div class="stat-row" style="background-color: #e3f2fd; border-bottom: 2px solid #1976D2; margin-bottom: 8px; padding: 10px;">
                <div class="stat-label" style="font-size: 1.1em; color: #1565C0;">TOTAL GLOBAL</div>
                <div class="stat-values">
                    <strong style="font-size: 1.2em; color: #000;">${granTotalPredios.toLocaleString()} predios</strong>
                    <span style="font-weight: bold; color: #333;">${granTotalHa.toFixed(2)} Ha</span>
                </div>
            </div>
        `;

        Object.keys(statsPorUso).sort().forEach(function(uso) {
            var data = statsPorUso[uso];
            var nombreMostrar = descripciones[uso] || uso;
            htmlContent += `
                <div class="stat-row">
                    <div class="stat-label" title="${uso}">${nombreMostrar}</div>
                    <div class="stat-values">
                        <strong>${data.count.toLocaleString()} predios</strong>
                        ${data.totalHa.toFixed(2)} Ha
                    </div>
                </div>
            `;
        });
        container.innerHTML = htmlContent;
        
    } catch (error) {
        console.error(error);
        alert("¡Error cargando datos!\n" + error.message);
    }
}

cargarDatos(); // Iniciar

// --- 7. UI EVENTS ---
document.getElementById('btn-ubicacion').addEventListener('click', function() {
    navigator.geolocation.getCurrentPosition(function(position) {
        var loc = [position.coords.latitude, position.coords.longitude];
        map.setView(loc, 16);
        L.marker(loc).addTo(map).bindPopup("<b>¡Estás aquí!</b>").openPopup();
    });
});

// --- 8. CONTROL DE TRANSPARENCIA ---
document.getElementById('opacity-slider').addEventListener('input', function(e) {
    var nuevaOpacidad = parseFloat(e.target.value);
    
    if (geojsonLayer) {
        geojsonLayer.eachLayer(function(layer) {
            // Actualizamos el estilo de cada polígono
            layer.setStyle({
                fillOpacity: nuevaOpacidad,
                // Si la opacidad es 0, ocultamos también el borde, si no, lo dejamos tenue (0.4)
                opacity: nuevaOpacidad > 0.1 ? 0.4 : 0 
            });
        });
    }
});

map.on('click', function() { resetHighlight(); });

// Modales
document.querySelectorAll('#main-header .tab-link').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        var id = this.getAttribute('data-tab');
        var targetModal = document.getElementById(id);
        if (targetModal) {
            modalOverlay.style.display = 'flex';
            document.querySelectorAll('.modal-tab-pane').forEach(p => p.classList.remove('active'));
            targetModal.classList.add('active');
        }
    });
});

modalCloseBtn.addEventListener('click', () => modalOverlay.style.display = 'none');
modalOverlay.addEventListener('click', (e) => { if(e.target === modalOverlay) modalOverlay.style.display = 'none'; });

// Estrellas
var stars = document.querySelectorAll('#modal-tab-calificar .rating-stars .fa-star');
stars.forEach(function(star) {
    star.addEventListener('click', function() {
        var rating = this.getAttribute('data-value');
        stars.forEach(function(s) { s.classList.remove('selected'); });
        for (var i = 0; i < rating; i++) { stars[i].classList.add('selected'); }
    });
});
document.getElementById('submit-rating-btn').addEventListener('click', function() {
    alert('¡Gracias por calificar el visor!');
});