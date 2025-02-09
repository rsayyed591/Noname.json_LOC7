package com.example.vnrr.AnnaSampark.entity;

import com.aventrix.jnanoid.jnanoid.NanoIdUtils;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DeliveryPartner {

    @Id
    private String id;

    @Column(nullable = false)
    private String name;

    @JsonIgnore
    @ManyToOne
    private Ngo ngo;

    private String loginId;
    private String loginPassword;



    @PrePersist
    public void setId(){
        if (this.id==null) this.id= NanoIdUtils.randomNanoId();
    }
}
