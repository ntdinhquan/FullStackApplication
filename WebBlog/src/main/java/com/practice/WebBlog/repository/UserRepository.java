package com.practice.WebBlog.repository;

//import com.practice.WebBlog.models.users.UserAdmin;
import com.practice.WebBlog.models.users.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<Users, Long> {
    Optional<Users> findByUserName(String UserName);
}
