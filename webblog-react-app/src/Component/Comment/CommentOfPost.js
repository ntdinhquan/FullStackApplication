import React, { useState, useEffect } from 'react';
import styles from "./Comment.module.css"
import { DOMAIN } from '../../utils/constant';
// import { DOMAIN } from '../../utils/constant';

const CommentOfPost = (props) => {
    const [commentsOfPost, setComment] = useState([]);


    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        fetch(DOMAIN + '/api/v1/public/comment', requestOptions)
            .then(response => response.json())
            .then((result) => {
                console.log("result", result);

                const filteredComments = result.filter(item => item.urlPost === props.urlPost);
                setComment(filteredComments);
                console.log("filteredComments", filteredComments);
            })
            .catch(error => {
                console.log('error', error)
            });
    }, [props.urlPost]);
    return (
        <>
            <div className={styles.wrapComment}>
                <div className={styles.Comments}>
                    {commentsOfPost.map(comment => (
                        <div key={comment.id}>
                            <b>{comment.userComment}:</b>
                            &nbsp;
                            {comment.body}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );

}
export default CommentOfPost;