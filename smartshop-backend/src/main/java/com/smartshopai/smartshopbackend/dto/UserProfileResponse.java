package com.smartshopai.smartshopbackend.dto;

import com.smartshopai.smartshopbackend.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserProfileResponse {
    private final String name;
    private final String email;
    private final Role role;
    private final String phone;
    private final String address;
    private final String city;
    private final String district;
    private final String ward;
}
