package com.seedteam.app;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

import com.seedteam.app.Service.EiaDataService;

@SpringBootApplication
public class AppApplication {

	public static void main(String[] args) {
	ConfigurableApplicationContext context = SpringApplication.run(AppApplication.class, args);
	System.out.println("✅ Aplicación iniciada correctamente.");

	EiaDataService eiaDataService = context.getBean(EiaDataService.class);
	eiaDataService.consumirYGuardarDatos();

    }

	public class CargarDatosIniciales implements CommandLineRunner {

		@Autowired
		private EiaDataService servicio;

		@Override
		public void run(String... args) throws Exception {
			servicio.consumirYGuardarDatos();
		}
	}
}
