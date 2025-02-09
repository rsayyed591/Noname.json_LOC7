package com.example.vnrr.AnnaSampark.dto;


import jakarta.persistence.Entity;
import lombok.*;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterUserReqDTO {

    private String email;
    private String password;
    private String role;

}
