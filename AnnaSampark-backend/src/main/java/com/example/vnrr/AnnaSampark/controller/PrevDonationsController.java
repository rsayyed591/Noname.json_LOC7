package com.example.vnrr.AnnaSampark.controller;

import com.example.vnrr.AnnaSampark.entity.*;
import com.example.vnrr.AnnaSampark.repository.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/prev_donations")
public class PrevDonationsController {

    @Autowired
    private CustomUserRepository customUserRepository;

    @Autowired
    private DonationNgoRepository donationNgoRepository;

    @Autowired
    private DonorRepository donorRepository;

    @Autowired
    private NgoRepository ngoRepository;

    @Autowired
    private DonationRepository donationRepository;

    @GetMapping("/donor")
    public ResponseEntity<?> showToDonor(HttpServletRequest request){
        String user_id=(String)request.getAttribute("user_id");
        CustomUser user=customUserRepository.getReferenceById(user_id);
        Donor donor=donorRepository.findByUser(user).get();
        List<Donation> donationList=donationRepository.findByDonorOrderByCreatedAtDesc(donor);
        return ResponseEntity.status(200).body(donationList);

    }

    @GetMapping("/show_details_to_donor/{id}")
    public ResponseEntity<?> showDetailsOfDonation(@PathVariable(name = "id") String id){
        Donation donation=donationRepository.getReferenceById(id);
        List<DonationNgo> donationNgoList =donationNgoRepository.findByDonationOrderByCreatedAtDesc(donation);
        return ResponseEntity.status(200).body(Map.of("donation",donation,"donation_list",donationNgoList));

    }

    @GetMapping("/ngo")
    public ResponseEntity<?> showToNgo(HttpServletRequest request){
        String user_id=(String)request.getAttribute("user_id");
        CustomUser user=customUserRepository.getReferenceById(user_id);
        Ngo ngo=ngoRepository.findByUser(user).get();
        List<DonationNgo> donationNgoList=donationNgoRepository.findByNgo(ngo);
        return ResponseEntity.status(200).body(donationNgoList);

    }



}
