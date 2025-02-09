package com.example.vnrr.AnnaSampark.service;


import com.example.vnrr.AnnaSampark.repository.CustomUserRepository;
import com.example.vnrr.AnnaSampark.dto.RegisterUserReqDTO;
import com.example.vnrr.AnnaSampark.entity.CustomUser;
import com.example.vnrr.AnnaSampark.exceptions.CustomException;
import com.example.vnrr.AnnaSampark.utility.JwtUtility;
import com.example.vnrr.AnnaSampark.utility.MailUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private CustomUserRepository customUserRepository;

    @Autowired
    private JwtUtility jwtUtility;

    @Autowired
    private BCryptPasswordEncoder encoder;

    @Autowired
    private MailUtility mailUtility;



    private boolean userExists(String email) {

        return customUserRepository.findByEmail(email).isPresent();
    }

    public ResponseEntity<?> registerUser(RegisterUserReqDTO registerUserReqDTO) throws Exception {
        String password = registerUserReqDTO.getPassword();

        if (userExists(registerUserReqDTO.getEmail())) {
            throw new CustomException(HttpStatus.BAD_REQUEST,"User Already Exists..with email : " + registerUserReqDTO.getEmail());
        } else {
            CustomUser user = new CustomUser();
            user.setEmail(registerUserReqDTO.getEmail());
            user.setHashed_password(encoder.encode(password));
            user.setRole(registerUserReqDTO.getRole());
            user = customUserRepository.save(user);
            String token = jwtUtility.createToken(user.getId(), user.getEmail(),user.getRole());
            Map<String, Object> data = new HashMap<>();
            data.put("email", user.getEmail());
//            mailUtility.sendTemplateMail(user.getEmail(),"Welcome to spring boot todo" ,data);
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("token",token,"role", user.getRole()));
        }
    }


    public ResponseEntity<?> loginUser(String email, String password) {
        Optional<CustomUser> user = customUserRepository.findByEmail(email);
        if (user.isEmpty())
            throw new CustomException(HttpStatus.BAD_REQUEST,"No Such User exists...");
        if (!encoder.matches(password, user.get().getHashed_password()))
            throw new CustomException(HttpStatus.BAD_REQUEST,"Incorrect Password...");

        String token = jwtUtility.createToken(user.get().getId(), user.get().getRole(),user.get().getRole());
        return ResponseEntity.status(200).body(Map.of("token",token,"role", user.get().getRole()));

    }


}






