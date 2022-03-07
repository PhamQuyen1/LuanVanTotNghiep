package com.phamquyen.luanvan.controller;

import com.phamquyen.luanvan.domain.Category;
import com.phamquyen.luanvan.dto.CategoryRequest;
import com.phamquyen.luanvan.service.CategoryService;
import com.phamquyen.luanvan.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("api/v1/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private ProductService productService;

    @GetMapping("public")
    public ResponseEntity<?> listAll() {
        return ResponseEntity.ok(categoryService.listAll());
    }

    @GetMapping("public/categoryAndQuantity")
    public ResponseEntity<Map<Long, Integer>> listAllAndQuantity() {
        return ResponseEntity.ok(productService.listAllAndQuantity());
    }

    @GetMapping("{categoryId}")
    public ResponseEntity<?> findById(@PathVariable Long categoryId) {
        return ResponseEntity.ok(categoryService.findById(categoryId));
    }

    @PostMapping(path = "",
            consumes = {
                    MediaType.APPLICATION_JSON_VALUE,
                    MediaType.MULTIPART_FORM_DATA_VALUE
            },
            headers = {
                    "Content-Type=multipart/form-data"
            })
    @PreAuthorize("hasAnyAuthority('ADMIN', 'EMPLOYEE')")
    public ResponseEntity<?> addCategory(@RequestPart MultipartFile file, @RequestPart CategoryRequest category) {
        categoryService.upload(file, category);
        return ResponseEntity.ok("Success");
    }

    @PutMapping(path = "",
            consumes = {
                    MediaType.APPLICATION_JSON_VALUE,
                    MediaType.MULTIPART_FORM_DATA_VALUE
            },
            headers = {
                    "Content-Type=multipart/form-data"
            })
    @PreAuthorize("hasAnyAuthority('ADMIN', 'EMPLOYEE')")
    public ResponseEntity<?> updateCategory(@RequestPart MultipartFile file, @RequestPart CategoryRequest category) {
        categoryService.upload(file, category);
        return ResponseEntity.ok("Success");
    }


}
