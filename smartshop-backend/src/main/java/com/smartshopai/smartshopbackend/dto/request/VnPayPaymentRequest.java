package com.smartshopai.smartshopbackend.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VnPayPaymentRequest {

    @NotNull
    private Long orderId;

    @Size(max = 20)
    private String bankCode;
}
