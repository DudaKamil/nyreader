package org.kduda.nyreader.common.User;

import org.springframework.data.annotation.Id;

public class User {
	@Id
	private String id;

	private String username;
	private String password;

	public User(String username, String password) {
		this.username = username;
		this.password = password;
	}

}
