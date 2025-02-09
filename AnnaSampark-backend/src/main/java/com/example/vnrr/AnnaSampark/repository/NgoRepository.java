package com.example.vnrr.AnnaSampark.repository;

import com.example.vnrr.AnnaSampark.entity.CustomUser;
import com.example.vnrr.AnnaSampark.entity.Ngo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface NgoRepository extends JpaRepository<Ngo,String> {

    Optional<Ngo> findByUser(CustomUser user);

}
