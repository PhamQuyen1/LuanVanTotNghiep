package com.phamquyen.luanvan.service;

import com.phamquyen.luanvan.domain.Product;

import java.util.List;
import java.util.Map;

public interface ReviewService {
    void addReview(Long productId, String comment, int reviewScore);

    void deleteReview(Long reviewId);

    Map<String, Object> getAllWithPagination(Long productId, int page);

    Double getReviewScore(Long productId);

    List<Product> getTopReviewProduct();
}
