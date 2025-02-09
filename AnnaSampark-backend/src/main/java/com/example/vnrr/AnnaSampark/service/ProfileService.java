package com.example.vnrr.AnnaSampark.service;

import com.example.vnrr.AnnaSampark.entity.CustomUser;
import com.example.vnrr.AnnaSampark.entity.Donor;
import com.example.vnrr.AnnaSampark.entity.Ngo;
import com.example.vnrr.AnnaSampark.exceptions.CustomException;
import com.example.vnrr.AnnaSampark.repository.CustomUserRepository;
import com.example.vnrr.AnnaSampark.repository.DonorRepository;
import com.example.vnrr.AnnaSampark.repository.NgoRepository;
import com.example.vnrr.AnnaSampark.utility.ElasticUtility;
import com.example.vnrr.AnnaSampark.utility.GoogleMapsUtility;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class ProfileService {


    @Autowired
    private CustomUserRepository customUserRepository;

    @Autowired
    private DonorRepository donorRepository;

    @Autowired
    private NgoRepository ngoRepository;

    @Autowired
    private GoogleMapsUtility googleMapsUtility;

    @Autowired
    private ElasticUtility elasticUtility;

    @Autowired
    private RestTemplate restTemplate;

    private static final String UPLOAD_DIR = "uploads";

    public ResponseEntity<?> createDonorProfile(MultipartFile fssai, MultipartFile pancard, String name, String address, String type, String gstin, String userId, String mobile_number) throws Exception {

        String projectRoot = new File("").getAbsolutePath();
        File uploadDir = new File(projectRoot, UPLOAD_DIR);


        String uniqueId = String.valueOf(System.currentTimeMillis());
        String fssaiFilename = uniqueId + "_" + fssai.getOriginalFilename();
        String pancardFilename = uniqueId + "_" + pancard.getOriginalFilename();


        String fssaiRelativePath = UPLOAD_DIR + "/" + fssaiFilename;
        String pancardRelativePath = UPLOAD_DIR + "/" + pancardFilename;

        Path fssaiPath = Paths.get(uploadDir.getAbsolutePath(), fssaiFilename);
        Path pancardPath = Paths.get(uploadDir.getAbsolutePath(), pancardFilename);
        Files.write(fssaiPath, fssai.getBytes());
        Files.write(pancardPath, pancard.getBytes());
        CustomUser customUser = customUserRepository.getReferenceById(userId);
//        Map<String,Double> geoData=googleMapsUtility.getCoordinates(address);
//        if (geoData.get("status")==0.0) throw new CustomException(HttpStatus.BAD_REQUEST,"Wrong address..Please Try again");

        String url = "https://maps.googleapis.com/maps/api/geocode/json" + "?address=" + address.replace(" ", "%20") + "&key=" + "AIzaSyCcv4sKhYdZSRhlJBCwIzW89Op3WXv7Rmw";
        String response = restTemplate.getForObject(url, String.class);

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(response);
        JsonNode location = jsonNode.path("results").path(0).path("geometry").path("location");

        if (location.has("lat") && location.has("lng")) {
            Double lat = location.get("lat").asDouble();
            Double lng = location.get("lng").asDouble();


            Donor donor = Donor.builder().address(address).gstinNumber(gstin).fassaiLicensePath(fssaiRelativePath).pancardFilePath(pancardRelativePath).name(name).type(type).user(customUser)
                    .lat(lat)
                    .lon(lng).mobileNumber(mobile_number).build();
            donorRepository.save(donor);
            elasticUtility.addUser(donor.getId(), donor.getName(), donor.getAddress(), "donor", donor.getLat(), donor.getLon(),mobile_number);
            return ResponseEntity.status(200).body(donor);
        }
        throw new CustomException(HttpStatus.BAD_REQUEST,"Wrong address..Please Try again");
    }

    public ResponseEntity<?> createNgoProfile(MultipartFile pancard, String name, String address, String darpanId, String userId, String mobile_number) throws IOException {
        String projectRoot = new File("").getAbsolutePath();
        File uploadDir = new File(projectRoot, UPLOAD_DIR);
        String uniqueId = String.valueOf(System.currentTimeMillis());
        String pancardFilename = uniqueId + "_" + pancard.getOriginalFilename();
        String pancardRelativePath = UPLOAD_DIR + "/" + pancardFilename;
        Path pancardPath = Paths.get(uploadDir.getAbsolutePath(), pancardFilename);
        Files.write(pancardPath, pancard.getBytes());
        CustomUser user = customUserRepository.getReferenceById(userId);

        String url = "https://maps.googleapis.com/maps/api/geocode/json" + "?address=" + address.replace(" ", "%20") + "&key=" + "AIzaSyCcv4sKhYdZSRhlJBCwIzW89Op3WXv7Rmw";
        String response = restTemplate.getForObject(url, String.class);

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(response);
        JsonNode location = jsonNode.path("results").path(0).path("geometry").path("location");

        if (location.has("lat") && location.has("lng")) {
            Double lat = location.get("lat").asDouble();
            Double lng = location.get("lng").asDouble();
            Ngo ngo = Ngo.builder().address(address).name(name).darpanId(darpanId).panCardPath(pancardRelativePath).user(user)
                    .lat(lat)
                    .lon(lng).mobileNumber(mobile_number).build();
            ngoRepository.save(ngo);

            elasticUtility.addUser(ngo.getId(), ngo.getName(), ngo.getAddress(), "ngo", ngo.getLat(), ngo.getLon(),mobile_number);
            return ResponseEntity.status(201).body(ngo);
        }

//        if (geoData.get("status")==0.0) throw new CustomException(HttpStatus.BAD_REQUEST,"Wrong address..Please Try again");
//        Ngo ngo=Ngo.builder().address(address).name(name).darpanId(darpanId).panCardPath(pancardRelativePath).user(user)
//                .lat(lat)
//                .lon(geoData.get("lng")).build();
//        ngoRepository.save(ngo);
//
//        elasticUtility.addUser(ngo.getId(),ngo.getName(),ngo.getAddress(),"ngo",ngo.getLat(),ngo.getLon());
//        return ResponseEntity.status(201).body(ngo);
        throw new CustomException(HttpStatus.BAD_REQUEST,"Wrong address..Please Try again");

    }
}

