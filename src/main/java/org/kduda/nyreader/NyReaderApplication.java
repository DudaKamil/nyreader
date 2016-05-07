package org.kduda.nyreader;

import org.kduda.nyreader.common.user.User;
import org.kduda.nyreader.common.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class NyReaderApplication implements CommandLineRunner {
	@Autowired
	UserRepository userRepository;

	public static void main(String[] args) {
		SpringApplication.run(NyReaderApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		PasswordEncoder encoder = new BCryptPasswordEncoder();

		userRepository.deleteAll();

		User user = new User();
		user.setUsername("user@example.com");
		user.setPassword(encoder.encode("user"));

		User admin = new User();
		admin.setUsername("admin@example.com");
		admin.setPassword(encoder.encode("admin"));

		userRepository.save(user);
		userRepository.save(admin);
	}
}
