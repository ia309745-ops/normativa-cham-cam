// --- 1. CONFIGURACIÓN DE ZONIFICACIÓN ---
const ZONIFICACION = {
    "AV":          { color: '#166e19', nombre: "Área Verde" },
    "CS":          { color: '#ca3a6a', nombre: "Comercio y Servicio" },
    "CUC":         { color: '#d63c0d', nombre: "Corredor Urbano" },
    "CUCO":        { color: '#a51c1c', nombre: "Corredor Urbano Costero" },
    "Centro His":  { color: '#855e4f', nombre: "Centro Histórico" },
    "E":           { color: '#166aaf', nombre: "Equipamiento" },
    "HM":          { color: '#e6c42c', nombre: "Habitacional Mixto" }, 
    "HM/4/20":     { color: '#e6c42c', nombre: "Habitacional Mixto" },
    "I":           { color: '#881e9b', nombre: "Industrial" },
    "Urbanizabl":  { color: '#CFD8DC', nombre: "Urbanizable" },
    "Urbanizable": { color: '#CFD8DC', nombre: "Urbanizable" },
    "VS":          { color: '#ffc061', nombre: "Vivienda Social" },
    "EA":          { color: '#037e71', nombre: "Espacio Abierto" },
    
    "CU":          { color: '#d63c0d', nombre: "Corredor Urbano" },
    "CUSO":        { color: '#E64A19', nombre: "Corredor Urbano Solidaridad" },
    "CUJS":        { color: '#F4511E', nombre: "Corredor Urbano Justo Sierra" },
    "UE":          { color: '#7B1FA2', nombre: "Uso Especial" }, 

    "DEFAULT":     { color: '#9E9E9E', nombre: "Sin Definir" }
};

// --- 2. REGLAS NORMATIVAS (TABLA DE CÁLCULO) ---
const REGLAS_NORMATIVAS = {
    "Centro His": { niveles: 3, libre: 20 }, 
    "HM":         { niveles: 4, libre: 20 },
    "CS":         { niveles: 4, libre: 20 },
    "VS":         { niveles: 6, libre: 30 },
    "CUCO":       { niveles: 6, libre: 20 },
    "CUC":        { niveles: 4, libre: 30 }, 
    "I":          { niveles: 4, libre: 30 }
};

// --- 3. MATRIZ DE COMPATIBILIDAD ---
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
    "HM": { 
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
    "EA": {
        "permitido": ["Parques y jardines", "Plazas y explanadas", "Jardines botánicos", "Canchas deportivas al aire libre", "Áreas de preservación ambiental", "Viveros"],
        "condicionado": ["Kioscos", "Baños públicos", "Comercio temporal (ferias)"],
        "prohibido": ["Vivienda (Cualquier tipo)", "Industria", "Comercio establecido", "Oficinas", "Hoteles", "Escuelas", "Hospitales", "Gasolineras", "Cualquier edificación permanente invasiva"]
    },
    "Urbanizable": {
        "permitido": ["Sujeto a Plan Parcial"],
        "condicionado": ["Usos Temporales"],
        "prohibido": ["Construcción sin servicios"]
    }
};

// --- 4. INICIALIZACIÓN DEL MAPA ---
// Coordenadas Champotón
var map = L.map('map', { zoomControl: false }).setView([19.3510, -90.7226], 16);

// Capas
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 22, attribution: '© OSM' }).addTo(map);
var sat = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { maxZoom: 22, attribution: 'Tiles © Esri' });
var dark = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { attribution: '© CARTO' });
L.control.layers({ "Callejero": osm, "Satélite": sat, "Oscuro": dark }, null, { position: 'topright' }).addTo(map);

// GPS
var GpsControl = L.Control.extend({
    options: { position: 'topright' },
    onAdd: function(map) {
        var div = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
        div.innerHTML = '<a href="#" title="Mi ubicación" style="background:white; width:30px; height:30px; display:flex; align-items:center; justify-content:center; font-size:1.2em;"><i class="fa-solid fa-location-crosshairs"></i></a>';
        div.onclick = function(e) {
            e.preventDefault();
            navigator.geolocation.getCurrentPosition(pos => {
                map.setView([pos.coords.latitude, pos.coords.longitude], 18);
                L.marker([pos.coords.latitude, pos.coords.longitude]).addTo(map).bindPopup("Estás aquí").openPopup();
            }, () => alert("Activa tu GPS"));
        };
        return div;
    }
});
map.addControl(new GpsControl());

