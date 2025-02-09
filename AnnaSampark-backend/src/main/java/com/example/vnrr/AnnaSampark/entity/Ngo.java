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
public class Ngo {

    @Id
    private String id;

    @JsonIgnore
    @OneToOne
    private CustomUser user;

    @Column(nullable = false, unique = true)
    private String name;
    @Column(nullable = false, length = 500)
    private String address;
    private double lat;
    private double lon;

    private String darpanId;
    private String panCardPath;

    private String mobileNumber;

    @PrePersist
    public void setId(){
        if (this.id==null) this.id= NanoIdUtils.randomNanoId();
    }

}