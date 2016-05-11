package org.kduda.nyreader.controllers;

import com.rometools.rome.feed.synd.SyndFeed;
import org.kduda.nyreader.application.FeedReaderService;
import org.kduda.nyreader.common.feed.Feed;
import org.kduda.nyreader.common.user.User;
import org.kduda.nyreader.common.user.UserRepository;
import org.kduda.nyreader.common.user.UserUtils;
import org.kduda.nyreader.security.utils.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
public class FeedsController {
    @Autowired
    FeedReaderService feedReaderService;

    @Autowired
    UserUtils userUtils;

    @Value("${jwt.token.header}")
    private String TOKEN_HEADER;

    @Autowired
    private UserRepository userRepository;

    @RequestMapping(value = "/feed", method = RequestMethod.GET)
    public List<Feed> getUserFeeds(HttpServletRequest request) {
        User user = this.userUtils.getCurrentUser(request);
        return user.getFeeds();
    }

    @RequestMapping(value = "/feed", method = RequestMethod.POST)
    public ResponseEntity<?> addFeed(@RequestBody String feedUrl, HttpServletRequest request) {
        User user = this.userUtils.getCurrentUser(request);
        boolean hasFeed = this.userUtils.checkIfHasFeed(user, feedUrl);

        if (hasFeed)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("exists");

        boolean isValid = this.feedReaderService.checkValidity(feedUrl);

        if (isValid) {
            SyndFeed syndFeed = this.feedReaderService.getCurrentFeed();
            this.userUtils.addFeed(user, syndFeed, feedUrl);

            userRepository.save(user);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("error");
        }

        return ResponseEntity.ok("success");
    }

    @RequestMapping(value = "/feed/delete", method = RequestMethod.POST)
    public ResponseEntity<?> deleteFeed(@RequestBody String url, HttpServletRequest request) {
        User user = this.userUtils.getCurrentUser(request);
        List<Feed> feeds = user.getFeeds();

        feeds.removeIf(feed -> feed.getUrl().equals(url));

        user.setFeeds(feeds);
        userRepository.save(user);
        return ResponseEntity.ok("success");
    }
}
