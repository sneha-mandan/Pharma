package com.excelR.OnlinePharmacyApplication.service;

import com.excelR.OnlinePharmacyApplication.config.JwtUtil;
import com.excelR.OnlinePharmacyApplication.dto.LoginRequest;
import com.excelR.OnlinePharmacyApplication.dto.UserUpdateRequest;
import com.excelR.OnlinePharmacyApplication.entity.User;
import com.excelR.OnlinePharmacyApplication.exception.CustomExceptions.UserNotApprovedException;
import com.excelR.OnlinePharmacyApplication.repository.UserRepository;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.User.UserBuilder;

@Service
public class UserAccessService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    // Constructor injection
    public UserAccessService(UserRepository userRepository,
                             PasswordEncoder passwordEncoder,
                             JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public String login(LoginRequest loginRequest) {
        User user = userRepository.findByUsername(loginRequest.getUsername());
        if (user == null || !passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        if (!user.isApproved()) {
            throw new UserNotApprovedException("User " + user.getUsername() + " is not approved yet");
        }

        return jwtUtil.generateToken(user.getUsername());
    }

    public User updateUserDetails(Long id, UserUpdateRequest updateRequest) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setEmail(updateRequest.getEmail());
        user.setMobile(updateRequest.getMobile());

        // Fixed isBlank() issue by using toString()
        if (updateRequest.getPassword() != null && !updateRequest.getPassword().toString().isBlank()) {
            user.setPassword(passwordEncoder.encode(updateRequest.getPassword().toString()));
        }

        return userRepository.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }

        UserBuilder builder = org.springframework.security.core.userdetails.User.withUsername(user.getUsername());
        builder.password(user.getPassword());
        builder.roles(user.getRole());

        return builder.build();
    }
}
