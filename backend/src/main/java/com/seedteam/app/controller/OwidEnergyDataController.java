package com.seedteam.app.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.seedteam.app.Service.OwidEnergyDataService;  // Asegúrate de que esta importación esté bien
import com.seedteam.app.model.OwidEnergyData;

@RestController
@RequestMapping("/energia")
@CrossOrigin(originPatterns = "*")
public class OwidEnergyDataController {

    @Autowired  // Asegúrate de que el servicio se inyecte correctamente
    private OwidEnergyDataService service;

    //  Importar desde CSV
    @GetMapping("/importar")
    public String importarDatos() {
        service.importarDesdeCsv();
        return "Importación completada";
    }

    // 📊= Obtener estadísticas
    @GetMapping("/estadisticas")
    public Map<String, Object> obtenerEstadisticas() {
        return service.calcularEstadisticas();
    }

    @GetMapping("/listado")
    public List<OwidEnergyData> listarDatos() {
        return service.obtenerTodosLosDatos();
    }

}
