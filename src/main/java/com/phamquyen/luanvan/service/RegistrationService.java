package com.phamquyen.luanvan.service;

import com.phamquyen.luanvan.dto.RequestRegistration;

public interface RegistrationService {
    String register(RequestRegistration requestRegistration);

    String confirmAt(String token);
}
