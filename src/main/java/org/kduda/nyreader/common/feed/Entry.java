package org.kduda.nyreader.common.feed;

import java.util.Date;

public class Entry {
	private String link;
	private String title;
	private String description;
	private Date date;

	public String getLink() {
		return link;
	}

	public void setLink(String link) {
		this.link = link;
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

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	@Override
	public String toString() {
		return "Entry{" +
			"link='" + link + '\'' +
			", title='" + title + '\'' +
			", description='" + description + '\'' +
			", date=" + date +
			'}';
	}
}
