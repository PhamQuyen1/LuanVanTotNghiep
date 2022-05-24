package com.phamquyen.luanvan.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Category {
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "seq_category"
    )
    @SequenceGenerator(
            name = "seq_category",
            allocationSize = 1
    )
    private Long categoryId;
    @Column(unique = true)
    private String categoryName;
    @Column(unique = true)
    private String categoryImage;
}
