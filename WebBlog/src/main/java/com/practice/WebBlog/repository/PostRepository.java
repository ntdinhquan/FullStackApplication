package com.practice.WebBlog.repository;

import com.practice.WebBlog.models.PostBlog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface PostRepository extends JpaRepository<PostBlog, Long> {

    List<PostBlog> findByBody(String body);
    PostBlog findByUrlSlug(String urlSlug);
}
