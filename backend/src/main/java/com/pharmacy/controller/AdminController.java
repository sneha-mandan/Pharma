package com.pharmacy.controller;

import com.pharmacy.model.Admin;
import com.pharmacy.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private AdminRepository adminRepo;

    @PostMapping("/login")
    public String login(@RequestBody Admin loginData) {
        Admin admin = adminRepo.findByAdminId(loginData.getAdminId()); // <- Change here
        if (admin != null && admin.getPassword().equals(loginData.getPassword())) {
            return "Login successful";
        } else {
            return "Invalid login";
        }
    }
}
