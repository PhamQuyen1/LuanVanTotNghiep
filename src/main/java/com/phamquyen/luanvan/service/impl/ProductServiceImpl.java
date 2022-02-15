package com.phamquyen.luanvan.service.impl;

import com.phamquyen.luanvan.domain.Category;
import com.phamquyen.luanvan.domain.Product;
import com.phamquyen.luanvan.domain.ProductImage;
import com.phamquyen.luanvan.dto.ProductRequest;
import com.phamquyen.luanvan.repository.ProductRepository;
import com.phamquyen.luanvan.service.CategoryService;
import com.phamquyen.luanvan.service.FileService;
import com.phamquyen.luanvan.service.ProductImageService;
import com.phamquyen.luanvan.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ProductServiceImpl implements ProductService {

    private final int PAGE_SIZE = 5;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private FileService fileService;

    @Autowired
    private ProductImageService productImageService;

    @Override
    public Map<String, Object> listAll(String productName, int page, Long categoryId, String sortField, String sortDir) {
        try {
            Sort sort = Sort.by(sortField);
            if (sortDir.equals("asc")) {
                sort.ascending();
            } else {
                sort.descending();
            }
            sort = sortDir.equals("asc") ? sort.ascending() : sort.descending();
            Pageable pageable = PageRequest.of(page - 1, 5, sort);
            Page<Product> productPage;
            if (categoryId != null) {
                productPage = productRepository.findAll(categoryService.findById(categoryId), pageable);
            } else if (productName == null) productPage = productRepository.findAll(pageable);
            else productPage = productRepository.findAll(productName, pageable);

            Map<String, Object> response = new HashMap<>();
            response.put("products", productPage.getContent());
            response.put("currentPage", page);
            response.put("totalPage", productPage.getTotalPages());
            response.put("totalItem", productPage.getTotalElements());

            return response;

        } catch (Exception e) {
            throw new RuntimeException("Error to list product");
        }

    }

    @Override
    public Product findById(Long productId) {
        return productRepository.findById(productId).orElseThrow(() -> new IllegalStateException("San pham khong ton tai"));
    }

    @Override
    public List<Product> findByCategory(Long categoryId) {
        Category category = categoryService.findById(categoryId);
        return productRepository.findByCategory(category);
    }

    @Override
    public void saveOrUpdate(MultipartFile[] files, ProductRequest productRequest) {
        try {
            Product product;
            if (productRequest.getProductId() != null) {
                product = productRepository.findById(productRequest.getProductId()).orElseThrow(() -> new IllegalStateException("San pham khong ton tai"));
                product.setProductName(productRequest.getProductName());
                product.setPrice(productRequest.getPrice());
                product.setDescription(productRequest.getDescription());
                product.setQuantity(productRequest.getQuantity());

//                productRepository.save(product);
                if (productRequest.isUploadImage()) {
//                    upload(files, product);
                    productImageService.delete(product);
//                    product.getProductImages().clear();
                    System.out.println(product);
                    product.setProductImages(upload(files, product));
                    System.out.println(product);
//                    productRepository.save(product);
                }
                productRepository.save(product);
            } else {
                product = new Product();
                product.setProductName(productRequest.getProductName());
                product.setPrice(productRequest.getPrice());
                product.setDescription(productRequest.getDescription());
                product.setQuantity(productRequest.getQuantity());
                product.setCreateAt(LocalDateTime.now());
                product.setCategory(categoryService.findById(productRequest.getCategoryId()));
                product.setProductImages(upload(files, product));
                productRepository.save(product);
//                upload(files, product);
            }
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage() + e.getStackTrace() + e.getCause());
        }
    }

    private List<ProductImage> upload(MultipartFile[] files, Product product) {
        List<ProductImage> productImages = new ArrayList<>();
        for (MultipartFile file : files) {
            ProductImage productImage = new ProductImage();
            productImage.setImageUrl(file.getOriginalFilename());
            productImages.add(productImage);
//            productImageService.save(file.getOriginalFilename(), product);
            fileService.save(file);
        }
        return productImages;
    }

    @Override
    public void deleteProductById(Long productId){
        try {
            Product product = productRepository.findById(productId)
                    .orElseThrow(()-> new IllegalStateException("San pham khong ton tai"));
            product.setDeleted(true);
            productRepository.save(product);
        }catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }

     @Override
     public void updateProductDiscount(Long productId, int discountPercent){
        Product product = productRepository.findById(productId)
                .orElseThrow(()->new IllegalStateException("San pham khong ton tai"));
        product.setDiscount(discountPercent);
        productRepository.save(product);
     }

}
