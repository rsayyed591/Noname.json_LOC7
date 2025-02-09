package com.example.vnrr.AnnaSampark;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class AnnaSamparkApplication {

	public static void main(String[] args) {
		SpringApplication.run(AnnaSamparkApplication.class, args);
	}

}
