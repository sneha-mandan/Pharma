package com.excelR.OnlinePharmacyApplication.controller;

import com.excelR.OnlinePharmacyApplication.dto.LoginRequest;
import com.excelR.OnlinePharmacyApplication.dto.UserUpdateRequest;
import com.excelR.OnlinePharmacyApplication.dto.DrugDto;
import com.excelR.OnlinePharmacyApplication.entity.Drug;
import com.excelR.OnlinePharmacyApplication.entity.User;
import com.excelR.OnlinePharmacyApplication.service.DrugService;
import com.excelR.OnlinePharmacyApplication.service.UserService;
import com.excelR.OnlinePharmacyApplication.service.UserAccessService;

import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final DrugService drugService;
    private final UserAccessService userAccessService;

    public UserController(UserService userService,
                          DrugService drugService,
                          UserAccessService userAccessService) {
        this.userService = userService;
        this.drugService = drugService;
        this.userAccessService = userAccessService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            String token = userAccessService.login(loginRequest);
            return ResponseEntity.ok(Map.of("token", token));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid username or password");
        }
    }

    @PutMapping("/update")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public User updateProfile(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @GetMapping("/profile")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<?> getUserProfile(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized or missing token");
        }
        String username = userDetails.getUsername();
        User user = userService.getUserByUsername(username);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<String> updateMemberDetails(@AuthenticationPrincipal UserDetails currentUser,
                                                      @PathVariable Long id,
                                                      @RequestBody UserUpdateRequest request) {
        try {
            User updatedUser = userAccessService.updateUserDetails(id, request);
            return ResponseEntity.ok("User " + updatedUser.getUsername() + " updated successfully");
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Update failed: " + ex.getMessage());
        }
    }

    @GetMapping("/drugs")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<List<Drug>> getAllDrugs() {
        List<Drug> drugs = drugService.getAllDrugs();
        if (drugs.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(drugs);
        }
        return ResponseEntity.ok(drugs);
    }

    @GetMapping("/drugs/search")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<List<Drug>> searchDrugs(@RequestParam(required = false) String name,
                                                  @RequestParam(defaultValue = "0") int page,
                                                  @RequestParam(defaultValue = "10") int size) {
        if (name == null || name.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(null);
        }
        List<Drug> results = drugService.searchDrugsByName(name.trim(), page, size);
        if (results.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(results);
    }

    @GetMapping("/drugs/{id}")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<DrugDto> getDrugById(@PathVariable Long id) {
        Drug drug = drugService.getDrugById(id);
        DrugDto dto = new DrugDto(drug.getId(), drug.getName(), drug.getDescription(), drug.getQuantity(), drug.getPrice());
        return ResponseEntity.ok(dto);
    }
}
