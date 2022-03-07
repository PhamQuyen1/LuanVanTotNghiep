package com.phamquyen.luanvan.service;

import com.phamquyen.luanvan.domain.ConfirmationToken;

import java.util.Optional;

public interface ConfirmTokenService {
    void saveConfirmToken(ConfirmationToken token);


    ConfirmationToken getToken(String token);

    void delete(ConfirmationToken confirmationToken);

    void setConfirmAt(ConfirmationToken token);
}
