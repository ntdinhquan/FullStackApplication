package com.practice.WebBlog.services;

//import com.practice.WebBlog.models.users.UserAdmin;
import com.practice.WebBlog.ResponseObject;
import com.practice.WebBlog.models.PostBlog;
import com.practice.WebBlog.models.users.Users;
import com.practice.WebBlog.repository.UserRepository;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;


    //put
    public Users UpdateUser(Users NewUser, Long id) {
        Users updateUser = userRepository.findById(id).map(user -> {
            user.setUserName(NewUser.getUserName());
            user.setUserRoles((NewUser.getUserRoles()));
            return userRepository.save(user);
        }).orElseGet(() -> {
            NewUser.setId(id);
            return userRepository.save(NewUser);
        });
        return updateUser;
    }

    //put user
//    public Users SetRoleUser(Users NewRole, Long id){
//        Users UpdateRoleUser = userRepository.findById(id).map(user -> {
//            user.setUserRoles(NewRole.getUserRoles());
//            return userRepository.save(user);
//        }).orElseGet(() -> {
//            NewRole.setId(id);
//
//            return userRepository.save(NewRole);
//        });
//        return UpdateRoleUser;
//    }

    //post
    public Users InsertNewUser(Users NewUser) {
        NewUser.setUserPassword(passwordEncoder.encode(NewUser.getUserPassword()));
        return userRepository.save(NewUser);
    }



    public List<Users> GetUserAll() {
        return userRepository.findAll();
    }


    public List<String> GetAllName() {
        List<Users> UserName = userRepository.findAll();
        System.out.println(UserName);
        return UserName.stream().map(Users::getUserName).collect(Collectors.toList());
    }

//    public ResponseObject FindNameUser(String Name){
//        Optional<Users> userOptional = userRepository.findByUserName(Name);
//        if(userOptional.isPresent()){
//            Users user = userOptional.get();
//            return new ResponseObject("success","Found user", user);
//        }
//        else {
//            return new ResponseObject("error", "User not found", null);
//        }
//    }
    public ResponseObject FindUser(String name){
        Optional<Users> userOptional = userRepository.findByUserName(name);
        if(userOptional.isPresent()){
            Users user = userOptional.get();
            return new ResponseObject("success","Found user", user);
        }
        else {
            return new ResponseObject("error", "User not found", null);
        }
    }
    public ResponseObject DeleteUser(Long id){
        Users user = userRepository.findById(id).orElse(null);
        if (user != null) {
            userRepository.deleteById(id);
            return new ResponseObject("success", "Found user and delete user", user);
        } else {
            return new ResponseObject("error", "user not found", null);
        }
    }
}