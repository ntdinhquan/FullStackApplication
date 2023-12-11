package com.practice.WebBlog.models.users;

import com.practice.WebBlog.models.Comment;
import com.practice.WebBlog.models.PostBlog;
import jakarta.persistence.*;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class Users {
    public Users(){}

    public Users(Long id, String userName, String userPassword, List<PostBlog> userPosts, String userRoles) {
        this.id = id;
        this.userName = userName;
        this.userPassword = userPassword;
        this.userPosts = userPosts;
        this.userRoles = userRoles;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public List<PostBlog> getUserPosts() {
        return userPosts;
    }

    public void setUserPosts(List<PostBlog> userPosts) {
        this.userPosts = userPosts;
    }

    public String getUserRoles() {
        return userRoles;
    }

    public void setUserRoles(String userRoles) {
        this.userRoles = userRoles;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

//    @Override
//    public String toString() {
//        return "User{" +
//                "id=" + id +
//                ", UserName='" + userName + '\'' +
//                ", UserPassword='" + userPassword + '\'' +
//                ", UserPosts='" + userPosts + '\'' +
//                ", UserRoles='" + userRoles + '\'' +
//                '}';
//    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String userName;
    private String userPassword;
    @OneToMany(mappedBy = "userId", cascade = CascadeType.ALL)
    @JsonManagedReference(value = "user-post")
    private List<PostBlog> userPosts;
    private String userRoles;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonManagedReference(value = "user-comment")
    private List<Comment> comments;
}
