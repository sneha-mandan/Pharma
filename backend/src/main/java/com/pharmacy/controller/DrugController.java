package com.pharmacy.controller;

import com.pharmacy.model.Drug;
import com.pharmacy.service.DrugService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/drugs")
@CrossOrigin(origins = "*") // allows connection from frontend
public class DrugController {

    @Autowired
    private DrugService drugService;

    @PostMapping
    public Drug createDrug(@RequestBody Drug drug) {
        return drugService.createDrug(drug);
    }

    @GetMapping
    public List<Drug> getAllDrugs() {
        return drugService.getAllDrugs();
    }

    @GetMapping("/{id}")
    public Drug getDrugById(@PathVariable String id) {
        return drugService.getDrugById(id);
    }

    @PutMapping("/{id}")
    public Drug updateDrug(@PathVariable String id, @RequestBody Drug drug) {
        return drugService.updateDrug(id, drug);
    }

    @DeleteMapping("/{id}")
    public void deleteDrug(@PathVariable String id) {
        drugService.deleteDrug(id);
    }
}
