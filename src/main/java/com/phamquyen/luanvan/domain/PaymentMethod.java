package com.phamquyen.luanvan.domain;

import com.phamquyen.luanvan.enumeration.EPaymentMethod;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentMethod {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long methodId;
    @Enumerated(EnumType.STRING)
    private EPaymentMethod paymentMethod;
    private String description;
}
