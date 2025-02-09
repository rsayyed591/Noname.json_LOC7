package com.example.vnrr.AnnaSampark.utility;


import com.example.vnrr.AnnaSampark.dto.Nearby;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Component
public class ElasticUtility {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private MessageUtility messageUtility;

    @Async
    public void addUser(String user_id, String name, String address, String role, Double lat, Double lon, String mobileNumber) {
        String url = "http://localhost:5000/users/add_user";

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("user_id", user_id);
        requestBody.put("name", name);
        requestBody.put("address", address);
        requestBody.put("role", role);
        requestBody.put("mobile_number", mobileNumber);

        Map<String, Double> location = new HashMap<>();
        location.put("lat", lat);
        location.put("lon", lon);
        requestBody.put("location", location);

        restTemplate.postForEntity(url, requestBody, String.class);

    }

    @Async
    public void addDonation(String doner_id, String food_name, int quantity, int people, double lat, double lon, String foodRelativePath, String foodType, String id) {
        String url = "http://localhost:5000/donation/add_donation";

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("doner_id", doner_id);
        requestBody.put("food_name", food_name);
        requestBody.put("quantity", quantity);
        requestBody.put("no_of_people", people);
        requestBody.put("food_image", foodRelativePath);
        requestBody.put("type", foodType);
        requestBody.put("donation_id", id);

        Map<String, Double> location = new HashMap<>();
        location.put("lat", lat);
        location.put("lon", lon);
        requestBody.put("location_of_food", location);

        ResponseEntity<String> response = restTemplate.postForEntity(url, requestBody, String.class);

        System.out.println("Response: " + response.getBody());
    }

    public String deleteDonation(String donationId) {

        // Create JSON payload
        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("id", donationId);

        // Set headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Create request entity
        HttpEntity<Map<String, String>> requestEntity = new HttpEntity<>(requestBody, headers);

        // Send POST request
        ResponseEntity<String> response = restTemplate.postForEntity("http://localhost:5000//donations/delete", requestEntity, String.class);

        return response.getBody();
    }

    public void updateDonation(String donationId, String donorId, String foodName, int quantity,
                               int people, String foodImage, String foodType, double lat, double lon, String elasticId) {
        // Prepare request payload
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("donation_id", donationId);
        requestBody.put("donor_id", donorId);
        requestBody.put("food_name", foodName);
        requestBody.put("quantity", quantity);
        requestBody.put("food_image", foodImage);
        requestBody.put("type", foodType);
        requestBody.put("people", people);
        requestBody.put("id", elasticId);

        // Hardcoded location
        Map<String, Double> location = new HashMap<>();
        location.put("lat", lat);
        location.put("lon", lon);
        requestBody.put("location_of_food", location);

        // Set headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Create request entity
        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);

        // Send POST request
        ResponseEntity<String> response = restTemplate.postForEntity("http://localhost:500//donations/update", requestEntity, String.class);

        // Print response
        System.out.println("Response: " + response.getBody());

    }

    public int getSentimentValue(String review) {
        String url = "http://localhost:5000/get_sentiment"; // FastAPI URL

        // Create request body as a HashMap
        HashMap<String, String> requestBody = new HashMap<>();
        requestBody.put("review", review);

        // Set headers
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");

        // Wrap in HttpEntity
        HttpEntity<HashMap<String, String>> requestEntity = new HttpEntity<>(requestBody, headers);

        // Use RestTemplate
        ResponseEntity<HashMap> response = restTemplate.exchange(url, HttpMethod.POST, requestEntity, HashMap.class);

        // Get response body
        HashMap<String, Object> responseBody = response.getBody();
        int value = (int) responseBody.get("value");
        return value;
    }

    public Nearby getNearbyNgo(double lat, double lon) {
        String url = "http://localhost:5000/users/nearby"; // Adjust the URL as needed

        // Create request body using a Map
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("role", "ngo");
        requestBody.put("distance", "30");

        // Create nested location map
        Map<String, String> location = new HashMap<>();
        location.put("lat", String.valueOf(lat));
        location.put("lon", String.valueOf(lon));
        requestBody.put("location", location);

        // Set HTTP headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Create HTTP entity with headers and body
        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);

        // Make the REST call
        ResponseEntity<Nearby> responseEntity = restTemplate.exchange(
                url,
                HttpMethod.POST,
                requestEntity,
                Nearby.class
        );

        return responseEntity.getBody();
    }
}
