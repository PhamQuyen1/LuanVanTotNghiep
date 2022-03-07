package com.phamquyen.luanvan.repository;

import com.phamquyen.luanvan.domain.Category;
import com.phamquyen.luanvan.domain.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByCategory(Category category);

    @Query("SELECT p FROM Product p WHERE p.productName LIKE %:productName% AND p.deleted = FALSE")
    Page<Product> findAll(String productName, Pageable pageable);

//    @Query("SELECT p FROM Product p WHERE p.category LIKE :category AND p.deleted = FALSE")
    Page<Product> findAllByCategory(Category category, Pageable pageable);

    List<Product> findAllByCategory(Category category);
}
