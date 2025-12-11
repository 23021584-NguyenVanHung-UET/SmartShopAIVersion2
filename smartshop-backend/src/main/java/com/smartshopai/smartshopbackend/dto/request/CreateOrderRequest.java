package com.smartshopai.smartshopbackend.dto.request;

import com.smartshopai.smartshopbackend.entity.PaymentMethod;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateOrderRequest {

    @NotEmpty(message = "Danh sách sản phẩm không được trống")
    @Valid
    private List<CreateOrderItemRequest> items;

    @NotNull(message = "Phương thức thanh toán không được trống")
    private PaymentMethod paymentMethod;

    @Size(max = 255)
    private String note;

    @NotBlank(message = "Tên nhận hàng không được trống")
    @Size(max = 255)
    private String shippingName;

    @NotBlank(message = "Số điện thoại không được trống")
    @Size(max = 50)
    @Pattern(regexp = "^[0-9+\\-\\s]{6,20}$", message = "Số điện thoại không hợp lệ")
    private String shippingPhone;

    @NotBlank(message = "Địa chỉ không được trống")
    @Size(max = 255)
    private String shippingAddress;

    @NotBlank(message = "Phường/Xã không được trống")
    @Size(max = 255)
    private String shippingWard;

    @NotBlank(message = "Quận/Huyện không được trống")
    @Size(max = 255)
    private String shippingDistrict;

    @NotBlank(message = "Tỉnh/Thành phố không được trống")
    @Size(max = 255)
    private String shippingCity;
}
