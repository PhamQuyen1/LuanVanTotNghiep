package com.phamquyen.luanvan.service;

public interface EmailService {
    void sendMail(String to, String subject, String content);
}
