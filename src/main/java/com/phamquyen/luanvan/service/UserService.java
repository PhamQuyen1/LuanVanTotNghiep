package com.phamquyen.luanvan.service;

import com.phamquyen.luanvan.domain.Users;
import com.phamquyen.luanvan.dto.ConfirmForgotPasswordRequest;
import com.phamquyen.luanvan.dto.ModifiedInfoRequest;
import com.phamquyen.luanvan.dto.UserRequest;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;
import java.util.Optional;

public interface UserService {

    String signup(Users users);

    void confirmAt(Users users);

    void forgotPassword(String email);

    List<Users> listAll();

    Users findById(Long id);

    void confirmForgotPassword(ConfirmForgotPasswordRequest confirmForgotPasswordRequest);

    void updateInfo(UserRequest userRequest, UserDetails user);

    void updatePassword(String password);

    void modifiedInfo(ModifiedInfoRequest modifiedInfoRequest);
}
