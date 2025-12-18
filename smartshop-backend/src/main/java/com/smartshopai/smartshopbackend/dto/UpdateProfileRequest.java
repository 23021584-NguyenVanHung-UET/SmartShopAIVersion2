package com.smartshopai.smartshopbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateProfileRequest {
    private String name;
    private String phone;
    private String address;
    private String city;
    private String district;
    private String ward;
    private String bio;
}
