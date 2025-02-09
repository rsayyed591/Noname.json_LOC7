package com.example.vnrr.AnnaSampark.dto;

import org.springframework.http.HttpStatus;

public class ErrorResponse {

    private String message;
    private HttpStatus httpStatus;

    public ErrorResponse(String message,HttpStatus status){
        this.httpStatus=status;
        this.message=message;
    }

}
