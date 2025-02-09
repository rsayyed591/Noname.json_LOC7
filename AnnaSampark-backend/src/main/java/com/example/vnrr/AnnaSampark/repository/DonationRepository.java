package com.example.vnrr.AnnaSampark.repository;


import com.example.vnrr.AnnaSampark.entity.Donation;
import com.example.vnrr.AnnaSampark.entity.Donor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DonationRepository extends JpaRepository<Donation,String> {
    List<Donation> findByDonorOrderByCreatedAtDesc(Donor donor);

}
