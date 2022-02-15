package com.phamquyen.luanvan.service.impl;

import com.phamquyen.luanvan.domain.RefreshToken;
import com.phamquyen.luanvan.domain.Users;
import com.phamquyen.luanvan.repository.RefreshTokenRepository;
import com.phamquyen.luanvan.service.RefreshTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
public class RefreshTokenServiceImpl implements RefreshTokenService {

    private final int EXPIRED_TIME = 60 * 60 * 1000;

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    @Override
    public String createRefreshToken(Users user) {
        RefreshToken refreshToken = refreshTokenRepository.findByUser(user).orElse(new RefreshToken());
        refreshToken.setCreateAt(Instant.now());
        refreshToken.setUser(user);
        refreshToken.setToken(UUID.randomUUID().toString());
        refreshTokenRepository.save(refreshToken);
        return refreshToken.getToken();
    }

    @Override
    public boolean verifyExpiredRefreshToken(RefreshToken token) {

        if (token.getCreateAt().plusMillis(EXPIRED_TIME).isBefore(Instant.now())) {
            refreshTokenRepository.delete(token);
            throw new IllegalStateException("Token da het han");
        }
        return true;
    }

    @Override
    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }



}
