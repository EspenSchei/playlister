package com.espensk.playlister;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class PlaylisterApplication {

  public static void main(String[] args) {
    SpringApplication.run(PlaylisterApplication.class, args);
  }
}
