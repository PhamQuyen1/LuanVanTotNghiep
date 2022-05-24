package com.phamquyen.luanvan.security.jwt;

import io.jsonwebtoken.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtUtil {

    private static final String SECRET = "luanvan";

    public String generateToken(UserDetails userDetails){
        Map<String, Object> claim = new HashMap<>();
        return Jwts.builder()
                .setClaims(claim)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 10 * 60 *1000))
                .signWith(SignatureAlgorithm.HS512, SECRET)
                .compact()
                ;
    }

    public Claims getAllClaimsFromToken(String token){
        return Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token).getBody();
    }

    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    public String getUsernameFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }
    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token);
            return true;
        }  catch (SignatureException e) {
            throw new IllegalStateException(e.getMessage());
        } catch (MalformedJwtException e) {
            throw new IllegalStateException(e.getMessage());
        } catch (ExpiredJwtException e) {
            throw new IllegalStateException(e.getMessage());
        } catch (UnsupportedJwtException e) {
            throw new IllegalStateException(e.getMessage());
        } catch (IllegalArgumentException e) {
            throw new IllegalStateException(e.getMessage());
        }

    }

    private Boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }

    public Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }


}
