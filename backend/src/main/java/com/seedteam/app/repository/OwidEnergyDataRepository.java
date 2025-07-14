package com.seedteam.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seedteam.app.model.OwidEnergyData;

public interface OwidEnergyDataRepository extends JpaRepository<OwidEnergyData, Long> {
}
