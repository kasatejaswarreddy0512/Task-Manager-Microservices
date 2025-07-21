package com.ktsr;

import com.ktsr.model.User;
import com.ktsr.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class UserServiceApplication {

	@Autowired
	private UserRepository userRepository;
	public static void main(String[] args) {
		SpringApplication.run(UserServiceApplication.class, args);
	}


}

