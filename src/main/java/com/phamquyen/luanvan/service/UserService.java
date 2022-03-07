package com.phamquyen.luanvan.service;

import com.phamquyen.luanvan.domain.Users;
import com.phamquyen.luanvan.dto.ConfirmForgotPasswordRequest;
import com.phamquyen.luanvan.dto.ModifiedInfoRequest;
import com.phamquyen.luanvan.dto.UpdatePassword;
import com.phamquyen.luanvan.dto.UserRequest;
import org.hibernate.sql.Update;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;
import java.util.Optional;

public interface UserService {

    void delete(Users users);

    String signup(Users users);

    void confirmAt(Users users);

    void forgotPassword(String email);

    List<Users> listAll();

    Users findById(Long id);

    void confirmForgotPassword(ConfirmForgotPasswordRequest confirmForgotPasswordRequest);

    Users updateInfo(UserRequest userRequest);

    boolean updatePassword(UpdatePassword updatePassword);

    void modifiedInfo(ModifiedInfoRequest modifiedInfoRequest);

    Users getUserAuthenticate();

    List<Users> findAllByFullname(String fullname) throws IllegalStateException;

    List<Users> findAllByEmail(String email);

    List<Users> findAll();

    void save(Users user);
}
