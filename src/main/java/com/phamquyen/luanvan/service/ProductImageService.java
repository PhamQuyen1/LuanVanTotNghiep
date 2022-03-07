package com.phamquyen.luanvan.service;

import com.phamquyen.luanvan.domain.Product;
import com.phamquyen.luanvan.domain.ProductImage;

public interface ProductImageService {
    ProductImage save(String productImageName);

    void delete(Product product);
}
