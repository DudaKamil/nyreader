package org.kduda.nyreader.security.common;

import org.kduda.nyreader.common.user.User;

public class JwtUserFactory {
    private JwtUserFactory() {
    }

    public static JwtUser create(User user) {
        return new JwtUser(user.getId(), user.getUsername(), user.getPassword());
    }
}
