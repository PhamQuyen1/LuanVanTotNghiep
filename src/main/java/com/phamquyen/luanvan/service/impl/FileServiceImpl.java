package com.phamquyen.luanvan.service.impl;

import com.phamquyen.luanvan.service.FileService;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class FileServiceImpl implements FileService {

    private final Path root = Paths.get("frontend/public/upload");

    @Override
    public void save(MultipartFile file){
        try {
            Files.copy(file.getInputStream(), this.root.resolve(file.getOriginalFilename()));
            System.out.println(this.root.resolve(file.getOriginalFilename()));
        } catch (IOException e) {
            throw new RuntimeException("Khong the upload file");
        }
    }

    @Override
    public Resource load(String filename){
        try {
            Path path = this.root.resolve(filename);
            Resource resource = new UrlResource(path.toUri());

            if(resource.exists()){
                return resource;
            }else {
                throw new RuntimeException("File khong ton tai");
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("Load file khong thanh cong");
        }
    }

    @Override
    public void delete(String filename){

        try {
            Path path = this.root.resolve(filename);
            Files.delete(path);
        } catch (IOException e) {
            throw new RuntimeException("Xoa file khong thanh cong");
        }
    }

}
