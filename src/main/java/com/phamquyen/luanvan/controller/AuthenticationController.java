package com.phamquyen.luanvan.controller;

import com.phamquyen.luanvan.domain.RefreshToken;
import com.phamquyen.luanvan.domain.Users;
import com.phamquyen.luanvan.dto.JwtRequest;
import com.phamquyen.luanvan.dto.JwtResponse;
import com.phamquyen.luanvan.dto.RefreshTokenRequest;
import com.phamquyen.luanvan.dto.RefreshTokenResponse;
import com.phamquyen.luanvan.security.jwt.JwtUtil;
import com.phamquyen.luanvan.service.RefreshTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("api-public/v1/authentication")
public class AuthenticationController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtUtil jwtUtil;

    @Autowired
    private RefreshTokenService refreshTokenService;

    @PostMapping("signin")
    public ResponseEntity<?> login(@RequestBody JwtRequest jwtRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(jwtRequest.getUsername(), jwtRequest.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        Users userDetails = (Users) authentication.getPrincipal();
        String token = jwtUtil.generateToken(userDetails);
        String refreshToken = refreshTokenService.createRefreshToken(userDetails);
        return ResponseEntity.ok(new JwtResponse(userDetails, token, refreshToken));
    }

    @PostMapping("refreshToken")
    public ResponseEntity<?> refreshToken(@RequestBody RefreshTokenRequest refreshTokenRequest) {
        RefreshToken refreshToken =
                refreshTokenService.findByToken(refreshTokenRequest.getRefreshToken())
                        .orElseThrow(() -> new IllegalStateException("Refresh Token khong ton tai"));

        boolean isExpired = refreshTokenService.verifyExpiredRefreshToken(refreshToken);
        String accessToken = jwtUtil.generateToken(refreshToken.getUser());
        String newRefreshToken = refreshTokenService.createRefreshToken(refreshToken.getUser());
        return ResponseEntity.ok(new RefreshTokenResponse(newRefreshToken, accessToken));

    }


}
