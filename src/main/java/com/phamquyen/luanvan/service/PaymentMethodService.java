package com.phamquyen.luanvan.service;

import com.phamquyen.luanvan.domain.PaymentMethod;
import com.phamquyen.luanvan.enumeration.EPaymentMethod;

import java.util.List;

public interface PaymentMethodService {
    PaymentMethod findByPaymentName(EPaymentMethod paymentMethod);

    List<PaymentMethod> findAll();
}
