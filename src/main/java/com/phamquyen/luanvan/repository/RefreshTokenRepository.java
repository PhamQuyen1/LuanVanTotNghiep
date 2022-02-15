package com.phamquyen.luanvan.repository;

import com.phamquyen.luanvan.domain.RefreshToken;
import com.phamquyen.luanvan.domain.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

    Optional<RefreshToken> findByToken(String token);
    Optional<RefreshToken> findByUser(Users user);
}
