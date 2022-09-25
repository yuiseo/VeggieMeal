package com.veggiemeal.dealcrawler;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class DealcrawlerApplication {

	public static void main(String[] args) {
		SpringApplication.run(DealcrawlerApplication.class, args);
	}

}
