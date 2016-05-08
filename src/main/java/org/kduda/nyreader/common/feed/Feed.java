package org.kduda.nyreader.common.feed;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document
public class Feed {
	private String url;
	private List<News> news;

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public List<News> getNews() {
		return news;
	}

	public void setNews(List<News> news) {
		this.news = news;
	}

	@Override
	public String toString() {
		return "Feed{" +
			"url='" + url + '\'' +
			'}';
	}
}
