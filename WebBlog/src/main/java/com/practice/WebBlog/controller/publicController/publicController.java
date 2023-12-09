package com.practice.WebBlog.controller.publicController;

import com.practice.WebBlog.ResponseObject;
import com.practice.WebBlog.models.Comment;
import com.practice.WebBlog.models.PostBlog;
import com.practice.WebBlog.services.CommentService;
import com.practice.WebBlog.services.GetPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1/public")
public class publicController {

    @Autowired
    GetPostService getpostservice;
    @Autowired
    CommentService commentService;

    @GetMapping("")
    public List<PostBlog> GetAllPost() {
        return getpostservice.GetPosts();
    }

    @GetMapping("/{id}")
    public ResponseObject FindPostById(@PathVariable Long id){return getpostservice.FindPost((id));}

    @GetMapping(path = "/comment")
    public List<Comment> readCommentAll() {
        return commentService.getAllComment();
    }

}
