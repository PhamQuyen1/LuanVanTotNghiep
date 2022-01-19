package com.phamquyen.luanvan.service;

import com.phamquyen.luanvan.domain.Users;

import java.util.Optional;

public interface UserService {

    String signup(Users users);

    void confirmAt(Users users);
}
