package com.example.vnrr.AnnaSampark.repository;


import com.example.vnrr.AnnaSampark.entity.Donation;
import com.example.vnrr.AnnaSampark.entity.DonationNgo;
import com.example.vnrr.AnnaSampark.entity.Donor;
import com.example.vnrr.AnnaSampark.entity.Ngo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DonationNgoRepository extends JpaRepository<DonationNgo,String> {
    List<DonationNgo> findByDonationOrderByCreatedAtDesc(Donation donation);
    List<DonationNgo> findByNgo(Ngo ngo);
}
