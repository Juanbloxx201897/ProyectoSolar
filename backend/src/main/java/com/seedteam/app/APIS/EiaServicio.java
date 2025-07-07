package com.seedteam.app.APIS;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.seedteam.app.model.EiAData;
import com.seedteam.app.repository.EiaDataRepository;


@Service
public class EiaServicio {

    @Value("${eia.api.key}")
    private String apiKey;

    private final RestTemplate rest = new RestTemplate();
    private final EiaDataRepository repo;

    public EiaServicio(EiaDataRepository repo) {
        this.repo = repo;
    }

    public void syncSeries(String seriesId) {
        String url = String.format(
          "https://api.eia.gov/series/?api_key=%s&series_id=%s",
          apiKey, seriesId
        );
        EiaResponse resp = rest.getForObject(url, EiaResponse.class);
        if (resp != null && resp.getSeries() != null) {
            for (EiaResponse.Series s : resp.getSeries()) {
                for (List<Object> entry : s.getData()) {
                    EiAData row = new EiAData();
                    row.setSeriesId(s.getSeries_id());
                    row.setName(s.getName());
                    row.setPeriod(entry.get(0).toString());
                    row.setValue(Double.valueOf(entry.get(1).toString()));
                    repo.save(row);
                }
            }
        }
    }
}
