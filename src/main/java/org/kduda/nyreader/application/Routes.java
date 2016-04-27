package org.kduda.nyreader.application;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
public class Routes {
	@RequestMapping("/api/user")
	public Principal user(Principal user) {
		return user;
	}
}
