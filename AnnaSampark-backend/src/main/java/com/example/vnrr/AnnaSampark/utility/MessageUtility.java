package com.example.vnrr.AnnaSampark.utility;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Component
public class MessageUtility {

    @Autowired
    private RestTemplate template;

        @Async
        public void sendMssg(String mobile_number){
            String url = "https://api.twilio.com/2010-04-01/Accounts/" + ACCOUNT_SID + "/Messages.json";
            try {
                // Create request body
                Map<String, String> requestBody = new HashMap<>();
                requestBody.put("To", mobile_number);

                requestBody.put("Body", "We have a limited quantity of delicious food available right now! If you'd like to grab a meal, click the link below before it's gone!.Restaurant Name:" + "The Dinng Caterers" + " " + "Quantity available:" + "8Kilo");
                System.out.println("Sent");

                // Set headers (Basic Auth)
                HttpHeaders headers = new HttpHeaders();
                headers.setBasicAuth(ACCOUNT_SID, AUTH_TOKEN);
                headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

                // Convert requestBody to Form Data
                StringBuilder formData = new StringBuilder();
                for (Map.Entry<String, String> entry : requestBody.entrySet()) {
                    if (formData.length() > 0) {
                        formData.append("&");
                    }
                    formData.append(entry.getKey()).append("=").append(entry.getValue());
                }

                HttpEntity<String> request = new HttpEntity<>(formData.toString(), headers);

                // Send POST request
                ResponseEntity<String> response = template.exchange(url, HttpMethod.POST, request, String.class);
            }
            catch (Exception e){
                System.out.println(e);
            }
//            return response.getBody();
//            System.out.println("Message sent with SID: " + message.getSid());
    }
}
