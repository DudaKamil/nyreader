package org.kduda.nyreader.controllers;

import org.kduda.nyreader.common.feed.Feed;
import org.kduda.nyreader.common.user.User;
import org.kduda.nyreader.common.user.UserRepository;
import org.kduda.nyreader.security.utils.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;

@RestController
public class FeedsController {
	@Value("${jwt.token.header}")
	private String TOKEN_HEADER;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Autowired
	private UserRepository userRepository;

	@RequestMapping(value = "/feed", method = RequestMethod.GET)
	public List<Feed> getUserFeeds(HttpServletRequest request) {
		String token = request.getHeader(TOKEN_HEADER);
		String username = jwtTokenUtil.getUsernameFromToken(token);
		User user = userRepository.findByUsername(username);
		return user.getFeeds();
	}

	@RequestMapping(value = "/feed", method = RequestMethod.POST)
	public ResponseEntity<?> register(@RequestBody String json, HttpServletRequest request) {
		String token = request.getHeader(TOKEN_HEADER);
		String username = jwtTokenUtil.getUsernameFromToken(token);
		User user = userRepository.findByUsername(username);
		Feed newFeed = new Feed();
		newFeed.setUrl(json);
		user.getFeeds().add(newFeed);
		userRepository.save(user);
		// TODO: feed url check
		return ResponseEntity.ok("success");
	}

	@RequestMapping(value = "/feed/delete", method = RequestMethod.POST)
	public ResponseEntity<?> deleteFeed(@RequestBody String url, HttpServletRequest request) {
		String token = request.getHeader(TOKEN_HEADER);
		String username = jwtTokenUtil.getUsernameFromToken(token);
		User user = userRepository.findByUsername(username);
		List<Feed> feeds = user.getFeeds();
		feeds.removeIf(feed -> feed.getUrl().equals(url));

		user.setFeeds(feeds);
		userRepository.save(user);
		return ResponseEntity.ok("success");
	}
}
