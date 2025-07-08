package com.seedteam.app.Service;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.seedteam.app.model.EiAData;
import com.seedteam.app.repository.EiaDataRepository;

@Service
public class EiaDataService {

    @Autowired
    private EiaDataRepository repository;

    public void consumirYGuardarDatos() {
        String apiKey = "lPKo13Obyz7cLwdUXvuuhuwjNL4yO2veGp4r2yu8";
        String seriesId = "PET.RWTC.D";
        String url = "https://api.eia.gov/v2/seriesid/" + seriesId + "?api_key=" + apiKey;

        RestTemplate restTemplate = new RestTemplate();
        String response = restTemplate.getForObject(url, String.class);

        JSONObject json = new JSONObject(response);

        JSONArray data = json
                .getJSONObject("response")
                .getJSONArray("data");

        for (int i = 0; i < data.length(); i++) {
            JSONObject row = data.getJSONObject(i);
            String period = row.getString("period");
            double value = row.getDouble("value");

            EiAData dato = new EiAData();
            dato.setName("Petróleo WTI");
            dato.setPeriod(period);
            dato.setValue(value);
            dato.setSeriesId(seriesId);

            repository.save(dato);
        }

        System.out.println("✅ Datos de la API EIA v2 guardados en la base de datos correctamente.");
    }
}
