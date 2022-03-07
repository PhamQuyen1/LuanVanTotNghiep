package com.phamquyen.luanvan.controller;

import com.phamquyen.luanvan.domain.Users;
import com.phamquyen.luanvan.dto.*;
import com.phamquyen.luanvan.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("api/v1/user")
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping("api-public/v1/forgotPassword")
    public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordRequest forgotPasswordRequest){
        userService.forgotPassword(forgotPasswordRequest.getEmail());
        return ResponseEntity.ok("Success!!");
    }
    @GetMapping("profile")
    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN', 'EMPLOYEE')")
    public ResponseEntity<?> getProfile(Authentication authentication){
        UserDetails user = (UserDetails) authentication.getPrincipal();
        return ResponseEntity.ok(user);
    }

    @GetMapping("users")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'EMPLOYEE')")
    public ResponseEntity<?> listAll(){
        return ResponseEntity.ok(userService.listAll());
    }

    @GetMapping("{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'EMPLOYEE')")
    public ResponseEntity<?> findById(@PathVariable Long id){
        return ResponseEntity.ok(userService.findById(id));
    }

    @RequestMapping("api-public/v1/confirmForgotPassword")
    public ResponseEntity<?> confirmForgotPassword(@RequestBody ConfirmForgotPasswordRequest confirmForgotPasswordRequest){
        userService.confirmForgotPassword(confirmForgotPasswordRequest);
        return ResponseEntity.ok("Success");
    }

    @PutMapping("updateInfo")
    public ResponseEntity<?> updateInfo(@RequestBody UserRequest userRequest, Authentication authentication){
        return ResponseEntity.ok(userService.updateInfo(userRequest));
    }
    @PutMapping("updatePassword")
    public ResponseEntity<?> updatePassword(@RequestBody UpdatePassword updatePassword){
        boolean result = userService.updatePassword(updatePassword);
        if(result)
            return ResponseEntity.ok("Success");
        return ResponseEntity.ok("Password không chính xác");
    }

    @PutMapping("modifiedInfo")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'EMPLOYEE')")
    public ResponseEntity<?> modifiedInfo(@RequestBody ModifiedInfoRequest modifiedInfoRequest){
        userService.modifiedInfo(modifiedInfoRequest);
        return ResponseEntity.ok("Success");
    }
}
