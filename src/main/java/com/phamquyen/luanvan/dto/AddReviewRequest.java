package com.phamquyen.luanvan.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddReviewRequest {
    private Long productId;
    private String comment;
    private int reviewScore;
}
