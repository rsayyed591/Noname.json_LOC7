package com.example.vnrr.AnnaSampark.exceptions;

import org.springframework.http.HttpStatus;


public class CustomException extends   RuntimeException{

    private String message;
    private HttpStatus status;

    public CustomException(HttpStatus status, String message) {
        this.status = status;
        this.message = message;
    }

    @Override
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public void setStatus(HttpStatus status) {
        this.status = status;
    }
}
