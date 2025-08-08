package com.pharmacy.service;

import com.pharmacy.model.Drug;
import com.pharmacy.repository.DrugRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DrugService {

    @Autowired
    private DrugRepository drugRepository;

    public Drug createDrug(Drug drug) {
        return drugRepository.save(drug);
    }

    public List<Drug> getAllDrugs() {
        return drugRepository.findAll();
    }

    public Drug getDrugById(String id) {
        return drugRepository.findById(id).orElse(null);
    }

    public void deleteDrug(String id) {
        drugRepository.deleteById(id);
    }

    public Drug updateDrug(String id, Drug updatedDrug) {
        Drug existingDrug = drugRepository.findById(id).orElse(null);
        if (existingDrug != null) {
            existingDrug.setName(updatedDrug.getName());
            existingDrug.setDetails(updatedDrug.getDetails());
            existingDrug.setPrice(updatedDrug.getPrice());
            return drugRepository.save(existingDrug);
        }
        return null;
    }
}
