package com.example.vnrr.AnnaSampark.entity;

import com.aventrix.jnanoid.jnanoid.NanoIdUtils;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.web.bind.annotation.PostMapping;

import java.time.LocalDateTime;

@Entity
@Data
public class DonationNgo {

    @Id
    private String id;

    @ManyToOne
    private Donation donation;

    @JsonIgnore
    @ManyToOne
    private Ngo ngo;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(nullable = true)
    private DeliveryPartner deliveryPartner;

    private int quantityTaken;

    private String review;
    private int sentimentNumber;

    private boolean confirmed=false;
    private boolean pickedUp=false;
    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    public void setId(){
        if (this.id==null) this.id= NanoIdUtils.randomNanoId();
    }
}
