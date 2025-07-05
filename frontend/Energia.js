</head>
<body>
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg fixed-top">
        <div class="container">
            <a class="navbar-brand" href="#"><i class="fas fa-leaf"></i>Energia renovable</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="#inicio">Inicio</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#datos">Datos</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#graficos">Gráficos</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#buscar">Buscar</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#perfil"><i class="fas fa-user"></i> Perfil</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section id="inicio" class="hero-section">
        <div class="container">
            <div class="hero-content animate__animated animate__fadeInUp">
                <h1><i class="fas fa-bolt"></i> Energia renovable</h1>
                <p>Visualiza y gestiona datos globales de energía renovable para un futuro sostenible</p>
                <a href="#buscar" class="btn btn-success btn-lg">
                    <i class="fas fa-search"></i> Explorar Datos
                </a>
            </div>
        </div>
    </section>

    <!-- Search Section -->
    <section id="buscar" class="container">
        <div class="search-container animate__animated animate__fadeInUp">
            <h3 class="text-center mb-4" style="color: var(--primary-green);">
                <i class="fas fa-search"></i> Búsqueda Avanzada de Datos Energéticos
            </h3>
            <form class="search-form" id="searchForm">
                <input type="text" class="search-input" id="searchInput" placeholder="Buscar por país, región o tipo de energía...">
                
                <div class="search-filters">
                    <select class="filter-select" id="energyType">
                        <option value="">Tipo de Energía</option>
                        <option value="solar">Solar</option>
                        <option value="wind">Eólica</option>
                        <option value="hydro">Hidroeléctrica</option>
                        <option value="geothermal">Geotérmica</option>
                        <option value="biomass">Biomasa</option>
                    </select>
                    
                    <select class="filter-select" id="region">
                        <option value="">Región</option>
                        <option value="america">América</option>
                        <option value="europe">Europa</option>
                        <option value="asia">Asia</option>
                        <option value="africa">África</option>
                        <option value="oceania">Oceanía</option>
                    </select>
                    
                    <select class="filter-select" id="year">
                        <option value="">Año</option>
                        <option value="2022">2022</option>
                        <option value="2021">2021</option>
                        <option value="2020">2020</option>
                        <option value="2019">2019</option>
                        <option value="2018">2018</option>
                    </select>
                </div>
                
                <button type="submit" class="search-btn">
                    <i class="fas fa-search"></i> Buscar
                </button>
            </form>
        </div>

        <!-- Loading Animation -->
        <div class="loading" id="loadingSpinner">
            <div class="spinner"></div>
            <p>Buscando datos...</p>
        </div>

        <!-- Search Results Alert -->
        <div id="searchAlert" style="display: none;"></div>
    </section>

    <!-- Energy Cards Section -->
    <section id="datos" class="container">
        <div class="energy-cards animate__animated animate__fadeInUp">
            <h2 class="text-center mb-4" style="color: var(--primary-green);">
                <i class="fas fa-chart-line"></i> Datos de Energía Renovable Global
            </h2>
            
            <div class="row" id="energyCardsContainer">
                <div class="col-md-4">
                    <div class="energy-card solar">
                        <div class="card-icon solar">
                            <i class="fas fa-sun"></i>
                        </div>
                        <h4>Energía Solar</h4>
                        <p class="lead">850 TWh</p>
                        <p>Producción global anual</p>
                        <div class="progress mb-2">
                            <div class="progress-bar" style="width: 85%; background-color: var(--solar-yellow);"></div>
                        </div>
                        <small class="text-muted">+15% respecto al año anterior</small>
                    </div>
                </div>
                
                <div class="col-md-4">
                    <div class="energy-card wind">
                        <div class="card-icon wind">
                            <i class="fas fa-wind"></i>
                        </div>
                        <h4>Energía Eólica</h4>
                        <p class="lead">1,270 TWh</p>
                        <p>Producción global anual</p>
                        <div class="progress mb-2">
                            <div class="progress-bar" style="width: 90%; background-color: var(--wind-blue);"></div>
                        </div>
                        <small class="text-muted">+12% respecto al año anterior</small>
                    </div>
                </div>
                
                <div class="col-md-4">
                    <div class="energy-card hydro">
                        <div class="card-icon hydro">
                            <i class="fas fa-water"></i>
                        </div>
                        <h4>Hidroeléctrica</h4>
                        <p class="lead">4,370 TWh</p>
                        <p>Producción global anual</p>
                        <div class="progress mb-2">
                            <div class="progress-bar" style="width: 95%; background-color: var(--hydro-cyan);"></div>
                        </div>
                        <small class="text-muted">+3% respecto al año anterior</small>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Charts Section -->
    <section id="graficos" class="container">
        <div class="energy-cards animate__animated animate__fadeInUp">
            <h2 class="text-center mb-4" style="color: var(--primary-green);">
                <i class="fas fa-chart-bar"></i> Visualización de Datos
            </h2>
            
            <div class="row">
                <div class="col-md-6">
                    <div class="chart-container">
                        <div class="text-center">
                            <i class="fas fa-chart-pie" style="font-size: 4rem; color: var(--secondary-green); margin-bottom: 20px;"></i>
                            <h5>Distribución por Tipo de Energía</h5>
                            <p class="text-muted">Gráfico circular interactivo</p>
                            <button class="btn btn-outline-success" onclick="generateChart('pie')">
                                <i class="fas fa-play"></i> Generar Gráfico
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="col-md-6">
                    <div class="chart-container">
                        <div class="text-center">
                            <i class="fas fa-chart-line" style="font-size: 4rem; color: var(--wind-blue); margin-bottom: 20px;"></i>
                            <h5>Tendencia Temporal</h5>
                            <p class="text-muted">Evolución por años</p>
                            <button class="btn btn-outline-primary" onclick="generateChart('line')">
                                <i class="fas fa-play"></i> Generar Gráfico
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Data Table Section -->
    <section class="container">
        <div class="energy-cards animate__animated animate__fadeInUp">
            <h2 class="text-center mb-4" style="color: var(--primary-green);">
                <i class="fas fa-table"></i> Tabla de Datos Detallada
            </h2>
            
            <div class="data-table">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th><i class="fas fa-flag"></i> País</th>
                            <th><i class="fas fa-globe"></i> Región</th>
                            <th><i class="fas fa-bolt"></i> Tipo Energía</th>
                            <th><i class="fas fa-chart-line"></i> Producción (TWh)</th>
                            <th><i class="fas fa-percentage"></i> % del Total</th>
                            <th><i class="fas fa-calendar"></i> Año</th>
                        </tr>
                    </thead>
                    <tbody id="dataTableBody">
                        <tr>
                            <td>China</td>
                            <td>Asia</td>
                            <td><span class="badge" style="background-color: var(--solar-yellow);">Solar</span></td>
                            <td>261.1</td>
                            <td>30.7%</td>
                            <td>2022</td>
                        </tr>
                        <tr>
                            <td>Estados Unidos</td>
                            <td>América</td>
                            <td><span class="badge" style="background-color: var(--wind-blue);">Eólica</span></td>
                            <td>380.1</td>
                            <td>29.9%</td>
                            <td>2022</td>
                        </tr>
                        <tr>
                            <td>Brasil</td>
                            <td>América</td>
                            <td><span class="badge" style="background-color: var(--hydro-cyan);">Hidroeléctrica</span></td>
                            <td>362.8</td>
                            <td>8.3%</td>
                            <td>2022</td>
                        </tr>
                        <tr>
                            <td>India</td>
                            <td>Asia</td>
                            <td><span class="badge" style="background-color: var(--solar-yellow);">Solar</span></td>
                            <td>75.0</td>
                            <td>8.8%</td>
                            <td>2022</td>
                        </tr>
                        <tr>
                            <td>Alemania</td>
                            <td>Europa</td>
                            <td><span class="badge" style="background-color: var(--wind-blue);">Eólica</span></td>
                            <td>132.7</td>
                            <td>10.4%</td>
                            <td>2022</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div class="text-center mt-3">
                <button class="btn btn-success" onclick="loadMoreData()">
                    <i class="fas fa-plus"></i> Cargar Más Datos
                </button>
                <button class="btn btn-outline-success ms-2" onclick="exportData()">
                    <i class="fas fa-download"></i> Exportar CSV
                </button>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="row">
                <div class="col-md-4">
                    <h5><i class="fas fa-leaf"></i> EnergyVision</h5>
                    <p>Promoviendo la transición hacia un futuro energético sostenible y justo a través de datos y tecnología.</p>
                </div>
                <div class="col-md-4">
                    <h5>Enlaces Rápidos</h5>
                    <ul class="list-unstyled">
                        <li><a href="#inicio">Inicio</a></li>
                        <li><a href="#datos">Datos</a></li>
                        <li><a href="#graficos">Gráficos</a></li>
                        <li><a href="#buscar">Buscar</a></li>
                    </ul>
                </div>
                <div class="col-md-4">
                    <h5>Contacto</h5>
                    <p><i class="fas fa-envelope"></i> info@energyvision.com</p>
                    <p><i class="fas fa-phone"></i> +57 (1) 234-5678</p>
                    <div class="mt-3">
                        <a href="#" class="me-3"><i class="fab fa-facebook fa-2x"></i></a>
                        <a href="#" class="me-3"><i class="fab fa-twitter fa-2x"></i></a>
                        <a href="#" class="me-3"><i class="fab fa-linkedin fa-2x"></i></a>
                    </div>
                </div>
            </div>
            <hr class="mt-4">
            <div class="text-center">
                <p>&copy; 2024 EnergyVision - Proyecto Final de Programación. Todos los derechos reservados.</p>
            </div>
        </div>
    </footer>

    <!-- Bootstrap JS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/js/bootstrap.bundle.min.js"></script>
    
    <!-- Chart.js for charts -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js"></script>

    <!-- Custom JavaScript -->
    <script>
        // Search functionality
        document.getElementById('searchForm').addEventListener('submit', function(e) {
            e.preventDefault();
            performSearch();
        });

        // Real-time search as user types
        document.getElementById('searchInput').addEventListener('input', function() {
            if (this.value.length > 2) {
                performSearch();
            }
        });

        function performSearch() {
            const searchTerm = document.getElementById('searchInput').value;
            const energyType = document.getElementById('energyType').value;
            const region = document.getElementById('region').value;
            const year = document.getElementById('year').value;

            // Show loading spinner
            document.getElementById('loadingSpinner').style.display = 'block';
            
            // Hide previous results
            document.getElementById('searchAlert').style.display = 'none';

            // Simulate API call delay
            setTimeout(() => {
                // Hide loading spinner
                document.getElementById('loadingSpinner').style.display = 'none';
                
                // Show search results
                showSearchResults(searchTerm, energyType, region, year);
                
                // Update table with filtered data
                updateTable(searchTerm, energyType, region, year);
            }, 1500);
        }

        function showSearchResults(searchTerm, energyType, region, year) {
            const alertDiv = document.getElementById('searchAlert');
            let message = `Búsqueda realizada`;
            
            if (searchTerm) message += ` para "${searchTerm}"`;
            if (energyType) message += `, tipo: ${energyType}`;
            if (region) message += `, región: ${region}`;
            if (year) message += `, año: ${year}`;
            
            alertDiv.innerHTML = `
                <div class="alert alert-success custom-alert">
                    <i class="fas fa-check-circle"></i> ${message}. 
                    Se encontraron <strong>${Math.floor(Math.random() * 50) + 10}</strong> resultados.
                </div>
            `;
            alertDiv.style.display = 'block';
        }

        function updateTable(searchTerm, energyType, region, year) {
            const tableBody = document.getElementById('dataTableBody');
            
            // Sample data that could be filtered
            const sampleData = [
                {country: 'China', region: 'Asia', type: 'Solar', production: '261.1', percentage: '30.7%', year: '2022'},
                {country: 'Estados Unidos', region: 'América', type: 'Eólica', production: '380.1', percentage: '29.9%', year: '2022'},
                {country: 'Brasil', region: 'América', type: 'Hidroeléctrica', production: '362.8', percentage: '8.3%', year: '2022'},
                {country: 'India', region: 'Asia', type: 'Solar', production: '75.0', percentage: '8.8%', year: '2022'},
                {country: 'Alemania', region: 'Europa', type: 'Eólica', production: '132.7', percentage: '10.4%', year: '2022'},
                {country: 'Japón', region: 'Asia', type: 'Solar', production: '98.2', percentage: '11.5%', year: '2021'},
                {country: 'Canadá', region: 'América', type: 'Hidroeléctrica', production: '385.0', percentage: '8.8%', year: '2021'},
                {country: 'Noruega', region: 'Europa', type: 'Hidroeléctrica', production: '154.3', percentage: '3.5%', year: '2021'}
            ];

            // Filter data based on search criteria
            let filteredData = sampleData.filter(item => {
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

            // Update table
            tableBody.innerHTML = '';
            filteredData.forEach(item => {
                const badgeColor = item.type === 'Solar' ? 'var(--solar-yellow)' : 
                                 item.type === 'Eólica' ? 'var(--wind-blue)' : 'var(--hydro-cyan)';