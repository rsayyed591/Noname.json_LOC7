package com.example.vnrr.AnnaSampark.utility;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.time.Duration;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtility {

    private final Key SECRET_KEY;

    public JwtUtility(SecretsLoader loader){
        this.SECRET_KEY = Keys.hmacShaKeyFor(loader.getJWT_SECRET().getBytes());
    }

    private Claims extractBody(String token){

        return Jwts.parserBuilder().setSigningKey(SECRET_KEY).build().parseClaimsJws(token).getBody();
    }

    public Map<String,String> isValid(String token){
        Map<String,String> authData=new HashMap<>();
        Claims body=extractBody(token);
        if (body.getExpiration().after(new Date())){
            authData.put("status","true");
            authData.put("user_id", String.valueOf(body.get("user_id")));
            return authData;
        }
        authData.put("status","false");
        return authData;

    }

    public String createToken(String id,String email,String role){
        Map<String,String> claims=new HashMap<>();
        claims.put("user_id",id);
        claims.put("role",role);
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + Duration.ofDays(30).toMillis()))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();


    }


}
