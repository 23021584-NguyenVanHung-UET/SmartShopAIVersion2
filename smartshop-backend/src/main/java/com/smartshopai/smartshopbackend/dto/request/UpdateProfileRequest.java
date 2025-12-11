package com.smartshopai.smartshopbackend.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateProfileRequest {

    @NotBlank(message = "Tên không được để trống")
    @Size(max = 255)
    private String name;

    @NotBlank(message = "Email không được để trống")
    @Email
    private String email;

    @NotBlank(message = "Số điện thoại không được để trống")
    @Size(max = 50)
    @Pattern(regexp = "^[0-9+\\-\\s]{6,20}$", message = "Số điện thoại không hợp lệ")
    private String phone;

    @NotBlank(message = "Địa chỉ không được để trống")
    @Size(max = 255)
    private String address;

    @Size(max = 255)
    private String ward;

    @Size(max = 255)
    private String district;

    @Size(max = 255)
    private String city;

    @Size(max = 50)
    private String postalCode;
}
