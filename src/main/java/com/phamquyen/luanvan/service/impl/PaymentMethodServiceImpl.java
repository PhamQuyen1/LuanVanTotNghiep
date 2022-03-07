package com.phamquyen.luanvan.service.impl;

import com.phamquyen.luanvan.domain.PaymentMethod;
import com.phamquyen.luanvan.enumeration.EPaymentMethod;
import com.phamquyen.luanvan.repository.PaymentMethodRepository;
import com.phamquyen.luanvan.service.PaymentMethodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentMethodServiceImpl implements PaymentMethodService {

    @Autowired
    private PaymentMethodRepository paymentMethodRepository;

    @Override
    public PaymentMethod findByPaymentName(EPaymentMethod paymentMethod){
        return paymentMethodRepository.findByPaymentMethod(paymentMethod)
                .orElseThrow(()-> new IllegalStateException("Payment method not exist!"));
    }

    @Override
    public List<PaymentMethod> findAll(){
        return paymentMethodRepository.findAll();
    }
}
