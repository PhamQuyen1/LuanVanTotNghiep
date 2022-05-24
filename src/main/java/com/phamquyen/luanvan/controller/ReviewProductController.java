package com.phamquyen.luanvan.controller;

import com.phamquyen.luanvan.dto.AddReviewRequest;
import com.phamquyen.luanvan.service.OrderService;
import com.phamquyen.luanvan.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("api/v1/review")
public class ReviewProductController {

    @Autowired
    private ReviewService reviewService;

    @Autowired
    private OrderService orderService;

    @GetMapping("public/score/{productId}")
    public ResponseEntity<?> getReviewScore(@PathVariable Long productId){
        return ResponseEntity.ok(reviewService.getReviewScore(productId));
    }

    @GetMapping("public/{productId}")
    public ResponseEntity<?> getAllProductReview(@PathVariable Long productId, @RequestParam(defaultValue = "1") int page){
        return ResponseEntity.ok(reviewService.getAllWithPagination(productId, page));
    }

    @GetMapping("public")
    public ResponseEntity<?> getAllReview(@RequestParam(defaultValue = "1") int page){
        return ResponseEntity.ok(reviewService.getAllWithPagination(null, page));
    }

    @PostMapping("")
    public ResponseEntity<?> addReview(@RequestBody AddReviewRequest addReviewRequest) {
        reviewService.addReview(addReviewRequest.getProductId(), addReviewRequest.getComment(), addReviewRequest.getReviewScore());
        return ResponseEntity.ok("Success");
    }
    @GetMapping("check")
    public ResponseEntity<?> checkUserBuyProduct(@RequestParam Long productId){
        System.out.println(productId);
        return ResponseEntity.ok(orderService.checkUserBuyProduct(productId));
//        return ResponseEntity.ok("Success");
    }
    @DeleteMapping("{reviewId}")
    public ResponseEntity<?> deleteReview(@PathVariable Long reviewId){
        reviewService.deleteReview(reviewId);
        return ResponseEntity.ok("Success");
    }

    @GetMapping("/public/topReviewProduct")
    public ResponseEntity<?> getTopReviewProduct(){
        return ResponseEntity.ok(reviewService.getTopReviewProduct());
    }
}
