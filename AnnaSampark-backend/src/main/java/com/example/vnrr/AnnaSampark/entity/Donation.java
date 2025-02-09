package com.example.vnrr.AnnaSampark.entity;


import com.aventrix.jnanoid.jnanoid.NanoIdUtils;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Donation {

    @Id
    private String id;

    private String foodName;
    private int quantity;
    private int capacity;
    private String foodImage;
    private String type;
    private String aiBasedQuality;


    @JsonIgnore
    @ManyToOne
    @JoinColumn(nullable = true)
    private Donor donor;

    private String qrCodePath;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    public void setId(){
        if (this.id==null) this.id= NanoIdUtils.randomNanoId();
    }



}
