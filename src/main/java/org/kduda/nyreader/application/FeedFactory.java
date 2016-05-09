package org.kduda.nyreader.application;

import com.rometools.rome.feed.synd.SyndContent;
import com.rometools.rome.feed.synd.SyndFeed;
import org.kduda.nyreader.common.feed.Entry;
import org.kduda.nyreader.common.feed.Feed;

import java.util.ArrayList;
import java.util.List;

public final class FeedFactory {
	private FeedFactory() {
	}

	public static Feed create(SyndFeed syndFeed, String feedUrl) {
		Feed resultFeed = new Feed();

		resultFeed.setUrl(feedUrl);
		resultFeed.setLink(syndFeed.getLink());
		resultFeed.setTitle(syndFeed.getTitle());
		resultFeed.setDescription(syndFeed.getDescription());

		List<Entry> entries = new ArrayList<>();

		syndFeed.getEntries()
		        .forEach(item -> {
			        Entry entry = new Entry();
			        entry.setTitle(item.getTitle());
			        entry.setLink(item.getLink());
			        entry.setDate(item.getPublishedDate());

			        SyndContent description = item.getDescription();
			        if (description != null)
				        entry.setDescription(description.getValue());

			        entries.add(entry);
		        });

		resultFeed.setEntries(entries);

		return resultFeed;
	}
}
