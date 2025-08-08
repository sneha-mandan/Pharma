package com.pharmacy.repository;

import com.pharmacy.model.Drug;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DrugRepository extends MongoRepository<Drug, String> {
    // You can add custom query methods here if needed
}
