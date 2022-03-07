package com.phamquyen.luanvan.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequest {
    private String orderAddress;
    private String orderNote;
    private int shippingFee;
    private String paymentMethod;
    @JsonProperty("itemRequests")
    private List<ItemRequest> itemRequests = new ArrayList<>();
}
