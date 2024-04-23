package com.example.classAppEurekaService;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
public class ClassAppEurekaServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ClassAppEurekaServiceApplication.class, args);
	}

}
