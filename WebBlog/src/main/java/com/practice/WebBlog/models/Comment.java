package com.practice.WebBlog.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
//import com.springboot.Springboot.Post.Post;
//import com.springboot.Springboot.User.User;
import com.practice.WebBlog.models.users.Users;
import jakarta.persistence.*;
import org.hibernate.validator.constraints.NotBlank;

@Entity
@Table(name = "comment")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String body;

    private int parent_id;

    private String userComment;

    @ManyToOne
    @JsonBackReference(value = "user-comment")
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;

    @ManyToOne
    @JsonBackReference(value = "post-comment")
    @JoinColumn(name = "post_id")
    private PostBlog post;

    public Comment(){
    }

    private String urlPost;
    public Comment(String body, int parent_id, Users user, PostBlog post, String urlPost, String userComment) {
        this.body = body;
        this.parent_id = parent_id;
        this.user = user;
        this.post = post;
        this.urlPost = urlPost;
        this.userComment = userComment;
    }

    public String getUserComment() {
        return userComment;
    }

    public void setUserComment(String userComment) {
        this.userComment = userComment;
    }

    public String getUrlPost() {
        return urlPost;
    }

    public void setUrlPost(String urlPost) {
        this.urlPost = urlPost;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public int getParent_id() {
        return parent_id;
    }

    public void setParent_id(int parent_id) {
        this.parent_id = parent_id;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public PostBlog getPost() {
        return post;
    }

    public void setPost(PostBlog post) {
        this.post = post;
    }
}
