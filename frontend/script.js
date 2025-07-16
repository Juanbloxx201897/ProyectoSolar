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
    "United States": [37.0902, -95.7129],
    "China": [35.8617, 104.1954],
    "India": [20.5937, 78.9629],
    "Germany": [51.1657, 10.4515],
    "Brazil": [-14.2350, -51.9253],
    "Mexico": [23.6345, -102.5528],
    "Russia": [61.5240, 105.3188],
    "France": [46.2276, 2.2137],
    "United Kingdom": [55.3781, -3.4360],
    "Canada": [56.1304, -106.3468],
    // Agrega más si tienes datos
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
