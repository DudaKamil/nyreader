package org.kduda.nyreader.controllers;

import org.kduda.nyreader.common.user.ChangePasswordRequest;
import org.kduda.nyreader.common.user.User;
import org.kduda.nyreader.common.user.UserDetailsServiceImpl;
import org.kduda.nyreader.common.user.UserUtils;
import org.kduda.nyreader.security.common.JwtUser;
import org.kduda.nyreader.security.domain.JwtAuthenticationRequest;
import org.kduda.nyreader.security.service.JwtAuthenticationResponse;
import org.kduda.nyreader.security.utils.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mobile.device.Device;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
public class UserController {
    @Value("${jwt.token.header}")
    private String TOKEN_HEADER;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private UserUtils userUtils;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @RequestMapping(value = "/user", method = RequestMethod.GET)
    public JwtUser getAuthenticatedUser(HttpServletRequest request) {
        String token = request.getHeader(TOKEN_HEADER);
        String username = jwtTokenUtil.getUsernameFromToken(token);
        return (JwtUser) userDetailsService.loadUserByUsername(username);
    }

    @RequestMapping(value = "/user/change", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody ChangePasswordRequest changePasswordRequest, HttpServletRequest request)
        throws Exception {
        User user = userUtils.getCurrentUser(request);
        String currentPassword = changePasswordRequest.getCurrentPassword();
        String newPassword = changePasswordRequest.getNewPassword();

        if (passwordEncoder.matches(currentPassword, user.getPassword())) {
            user.setPassword(passwordEncoder.encode(newPassword));
            userUtils.saveUser(user);
            return ResponseEntity.ok("success");
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("error");
    }
}
