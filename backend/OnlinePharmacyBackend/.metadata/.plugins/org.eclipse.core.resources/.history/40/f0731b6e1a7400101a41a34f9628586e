package com.excelR.OnlinePharmacyApplication.config;

import com.excelR.OnlinePharmacyApplication.service.UserAccessService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    // JwtAuthenticateFilter bean
    @Bean
    public JwtAuthenticateFilter jwtAuthenticateFilter(JwtUtil jwtUtil, UserAccessService userAccessService) {
        return new JwtAuthenticateFilter(jwtUtil, userAccessService);
    }

    // AuthenticationManager depends on UserAccessService only via method parameter
    @Bean
    public AuthenticationManager authManager(HttpSecurity http,
                                             PasswordEncoder passwordEncoder,
                                             UserAccessService userAccessService) throws Exception {
        return http.getSharedObject(AuthenticationManagerBuilder.class)
                .userDetailsService(userAccessService)
                .passwordEncoder(passwordEncoder)
                .and()
                .build();
    }

    // Password encoder bean
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Security filter chain
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http,
                                           JwtAuthenticateFilter jwtAuthenticateFilter) throws Exception {
        http.csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/users/login", "/api/auth/**").permitAll()
                .requestMatchers("/api/drugs", "/api/drugs/search", "/api/drugs/**").hasAnyRole("USER", "ADMIN")
                .requestMatchers("/api/addresses/**").hasAnyRole("USER", "ADMIN")
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated())
            .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        http.addFilterBefore(jwtAuthenticateFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}