// Zoom
L.control.zoom({ position: 'topright' }).addTo(map);

// --- 5. LÓGICA DE DATOS ---
var usoData = null;
var geojsonLayer;
var estadoFiltros = {};
var currentOpacity = 1;
var selectedLayer = null;
var datosFichaActual = null;

function obtenerClaveUso(props) {
    if (!props) return "DEFAULT";
    return props['Uso/suelo'] || props['Uso/Suelo'] || "DEFAULT";
}

function normalizarCodigo(cod) {
    if (!cod) return "DEFAULT";
    var limpio = cod.trim();
    if (limpio === "EA") return "AV";
    if (limpio.startsWith("HM")) return "HM"; 
    if (limpio.startsWith("CS")) return "CS"; 
    if (limpio.startsWith("CU/")) return "CU";
    if (limpio === "Urbanizabl") return "Urbanizable";
    return limpio;
}

function getColor(codigo) { 
    var cod = normalizarCodigo(codigo);
    if(codigo === "HM/4/20") return ZONIFICACION["HM/4/20"].color;
    return (ZONIFICACION[cod] || ZONIFICACION['DEFAULT']).color; 
}

function getNombreUso(codigo) { 
    var cod = normalizarCodigo(codigo);
    if(codigo === "HM/4/20") return ZONIFICACION["HM/4/20"].nombre;
    return (ZONIFICACION[cod] || ZONIFICACION['DEFAULT']).nombre; 
}

// LÓGICA DE CÁLCULO COS/CUS (MODIFICADA: Devuelve números puros)
function analizarNormativa(codigo) {
    let datos = { niveles: 0, areaLibre: 0, cos: 0, cus: 0, esValido: false };
    if (!codigo) return datos;

    let codNorm = normalizarCodigo(codigo);

    // EXCLUIR USOS SIN CÁLCULO
    if (["E", "EA", "AV", "Urbanizabl", "Urbanizable", "UE"].includes(codNorm)) {
        return datos; 
    }

    // 1. Intentar leer de la clave explícita (Ej: HM/4/20)
    let partes = codigo.split('/');
    if (partes.length >= 3) {
        let n = parseFloat(partes[1]);
        let l = parseFloat(partes[2].replace(/[^0-9.]/g, '')); // Limpieza
        if (!isNaN(n) && !isNaN(l)) {
            datos.niveles = n;
            datos.areaLibre = l;
        }
    }

    // 2. Si no tiene números, usar REGLAS POR DEFECTO
    if (datos.niveles === 0) {
        // Mapeo especial
        if (["CUSO", "CUJS", "CU"].includes(codNorm)) codNorm = "CUC";
        
        let regla = REGLAS_NORMATIVAS[codNorm];
        if (regla) {
            datos.niveles = regla.niveles;
            datos.areaLibre = regla.libre;
        }
    }

    // 3. Calcular
    if (datos.niveles > 0) {
        datos.cos = (100 - datos.areaLibre) / 100;
        datos.cus = datos.cos * datos.niveles;
        datos.esValido = true;
    }
    
    return datos;
}

function style(feature) {
    var cod = obtenerClaveUso(feature.properties);
    return {
        fillColor: getColor(cod),
        weight: 0.2, opacity: 0.5, color: 'white', 
        fillOpacity: currentOpacity
    };
}

var highlightStyle = { weight: 3, color: '#00FFFF', fillOpacity: 0.8 };

async function cargarDatos() {
    const archivo = "uso.geojson"; 
    const statusEl = document.getElementById('stats-container');
    statusEl.innerHTML = '<p style="padding:10px;"><i class="fa-solid fa-spinner fa-spin"></i> Cargando mapa...</p>';

    try {
        if(geojsonLayer) map.removeLayer(geojsonLayer);
        const res = await fetch(archivo);
        if(!res.ok) throw new Error("Error: No se encontró " + archivo);
        usoData = await res.json();
        
        statusEl.innerHTML = '';
        estadoFiltros = {}; 
        
        generarControles();
        renderMap();
        calcularEstadisticas();
    } catch (e) {
        console.error(e);
        statusEl.innerHTML = `<div style="padding:15px; color:red;">Error cargando datos.<br>Verifica 'uso.geojson'.</div>`;
    }
}

