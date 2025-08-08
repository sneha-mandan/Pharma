package com.excelR.OnlinePharmacyApplication.controller;

import com.excelR.OnlinePharmacyApplication.entity.User;
import com.excelR.OnlinePharmacyApplication.entity.Drug;
import com.excelR.OnlinePharmacyApplication.service.UserService;
import com.excelR.OnlinePharmacyApplication.service.DrugService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    @Autowired
    private UserService userService;

    @Autowired
    private DrugService drugService;

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PutMapping("/users/approve/{id}")
    public User approveUser(@PathVariable Long id) {
        return userService.approveUser(id);
    }

    @PutMapping("/users/disable/{id}")
    public void disableUser(@PathVariable Long id) {
        userService.disableUser(id);
    }

    @PutMapping("/users/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        return userService.updateUser(id, updatedUser);
    }

    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }

    @PostMapping("/drugs")
    public Drug addDrug(@RequestBody Drug drug) {
        return drugService.addDrug(drug);
    }

    @PutMapping("/drugs/{id}")
    public Drug updateDrug(@PathVariable Long id, @RequestBody Drug drug) {
        return drugService.updateDrug(id, drug);
    }

    @DeleteMapping("/drugs/{id}")
    public void deleteDrug(@PathVariable Long id) {
        drugService.deleteDrug(id);
    }
}
