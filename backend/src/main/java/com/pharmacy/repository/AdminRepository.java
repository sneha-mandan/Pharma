package com.pharmacy.repository;

import com.pharmacy.model.Admin;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AdminRepository extends MongoRepository<Admin, String> {
    Admin findByAdminId(String adminId); // <- Use adminId instead of email
}
