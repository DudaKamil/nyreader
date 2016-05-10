package org.kduda.nyreader.security.domain;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class PasswordEncoder extends BCryptPasswordEncoder {
    public PasswordEncoder() {
    }
}
