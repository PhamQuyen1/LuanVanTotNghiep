package com.phamquyen.luanvan.controller;

import com.phamquyen.luanvan.dto.ProductFilterRequest;
import com.phamquyen.luanvan.dto.ProductRequest;
import com.phamquyen.luanvan.service.ItemService;
import com.phamquyen.luanvan.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
//@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("api/v1/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private ItemService itemService;
    @GetMapping("public")
    public ResponseEntity<Map<String, Object>> listAll(
            @RequestParam(required = false) String productName,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "productId") String sortField,
            @RequestParam(defaultValue = "asc") String sortDir){
        return ResponseEntity.ok(productService.listAll(productName, page, categoryId, sortField, sortDir));
    }

    @PostMapping("public")
    public ResponseEntity<Map<String, Object>> listAll(@RequestBody ProductFilterRequest productFilterRequest){
        System.out.println(productFilterRequest);
        return ResponseEntity.ok(productService.listAll(
                productFilterRequest.getProductName(),
                productFilterRequest.getPage(),
                productFilterRequest.getCategoryId(),
                productFilterRequest.getSortField(),
                productFilterRequest.getSortDir()));
    }

    @GetMapping("public/{productId}")
    public ResponseEntity<?> findById(@PathVariable Long productId){
        return ResponseEntity.ok(productService.findById(productId));
    }

    @GetMapping("public/list/{categoryId}")
    public ResponseEntity<?> findByCategory(@PathVariable Long categoryId){
        return ResponseEntity.ok(productService.findByCategory(categoryId));
    }

    @PostMapping(path = "public/add",
            consumes = {
                    MediaType.APPLICATION_JSON_VALUE,
                    MediaType.MULTIPART_FORM_DATA_VALUE
            },
            headers = {
                    "Content-Type=multipart/form-data"
            })
//    @PreAuthorize("hasAnyAuthority('ADMIN', 'EMPLOYEE')")
    public ResponseEntity<?> addNewProduct(@RequestPart("file") MultipartFile[] file, @RequestPart("productRequest") ProductRequest productRequest){
        System.out.println(productRequest);
        System.out.println(file);
        productService.saveOrUpdate(file, productRequest);
        return ResponseEntity.ok("Success");
    }

    @PutMapping(path = "public",
            consumes = {
                    MediaType.APPLICATION_JSON_VALUE,
                    MediaType.MULTIPART_FORM_DATA_VALUE
            },
            headers = {
                    "Content-Type=multipart/form-data"
            })
//    @PreAuthorize("hasAnyAuthority('ADMIN', 'EMPLOYEE')")
    public ResponseEntity<?> updateProduct(@RequestPart(required = false) MultipartFile[] file, @RequestPart("productRequest") ProductRequest productRequest){
        productService.saveOrUpdate(file, productRequest);
        return ResponseEntity.ok("Success");
    }

    @DeleteMapping("/{productId}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'EMPLOYEE')")
    public ResponseEntity<?> deleteProductById(@PathVariable Long productId){
        productService.deleteProductById(productId);
        return ResponseEntity.ok("Success");
    }

    @PutMapping("updateDiscount")
//    @PreAuthorize("hasAnyAuthority('ADMIN', 'EMPLOYEE')")
    public ResponseEntity<?> updateProductDiscount(
            @RequestParam Long productId,
            @RequestParam int discountPercent
    ){
        productService.updateProductDiscount(productId, discountPercent);
        return ResponseEntity.ok("Success");
    }

//    @GetMapping("topReviewProduct")
//    public ResponseEntity<?> getTopReviewProduct(){
//        return ResponseEntity.ok(.getTopReviewProduct());
//    }
//
    @GetMapping("public/topSaleProduct")
    public ResponseEntity<?> getTopSaleProduct(){
        return ResponseEntity.ok(itemService.getTopSaleProducts());
    }
}
