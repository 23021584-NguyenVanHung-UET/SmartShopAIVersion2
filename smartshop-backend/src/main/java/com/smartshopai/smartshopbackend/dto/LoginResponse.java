package com.smartshopai.smartshopbackend.dto;

import com.smartshopai.smartshopbackend.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponse {
    private String message;
    private String token;
    private String name;
    private String email;
    private Role role;
}
