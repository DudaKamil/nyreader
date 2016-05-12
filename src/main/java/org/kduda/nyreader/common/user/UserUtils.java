package org.kduda.nyreader.common.user;

import com.rometools.rome.feed.synd.SyndFeed;
import org.kduda.nyreader.application.FeedFactory;
import org.kduda.nyreader.common.feed.Feed;
import org.kduda.nyreader.security.utils.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class UserUtils {
    @Value("${jwt.token.header}")
    private String TOKEN_HEADER;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserRepository userRepository;

    public User getCurrentUser(HttpServletRequest request) {
        String token = request.getHeader(TOKEN_HEADER);
        String username = jwtTokenUtil.getUsernameFromToken(token);
        return userRepository.findByUsername(username);
    }

    public void addFeed(User user, SyndFeed syndFeed, String feedUrl) {
        List<Feed> feeds = user.getFeeds();
        if (feeds == null)
            feeds = new ArrayList<>();
        feeds.add(FeedFactory.create(syndFeed, feedUrl));
        user.setFeeds(feeds);
    }

    public boolean checkIfHasFeed(User user, String feedUrl) {
        boolean result = false;
        List<Feed> feeds = user.getFeeds();

        if (feeds == null) {
            return false;
        }

        Optional<Feed> duplicates = feeds.parallelStream()
                                         .filter(feed -> feed.getUrl().equals(feedUrl))
                                         .findAny();

        if (duplicates.isPresent())
            result = true;

        return result;
    }

    public boolean saveUser(User user) {
        boolean result = false;

        try {
            userRepository.save(user);
            result = true;
        } catch (Exception e) {
            result = false;
        }

        return result;
    }
}
