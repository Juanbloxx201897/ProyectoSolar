package com.seedteam.app.controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.seedteam.app.APIS.EiaServicio;

@RestController
@RequestMapping("/api/eia")
public class EiaController {

    private final EiaServicio servicio;

    public EiaController(EiaServicio servicio) {
        this.servicio = servicio;
    }

    @GetMapping("/sync")
    public String sincronizar(@RequestParam(defaultValue="TOTAL.TETCBUS.M") String seriesId) {
        servicio.syncSeries(seriesId);
        return "Sincronización completada para " + seriesId;
    }
}
