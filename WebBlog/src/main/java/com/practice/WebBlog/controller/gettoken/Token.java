package com.practice.WebBlog.controller.gettoken;

import com.practice.WebBlog.config.UserInforDetail;
import com.practice.WebBlog.jwt.AuthRequest;
import com.practice.WebBlog.jwt.JwtAuthFilter;
import com.practice.WebBlog.jwt.JwtService;
import com.practice.WebBlog.models.users.Users;
import com.practice.WebBlog.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@RestController
//@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/auth")
public class Token {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtService jwtService;

    @Autowired
    UserService userservice;

    @PostMapping("/generateToken")
    public String authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
        if (authentication.isAuthenticated()) {
            return jwtService.generateToken(authRequest.getUsername());
        } else {
            System.out.println("invalid user request !");
            throw new UsernameNotFoundException("invalid user request !");
        }
    }

    @PostMapping(path = "/signup")
    public Users InsertNewUser(@RequestBody Users NewUser){
        return userservice.InsertNewUser(NewUser);
    }

}
