package com.seedteam.app.model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "eia_data")

public class EiAData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String seriesId;
    private String name;
    private String period;      // e.g. "202401"
    private Double value;   
        // e.g. 7034.2
    public void setSeriesId(String seriesId) {
            this.seriesId = seriesId;
        }
        
    public void setName(String name) {
            this.name = name;
        }
        
    public void setPeriod(String period) {
            this.period = period;
        }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getSeriesId() {
        return seriesId;
    }
    public String getName() {
        return name;
    }
    public String getPeriod() {
        return period;
    }
    public Double getValue() {
        return value;
    }
    public void setValue(Double value) {
        this.value = value;
    }
    
}
