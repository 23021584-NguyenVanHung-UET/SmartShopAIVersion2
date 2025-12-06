package com.smartshopai.smartshopbackend.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateOrderRequest {

    @NotEmpty(message = "Danh sách sản phẩm không được trống")
    @Valid
    private List<CreateOrderItemRequest> items;
}
