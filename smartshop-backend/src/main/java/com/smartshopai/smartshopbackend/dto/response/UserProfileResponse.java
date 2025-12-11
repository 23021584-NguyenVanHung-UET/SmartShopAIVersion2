package com.smartshopai.smartshopbackend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserProfileResponse {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String address;
    private String ward;
    private String district;
    private String city;
    private String postalCode;
}
