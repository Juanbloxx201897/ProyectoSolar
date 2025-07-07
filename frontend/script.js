// ==============================================
// JAVASCRIPT COMPLETO PARA PÁGINA DE ENERGÍA RENOVABLE
// ==============================================

// Variables globales
let chartInstances = {};
let allData = [];
let currentPage = 1;
const itemsPerPage = 10;

// ==============================================
// INICIALIZACIÓN DE LA PÁGINA
// ==============================================
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    loadInitialData();
    setupEventListeners();
    setupSmoothScrolling();
});

// ==============================================
// CONFIGURACIÓN INICIAL
// ==============================================
function initializeApp() {
    // Agregar animaciones cuando los elementos entran en viewport
    setupScrollAnimations();
    
    // Inicializar tooltips si están disponibles
    if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
    
    // Configurar navbar scroll effect
    setupNavbarScrollEffect();
}

function loadInitialData() {
    // Datos iniciales expandidos
    allData = [
        {country: 'China', region: 'Asia', type: 'Solar', production: '261.1', percentage: '30.7%', year: '2022'},
        {country: 'Estados Unidos', region: 'América', type: 'Eólica', production: '380.1', percentage: '29.9%', year: '2022'},
        {country: 'Brasil', region: 'América', type: 'Hidroeléctrica', production: '362.8', percentage: '8.3%', year: '2022'},
        {country: 'India', region: 'Asia', type: 'Solar', production: '75.0', percentage: '8.8%', year: '2022'},
        {country: 'Alemania', region: 'Europa', type: 'Eólica', production: '132.7', percentage: '10.4%', year: '2022'},
        {country: 'Japón', region: 'Asia', type: 'Solar', production: '98.2', percentage: '11.5%', year: '2021'},
        {country: 'Canadá', region: 'América', type: 'Hidroeléctrica', production: '385.0', percentage: '8.8%', year: '2021'},
        {country: 'Noruega', region: 'Europa', type: 'Hidroeléctrica', production: '154.3', percentage: '3.5%', year: '2021'},
        {country: 'Australia', region: 'Oceanía', type: 'Solar', production: '28.4', percentage: '3.3%', year: '2022'},
        {country: 'Francia', region: 'Europa', type: 'Eólica', production: '37.4', percentage: '2.9%', year: '2022'},
        {country: 'Reino Unido', region: 'Europa', type: 'Eólica', production: '75.4', percentage: '5.9%', year: '2022'},
        {country: 'Turquía', region: 'Europa', type: 'Eólica', production: '22.9', percentage: '1.8%', year: '2022'},
        {country: 'Holanda', region: 'Europa', type: 'Eólica', production: '17.0', percentage: '1.3%', year: '2022'},
        {country: 'España', region: 'Europa', type: 'Eólica', production: '62.1', percentage: '4.9%', year: '2022'},
        {country: 'Italia', region: 'Europa', type: 'Solar', production: '28.1', percentage: '3.3%', year: '2022'},
        {country: 'México', region: 'América', type: 'Solar', production: '7.2', percentage: '0.8%', year: '2022'},
        {country: 'Chile', region: 'América', type: 'Solar', production: '6.8', percentage: '0.8%', year: '2022'},
        {country: 'Suecia', region: 'Europa', type: 'Hidroeléctrica', production: '74.8', percentage: '1.7%', year: '2022'},
        {country: 'Rusia', region: 'Europa', type: 'Hidroeléctrica', production: '208.0', percentage: '4.8%', year: '2022'},
        {country: 'Corea del Sur', region: 'Asia', type: 'Solar', production: '17.1', percentage: '2.0%', year: '2022'}
    ];
    
    // Cargar datos iniciales en la tabla
    updateTable();
}

function setupEventListeners() {
    // Formulario de búsqueda
    const searchForm = document.getElementById('searchForm');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            performSearch();
        });
    }

    // Búsqueda en tiempo real
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            if (this.value.length > 2 || this.value.length === 0) {
                performSearch();
            }
        });
    }

    // Cambio en filtros
    ['energyType', 'region', 'year'].forEach(filterId => {
        const filterElement = document.getElementById(filterId);
        if (filterElement) {
            filterElement.addEventListener('change', performSearch);
        }
    });

    // Botones de exportación y carga
    const exportBtn = document.querySelector('[onclick="exportData()"]');
    if (exportBtn) {
        exportBtn.onclick = exportData;
    }

    const loadMoreBtn = document.querySelector('[onclick="loadMoreData()"]');
    if (loadMoreBtn) {
        loadMoreBtn.onclick = loadMoreData;
    }
}

