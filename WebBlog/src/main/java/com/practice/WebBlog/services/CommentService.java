package com.practice.WebBlog.services;

//import com.springboot.Springboot.Post.Post;
//import com.springboot.Springboot.Post.PostRepository;
import com.practice.WebBlog.models.Comment;
import com.practice.WebBlog.models.PostBlog;
import com.practice.WebBlog.models.users.Users;
import com.practice.WebBlog.repository.CommentRepository;
import com.practice.WebBlog.repository.PostRepository;
import com.practice.WebBlog.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {
    @Autowired
    private final CommentRepository commentRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    PostRepository postRepository;


    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    /*
    Create method for Comment Service

    get url of current post for findByUrlSlug to setPost working
     */
    public String saveComment(String userName, Comment comment) {
        Users users = userRepository.findByUserName(userName).orElse(null);
        PostBlog blog = postRepository.findByUrlSlug(comment.getUrlPost());
        if (users != null){
            comment.setUser(users);
            comment.setPost(blog);
            comment.setUserComment(userName);
            commentRepository.save(comment);
            return "success";
        }
        else {
            return "not found user";
        }
    }

    /*
    Read method for Comment Service

     */
    public List<Comment> getAllComment() {
        return commentRepository.findAll();
    }

    public Comment getCommentById(int id) {
        return commentRepository.findById(id).orElse(null);
    }

    /*
    Update method for Comment Service

     */
    public String updateComment(int id, Comment comment) {
        if (this.getCommentById(id) == null) return "cant find that post";
        try {
            comment.setId(id);
            commentRepository.save(comment);
            return "success";
        } catch (DataIntegrityViolationException e) {
            return "Lỗi khi lưu user: " + e.getMessage();
        }
    }

    /*
    Delete method for Comment Service

     */
    public String deleteById(int id) {
        if (this.getCommentById(id) == null) return "cant find that post";
        commentRepository.deleteById(id);
        return "success";
    }
}