function renderMap() {
    if(!usoData) return;
    geojsonLayer = L.geoJSON(usoData, {
        renderer: L.canvas(),
        style: style,
        filter: function(f) {
            var cod = obtenerClaveUso(f.properties);
            var codNorm = normalizarCodigo(cod);
            if (estadoFiltros[codNorm] === undefined) estadoFiltros[codNorm] = true;
            return estadoFiltros[codNorm] !== false;
        },
        onEachFeature: function(feature, layer) {
            var cod = obtenerClaveUso(feature.properties);
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

// --- ACTUALIZACIÓN: PANEL CON COORDENADAS Y BOTÓN PDF ---
function updateInfoPanel(props, bounds) {
    document.getElementById('info-default').style.display = 'none';
    document.getElementById('info-panel').style.display = 'block';
    
    var cod = obtenerClaveUso(props);
    var codNorm = normalizarCodigo(cod);
    var claveMatriz = codNorm;

    // Fallback
    if (claveMatriz === "HM") claveMatriz = "HM/4/20"; 
    if (!MATRIZ_COMPATIBILIDAD[claveMatriz] && MATRIZ_COMPATIBILIDAD[cod]) claveMatriz = cod;

    // CÁLCULOS
    var norma = analizarNormativa(cod);
    var areaM2 = props['Área m2'] ? parseFloat(props['Área m2']) : (parseFloat(props['Área Ha'] || 0) * 10000);
    var areaHa = areaM2 / 10000;

    // Visualización
    var cosDisplay = '<span style="color:#999;">No Aplica</span>';
    var cusDisplay = '<span style="color:#999;">No Aplica</span>';
    var libreDisplay = '<span style="color:#999;">--</span>';
    var nivelesDisplay = '<span style="color:#999;">--</span>';
    
    // Valores crudos para la ficha de impresión
    var cosValor = "N/A", cusValor = "N/A";

    if (norma.esValido) {
        var m2Desplante = areaM2 * norma.cos;
        var m2Total = areaM2 * norma.cus;
        var m2Libre = areaM2 - m2Desplante; 
        var cosPct = (norma.cos * 100).toFixed(0) + "%";

        cosValor = `${norma.cos.toFixed(2)} (${cosPct})`;
        cusValor = `${norma.cus.toFixed(2)} veces`;

        cosDisplay = `
            <div style="margin-bottom:4px;"><strong>COS: ${norma.cos.toFixed(2)}</strong> (${cosPct})</div>
            <div style="font-size:0.85rem; color:#555;">Max. Desplante: <strong>${m2Desplante.toLocaleString('es-MX', {maximumFractionDigits: 0})} m²</strong></div>
        `;
        libreDisplay = `
            <div style="margin-bottom:4px;"><strong>${norma.areaLibre}%</strong> Libre</div>
            <div style="font-size:0.85rem; color:#555;">Mín: <strong>${m2Libre.toLocaleString('es-MX', {maximumFractionDigits: 0})} m²</strong></div>
        `;
        cusDisplay = `
            <div style="margin-bottom:4px;"><strong>CUS: ${norma.cus.toFixed(2)}</strong> veces</div>
            <div style="font-size:0.85rem; color:#555;">Max. Total: <strong>${m2Total.toLocaleString('es-MX', {maximumFractionDigits: 0})} m²</strong></div>
        `;
        nivelesDisplay = `
            <div style="font-size:1.1rem; font-weight:bold; color:#333;">${norma.niveles} Niveles</div>
        `;
    }

    document.getElementById('dash-titulo').innerText = getNombreUso(cod);

    var fichaHtml = `
        <div style="background:#f5f5f5; padding:10px; border-radius:4px; margin-bottom:15px; display:flex; justify-content:space-between; align-items:center;">
            <div>
                <span style="font-size:0.75rem; color:#666; display:block;">CLAVE</span>
                <span style="font-weight:bold; color:#333; font-size:1.1rem;">${cod}</span>
            </div>
            <div style="text-align:right;">
                <span style="font-size:0.75rem; color:#666; display:block;">SUPERFICIE</span>
                <span style="font-weight:bold; color:#333;">${areaM2.toLocaleString('es-MX', {maximumFractionDigits: 0})} m²</span><br>
                <small style="color:#888;">${areaHa.toFixed(4)} Ha</small>
            </div>
        </div>

        <div class="ficha-grid" style="grid-template-columns: 1fr 1fr; gap:10px;">
            <div style="grid-column: 1 / 2; display:flex; flex-direction:column; gap:8px;">
                <h5 style="margin:0; color:#2e7d32; font-size:0.8rem; border-bottom:1px solid #c8e6c9; padding-bottom:3px;">OCUPACIÓN (P.B.)</h5>
                <div class="ficha-item" style="background:#e8f5e9; border-color:#a5d6a7;">${cosDisplay}</div>
                <div class="ficha-item" style="background:#f1f8e9; border-color:#c8e6c9;">${libreDisplay}</div>
            </div>
            <div style="grid-column: 2 / 3; display:flex; flex-direction:column; gap:8px;">
                <h5 style="margin:0; color:#e65100; font-size:0.8rem; border-bottom:1px solid #ffe0b2; padding-bottom:3px;">CONSTRUCCIÓN</h5>
                <div class="ficha-item" style="background:#fff3e0; border-color:#ffcc80;">${cusDisplay}</div>
                <div class="ficha-item" style="background:#fff8e1; border-color:#ffe082; justify-content:center; align-items:center; display:flex;">${nivelesDisplay}</div>
            </div>
        </div>
    `;

    var headerHtml = `<h4 id="dash-titulo" class="ficha-title" style="margin-bottom:10px;">${getNombreUso(cod)}</h4>`;
    
    // Preparar Botones
    var c = bounds ? bounds.getCenter() : {lat:0, lng:0};
    var latStr = c.lat.toFixed(6);
    var lngStr = c.lng.toFixed(6);

    // Guardamos datos para la impresión
    datosFichaActual = {
        clave: cod,
        nombre: getNombreUso(cod),
        superficie: `${areaM2.toLocaleString('es-MX', {maximumFractionDigits: 2})} m²`,
        cos: cosValor,
        cus: cusValor,
        niveles: norma.niveles,
        areaLibre: norma.areaLibre + "%",
        coordenadas: `${latStr}, ${lngStr}`,
        normatividad: MATRIZ_COMPATIBILIDAD[claveMatriz]
    };

    var htmlBotones = `
        <div class="btn-group-vertical" style="margin-top:20px;">
            <div style="background:#fff; padding:10px; border:1px solid #ddd; border-radius:4px; text-align:center; font-family:monospace; color:#555; font-size:0.9rem;">
                <i class="fa-solid fa-location-dot" style="color:#d32f2f;"></i> ${latStr}, ${lngStr}
            </div>

            <button onclick="descargarFicha()" class="btn-action" style="background-color:#37474f; color:white; border:none; cursor:pointer;">
                <i class="fa-solid fa-print"></i> Imprimir Ficha Técnica
            </button>

            <a href="https://portales.municipiocampeche.gob.mx/#/portal" target="_blank" class="btn-action tramites">
                <i class="fa-solid fa-file-signature"></i> Trámites Municipales
            </a>
        </div>
    `;
    
    // Compatibilidad
    var datos = MATRIZ_COMPATIBILIDAD[claveMatriz];
    var htmlCompat = "";
    if(datos) {
        const lista = (t, i, cls) => t && t.length ? `<div class="compat-section"><h5 class="${cls}"><i class="${i}"></i> ${cls.toUpperCase()}</h5><ul>${t.map(x=>`<li>${x}</li>`).join('')}</ul></div>` : '';
        htmlCompat = `<div class="compatibilidad-container"><hr style="margin:20px 0; border-top:1px solid #eee;"><h4 style="margin-bottom:10px;">Compatibilidad (${claveMatriz})</h4>${lista(datos.permitido, "fa-solid fa-check-circle", "permitido")}${lista(datos.condicionado, "fa-solid fa-triangle-exclamation", "condicionado")}${lista(datos.prohibido, "fa-solid fa-ban", "prohibido")}</div>`;
    } else {
        htmlCompat = `<div class="compatibilidad-container"><hr><p style="color:#999; font-size:0.8rem; font-style:italic;">* Para este uso específico, consulte directamente a la autoridad.</p></div>`;
    }
    
    var htmlAviso = `<div style="margin-top:20px; padding:10px; background:#fff3cd; border-left:4px solid #ffc107; font-size:0.75rem; color:#856404; text-align:justify;"><strong>Aviso Legal:</strong> Información indicativa.</div>`;

    document.getElementById('info-panel').innerHTML = headerHtml + fichaHtml + `<div class="action-buttons-container">` + htmlBotones + htmlCompat + htmlAviso + `</div>`;
}

// --- NUEVA FUNCIÓN: GENERAR FICHA DE IMPRESIÓN ---
function descargarFicha() {
    if (!datosFichaActual) return;
    
    var d = datosFichaActual;
    var fecha = new Date().toLocaleDateString('es-MX');

    // Construir listas de usos
    var usosPermitidos = d.normatividad && d.normatividad.permitido ? d.normatividad.permitido.join(', ') : "Consultar Normativa";
    var usosProhibidos = d.normatividad && d.normatividad.prohibido ? d.normatividad.prohibido.join(', ') : "Consultar Normativa";

    var ventana = window.open('', '_blank');
    ventana.document.write(`
        <html>
        <head>
            <title>Ficha Técnica - ${d.clave}</title>
            <style>
                body { font-family: 'Segoe UI', sans-serif; padding: 40px; color: #333; }
                .header { border-bottom: 3px solid #106b3d; padding-bottom: 20px; margin-bottom: 30px; display:flex; justify-content:space-between; align-items:center; }
                h1 { margin: 0; color: #106b3d; font-size: 24px; }
                .meta { color: #666; font-size: 14px; }
                .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; }
                .box { border: 1px solid #ddd; padding: 15px; border-radius: 4px; background: #f9f9f9; }
                .box label { display: block; font-size: 12px; color: #888; text-transform: uppercase; font-weight: bold; margin-bottom: 5px; }
                .box span { display: block; font-size: 18px; font-weight: bold; color: #333; }
                .section-title { font-size: 16px; font-weight: bold; color: #333; border-bottom: 1px solid #eee; padding-bottom: 5px; margin-top: 20px; margin-bottom: 10px; }
                .text-content { font-size: 13px; line-height: 1.5; text-align: justify; }
                .footer { margin-top: 50px; font-size: 10px; color: #999; text-align: center; border-top: 1px solid #eee; padding-top: 10px; }
            </style>
        </head>
        <body>
            <div class="header">
                <div>
                    <h1>Ficha Técnica de Zonificación</h1>
                    <div class="meta">Champotón, Campeche</div>
                </div>
                <div class="meta">Fecha de consulta:<br><strong>${fecha}</strong></div>
            </div>

            <div class="grid">
                <div class="box">
                    <label>Clave de Uso</label>
                    <span style="color:#d32f2f;">${d.clave}</span>
                    <div style="font-size:14px; font-weight:normal; margin-top:5px;">${d.nombre}</div>
                </div>
                <div class="box">
                    <label>Superficie del Predio</label>
                    <span>${d.superficie}</span>
                </div>
                <div class="box">
                    <label>Coordenadas Geográficas</label>
                    <span style="font-size:16px;">${d.coordenadas}</span>
                </div>
            </div>

            <div class="section-title">PARAMETROS URBANÍSTICOS</div>
            <div class="grid" style="grid-template-columns: 1fr 1fr 1fr 1fr;">
                <div class="box"><label>C.O.S.</label><span>${d.cos}</span></div>
                <div class="box"><label>C.U.S.</label><span>${d.cus}</span></div>
                <div class="box"><label>Niveles Máx.</label><span>${d.niveles}</span></div>
                <div class="box"><label>Área Libre</label><span>${d.areaLibre}</span></div>
            </div>

            <div class="section-title">USOS PERMITIDOS</div>
            <div class="text-content" style="color: #2e7d32;">
                ${usosPermitidos}
            </div>

            <div class="section-title">USOS PROHIBIDOS</div>
            <div class="text-content" style="color: #c62828;">
                ${usosProhibidos}
            </div>

            <div class="footer">
                Documento informativo generado por el Visor de Desarrollo Urbano de Champotón.<br>
                Esta ficha no constituye un permiso de construcción ni uso de suelo legal. Consulte a la autoridad competente.
            </div>

            <script>
                window.print();
            </script>
        </body>
        </html>
    `);
    ventana.document.close();
}

function generarControles() {
    var div = document.getElementById('capas-container');
    div.innerHTML = '';
    var usosPresentes = new Set();
    usoData.features.forEach(f => usosPresentes.add(normalizarCodigo(obtenerClaveUso(f.properties))));
    
    Array.from(usosPresentes).sort().forEach(k => {
        if(k === 'DEFAULT') return;
        var nombre = (ZONIFICACION[k] || {nombre: k}).nombre;
        var color = (ZONIFICACION[k] || {color: '#ccc'}).color;
        if (estadoFiltros[k] === undefined) estadoFiltros[k] = true;
        div.innerHTML += `<div class="layer-control-row"><input type="checkbox" checked id="chk-${k}" onchange="toggleFiltro('${k}', this.checked)"><span style="width:12px;height:12px;background:${color};margin:0 8px;border-radius:50%"></span><label for="chk-${k}">${nombre}</label></div>`;
    });
}

function calcularEstadisticas() {
    var counts = {}, areas = {}, totalP = 0, totalH = 0;
    usoData.features.forEach(f => {
        var c = normalizarCodigo(obtenerClaveUso(f.properties));
        var a = parseFloat(f.properties['Área Ha']) || 0;
        if(!counts[c]) { counts[c]=0; areas[c]=0; }
        counts[c]++; areas[c]+=a;
        totalP++; totalH+=a;
    });

    var lista = [];
    for(var k in counts) {
        var nombre = (ZONIFICACION[k] || {nombre: k}).nombre;
        var color = (ZONIFICACION[k] || {color: '#ccc'}).color;
        lista.push({ nombre: nombre, color: color, cant: counts[k], area: areas[k] });
    }
    lista.sort((a, b) => b.area - a.area);

    var html = `
        <div style="background:#e3f2fd; padding:15px; border-radius:8px; margin-bottom:15px; border-left:5px solid #2196F3;">
            <h4 style="margin:0 0 10px 0; color:#1565C0;">Champotón</h4>
            <div style="display:flex; justify-content:space-between; font-size:0.9rem; margin-bottom:5px;"><span style="color:#555;">Predios:</span> <strong>${totalP.toLocaleString()}</strong></div>
            <div style="display:flex; justify-content:space-between; font-size:0.9rem;"><span style="color:#555;">Superficie:</span> <strong>${totalH.toLocaleString(undefined,{maximumFractionDigits:1})} Ha</strong></div>
        </div>
        <div style="display:flex; flex-direction:column; gap:5px;">
    `;
    lista.forEach(item => {
        html += `<div class="stat-row" style="display:grid; grid-template-columns: 4px 1fr auto auto; gap:10px; align-items:center; padding:8px 5px; border-bottom:1px solid #eee; font-size:0.85rem;"><div style="background:${item.color}; height:100%; border-radius:2px;"></div><div style="font-weight:600; color:#333;">${item.nombre}</div><div style="color:#666; text-align:right;">${item.cant.toLocaleString()}</div><div style="color:#333; font-weight:bold; text-align:right; min-width:50px;">${item.area.toFixed(1)} Ha</div></div>`;
    });
    document.getElementById('stats-container').innerHTML = html;
}

function toggleFiltro(k, v) { estadoFiltros[k] = v; renderMap(); }
function toggleTodosFiltros(v) { document.querySelectorAll('#capas-container input').forEach(c => { c.checked=v; toggleFiltro(c.id.replace('chk-',''), v); }); }

// --- 8. EVENTOS DOM ---
document.addEventListener('DOMContentLoaded', function() {
    cargarDatos();

    document.getElementById('opacity-slider').addEventListener('input', e => {
        currentOpacity = e.target.value;
        if(geojsonLayer) geojsonLayer.setStyle(style);
    });

    const sidebar = document.getElementById('sidebar-content');
    const toggleBtn = document.getElementById('toggle-sidebar-btn');
    const icon = toggleBtn.querySelector('i');

    toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        if (sidebar.classList.contains('collapsed')) icon.style.transform = 'rotate(180deg)';
        else icon.style.transform = 'rotate(0deg)';
        setTimeout(() => map.invalidateSize(), 300);
    });

    document.querySelectorAll('.nav-btn[data-target]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.sidebar-pane').forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(btn.dataset.target).classList.add('active');
            if(sidebar.classList.contains('collapsed')) toggleBtn.click();
        });
    });
    
    window.openModal = function(id) {
        document.getElementById('modal-overlay').style.display = 'flex';
        document.querySelectorAll('.modal-body').forEach(b => b.style.display = 'none');
        document.getElementById(id).style.display = 'block';
    };
    document.getElementById('modal-overlay').addEventListener('click', e => { if(e.target.id === 'modal-overlay') e.target.style.display='none'; });
});