package org.kduda.nyreader.security;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

public class JwtUser implements UserDetails {
	private final String id;
	private final String username;
	private final String password;

	public JwtUser(String id, String username, String password) {
		this.id = id;
		this.username = username;
		this.password = password;
	}

	@JsonIgnore
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return null;
	}

	@JsonIgnore
	public String getId() {
		return this.id;
	}

	@JsonIgnore
	@Override
	public String getPassword() {
		return this.password;
	}

	@Override
	public String getUsername() {
		return this.username;
	}

	@JsonIgnore
	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@JsonIgnore
	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@JsonIgnore
	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@JsonIgnore
	@Override
	public boolean isEnabled() {
		return true;
	}
}
