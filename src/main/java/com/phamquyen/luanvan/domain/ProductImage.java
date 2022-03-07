package com.phamquyen.luanvan.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductImage {

    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "seq_product_image"
    )
    @SequenceGenerator(
            name = "seq_product_image",
            allocationSize = 1
    )
    private Long imageId;

//    @Column(nullable = false, unique = true, length = 50)
    private String imageUrl;

//    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
//    @JoinColumn(name = "product_id")
//    private Product product;
}
