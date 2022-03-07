package com.phamquyen.luanvan.controller;

import com.phamquyen.luanvan.dto.AddReviewRequest;
import com.phamquyen.luanvan.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("api/v1/review/public")
public class ReviewProductController {

    @Autowired
    private ReviewService reviewService;

    @GetMapping("score/{productId}")
    public ResponseEntity<?> getReviewScore(@PathVariable Long productId){
        return ResponseEntity.ok(reviewService.getReviewScore(productId));
    }

    @GetMapping("{productId}")
    public ResponseEntity<?> getAllProductReview(@PathVariable Long productId, @RequestParam(defaultValue = "1") int page){
        return ResponseEntity.ok(reviewService.getAllWithPagination(productId, page));
    }

    @PostMapping("")
    public ResponseEntity<?> addReview(@RequestBody AddReviewRequest addReviewRequest) {
        reviewService.addReview(addReviewRequest.getProductId(), addReviewRequest.getComment(), addReviewRequest.getReviewScore());
        return ResponseEntity.ok("Success");
    }

    @DeleteMapping("")
    public ResponseEntity<?> deleteReview(@RequestParam Long deleteId){
        return ResponseEntity.ok("Success");
    }

    @GetMapping("topReviewProduct")
    public ResponseEntity<?> getTopReviewProduct(){
        return ResponseEntity.ok(reviewService.getTopReviewProduct());
    }
}
