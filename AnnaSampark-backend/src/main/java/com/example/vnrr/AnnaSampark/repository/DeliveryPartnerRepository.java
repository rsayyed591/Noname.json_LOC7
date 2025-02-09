package com.example.vnrr.AnnaSampark.repository;

import com.example.vnrr.AnnaSampark.entity.DeliveryPartner;
import com.example.vnrr.AnnaSampark.entity.Ngo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeliveryPartnerRepository extends JpaRepository<DeliveryPartner,String> {

    List<DeliveryPartner> findByNgo(Ngo ngo);
}
