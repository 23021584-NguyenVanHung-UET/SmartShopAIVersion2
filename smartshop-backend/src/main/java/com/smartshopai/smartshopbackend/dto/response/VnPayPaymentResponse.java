package com.smartshopai.smartshopbackend.dto.response;

import java.time.Instant;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class VnPayPaymentResponse {
    private String paymentUrl;
    private String paymentCode;
    private Instant expireAt;
}
