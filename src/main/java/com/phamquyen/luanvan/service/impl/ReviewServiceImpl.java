package com.phamquyen.luanvan.service.impl;

import com.phamquyen.luanvan.domain.Review;
import com.phamquyen.luanvan.domain.Product;
import com.phamquyen.luanvan.domain.Users;
import com.phamquyen.luanvan.dto.ReviewResponse;
import com.phamquyen.luanvan.repository.ReviewRepository;
import com.phamquyen.luanvan.service.ReviewService;
import com.phamquyen.luanvan.service.ProductService;
import com.phamquyen.luanvan.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private ProductService productService;

    @Autowired
    private UserService userService;

    @Override
    public void addReview(Long productId, String comment, int reviewScore){
//        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext()
//                .getAuthentication().getPrincipal();

        Product product = productService.findById(productId);

        Users user = userService.getUserAuthenticate();
        Review review = new Review();
        review.setReviewScore(reviewScore);
        review.setComment(comment);
        review.setCreateAt(LocalDateTime.now());
        review.setProduct(product);
        review.setUser(user);
        reviewRepository.save(review);
    }




    @Override
    public void deleteReview(Long reviewId){
        Review review = reviewRepository.findByReviewId(reviewId);
        reviewRepository.delete(review);
    }

    @Override
    public Map<String, Object> getAllWithPagination(Long productId, int page){
        Product product;
        Page<Review> reviewPage;

        Sort sort = Sort.by("reviewId").descending();
        Pageable pageable = PageRequest.of(page - 1, 10, sort);

        if(productId != null){
            product = productService.findById(productId);
            reviewPage = reviewRepository.findAllByProduct(product, pageable);
        }else {
            reviewPage = reviewRepository.findAll(pageable);
        }

        List<Review> reviews = reviewPage.getContent();
        List<ReviewResponse> reviewResponses = new ArrayList<>();

        for (Review review : reviews) {
            ReviewResponse reviewResponse = new ReviewResponse();
            reviewResponse.setReviewId(review.getReviewId());
            reviewResponse.setReviewScore(review.getReviewScore());
            reviewResponse.setComment(review.getComment());
            reviewResponse.setCreateAt(review.getCreateAt());
            reviewResponse.setFullname(review.getUser().getFullname());
            reviewResponses.add(reviewResponse);
            reviewResponse.setProduct(review.getProduct());
        }

        Map<String, Object> result = new HashMap<>();

        result.put("reviews", reviewResponses);
        result.put("currentPage", page);
        result.put("totalPage", reviewPage.getTotalPages());
        result.put("totalItem", reviewPage.getTotalElements());

        return result;
    }

    @Override
    public Double getReviewScore(Long productId){
        Product product = productService.findById(productId);
        List<Review> reviews = reviewRepository.findAllByProduct(product);
        return reviews.stream().mapToDouble(r -> r.getReviewScore()).average().orElse(5);
    }

    @Override
    public List<Product> getTopReviewProduct(){
        List<Product> products = productService.findAll();
        List<Review> reviews = reviewRepository.findAll();
        Map<Product, Double> productDouble = reviews.stream()
                .collect(Collectors.groupingBy(Review::getProduct,
                        Collectors.averagingDouble(Review::getReviewScore)));
        Map<Product, Double> productDoubleMap = new LinkedHashMap<>();
        productDouble.entrySet().stream().sorted(Map.Entry.<Product, Double>comparingByValue().reversed()).forEachOrdered(r -> productDoubleMap.put(r.getKey(), r.getValue()));
        System.out.println(productDoubleMap.values());
        List<Product> productList = new ArrayList<>(productDoubleMap.keySet());
        if (productList.isEmpty()) productList = products;
        else {
            List<Long> productIds = new ArrayList<>();
            for (Product product : productList) {
                productIds.add(product.getProductId());
            }
            System.out.println(productIds);
            if (productList.size() < 5)
                for (Product product : products) {
                    Long check = Long.valueOf(0);
                    if(productIds.contains(product.getProductId())) continue;
                    System.out.println(product);
                            productList.add(product);


                }
        }
        return productList.subList(0, productList.size() >= 5 ? 5 : productList.size());
    }


}
