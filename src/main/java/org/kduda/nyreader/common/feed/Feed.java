package org.kduda.nyreader.common.feed;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document
public class Feed {
    private String url;
    private String title;
    private String description;
    private String link;
    private List<Entry> entries;

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public List<Entry> getEntries() {
        return entries;
    }

    public void setEntries(List<Entry> entries) {
        this.entries = entries;
    }

    @Override
    public String toString() {
        return "Feed{" +
            "url='" + url + '\'' +
            ", title='" + title + '\'' +
            ", description='" + description + '\'' +
            ", link='" + link + '\'' +
            ", entries=" + entries +
            '}';
    }
}
