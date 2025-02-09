package com.example.vnrr.AnnaSampark.repository;

import com.example.vnrr.AnnaSampark.entity.CustomUser;
import com.example.vnrr.AnnaSampark.entity.Donor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DonorRepository extends JpaRepository<Donor,String> {

    Optional<Donor> findByUser(CustomUser user);
}
