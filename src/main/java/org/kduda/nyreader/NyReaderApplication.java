package org.kduda.nyreader;

import org.kduda.nyreader.common.User.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class NyReaderApplication {
	@Autowired
	UserRepository userRepository;

	public static void main(String[] args) {
		SpringApplication.run(NyReaderApplication.class, args);
	}
}
