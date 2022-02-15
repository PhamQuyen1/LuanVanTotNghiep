package com.phamquyen.luanvan.dto;

import com.phamquyen.luanvan.domain.Users;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JwtResponse {

    private Users user;
    private String accessToken;
    private String refreshToken;
}
