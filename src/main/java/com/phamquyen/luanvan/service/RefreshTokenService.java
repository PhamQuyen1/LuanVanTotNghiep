package com.phamquyen.luanvan.service;

import com.phamquyen.luanvan.domain.RefreshToken;
import com.phamquyen.luanvan.domain.Users;

import java.util.Optional;

public interface RefreshTokenService {
    String createRefreshToken(Users user);

    boolean verifyExpiredRefreshToken(RefreshToken token);

    Optional<RefreshToken> findByToken(String token);
}
