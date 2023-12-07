package com.practice.WebBlog.controller.admin;

//import com.practice.WebBlog.models.users.UserAdmin;

import com.practice.WebBlog.ResponseObject;
import com.practice.WebBlog.config.UserInforDetail;
import com.practice.WebBlog.jwt.JwtService;
import com.practice.WebBlog.models.users.Users;
import com.practice.WebBlog.repository.UserRepository;
import com.practice.WebBlog.services.GetPostService;
import com.practice.WebBlog.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
//@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1/admin")
//@Secured("ROLE_ADMIN")
public class admin {
    @Autowired
    UserService userservice;
    @Autowired
    GetPostService getpostservice;

    @GetMapping("/users")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<Users> GetUser() {
        return userservice.GetUserAll();
    }

//    @GetMapping("/users/allnames")
//    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
//    public List<String> GetNames() {
//        return userservice.GetAllName();
//    }


    @PutMapping(path = "/users/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public Users UpdateUser(@RequestBody Users NewUser, @PathVariable Long id) {
        return userservice.UpdateUser(NewUser, id);
    }


//    @GetMapping("/users/{Name}")
//    public ResponseObject FindNameUser(@PathVariable String Name) {
//        return userservice.FindNameUser(Name);
//    }

    //    @DeleteMapping("/deleteUser/{id}")
    @DeleteMapping("/users/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseObject DeleteUser(@PathVariable Long id) {
        return userservice.DeleteUser(id);
    }

//    @DeleteMapping("/deletePost/{id}")
    @DeleteMapping("/post/{id}")// posts/delete/{id}
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseObject DeleteMyPost(@PathVariable Long id) {
        return getpostservice.DeletePost(id);
    }

}
