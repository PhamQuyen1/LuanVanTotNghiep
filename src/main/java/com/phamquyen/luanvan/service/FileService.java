package com.phamquyen.luanvan.service;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface FileService {

    void save(MultipartFile file);

    Resource load(String filename);

    void delete(String filename);
}
