package com.phamquyen.luanvan.controller;

import com.phamquyen.luanvan.domain.Users;
import com.phamquyen.luanvan.dto.ConfirmForgotPasswordRequest;
import com.phamquyen.luanvan.dto.ForgotPasswordRequest;
import com.phamquyen.luanvan.dto.ModifiedInfoRequest;
import com.phamquyen.luanvan.dto.UserRequest;
import com.phamquyen.luanvan.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
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
        UserDetails user = (UserDetails) authentication.getPrincipal();
        userService.updateInfo(userRequest, user);
        return ResponseEntity.ok("Success");
    }
    @PutMapping("updatePassword")
    public ResponseEntity<?> updatePassword(@RequestParam String password){
        userService.updatePassword(password);
        return ResponseEntity.ok("Success");
    }

    @PutMapping("modifiedInfo")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'EMPLOYEE')")
    public ResponseEntity<?> modifiedInfo(@RequestBody ModifiedInfoRequest modifiedInfoRequest){
        userService.modifiedInfo(modifiedInfoRequest);
        return ResponseEntity.ok("Success");
    }
}
