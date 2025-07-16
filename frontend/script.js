// Variables globales
let allData = [];
let displayedData = [];
let currentPage = 1;
const itemsPerPage = 10;
let chartInstances = {};

document.addEventListener('DOMContentLoaded', () => {
  setupLogin();
  loadDataFromBackend();
  setupShowMoreButton();
  setupSearchForm();
});

// Login simple (se puede mejorar con backend real)
function setupLogin() {
  document.getElementById('loginForm')
    .addEventListener('submit', e => {
      e.preventDefault();
      const email = document.getElementById('userEmail').value;
      const modalBody = document.getElementById('loginModal').querySelector('.modal-body');
      modalBody.innerHTML = `<p>Bienvenido, <strong>${email}</strong>!</p>`;
    });
}

function loadDataFromBackend() {
  fetch('http://localhost:8080/energia/listado')
    .then(res => res.json())
    .then(data => {
      allData = data;
      displayedData = [...allData];
      renderData();
      renderStats();
      renderHeatMap();  // <--- Mapa de calor se genera tras cargar datos
    })
    .catch(err => console.error(err));
}

function renderData() {
  const tbody = document.getElementById('dataTableBody');
  tbody.innerHTML = '';
  const start = (currentPage - 1) * itemsPerPage;
  const slice = displayedData.slice(start, start + itemsPerPage);
  slice.forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${item.country}</td><td>${item.year}</td>
      <td>${item.population ?? 'No disponible'}</td>
      <td>${item.gdp ?? 'No disponible'}</td>
      <td>${item.primaryEnergyConsumption ?? 'No disponible'}</td>`;
    tbody.appendChild(tr);
  });
  document.getElementById('showMoreBtn').style.display =
    (start + itemsPerPage < displayedData.length) ? 'block' : 'none';
}

function setupShowMoreButton() {
  document.getElementById('showMoreBtn')
    .addEventListener('click', () => {
      currentPage++;
      renderData();
    });
}

function setupSearchForm() {
  document.getElementById('searchForm')
    .addEventListener('submit', e => {
      e.preventDefault();
      currentPage = 1;
      applyFilters();
    });
}

function applyFilters() {
  const term = document.getElementById('searchInput').value.toLowerCase();
  const year = document.getElementById('year').value;
  displayedData = allData.filter(item =>
    item.country.toLowerCase().includes(term) &&
    (!year || item.year.toString() === year)
  );
  renderData();
}

function exportData() {
  const rows = [
    ['País','Año','Población','PIB','ConsumoPrimario'],
    ...displayedData.map(d => [
      d.country, d.year, d.population ?? '', d.gdp ?? '', d.primaryEnergyConsumption ?? ''
    ])
  ];
  const csv = rows.map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type:'text/csv' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'energia.csv';
  link.click();
}

function renderStats() {
  const total = allData.length;
  const avgGdp = average(allData.map(d => d.gdp));
  const avgEnergy = average(allData.map(d => d.primaryEnergyConsumption));
  document.getElementById('statsContainer').innerHTML = `
    <div class="card shadow p-4">
      <h4 class="mb-3">📊 Estadísticas Globales (CSV + EIA)</h4>
      <p><strong>Total registros:</strong> ${total}</p>
      <p><strong>Promedio PIB:</strong> ${avgGdp.toFixed(2)}</p>
      <p><strong>Promedio consumo energético:</strong> ${avgEnergy.toFixed(2)}</p>
    </div>`;
}

function average(arr) {
  const vals = arr.filter(v => typeof v === 'number');
  return vals.length ? vals.reduce((a,b) => a + b, 0) / vals.length : 0;
}

function generateChart(type) {
  const ctx = document.getElementById(`${type}Chart`).getContext('2d');
  const slice = displayedData.slice(0, 1000);

  if (chartInstances[type]) chartInstances[type].destroy();

  if (type === 'pie') {
    const grouped = {};
    slice.forEach(d => grouped[d.country] = (grouped[d.country] || 0) + (d.primaryEnergyConsumption || 0));
    chartInstances[type] = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: Object.keys(grouped),
        datasets: [{ data: Object.values(grouped), backgroundColor: generateColors(Object.keys(grouped).length) }]
      }
    });
  } else {
    const byYear = {};
    slice.forEach(d => byYear[d.year] = (byYear[d.year] || 0) + (d.primaryEnergyConsumption || 0));
    const years = Object.keys(byYear).sort();
    chartInstances[type] = new Chart(ctx, {
      type: 'line',
      data: {
        labels: years,
        datasets: [{ label: 'Consumo primario', data: years.map(y => byYear[y]), borderColor:'#2196f3', tension:0.3 }]
      }
    });
  }
}

function generateColors(n) {
  return Array.from({length: n}, (_, i) => `hsl(${(i * 360 / n)},70%,50%)`);
}

/**
 * Mapa de calor con Leaflet y Leaflet.heat
 */
function renderHeatMap() {
  // Mapa básico centrado en el mundo
  const map = L.map('heatmap').setView([20, 0], 2);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // Coordenadas aproximadas por país (amplía esta lista según tu dataset)
  const countryCoords = {
      "United States": [37.0902, -95.7129, 12],    // 12% de energía renovable
      "China": [35.8617, 104.1954, 10],            // 10% de energía renovable
      "India": [20.5937, 78.9629, 22],             // 22% de energía renovable
      "Germany": [51.1657, 10.4515, 47],           // 47% de energía renovable
      "Brazil": [-14.2350, -51.9253, 83],          // 83% de energía renovable
      "Mexico": [23.6345, -102.5528, 26],          // 26% de energía renovable
      "Russia": [61.5240, 105.3188, 7],            // 7% de energía renovable
      "France": [46.2276, 2.2137, 19],             // 19% de energía renovable
      "United Kingdom": [55.3781, -3.4360, 48],    // 48% de energía renovable
      "Canada": [56.1304, -106.3468, 66],          // 66% de energía renovable
      "Australia": [-25.2744, 133.7751, 20],       // 20% de energía renovable
      "Japan": [36.2048, 138.2529, 18],            // 18% de energía renovable
      "South Korea": [35.9078, 127.7669, 6],       // 6% de energía renovable
      "Italy": [41.8719, 12.5674, 33],             // 33% de energía renovable
      "Spain": [40.4637, -3.7492, 45],             // 45% de energía renovable
      "Argentina": [-38.4161, -63.6167, 33],       // 33% de energía renovable
      "South Africa": [-30.5595, 22.9375, 7],      // 7% de energía renovable
      "Egypt": [26.8206, 30.8025, 4],              // 4% de energía renovable
      "Nigeria": [9.0820, 8.6753, 9],              // 9% de energía renovable
      "Indonesia": [-0.7893, 113.9213, 15],        // 15% de energía renovable
      "Saudi Arabia": [23.8859, 45.0792, 0],       // 0% de energía renovable (dependencia alta del petróleo)
      "Turkey": [38.9637, 35.2433, 28],            // 28% de energía renovable
      "Vietnam": [14.0583, 108.2772, 10],          // 10% de energía renovable
      "Thailand": [15.8700, 100.9925, 12],         // 12% de energía renovable
      "Pakistan": [30.3753, 69.3451, 7],           // 7% de energía renovable
      "Colombia": [4.5709, -74.2973, 24],          // 24% de energía renovable
      "Chile": [-35.6751, -71.5430, 46],           // 46% de energía renovable
      "Iran": [32.4279, 53.6880, 12],              // 12% de energía renovable
      "Malaysia": [4.2105, 101.9758, 6],           // 6% de energía renovable
      "Kenya": [-1.2921, 36.8219, 70],             // 70% de energía renovable
      "Peru": [-9.19, -75.0152, 28],               // 28% de energía renovable
      "Poland": [51.9194, 19.1451, 13],            // 13% de energía renovable
      "Ukraine": [48.3794, 31.1656, 6],            // 6% de energía renovable
      "Belgium": [50.8503, 4.3517, 22],            // 22% de energía renovable
      "Sweden": [60.1282, 18.6435, 54],            // 54% de energía renovable
      "Norway": [60.4720, 8.4689, 98],             // 98% de energía renovable
      "Finland": [61.9241, 25.7482, 41],           // 41% de energía renovable
      "Denmark": [56.2639, 9.5018, 56],            // 56% de energía renovable
      "Portugal": [39.3999, -8.2245, 57],          // 57% de energía renovable
      "New Zealand": [-40.9006, 174.8860, 80],     // 80% de energía renovable
      "Israel": [31.0461, 34.8516, 10],            // 10% de energía renovable
      "Switzerland": [46.8182, 8.2275, 58],        // 58% de energía renovable
      "Czech Republic": [49.8175, 15.4720, 13],    // 13% de energía renovable
      "Austria": [47.5162, 14.5501, 33],           // 33% de energía renovable
      "Hungary": [47.1625, 19.5033, 11],           // 11% de energía renovable
      "Romania": [45.9432, 24.9668, 24],           // 24% de energía renovable
      "Bulgaria": [42.7339, 25.4858, 22],          // 22% de energía renovable
      "Croatia": [45.1, 15.2, 35],                 // 35% de energía renovable
      "Serbia": [44.0165, 21.0059, 21],            // 21% de energía renovable
      "Slovenia": [46.1511, 14.9955, 40],          // 40% de energía renovable
      "Slovakia": [48.6690, 19.6990, 15],          // 15% de energía renovable
      "Estonia": [58.5953, 25.0136, 12],           // 12% de energía renovable
      "Latvia": [56.8796, 24.6032, 13],            // 13% de energía renovable
      "Lithuania": [55.1694, 23.8813, 21],         // 21% de energía renovable
      "Iceland": [64.9631, -19.0208, 100],         // 100% de energía renovable (mayoría geotérmica e hidroeléctrica)
      "Luxembourg": [49.6117, 6.13, 25],           // 25% de energía renovable
      "Monaco": [43.7333, 7.4167, 5],              // 5% de energía renovable
      "San Marino": [43.9333, 12.45, 30],          // 30% de energía renovable
      "Liechtenstein": [47.1415, 9.5215, 50],      // 50% de energía renovable
      "Malta": [35.9375, 14.3754, 3],              // 3% de energía renovable
      "Andorra": [42.5078, 1.5211, 10],            // 10% de energía renovable
    };

  // Agregar puntos con intensidad basada en consumo energético
  const energyByCountry = {};

  allData.forEach(d => {
    if (d.primaryEnergyConsumption && countryCoords[d.country]) {
      energyByCountry[d.country] = (energyByCountry[d.country] || 0) + d.primaryEnergyConsumption;
    }
  });

  // Crear array de puntos: [lat, lng, intensidad]
  const heatPoints = Object.entries(energyByCountry).map(([country, energy]) => {
    const [lat, lng] = countryCoords[country];
    return [lat, lng, energy / 1000];  // Escala para mejor visualización
  });

  // Añadir capa de calor al mapa
  L.heatLayer(heatPoints, {
    radius: 25,
    blur: 15,
    maxZoom: 6,
  }).addTo(map);
}
