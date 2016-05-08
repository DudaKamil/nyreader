package org.kduda.nyreader.common.feed;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document
public class Feed {
	private String url;
	private List<News> newsList;


	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public List<News> getNewsList() {
		return newsList;
	}

	public void setNewsList(List<News> newsList) {
		this.newsList = newsList;
	}

	@Override
	public String toString() {
		return "Feed{" +
			"url='" + url + '\'' +
			'}';
	}
}
