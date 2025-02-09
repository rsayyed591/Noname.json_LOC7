package com.example.vnrr.AnnaSampark.controller;


import com.example.vnrr.AnnaSampark.dto.DeliveryPartnerReq;
import com.example.vnrr.AnnaSampark.entity.DeliveryPartner;
import com.example.vnrr.AnnaSampark.repository.DeliveryPartnerRepository;
import com.example.vnrr.AnnaSampark.repository.NgoRepository;
import com.example.vnrr.AnnaSampark.service.DeliveryPartnerService;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/delivery_partner")
public class DeliveryPartnerController {

    @Autowired
    private DeliveryPartnerService deliveryPartnerService;



    @PostMapping("/add")
    public ResponseEntity<?> addPartner(HttpServletRequest httpServletRequest, @RequestBody DeliveryPartnerReq partnerReq){
        return deliveryPartnerService.addPartner(partnerReq,(String) httpServletRequest.getAttribute("user_id"));
    }

    @PostMapping("/get_partners")
    public ResponseEntity<?> getPartners(HttpServletRequest httpServletRequest){
        return deliveryPartnerService.getPartners((String) httpServletRequest.getAttribute("user_id"));
    }





}
