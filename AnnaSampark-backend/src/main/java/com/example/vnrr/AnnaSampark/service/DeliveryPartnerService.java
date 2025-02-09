package com.example.vnrr.AnnaSampark.service;

import com.example.vnrr.AnnaSampark.dto.DeliveryPartnerReq;
import com.example.vnrr.AnnaSampark.entity.CustomUser;
import com.example.vnrr.AnnaSampark.entity.DeliveryPartner;
import com.example.vnrr.AnnaSampark.entity.Ngo;
import com.example.vnrr.AnnaSampark.repository.CustomUserRepository;
import com.example.vnrr.AnnaSampark.repository.DeliveryPartnerRepository;
import com.example.vnrr.AnnaSampark.repository.NgoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeliveryPartnerService {

    @Autowired
    private DeliveryPartnerRepository partnerRepository;

    @Autowired
    private NgoRepository ngoRepository;

    @Autowired
    private CustomUserRepository userRepository;


    public ResponseEntity<?> addPartner(DeliveryPartnerReq partnerReq, String userId) {
        CustomUser user=userRepository.getReferenceById(userId);
        Ngo ngo=ngoRepository.findByUser(user).get();
        DeliveryPartner partner=new DeliveryPartner();
        partner.setNgo(ngo);
        partner.setName(partnerReq.getName());
        partner.setLoginId(partner.getName()+"123");
        partner.setLoginPassword(partnerReq.getPassword());
        partnerRepository.save(partner);

        return ResponseEntity.status(201).build();

    }

    public ResponseEntity<?> getPartners(String userId) {
        CustomUser user=userRepository.getReferenceById(userId);
        Ngo ngo=ngoRepository.findByUser(user).get();
         List<DeliveryPartner> partnerList =partnerRepository.findByNgo(ngo);
         return ResponseEntity.status(200).body(partnerList);
    }
}
