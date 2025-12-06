package com.smartshopai.smartshopbackend.controller;

import com.smartshopai.smartshopbackend.dto.LoginRequest;
import com.smartshopai.smartshopbackend.dto.RegisterRequest;
import com.smartshopai.smartshopbackend.service.AuthService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        String result = authService.register(request);
        return ResponseEntity.ok(Map.of("message", result));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            return ResponseEntity.ok(authService.login(request));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@RequestHeader("Authorization") String authHeader) {
        try {
            // Lấy token từ header
            String token = authHeader.replace("Bearer ", "");

            return ResponseEntity.ok(authService.getCurrentUser(token));

        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("error", e.getMessage()));
        }
    }
}
