package com.phamquyen.luanvan.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductRequest {

    private Long productId;
    private Long categoryId;
    private String productName;
    private String description;
    private int price;
    private int quantity;
    private boolean uploadImage;
}
