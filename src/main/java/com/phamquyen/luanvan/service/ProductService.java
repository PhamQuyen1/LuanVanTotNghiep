package com.phamquyen.luanvan.service;

import com.phamquyen.luanvan.domain.Product;
import com.phamquyen.luanvan.dto.ProductRequest;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface ProductService {

    Product findById(Long productId);

    List<Product> findByCategory(Long categoryId);

    void saveOrUpdate(MultipartFile[] file, ProductRequest productRequest);

    Map<String, Object> listAll(String productName, int page, Long categoryId, String sortField, String sortDir);

    void deleteProductById(Long productId);

    void updateProductDiscount(Long productId, int discountPercent);
}
