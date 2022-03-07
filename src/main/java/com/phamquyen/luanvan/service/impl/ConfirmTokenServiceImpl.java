package com.phamquyen.luanvan.service.impl;

import com.phamquyen.luanvan.domain.ConfirmationToken;
import com.phamquyen.luanvan.repository.ConfirmTokenRepository;
import com.phamquyen.luanvan.service.ConfirmTokenService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@AllArgsConstructor
public class ConfirmTokenServiceImpl implements ConfirmTokenService {

    private final ConfirmTokenRepository confirmTokenRepository;

    @Override
    public void saveConfirmToken(ConfirmationToken token){
        confirmTokenRepository.save(token);
    }

    @Override
    public ConfirmationToken getToken(String token){
        System.out.println(token);
        return confirmTokenRepository.findByToken(token)
                .orElseThrow(()->new IllegalStateException("Token khong ton tai"));


    }
    @Override
    public void delete(ConfirmationToken confirmationToken){
        System.out.println(confirmationToken);
        confirmTokenRepository.delete(confirmationToken);
    }
    @Override
    public void setConfirmAt(ConfirmationToken token){
        ConfirmationToken confirmationToken =
                confirmTokenRepository.findById(token.getTokenId()).get();

        if (confirmationToken == null ){
            throw new IllegalStateException("Token khong ton tai");
        }

        if (confirmationToken.getExpiredAt().isBefore(LocalDateTime.now())){
            throw new IllegalStateException("Token da het han");
        }

        if (confirmationToken.getConfirmAt() != null){
            throw new IllegalStateException("Token da duoc xac thuc");
        }
        confirmationToken.setConfirmAt(LocalDateTime.now());
        confirmTokenRepository.save(confirmationToken);
    }

}
