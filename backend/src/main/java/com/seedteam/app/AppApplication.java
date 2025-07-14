package com.seedteam.app;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.seedteam.app.Service.EiaDataService;
import com.seedteam.app.Service.OwidEnergyDataService;

@SpringBootApplication
public class AppApplication implements CommandLineRunner {

    @Autowired
    private EiaDataService eiaDataService;

    @Autowired
    private OwidEnergyDataService owidEnergyDataService;

    public static void main(String[] args) {
        SpringApplication.run(AppApplication.class, args);
        System.out.println("✅ Aplicación iniciada correctamente.");
    }

    @Override
    public void run(String... args) throws Exception {
        eiaDataService.consumirYGuardarDatos();
        owidEnergyDataService.importarDesdeCsv();
    }
}
