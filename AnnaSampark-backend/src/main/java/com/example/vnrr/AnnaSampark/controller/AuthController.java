package com.example.vnrr.AnnaSampark.controller;

import com.example.vnrr.AnnaSampark.dto.ErrorResponse;
import com.example.vnrr.AnnaSampark.dto.LoginUserReqDTO;
import com.example.vnrr.AnnaSampark.dto.RegisterUserReqDTO;
import com.example.vnrr.AnnaSampark.exceptions.CustomException;
import com.example.vnrr.AnnaSampark.service.AuthService;
import com.example.vnrr.AnnaSampark.utility.JwtUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/auth")
public class AuthController {


    @Autowired
    private AuthService authService;

    @Autowired
    private JwtUtility jwtUtility;


    @PostMapping("/register_user")
    public ResponseEntity<?> registerUser(@RequestBody RegisterUserReqDTO registerUserReqDTO) throws Exception {

        return authService.registerUser(registerUserReqDTO);
    }

    @PostMapping("/login_user")
    public ResponseEntity<?> loginUser(@RequestBody LoginUserReqDTO loginUserReqDTO) {
        return authService.loginUser(loginUserReqDTO.getEmail(), loginUserReqDTO.getPassword());
    }

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<?> handleException(CustomException exception){
        ErrorResponse errorResponse=new ErrorResponse(exception.getMessage(),exception.getStatus());
        return new ResponseEntity<>(errorResponse,exception.getStatus());
    }


}