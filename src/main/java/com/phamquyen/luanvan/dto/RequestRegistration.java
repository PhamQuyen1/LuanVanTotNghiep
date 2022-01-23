package com.phamquyen.luanvan.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class RequestRegistration {

    private String email;
    private String password;
    private String username;
    private String address;
    private String phone;

}
