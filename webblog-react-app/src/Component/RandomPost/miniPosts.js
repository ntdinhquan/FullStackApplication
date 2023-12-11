import { useEffect, useState } from "react";
import styles from "./miniPosts.module.css"
// import { DOMAIN } from "../Domain/DomainBlog";
import { useNavigate } from "react-router-dom";
// import Navbar from "./navbar/navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { DOMAIN } from "../../utils/constant";


const MiniPost = _ => {
    const [posts, setPosts] = useState([]);
    const [kw, setKW] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const [postsPerPage] = useState(3); // Số lượng bài viết trên mỗi trang

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    let navigate = useNavigate();

    useEffect(() => {

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(DOMAIN + '/api/v1/public', requestOptions)
            .then(response => response.json())
            .then((result) => {
                console.log(result)
                // setPosts(result)
                const shuffledPosts = result.sort(() => Math.random() - 0.5);
                setPosts(shuffledPosts);
            })
            .catch(error => {
                console.log('error', error)
            });
    }, [kw]);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);


    return (
        <>
            <div className={styles.homeContainer}>
                < ul className={styles.ul}>
                    <li className={styles.standOutPosts}>
                        {/* <div className={styles.standOutPosts}> */}
                        <p style={{ color: "white", fontSize: "18px", marginTop: "15px" }}>Bài viết nổi bật</p>
                        {/* </div> */}
                    </li>
                    {currentPosts.map((post) => (
                        <li className={styles.li} key={post.id}/* onClick={() => handleTitleClick(post.id)}*/>
                            <Link style={{ textDecoration: "none" }} to={`/${post.urlSlug}`}>

                                <div className={styles.bodyContent}>
                                    <div className={styles.rightcontent}>
                                        <h1 className={styles.postTitle} >{post.title}</h1>
                                    </div>
                                </div>
                            </Link>

                        </li>


                    ))}


                </ul>
            </div >
        </>
    );
}
export default MiniPost;