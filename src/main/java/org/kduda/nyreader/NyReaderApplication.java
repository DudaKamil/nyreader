package org.kduda.nyreader;

import org.kduda.nyreader.common.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class NyReaderApplication implements CommandLineRunner {
	// TODO: debug - remove
	@Autowired
	UserRepository userRepository;

	public static void main(String[] args) {
		SpringApplication.run(NyReaderApplication.class, args);
	}

	// TODO: debug - remove
	@Override
	public void run(String... args) throws Exception {
//		PasswordEncoder encoder = new BCryptPasswordEncoder();
//
//		userRepository.deleteAll();
//
//		List<Feed> feeds = new ArrayList<>();
//		Feed feed = new Feed();
//		feed.setUrl("http://feeds.bbci.co.uk/news/northern_ireland/rss.xml?edition=uk");
//		Feed feed1 = new Feed();
//		feed1.setUrl("http://rss.gazeta.pl/pub/rss/kielce.xml");
//
//		feeds.add(feed);
//		feeds.add(feed1);
//
//		User user = new User();
//		user.setUsername("user@example.com");
//		user.setPassword(encoder.encode("user"));
//		user.setFeeds(feeds);
//
//		User admin = new User();
//		admin.setUsername("admin@example.com");
//		admin.setPassword(encoder.encode("admin"));
//		admin.setFeeds(feeds);
//
//		userRepository.save(user);
//		userRepository.save(admin);
	}
}
