package org.kduda.nyreader.common.user;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Component;

@Component
public interface UserRepository extends MongoRepository<User, String> {
	User findByUsername(String username);
}
