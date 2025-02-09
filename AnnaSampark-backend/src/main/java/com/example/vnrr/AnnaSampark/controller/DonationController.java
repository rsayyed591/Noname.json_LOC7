package com.example.vnrr.AnnaSampark.controller;


import com.example.vnrr.AnnaSampark.dto.ConfirmDonationReq;
import com.example.vnrr.AnnaSampark.service.DonationService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/donation")
public class DonationController {

    @Autowired
    private DonationService donationService;

    @PostMapping("/create_donation")
    public ResponseEntity<?> createDonation(@RequestParam("food_image")MultipartFile foodImage,
                                            @RequestParam String food_name,
                                            @RequestParam int food_quantity,
                                            @RequestParam int no_of_people,
                                            @RequestParam String food_type,
                                            @RequestParam String ai_based_quality,
                                            HttpServletRequest servletRequest
    ) throws IOException {
        return donationService.createDonation(foodImage,food_name,food_quantity,no_of_people,food_type,(String) servletRequest.getAttribute("user_id"),ai_based_quality);
    }

    @PostMapping("/confirm_donation")
    public ResponseEntity<?> confirmDonationFromNgo(@RequestBody ConfirmDonationReq confirmDonationReq,HttpServletRequest request){
        return donationService.confirmDonation(confirmDonationReq,(String)request.getAttribute("user_id"));

    }

    @GetMapping("/get_details/{id}")
    public ResponseEntity<?> getDonationDetails(@PathVariable("id") String id){
        return donationService.getDetails(id);

    }

}
