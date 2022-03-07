package com.phamquyen.luanvan.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductFilterRequest {
    private String productName;
    private Long categoryId;
    private int page = 1;
    private String sortDir;
    private String sortField;
}
