package com.phamquyen.luanvan.repository;

import com.phamquyen.luanvan.domain.Product;
import com.phamquyen.luanvan.domain.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductImageRepository extends JpaRepository<ProductImage, Long> {
}
