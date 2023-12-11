import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
// import { DOMAIN } from "../Domain/DomainBlog";
import styles from "./adminPost.module.css"
import { DOMAIN } from "../../utils/constant";

export default function GetAllPost() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        loadDataPosts();
    }, []);

    const loadDataPosts = () => {
        fetch(DOMAIN + '/api/v1/public')
            .then(response => response.json())
            .then(result => {
                setPosts(result);
            })
            .catch(error => console.log('error', error));
    }




    const handleDeletePost = (postId) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("accessToken"));

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };

        // fetch(`/api/v1/admin/post/${postId}`, requestOptions)
        fetch(DOMAIN + '/api/v1/admin/post/' + postId, requestOptions)
            .then(response => response.json())
            .then(() => {
                const updatedPost = posts.filter(posts => posts.id !== postId);
                setPosts(updatedPost);
            })
            .catch(error => console.log('error', error));
    }

    return (
        <div>
            <h2>Manager post</h2>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        {/* <th>Posts</th> */}
                        <th>TimePost</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody >
                    {posts.map((p) => (
                        <tr key={p.id}>
                            <td>{p.title}</td>
                            <td>{p.authors}</td>
                            {/* <td>{u.userPosts.title}</td> */}
                            <td>{p.timePost}</td>
                            <td><button>Update</button></td>
                            <td><button onClick={() => handleDeletePost(p.id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}