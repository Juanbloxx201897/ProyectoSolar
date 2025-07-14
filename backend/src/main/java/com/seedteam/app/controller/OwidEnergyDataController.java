package com.seedteam.app.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.seedteam.app.Service.OwidEnergyDataService;

@RestController
@RequestMapping("/energia")
@CrossOrigin(originPatterns = "*")
public class OwidEnergyDataController {

    @Autowired
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
}