// ==============================================
// FUNCIONALIDAD DE BÚSQUEDA
// ==============================================
function performSearch() {
    const searchTerm = document.getElementById('searchInput').value;
    const energyType = document.getElementById('energyType').value;
    const region = document.getElementById('region').value;
    const year = document.getElementById('year').value;

    // Mostrar spinner de carga
    showLoadingSpinner(true);
    
    // Ocultar resultados anteriores
    document.getElementById('searchAlert').style.display = 'none';

    // Simular llamada a API
    setTimeout(() => {
        hideLoadingSpinner();
        showSearchResults(searchTerm, energyType, region, year);
        updateTable(searchTerm, energyType, region, year);
    }, 800);
}

function showLoadingSpinner(show) {
    const spinner = document.getElementById('loadingSpinner');
    if (spinner) {
        spinner.style.display = show ? 'block' : 'none';
    }
}

function hideLoadingSpinner() {
    showLoadingSpinner(false);
}

function showSearchResults(searchTerm, energyType, region, year) {
    const alertDiv = document.getElementById('searchAlert');
    if (!alertDiv) return;
    
    let message = `Búsqueda realizada`;
    
    if (searchTerm) message += ` para "${searchTerm}"`;
    if (energyType) message += `, tipo: ${energyType}`;
    if (region) message += `, región: ${region}`;
    if (year) message += `, año: ${year}`;
    
    // Contar resultados filtrados
    const filteredResults = getFilteredData(searchTerm, energyType, region, year);
    
    alertDiv.innerHTML = `
        <div class="alert alert-success custom-alert">
            <i class="fas fa-check-circle"></i> ${message}. 
            Se encontraron <strong>${filteredResults.length}</strong> resultados.
        </div>
    `;
    alertDiv.style.display = 'block';
}

function getFilteredData(searchTerm, energyType, region, year) {
    return allData.filter(item => {
        let matches = true;
        
        if (searchTerm && !item.country.toLowerCase().includes(searchTerm.toLowerCase()) && 
            !item.region.toLowerCase().includes(searchTerm.toLowerCase())) {
            matches = false;
        }
        
        if (energyType && !item.type.toLowerCase().includes(energyType.toLowerCase())) {
            matches = false;
        }
        
        if (region && !item.region.toLowerCase().includes(region.toLowerCase())) {
            matches = false;
        }
        
        if (year && item.year !== year) {
            matches = false;
        }
        
        return matches;
    });
}

function updateTable(searchTerm = '', energyType = '', region = '', year = '') {
    const tableBody = document.getElementById('dataTableBody');
    if (!tableBody) return;

    const filteredData = getFilteredData(searchTerm, energyType, region, year);
    
    // Limpiar tabla
    tableBody.innerHTML = '';
    
    // Añadir filas filtradas
    filteredData.forEach(item => {
        const badgeColor = getBadgeColor(item.type);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.country}</td>
            <td>${item.region}</td>
            <td><span class="badge" style="background-color: ${badgeColor};">${item.type}</span></td>
            <td>${item.production}</td>
            <td>${item.percentage}</td>
            <td>${item.year}</td>
        `;
        tableBody.appendChild(row);
    });
    
    // Mostrar mensaje si no hay resultados
    if (filteredData.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td colspan="6" class="text-center text-muted">
                <i class="fas fa-search"></i> No se encontraron resultados para los criterios seleccionados.
            </td>
        `;
        tableBody.appendChild(row);
    }
}

function getBadgeColor(type) {
    switch(type) {
        case 'Solar': return 'var(--solar-yellow)';
        case 'Eólica': return 'var(--wind-blue)';
        case 'Hidroeléctrica': return 'var(--hydro-cyan)';
        default: return 'var(--secondary-green)';
    }
}

// ==============================================
// FUNCIONALIDAD DE GRÁFICOS
// ==============================================
function generateChart(type) {
    const chartData = prepareChartData();
    
    if (type === 'pie') {
        createPieChart(chartData);
    } else if (type === 'line') {
        createLineChart(chartData);
    }
}

function prepareChartData() {
    // Agrupar datos por tipo de energía
    const typeData = {};
    allData.forEach(item => {
        if (!typeData[item.type]) {
            typeData[item.type] = 0;
        }
        typeData[item.type] += parseFloat(item.production);
    });

    // Preparar datos para gráficos
    return {
        labels: Object.keys(typeData),
        data: Object.values(typeData),
        colors: ['var(--solar-yellow)', 'var(--wind-blue)', 'var(--hydro-cyan)']
    };
}

function createPieChart(data) {
    const container = document.querySelector('.chart-container');
    if (!container) return;

    // Limpiar contenedor
    container.innerHTML = '<canvas id="pieChart" width="400" height="400"></canvas>';
    
    const ctx = document.getElementById('pieChart').getContext('2d');
    
    // Destruir gráfico anterior si existe
    if (chartInstances.pieChart) {
        chartInstances.pieChart.destroy();
    }
    
    chartInstances.pieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: data.labels,
            datasets: [{
                data: data.data,
                backgroundColor: [
                    '#ffc107',
                    '#2196f3',
                    '#00bcd4'
                ],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: 'Distribución de Energía Renovable por Tipo'
                }
            }
        }
    });
}

