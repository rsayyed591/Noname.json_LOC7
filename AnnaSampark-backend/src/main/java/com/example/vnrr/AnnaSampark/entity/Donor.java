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
public class Donor {

    @Id
    private String id;

    @JsonIgnore
    @OneToOne
    private CustomUser user;

    @Column(nullable = false,unique = true)
    private String name;

    @Column(nullable = false,length = 500)
    private String address;

    private double lat;

    private double lon;

    @Column(nullable = false)
    private String type;

    @Column(nullable = false)
    private String gstinNumber;

    private int tokens_generated;

    private String mobileNumber;

    @Column(nullable = true)
    private String fassaiLicensePath;

    @Column(nullable = true)
    private String pancardFilePath;


    @PrePersist
    public void setId(){
        if (this.id==null) this.id= NanoIdUtils.randomNanoId();
    }

}
