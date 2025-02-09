package com.example.vnrr.AnnaSampark.controller;

import com.example.vnrr.AnnaSampark.entity.DonationNgo;
import com.example.vnrr.AnnaSampark.repository.DonationNgoRepository;
import com.example.vnrr.AnnaSampark.utility.ElasticUtility;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/sentiment")
public class SentimentController {

    @Autowired
    private DonationNgoRepository donationNgoRepository;

    @Autowired
    private ElasticUtility elasticUtility;

    @PostMapping("/add")
    public ResponseEntity<?> getReview(@RequestParam("review") String review,@RequestParam("donation_ngo_id") String donationNgoId, HttpServletRequest request){
        int value=elasticUtility.getSentimentValue(review);
        DonationNgo donationNgo =donationNgoRepository.getReferenceById(donationNgoId);
        donationNgo.setReview(review);
        donationNgo.setSentimentNumber(value);
        return ResponseEntity.status(201).build();
    }
}
