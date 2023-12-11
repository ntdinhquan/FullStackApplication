import { useEffect, useState } from "react";
import styles from "./managerMyPost.module.css"
// import { DOMAIN } from "../Domain/DomainBlog";
// import { DOMAIN } from "../Domain/DomainBlog";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faUser } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DOMAIN } from "../../utils/constant";


const GetPostUserApi = _ => {
    const [UserPosts, setUserPosts] = useState({
        data: {
            userPosts: []
        }
    });
    const handleDeletePost = (postId) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("accessToken"));

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };

        // fetch(`/api/v1/users/post/${postId}`, requestOptions)
        fetch(DOMAIN + '/api/v1/users/post/' + postId, requestOptions)
        .then(response => response.json())
            .then(() => {
                // Xóa bài đăng khỏi mảng user.posts
                const updatedPosts = UserPosts.data.userPosts.filter(post => post.id !== postId);
                toast.success("Xóa thành công", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1500 // Thời gian hiển thị thông báo
                });
                setUserPosts({
                    ...UserPosts,
                    data: {
                        userPosts: updatedPosts
                    }
                });
            })
            .catch(error => {
                toast.error("Xóa không thành công", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1500 // Thời gian hiển thị thông báo
                })
                console.log('error', error)
            });
    }
    useEffect(() => {
        console.log("Hello ")
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("accessToken"));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };


        fetch(DOMAIN + `/api/v1/users`, requestOptions)
        .then(response => response.json())
        .then(result => {
            setUserPosts(result)
        })
        .catch(error => console.log('error', error));
    }, []);



    return (
        <>
            <ToastContainer />

            <Navbar />
            <div className={styles.homeContainer}>
                < ul className={styles.ul}>
                    {UserPosts?.data?.userPosts?.map((u) => (
                        <li className={styles.li} key={u.id} /*onClick={() => handleTitleClick(userpost.id)}*/>
                            {/* 
                            <div className={styles.onContent}>

                            </div> */}

                            <div className={styles.bodyContent}>
                                <div className={styles.leftcontent}>
                                    <div className={styles.imgContainer}>
                                        <img src={u.imageUrl} alt="test"></img>
                                    </div>
                                </div>

                                <div className={styles.rightcontent}>
                                    <h1 className={styles.postTitle} >{u.title}</h1>
                                    <div className={styles.iconElement}>
                                        <div className={styles.element}><FontAwesomeIcon icon={faClock} /></div>
                                        <div className={styles.element}>{u.timePost}</div>
                                        <div className={styles.element}><FontAwesomeIcon icon={faUser} /></div>
                                        <div className={styles.element}>By {u.authors}</div>
                                    </div>
                                    <button className={styles.delButton} onClick={() => handleDeletePost(u.id)}>Xóa</button>

                                </div>



                            </div>
                        </li>
                    ))}
                </ul>
            </div >
        </>
    );
}
export default GetPostUserApi;