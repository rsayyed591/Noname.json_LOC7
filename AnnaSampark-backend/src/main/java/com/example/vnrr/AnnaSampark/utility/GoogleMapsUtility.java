package com.example.vnrr.AnnaSampark.utility;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.ObjectCodec;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Component
public class GoogleMapsUtility {

    @Autowired
    private RestTemplate template;

    private String API_KEY;
    private static final String BASE_URL = "https://maps.googleapis.com/maps/api/geocode/json";

    @Autowired
    public GoogleMapsUtility(SecretsLoader loader){
        this.API_KEY=loader.getMapsApiKey();

    }

    public Map<String,Double> getCoordinates(String address) throws JsonProcessingException {
        try {
            String url = BASE_URL + "?address=" + address.replace(" ", "%20") + "&key=" + API_KEY;
            String response = template.getForObject(url, String.class);

            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(response);
            JsonNode location = jsonNode.path("results").path(0).path("geometry").path("location");

            if (location.has("lat") && location.has("lng")) {
                Double lat = location.get("lat").asDouble();
                Double lng = location.get("lng").asDouble();
                System.out.println(lat+" " +lng);
                return Map.of("lat", lat, "lon", lng, "status", 1.0);
            }
            return Map.of("status", 0.0);

        }
        catch (Exception e){
            return Map.of("status", 0.0);
        }
    }


}
