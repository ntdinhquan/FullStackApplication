package com.practice.WebBlog.services;

import com.practice.WebBlog.config.UserInforDetail;
import com.practice.WebBlog.models.users.Users;
import com.practice.WebBlog.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class UserInfoService implements UserDetailsService {

    UserRepository userRepository;
    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    public UserInfoService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

//    public UserInfoService()
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("loadUserByUsername"+username);
        Optional<Users> userInfo = userRepository.findByUserName(username);
        System.out.println("loadUserByUsername"+userInfo);

        return userInfo.map(UserInforDetail::new)
                .orElseThrow(() -> new UsernameNotFoundException("user not found " + username));

    }

    public String addUser(Users userInfo) {
        userInfo.setUserPassword(encoder.encode(userInfo.getUserPassword()));
        userRepository.save(userInfo);
        return "User Added Successfully";
    }
}
