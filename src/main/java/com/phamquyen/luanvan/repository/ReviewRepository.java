package com.phamquyen.luanvan.repository;

import com.phamquyen.luanvan.domain.Product;
import com.phamquyen.luanvan.domain.Review;
import com.phamquyen.luanvan.domain.compositeKey.CommentId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    Review findByReviewId(Long reviewId);

    Page<Review> findAllByProduct(Product product, Pageable pageable);

    List<Review> findAllByProduct(Product product);

//    @Query(countQuery = "SELECT r.product FROM Review r"
////            +
////            " GROUP BY r.product.productId"
////            +
////            ", r.reviewScore ORDER BY AVG(r.reviewScore) ASC LIMIT 5"
//            ,
//            nativeQuery = true)
//    List<?> getTopReviewProduct(String a);
}
