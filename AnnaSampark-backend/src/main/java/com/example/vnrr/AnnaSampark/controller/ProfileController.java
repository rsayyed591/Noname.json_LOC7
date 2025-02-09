package com.example.vnrr.AnnaSampark.controller;

import com.example.vnrr.AnnaSampark.dto.DonorProfileReqDto;
import com.example.vnrr.AnnaSampark.service.AuthService;
import com.example.vnrr.AnnaSampark.service.ProfileService;
import jakarta.mail.Multipart;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;


@RestController
@RequestMapping("/profile")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @PostMapping("/create_donor_profile")
    public ResponseEntity<?> createDonorProfile(HttpServletRequest request,
                                                @RequestParam("fssai_file") MultipartFile fssai,
                                                @RequestParam("pancard") MultipartFile pancard,
                                                @RequestParam String name,
                                                @RequestParam String address,
                                                @RequestParam String type,
                                                @RequestParam String gstin,
                                                @RequestParam String mobile_number) throws Exception {

        return profileService.createDonorProfile(fssai,pancard,name,address,type,gstin,(String)request.getAttribute("user_id"),mobile_number);
    }

    @PostMapping("/create_ngo_profile")
    public ResponseEntity<?> createNgoProfile(HttpServletRequest request,
                                                @RequestParam("pancard") MultipartFile pancard,
                                                @RequestParam String name,
                                                @RequestParam String address,
                                                @RequestParam String darpanId,
                                                @RequestParam String mobile_number) throws Exception {

        return profileService.createNgoProfile(pancard, name, address,darpanId, (String) request.getAttribute("user_id"),mobile_number);
    }
}
