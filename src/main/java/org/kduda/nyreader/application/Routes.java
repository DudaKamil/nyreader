package org.kduda.nyreader.application;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Routes {
	@RequestMapping(value = "/authentication/login/process", method = RequestMethod.POST)
	public String process() {
		System.out.println("/authentication/login/process");
		return "zalogowano";
	}
}
