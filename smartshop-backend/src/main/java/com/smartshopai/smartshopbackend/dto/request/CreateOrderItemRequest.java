package com.smartshopai.smartshopbackend.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateOrderItemRequest {

    @NotNull(message = "productId là bắt buộc")
    private Long productId;

    @NotNull(message = "quantity là bắt buộc")
    @Min(value = 1, message = "quantity tối thiểu 1")
    private Integer quantity;
}
