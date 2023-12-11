import React, { useState, useEffect } from 'react';
import styles from "./Comment.module.css"
import { Editor } from '@tinymce/tinymce-react';
import { DOMAIN } from '../../utils/constant';
// import { DOMAIN } from '../../utils/constant';

const Comment = (props) => {
    const [commentOfPost, setComment] = useState({
        // body: ''
    });
    const isLoggedIn = !!sessionStorage.getItem("accessToken");


    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log("value cua ban:", value);
        setComment({
            ...commentOfPost,
            body: value,
            urlPost: props.urlPost
        });
        console.log("urlPost: props.urlPost", props.urlPost)
        console.log("Coment cua ban:", commentOfPost);

    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!isLoggedIn) {
            alert("Vui lòng đăng nhập để bình luận.");
            setComment({
                body: ''
            })
            return;
        }

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("accessToken"));

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(commentOfPost)
            // redirect: 'follow'
        };

        fetch(DOMAIN + '/api/v1/users/comment', requestOptions)
            .then(response => response.text())
            .then(data => {
                console.log("Coment cua ban:", data);
                setComment({
                    body: ''
                })
            })
            .catch(error => {
                console.log('error', error.message)
            });
    }


    return (
        <>
            <div className={styles.wrapNewComment}>
                <form onSubmit={handleSubmit}>
                    <label>Hãy để lại bình luận</label>
                    <textarea
                        name="body"
                        value={commentOfPost.body}
                        onChange={handleChange} >
                    </textarea>


                    <div className={styles.submitButton}>
                        
                        {isLoggedIn ?<button type="submit" className='btn btn-success btn-sm'>Bình luận</button> : <button type="submit" className='btn btn-danger btn-sm'> Đăng nhập để bình luận</button>}
                        
                    </div>
                </form>
            </div>
        </>
    );

}
export default Comment;