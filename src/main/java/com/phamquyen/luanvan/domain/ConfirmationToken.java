package com.phamquyen.luanvan.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ConfirmationToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tokenId;

    private String token;


    private LocalDateTime createAt;

    private LocalDateTime expiredAt;
    private LocalDateTime confirmAt;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users users;

    public ConfirmationToken(String token, LocalDateTime createAt, LocalDateTime expiredAt, Users users) {
        this.token = token;
        this.createAt = createAt;
        this.expiredAt = expiredAt;
        this.users = users;
    }
}
