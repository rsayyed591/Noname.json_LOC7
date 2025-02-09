package com.example.vnrr.AnnaSampark.controller;


import com.example.vnrr.AnnaSampark.utility.ElasticUtility;
import com.example.vnrr.AnnaSampark.utility.GoogleMapsUtility;
import com.example.vnrr.AnnaSampark.utility.MessageUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/test")
public class TestController {

    @Autowired
    private GoogleMapsUtility googleMapsUtility;
    @Autowired
    private RestTemplate restTemplate;

    private static final String UPLOAD_DIR = "uploads";

    @Autowired
    private MessageUtility messageUtility;

    @Autowired
    private ElasticUtility elasticUtility;

    @GetMapping("/test")
    public ResponseEntity<?> testupload(){
//        messageUtility.sendMssg();

        for(Map<String ,Object> data: elasticUtility.getNearbyNgo(18.9324806,72.8315166).getUsers()){
            String mobile_number=(String) data.get("mobile_number");
            messageUtility.sendMssg("+917710982886");
        }
        return ResponseEntity.status(200).body(Map.of("status","Server is Running"));
    }

    @PostMapping("/test-upload")
    public ResponseEntity<?> testupload(@RequestParam("fssai") MultipartFile fssai) throws IOException {
        // Get the absolute path of the project root
        String projectRoot = new File("").getAbsolutePath();

        File uploadDir = new File(projectRoot, UPLOAD_DIR);
        String uniqueId = String.valueOf(System.currentTimeMillis());
        String fssaiFilename = uniqueId + "_" + fssai.getOriginalFilename();
        Path fssaiPath = Paths.get(uploadDir.getAbsolutePath(), fssaiFilename);
        Files.write(fssaiPath, fssai.getBytes());
        System.out.println("FSSAI File saved at: " + fssaiPath.toAbsolutePath());

        return ResponseEntity.status(200).build();
    }

    @PostMapping("/test_geocoding")
    public void addDonation() {
//        String url = "http://localhost:5000/donation/add_donation";
//
//        Map<String, Object> requestBody = new HashMap<>();
//        requestBody.put("doner_id", 101);
//        requestBody.put("ngo_id", 202);
//        requestBody.put("food_name", "Rice");
//        requestBody.put("quantity", 50);
//        requestBody.put("no_of_people", 100);
//
//        Map<String, Double> location = new HashMap<>();
//        location.put("lat", 40.7306);
//        location.put("lon", -73.9352);
//        requestBody.put("location_of_food", location);
//
//        RestTemplate restTemplate = new RestTemplate();
//        ResponseEntity<String> response = restTemplate.postForEntity(url, requestBody, String.class);
//
//        System.out.println("Response: " + response.getBody());

    }

//        public String addUser() {
//            String url = "http://localhost:5000/users/add_user";
//
//            Map<String, Object> requestBody = new HashMap<>();
//            requestBody.put("user_id", 1);
//            requestBody.put("name", "John Doe");
//            requestBody.put("address", "New York");
//            requestBody.put("role", "Donor");
//
//            Map<String, Double> location = new HashMap<>();
//            location.put("lat", 40.7128);
//            location.put("lon", -74.0060);
//            requestBody.put("location", location);
//
//            ResponseEntity<String> response = restTemplate.postForEntity(url, requestBody, String.class);
//
//            System.out.println("Response: " + response.getBody());
//            return "Ok";
//        }

//        return googleMapsUtility.getCoordinates("Mangalwadi,Girgaon,Mumbai 400002");
    }



