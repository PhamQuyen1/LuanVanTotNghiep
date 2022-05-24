package com.phamquyen.luanvan.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Item {
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "seq_item"
    )
    @SequenceGenerator(
            name = "seq_item",
            allocationSize = 1
    )
    private Long itemId;
    private int quantity;
    private int price;

    @ManyToOne
    private Product product;
}
