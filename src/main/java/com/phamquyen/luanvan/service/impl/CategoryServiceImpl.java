package com.phamquyen.luanvan.service.impl;

import com.phamquyen.luanvan.domain.Category;
import com.phamquyen.luanvan.dto.CategoryRequest;
import com.phamquyen.luanvan.repository.CategoryRepository;
import com.phamquyen.luanvan.service.CategoryService;
import com.phamquyen.luanvan.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private FileService fileService;

    public List<Category> listAll() {
        Sort sort = Sort.by("categoryId");
        sort = sort.ascending();
        return categoryRepository.findAll(sort);
    }

    @Override
    public Category findById(Long categoryId) throws IllegalStateException {
        return categoryRepository.findById(categoryId)
                .orElseThrow(() -> new IllegalStateException("Category khong ton tai"));
    }

    @Override
    @Transactional
    public void upload(MultipartFile file, CategoryRequest categoryRequest) {
        if (categoryRequest.getCategoryId() != null) {
            Optional<Category> categoryOptional = categoryRepository.findById(categoryRequest.getCategoryId());
            if (categoryOptional.isPresent()) {
                Category category = categoryOptional.get();
                category.setCategoryName(categoryRequest.getCategoryName());

                if (categoryRequest.isUploadImage()) {
                    fileService.delete(category.getCategoryImage());
                    fileService.save(file);
                    category.setCategoryImage(file.getOriginalFilename());
                }

                categoryRepository.save(category);
            }
        } else {
            Category category = new Category();
            category.setCategoryName(categoryRequest.getCategoryName());
            category.setCategoryImage(categoryRequest.getCategoryImage());
            fileService.save(file);
            categoryRepository.save(category);
        }
    }

    @Override
    public String deleteCategoryByCategoryId(Long categoryId){
        try{
            Category category = categoryRepository.findById(categoryId)
                    .orElseThrow(()-> new IllegalStateException("Danh mục không tồn tại"));
            categoryRepository.deleteById(categoryId);
            fileService.delete(category.getCategoryImage());
            return "Success";
        }
        catch (Exception exception){
            throw new RuntimeException("Không thể xóa danh mục");
        }
    }

}
