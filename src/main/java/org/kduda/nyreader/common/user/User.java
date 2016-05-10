package org.kduda.nyreader.common.user;

import org.kduda.nyreader.common.feed.Feed;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document
public class User {
    @Id
    private String id;
    private String username;
    private String password;
    private List<Feed> feeds;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Feed> getFeeds() {
        return feeds;
    }

    public void setFeeds(List<Feed> feeds) {
        this.feeds = feeds;
    }

    @Override
    public String toString() {
        return "User{" +
            "id='" + id + '\'' +
            ", username='" + username + '\'' +
            ", password='" + password + '\'' +
            ", feeds=" + feeds +
            '}';
    }
}
