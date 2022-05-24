package com.phamquyen.luanvan.dto;

import com.phamquyen.luanvan.domain.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReviewResponse {
    private Long reviewId;
    private LocalDateTime createAt;
    private String comment;
    private int reviewScore;
    private String fullname;
    private Product product;
}
