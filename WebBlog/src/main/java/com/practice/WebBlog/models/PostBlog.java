package com.practice.WebBlog.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.practice.WebBlog.models.users.Users;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.validator.constraints.NotBlank;


//import javax.validation.constraints.Size;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "posts")
public class PostBlog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "Title cant be empty")
    @Size(min = 3, message = "A title must be at least 3 char")
    @Column(nullable = false)
    private String title;

    @NotBlank(message = "Body cant be empty")
    @Column(nullable = false, length = 3000, columnDefinition = "longtext")
    private String body;

    LocalDate timePost;

    public LocalDate getTimePost() {
        return timePost;
    }

    public void setTimePost(LocalDate timePost) {
        this.timePost = timePost;
    }

    @Column(name = "image_url", nullable = true)
    private String imageUrl;

    //a post have many user -> authors
    @NotBlank(message = "must have author")
    @Column(name = "AuthorName")
    private String authors;


    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    @JsonManagedReference(value = "post-comment")
    private List<Comment> comments;


    @ManyToOne
    @JsonBackReference(value = "user-post")
    @JoinColumn(name = "user_id")
    private Users userId;

    @Column(nullable = false)
    private String urlSlug;

    public String getUrlSlug() {
        return urlSlug;
    }

    public void setUrlSlug(String urlSlug) {
        this.urlSlug = urlSlug;
    }

    public Users getUserId() {
        return userId;
    }

    public void setUserId(Users userId) {
        this.userId = userId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getAuthors() {
        return authors;
    }

    public void setAuthors(String authors) {
        this.authors = authors;
    }

    public PostBlog(){}

    public PostBlog(String title, String body, String imageUrl, String authors, Users userId, String urlSlug) {
        this.title = title;
        this.body = body;
        this.imageUrl = imageUrl;
        this.authors = authors;
        this.userId = userId;
        this.urlSlug = urlSlug;
    }
}
