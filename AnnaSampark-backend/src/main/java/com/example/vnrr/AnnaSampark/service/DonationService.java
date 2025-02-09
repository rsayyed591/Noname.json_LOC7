package com.example.vnrr.AnnaSampark.service;

import com.example.vnrr.AnnaSampark.dto.ConfirmDonationReq;
import com.example.vnrr.AnnaSampark.entity.*;
import com.example.vnrr.AnnaSampark.repository.*;
import com.example.vnrr.AnnaSampark.utility.ElasticUtility;
import com.example.vnrr.AnnaSampark.utility.MessageUtility;
import org.apache.logging.log4j.message.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;

@Service
public class DonationService {

    @Autowired
    private CustomUserRepository customUserRepository;

    @Autowired
    private DonorRepository donorRepository;

    @Autowired
    private DonationRepository donationRepository;

    @Autowired
    private ElasticUtility elasticUtility;

    @Autowired
    private NgoRepository ngoRepository;

    @Autowired
    private DeliveryPartnerRepository deliveryPartnerRepository;

    @Autowired
    private DonationNgoRepository donationNgoRepository;

    @Autowired
    private MessageUtility messageUtility;

    private static final String UPLOAD_DIR = "uploads";

    public ResponseEntity<?> createDonation(MultipartFile foodImage, String foodName, int foodQuantity, int noOfPeople, String foodType, String userId, String ai_based_quality) throws IOException {
        CustomUser user= customUserRepository.getReferenceById(userId);
        System.out.println(user);
        Donor donor=donorRepository.findByUser(user).get();
        String projectRoot = new File("").getAbsolutePath();
        File uploadDir = new File(projectRoot, UPLOAD_DIR);
        String uniqueId = String.valueOf(System.currentTimeMillis());
        String foodImageName = uniqueId + "_" + foodImage.getOriginalFilename();
        String foodRelativePath = UPLOAD_DIR + "/" + foodImageName;
        Path pancardPath = Paths.get(uploadDir.getAbsolutePath(), foodImageName);
        Files.write(pancardPath, foodImage.getBytes());
        Donation donation=Donation.builder()
                .donor(donor)
                .foodImage(foodRelativePath)
                .foodName(foodName)
                .quantity(foodQuantity)
                .capacity(noOfPeople)
                .type(foodType)
                .aiBasedQuality(ai_based_quality)
                .build();


        donationRepository.save(donation);
        elasticUtility.addDonation(donor.getId(),foodName,foodQuantity,noOfPeople,donor.getLat(),donor.getLon(),foodRelativePath,foodType,donation.getId());
        ;
        for(Map<String ,Object> data: elasticUtility.getNearbyNgo(donor.getLat(),donor.getLon()).getUsers()){
            String mobile_number=(String) data.get("mobile_number");
            messageUtility.sendMssg("+917710982886");
        }
        return ResponseEntity.status(201).build();

    }


    public ResponseEntity<?> confirmDonation(ConfirmDonationReq confirmDonationReq, String userId) {
        String elasticId=confirmDonationReq.getDataId();
        int quantity=Integer.parseInt(confirmDonationReq.getQuantity());
        String donorId=confirmDonationReq.getDonorId();
        String partnerId=confirmDonationReq.getPartnerId();
        String donationid=confirmDonationReq.getDonationId();

        Donation donation=donationRepository.getReferenceById(donationid);
        CustomUser user=customUserRepository.getReferenceById(userId);
        Ngo ngo=ngoRepository.findByUser(user).get();
        DeliveryPartner partner=deliveryPartnerRepository.getReferenceById(partnerId);
        if (quantity==donation.getQuantity()){
//            donation.setConfirmed(true);
//            donation.setDeliveryPartner(partner);
//            donation.setNgo(ngo);
            DonationNgo donationNgo=new DonationNgo();
            donationNgo.setDonation(donation);
            donationNgo.setDeliveryPartner(partner);
            donationNgo.setQuantityTaken(quantity);
            donationNgo.setNgo(ngo);
            donationNgo.setConfirmed(true);
            donationNgoRepository.save(donationNgo);
            elasticUtility.deleteDonation(elasticId);
        }
        else{
            Donor donor=donation.getDonor();
            DonationNgo donationNgo=new DonationNgo();
            donationNgo.setDonation(donation);
            donationNgo.setDeliveryPartner(partner);
            donationNgo.setQuantityTaken(donation.getQuantity()-quantity);
            donationNgo.setNgo(ngo);
            donationNgo.setConfirmed(true);
            donationNgoRepository.save(donationNgo);
            elasticUtility.deleteDonation(elasticId);
            elasticUtility.updateDonation(donationid,donorId, donation.getFoodName(), donation.getQuantity(),donation.getCapacity()-quantity,donation.getFoodImage(), donation.getType(),donor.getLat(),donor.getLon(),elasticId);
        }
        return ResponseEntity.status(200).build();
    }

    public ResponseEntity<?> getDetails(String id) {
        return ResponseEntity.status(200).body(donationRepository.getReferenceById(id));
    }
}
