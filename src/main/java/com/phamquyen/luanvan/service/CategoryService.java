package com.phamquyen.luanvan.service;

import com.phamquyen.luanvan.domain.Category;
import com.phamquyen.luanvan.dto.CategoryRequest;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface CategoryService {


    List<Category> listAll();

    Category findById(Long categoryId);

    void upload(MultipartFile file, CategoryRequest categoryRequest);
}
