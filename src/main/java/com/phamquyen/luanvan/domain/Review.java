package com.phamquyen.luanvan.domain;

import com.phamquyen.luanvan.domain.compositeKey.CommentId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@IdClass(CommentId.class)
public class Review {

    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "seq_review"
    )
    @SequenceGenerator(
            name = "seq_review",
            allocationSize = 1
    )
    private Long reviewId;

    @Id
    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users user;

    @Id
    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;


    private String comment;
    private int reviewScore;
    private LocalDateTime createAt;
}