function createLineChart(data) {
    const container = document.querySelectorAll('.chart-container')[1];
    if (!container) return;

    // Limpiar contenedor
    container.innerHTML = '<canvas id="lineChart" width="400" height="400"></canvas>';
    
    const ctx = document.getElementById('lineChart').getContext('2d');
    
    // Destruir gráfico anterior si existe
    if (chartInstances.lineChart) {
        chartInstances.lineChart.destroy();
    }
    
    // Preparar datos de tendencia temporal
    const yearData = prepareTimeSeriesData();
    
    chartInstances.lineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: yearData.labels,
            datasets: [{
                label: 'Producción Total (TWh)',
                data: yearData.data,
                borderColor: '#2196f3',
                backgroundColor: 'rgba(33, 150, 243, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Tendencia de Producción de Energía Renovable'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Producción (TWh)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Año'
                    }
                }
            }
        }
    });
}

function prepareTimeSeriesData() {
    // Agrupar datos por año
    const yearData = {};
    allData.forEach(item => {
        if (!yearData[item.year]) {
            yearData[item.year] = 0;
        }
        yearData[item.year] += parseFloat(item.production);
    });

    // Ordenar por año
    const sortedYears = Object.keys(yearData).sort();
    
    return {
        labels: sortedYears,
        data: sortedYears.map(year => yearData[year])
    };
}

// ==============================================
// FUNCIONALIDAD DE DATOS
// ==============================================
function loadMoreData() {
    // Simular carga de más datos
    const newData = [
        {country: 'Vietnam', region: 'Asia', type: 'Solar', production: '16.2', percentage: '1.9%', year: '2022'},
        {country: 'Bélgica', region: 'Europa', type: 'Eólica', production: '12.8', percentage: '1.0%', year: '2022'},
        {country: 'Polonia', region: 'Europa', type: 'Eólica', production: '15.4', percentage: '1.2%', year: '2022'},
        {country: 'Finlandia', region: 'Europa', type: 'Hidroeléctrica', production: '15.8', percentage: '0.4%', year: '2022'},
        {country: 'Dinamarca', region: 'Europa', type: 'Eólica', production: '19.6', percentage: '1.5%', year: '2022'}
    ];
    
    allData = [...allData, ...newData];
    updateTable();
    
    // Mostrar mensaje de éxito
    showNotification('Se han cargado 5 registros adicionales', 'success');
}

function exportData() {
    const csvContent = convertToCSV(allData);
    downloadCSV(csvContent, 'energia_renovable_datos.csv');
    showNotification('Datos exportados exitosamente', 'success');
}

function convertToCSV(data) {
    const headers = ['País', 'Región', 'Tipo de Energía', 'Producción (TWh)', 'Porcentaje', 'Año'];
    const csvRows = [headers.join(',')];
    
    data.forEach(item => {
        const row = [
            item.country,
            item.region,
            item.type,
            item.production,
            item.percentage,
            item.year
        ];
        csvRows.push(row.join(','));
    });
    
    return csvRows.join('\n');
}

function downloadCSV(content, filename) {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

// ==============================================
// EFECTOS VISUALES Y ANIMACIONES
// ==============================================
function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate__animated');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__fadeInUp');
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function setupNavbarScrollEffect() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });
}

// ==============================================
// UTILIDADES Y NOTIFICACIONES
// ==============================================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} custom-alert position-fixed`;
    notification.style.cssText = `
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        animation: slideInRight 0.3s ease;
    `;
    
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        ${message}
        <button type="button" class="btn-close" onclick="this.parentElement.remove()"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// ==============================================
// GESTIÓN DE ERRORES
// ==============================================
window.addEventListener('error', function(e) {
    console.error('Error en la aplicación:', e.error);
    showNotification('Ha ocurrido un error. Por favor, recarga la página.', 'danger');
});

// ==============================================
// FUNCIONES ADICIONALES DE INTERACTIVIDAD
// ==============================================
function animateCounters() {
    const counters = document.querySelectorAll('.lead');
    counters.forEach(counter => {
        const target = parseFloat(counter.textContent);
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current) + ' TWh';
        }, 20);
    });
}

function updateEnergyCards() {
    const cards = document.querySelectorAll('.energy-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ==============================================
// INICIALIZACIÓN FINAL
// ==============================================
// Ejecutar funciones adicionales cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        animateCounters();
        updateEnergyCards();
    }, 1000);
});

// Exportar funciones para uso global
window.generateChart = generateChart;
window.loadMoreData = loadMoreData;
window.exportData = exportData;