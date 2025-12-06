package com.smartshopai.smartshopbackend.exception;

public class UserAlreadyExitsException extends RuntimeException {
    public UserAlreadyExitsException(String message) {
        super(message);
    }
}
