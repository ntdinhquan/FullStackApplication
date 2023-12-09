package com.practice.WebBlog.controller.user;

//import com.practice.WebBlog.models.users.UserAdmin;
import com.practice.WebBlog.ResponseObject;
import com.practice.WebBlog.config.UserInforDetail;
import com.practice.WebBlog.jwt.JwtService;
import com.practice.WebBlog.models.Comment;
import com.practice.WebBlog.models.PostBlog;
import com.practice.WebBlog.models.users.Users;
import com.practice.WebBlog.repository.UserRepository;
import com.practice.WebBlog.services.CommentService;
import com.practice.WebBlog.services.GetPostService;
import com.practice.WebBlog.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
//@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1/users")
public class UserController {
    @Autowired
    UserService userservice;
    @Autowired
    GetPostService getpostservice;
    @Autowired
    CommentService commentService;

    // add new posts
    @PostMapping("/post")
    public ResponseObject GetPostOnService(@AuthenticationPrincipal UserInforDetail userInforDetail, @RequestBody PostBlog NewBlog) {
        return getpostservice.PostNew(userInforDetail.getUsername(),userInforDetail.getAuthorities() ,NewBlog);
    }

    @PostMapping("/comment")
    public String createComment(@AuthenticationPrincipal UserInforDetail userInforDetail, @RequestBody Comment comment){
        System.out.println("Dinh Quan 123");
        return commentService.saveComment(userInforDetail.getUsername(), comment);
    }



    //get a user by token name filter
    @GetMapping("")
    public ResponseObject FindUser(@AuthenticationPrincipal UserInforDetail userInforDetail){
        return userservice.FindUser(userInforDetail.getUsername());
    }


    @DeleteMapping("/post/{id}")
    public ResponseObject DeleteMyPost(@PathVariable Long id) {return getpostservice.DeletePost(id);}

}
