package com.phamquyen.luanvan.domain.compositeKey;

import com.phamquyen.luanvan.domain.Product;
import com.phamquyen.luanvan.domain.Users;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentId implements Serializable {
    private Users user;
    private Product product;
}
