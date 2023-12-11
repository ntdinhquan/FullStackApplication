package com.practice.WebBlog.services;

import com.practice.WebBlog.ResponseObject;
import com.practice.WebBlog.models.PostBlog;
import com.practice.WebBlog.models.users.Users;
import com.practice.WebBlog.repository.PostRepository;
import com.practice.WebBlog.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import javax.validation.constraints.Null;
import java.text.Normalizer;
import java.time.LocalDate;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;

import static org.hibernate.internal.util.StringHelper.count;

@Service
public class GetPostService {
    @Autowired
    PostRepository repository;
    @Autowired
    UserRepository userRepository;

    @Autowired
    CommentService commentService;
    @Autowired
    UserService userService;


    public List<PostBlog> GetPosts() {
        return repository.findAll();
    }
    public static String convertToSlug(String text) {
        String normalized = text.toLowerCase();
        String temp = Normalizer.normalize(normalized, Normalizer.Form.NFD);
        Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
        normalized = pattern.matcher(temp).replaceAll("");

        normalized = normalized.replaceAll("\\s+", "-").replaceAll("[^a-z0-9-]", "");
        return normalized;
    }
    public ResponseObject PostNew(String userName, Collection<? extends GrantedAuthority> userRoles , PostBlog NewBlog) {
        Users users = userRepository.findByUserName(userName).orElse(null);
        System.out.println("hellllo" + userRoles);
        List<String> UsersName = userService.GetAllName();

        if (NewBlog.getId() == null) {
            NewBlog.setTimePost(LocalDate.now());
        }
        if (users != null) {
            NewBlog.setAuthors(users.getUserName());
            NewBlog.setUserId(users);
            NewBlog.setUrlSlug(convertToSlug(NewBlog.getTitle()));
            PostBlog savedBlog = repository.save(NewBlog);
            return new ResponseObject("success", "Post saved successfully", savedBlog);
        } else {
            return new ResponseObject("error", "User hahanot found", null);
        }
    }

    public ResponseObject FindPost(Long id) {
        PostBlog post = repository.findById(id).orElse(null);

        if (post != null) {
            return new ResponseObject("success", "Found post", post);
        } else {
            return new ResponseObject("error", "Post not found", null);
        }
    }

    public ResponseObject DeletePost(Long id) {
        PostBlog post = repository.findById(id).orElse(null);
        if (post != null) {
            repository.deleteById(id);
            return new ResponseObject("success", "Found post and delete this post", post);
        } else {
            return new ResponseObject("error", "Post not found", null);
        }
    }

}
