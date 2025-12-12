package com.smartshopai.smartshopbackend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class VnPayReturnResponse {
    private boolean success;
    private String message;
    private Long orderId;
    private String paymentCode;
    private String responseCode;
    private String transactionStatus;
}
