package com.phamquyen.luanvan.service.impl;

import com.phamquyen.luanvan.domain.Comment;
import com.phamquyen.luanvan.domain.Product;
import com.phamquyen.luanvan.domain.Users;
import com.phamquyen.luanvan.repository.CommentRepository;
import com.phamquyen.luanvan.service.CommentService;
import com.phamquyen.luanvan.service.ProductService;
import com.phamquyen.luanvan.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private ProductService productService;

    @Autowired
    private UserService userService;

    public void addComment(Long productId, String commentContent){
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();

        Product product = productService.findById(productId);

        Users user = userService.getUserAuthenticate();
        Comment comment = new Comment(
                user,
                product,
                commentContent,
                LocalDateTime.now()
                );

        commentRepository.save(comment);
    }

}
