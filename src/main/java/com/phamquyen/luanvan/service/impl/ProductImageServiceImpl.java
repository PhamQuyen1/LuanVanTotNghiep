package com.phamquyen.luanvan.service.impl;

import com.phamquyen.luanvan.domain.Product;
import com.phamquyen.luanvan.domain.ProductImage;
import com.phamquyen.luanvan.repository.ProductImageRepository;
import com.phamquyen.luanvan.service.FileService;
import com.phamquyen.luanvan.service.ProductImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProductImageServiceImpl implements ProductImageService {

    @Autowired
    ProductImageRepository productImageRepository;

    @Autowired
    FileService fileService;

    @Override
    public ProductImage save(String productImageName, Product product) {
        try {
            ProductImage productImage = new ProductImage();
            productImage.setImageUrl(productImageName);
//            productImage.setProduct(product);
            return productImageRepository.save(productImage);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }

    }

    @Override
    public void delete(Product product) {
//        try {
            List<ProductImage> productImages = product.getProductImages();
            for (ProductImage productImage : productImages) {
                ProductImage p = productImageRepository.findById(productImage.getImageId())
                        .orElseThrow(()-> new IllegalStateException("Hinh anh khong tn tai"));
                fileService.delete(productImage.getImageUrl());
                productImageRepository.deleteById(p.getImageId());
            }
            System.out.println("a");
//        } catch (Exception e) {
//            throw new RuntimeException(e.getMessage());
//        }

    }

}
