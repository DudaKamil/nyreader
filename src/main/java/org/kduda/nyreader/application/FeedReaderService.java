package org.kduda.nyreader.application;

import com.rometools.rome.feed.synd.SyndFeed;
import com.rometools.rome.io.SyndFeedInput;
import com.rometools.rome.io.XmlReader;
import org.springframework.stereotype.Component;

import java.net.URL;

@Component
public class FeedReaderService {
	private SyndFeed currentFeed;

	public SyndFeed getCurrentFeed() {
		return currentFeed;
	}

	public void read() throws Exception {
		SyndFeedInput syndFeedInput = new SyndFeedInput();

		URL url = new URL("http://rss.gazeta.pl/pub/rss/kielce.xml");
		SyndFeed feed = syndFeedInput.build(new XmlReader(url));
	}

	public boolean checkValidity(String feedUrl) {
		SyndFeedInput syndFeedInput = new SyndFeedInput();
		boolean result = true;
		SyndFeed feed = null;

		try {
			URL url = new URL(feedUrl);
			feed = syndFeedInput.build(new XmlReader(url));
			this.currentFeed = feed;
		} catch (Exception ex) {
			result = false;
		}
		if (feed == null)
			result = false;

		return result;
	}
}

