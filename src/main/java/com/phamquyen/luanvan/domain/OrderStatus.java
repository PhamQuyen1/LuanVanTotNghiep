package com.phamquyen.luanvan.domain;

import com.phamquyen.luanvan.enumeration.EStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long statusId;

    @Enumerated(EnumType.STRING)
    private EStatus statusName;
    private String description;
}
