import { useEffect, useState } from "react";
import styles from "./getPosts.module.css"
// import { DOMAIN } from "../Domain/DomainBlog";
import { useNavigate } from "react-router-dom";
// import Navbar from "./navbar/navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { DOMAIN } from "../../utils/constant";



const GetPostApi = _ => {
    const [posts, setPosts] = useState([]);
    const [kw, setKW] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5); // Số lượng bài viết trên mỗi trang
    // const encodedPostTitle = encodeURIComponent(currentPosts.map((post) => (); 
    // const decodedString = decodeURIComponent(encodedPostTitle);


    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    let navigate = useNavigate();

    useEffect(() => {

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
// DOMAIN + 
        fetch(DOMAIN + '/api/v1/public', requestOptions)
            .then(response => response.json())
            .then((result) => {
                console.log(result)
                setPosts(result.filter(u => (u.title.indexOf(kw) && u.authors.indexOf(kw)) >= 0))

            })
            .catch(error => {
                console.log('error', error)
            });
    }, [kw]);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    // const encodedPostTitles = encodeURIComponent(currentPosts.map((post) => ();

    const encodedPostTitle = (title) => {
        return encodeURIComponent(title);
    };
    // const decodedString = decodeURIComponent(encodedPostTitle());
    

    return (
        <>
            <div className={styles.homeContainer}>
                < ul className={styles.ul}>
                    {currentPosts.map((post) => (
                        <li className={styles.li} key={post.id}>
                            <Link style={{ textDecoration: "none" }} to={`/${post.urlSlug}`}>
                                <div className={styles.bodyContent}>
                                    <div className={styles.leftcontent}>
                                        <div className={styles.imgContainer}>
                                            <img src={post.imageUrl} alt="test"></img>
                                        </div>
                                    </div>

                                    <div className={styles.rightcontent}>
                                        <h1 className={styles.postTitle} >{post.title}</h1>
                                        <div className={styles.iconElement}>
                                            <div className={styles.element}><FontAwesomeIcon icon={faClock} /></div>
                                            <div className={styles.element}>{post.timePost}</div>
                                            <div className={styles.element}><FontAwesomeIcon icon={faUser} /></div>
                                            <div className={styles.element}>By {post.authors}</div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))}
                    <div className={styles.wrapPagination}>
                        <ul className="pagination">
                            {Array.from({ length: Math.ceil(posts.length / postsPerPage) }).map((_, index) => (
                                <li key={index} className="page-item">
                                    <button onClick={() => paginate(index + 1)} className="page-link">
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </ul>
            </div >
        </>
    );
}
export default GetPostApi;