package org.kduda.nyreader;

import org.kduda.nyreader.common.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class NyReaderApplication implements CommandLineRunner {
	@Autowired
	UserRepository userRepository;

	public static void main(String[] args) {
		SpringApplication.run(NyReaderApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
//		PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
//
//		userRepository.deleteAll();
//
//		User admin = new User();
//		admin.setUsername("admin");
//		admin.setPassword(passwordEncoder.encode("admin"));
//
//		User user = new User();
//		user.setUsername("user");
//		user.setPassword(passwordEncoder.encode("user"));
//
//		userRepository.save(admin);
//		userRepository.save(user);
	}
}
