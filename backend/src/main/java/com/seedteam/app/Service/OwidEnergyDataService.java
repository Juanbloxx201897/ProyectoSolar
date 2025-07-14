package com.seedteam.app.Service;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.seedteam.app.model.OwidEnergyData;
import com.seedteam.app.repository.OwidEnergyDataRepository;

@Service
public class OwidEnergyDataService {

    @Autowired
    private OwidEnergyDataRepository repo;

    // 👇 IMPORTACIÓN DESDE CSV
    public void importarDesdeCsv() {
        try {
            InputStream inputStream = getClass().getClassLoader().getResourceAsStream("owid-energy-data.csv");

            if (inputStream == null) {
                System.err.println("❌ Archivo CSV no encontrado");
                return;
            }

            BufferedReader br = new BufferedReader(new InputStreamReader(inputStream, StandardCharsets.UTF_8));

            String linea;
            String[] encabezados = br.readLine().split(",");

            int idxCountry = findIndex(encabezados, "country");
            int idxYear = findIndex(encabezados, "year");
            int idxPop = findIndex(encabezados, "population");
            int idxGdp = findIndex(encabezados, "gdp");
            int idxPrimary = findIndex(encabezados, "primary_energy_consumption");

            int total = 0;
            while ((linea = br.readLine()) != null) {
                String[] datos = linea.split(",(?=([^\"]*\"[^\"]*\")*[^\"]*$)", -1); // respeta comas dentro de comillas

                if (datos.length <= Math.max(idxPrimary, Math.max(idxGdp, idxPop))) continue;

                String country = datos[idxCountry];
                Integer year = parseIntSafe(datos[idxYear]);
                Double population = parseDoubleSafe(datos[idxPop]);
                Double gdp = parseDoubleSafe(datos[idxGdp]);
                Double primary = parseDoubleSafe(datos[idxPrimary]);

                OwidEnergyData data = new OwidEnergyData(null, country, year, population, gdp, primary);
                repo.save(data);
                total++;
            }

            System.out.println("✅ Registros guardados: " + total);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    //  ESTADÍSTICAS
    public Map<String, Object> calcularEstadisticas() {
        List<OwidEnergyData> datos = repo.findAll();

        Double promedioGDP = datos.stream()
                .filter(d -> d.getGdp() != null)
                .mapToDouble(OwidEnergyData::getGdp)
                .average()
                .orElse(0);

        Double promedioEnergia = datos.stream()
                .filter(d -> d.getPrimaryEnergyConsumption() != null)
                .mapToDouble(OwidEnergyData::getPrimaryEnergyConsumption)
                .average()
                .orElse(0);

        Map<String, Object> estadisticas = new HashMap<>();
        estadisticas.put("promedio_gdp", promedioGDP);
        estadisticas.put("promedio_energia", promedioEnergia);
        estadisticas.put("total_registros", datos.size());

        return estadisticas;
    }

    // MÉTODOS AUXILIARES
    private int findIndex(String[] headers, String name) {
        for (int i = 0; i < headers.length; i++) {
            if (headers[i].trim().equalsIgnoreCase(name)) return i;
        }
        return -1;
    }

    private Double parseDoubleSafe(String valor) {
        try {
            return valor != null && !valor.isEmpty() ? Double.parseDouble(valor) : null;
        } catch (NumberFormatException e) {
            return null;
        }
    }

    private Integer parseIntSafe(String valor) {
        try {
            return valor != null && !valor.isEmpty() ? Integer.parseInt(valor) : null;
        } catch (NumberFormatException e) {
            return null;
        }
    }
}
