package com.phamquyen.luanvan.repository;

import com.phamquyen.luanvan.domain.PaymentMethod;
import com.phamquyen.luanvan.enumeration.EPaymentMethod;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PaymentMethodRepository extends JpaRepository<PaymentMethod, Long> {

    Optional<PaymentMethod> findByPaymentMethod(EPaymentMethod paymentMethod);
}
