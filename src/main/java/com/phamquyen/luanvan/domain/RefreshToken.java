package com.phamquyen.luanvan.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.Instant;
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RefreshToken {
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "seq_refresh"
    )
    @SequenceGenerator(
            name = "seq_refresh",
            allocationSize = 1
    )
    private Long tokenId;

    private String token;
    private Instant createAt;

    @OneToOne
    @JoinColumn(name = "user_id")
    private Users user;
}
