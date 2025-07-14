package com.seedteam.app.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "energia_limpia")
public class OwidEnergyData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String country;
    private Integer year;
    private Double population;
    private Double gdp;

    @Column(name = "primary_energy_consumption")
    private Double primaryEnergyConsumption;

    // Constructor vacío (requerido por JPA)
    public OwidEnergyData() {
    }

    // Constructor con todos los campos (excepto ID que es autogenerado)
    public OwidEnergyData(Long id, String country, Integer year, Double population, Double gdp, Double primaryEnergyConsumption) {
        this.id = id;
        this.country = country;
        this.year = year;
        this.population = population;
        this.gdp = gdp;
        this.primaryEnergyConsumption = primaryEnergyConsumption;
    }

    // Getters y Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Double getPopulation() {
        return population;
    }

    public void setPopulation(Double population) {
        this.population = population;
    }

    public Double getGdp() {
        return gdp;
    }

    public void setGdp(Double gdp) {
        this.gdp = gdp;
    }

    public Double getPrimaryEnergyConsumption() {
        return primaryEnergyConsumption;
    }

    public void setPrimaryEnergyConsumption(Double primaryEnergyConsumption) {
        this.primaryEnergyConsumption = primaryEnergyConsumption;
    }
}
