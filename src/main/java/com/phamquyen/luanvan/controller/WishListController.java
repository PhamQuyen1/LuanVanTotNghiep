package com.phamquyen.luanvan.controller;

import com.phamquyen.luanvan.domain.Users;
import com.phamquyen.luanvan.service.ProductService;
import com.phamquyen.luanvan.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/wishList")
public class WishListController {

    @Autowired
    private ProductService productService;

    @Autowired
    private UserService userService;

    @PostMapping("")
    public ResponseEntity<?> addWishList(@RequestParam Long productId){
        productService.addWishList(productId);
        return ResponseEntity.ok("Success");
    }

    @DeleteMapping("")
    public ResponseEntity<?> deleteWishList(@RequestParam Long productId){
        productService.deleteWishList(productId);
        return ResponseEntity.ok("Success");
    }

    @GetMapping("")
    public ResponseEntity<?> getAllWishList(@RequestParam(defaultValue = "1") int page){
        Users user = userService.getUserAuthenticate();
        return ResponseEntity.ok(user.getWishlist());
    }
}
