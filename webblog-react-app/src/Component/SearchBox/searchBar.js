import { useEffect, useState } from "react";
import styles from "./searchBar.module.css"
// import { DOMAIN } from "../Domain/DomainBlog";
import { useNavigate } from "react-router-dom";
// import Navbar from "./navbar/navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { DOMAIN } from "../../utils/constant";
const SearchBar = () => {
    const [posts, setPosts] = useState([]);
    const [kw, setKW] = useState("");
    let navigate = useNavigate();

    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(DOMAIN + '/api/v1/public', requestOptions)
            .then(response => response.json())
            .then((result) => {
                const filteredPosts = result.filter(u => u.title.toLowerCase().includes(kw.toLowerCase()) || u.authors.toLowerCase().includes(kw.toLowerCase()));

                if (kw.trim() === "") {
                    setPosts([]);
                } else {
                    setPosts(filteredPosts);
                }
            })
            .catch(error => {
                console.log('error', error)
            });
    }, [kw]);


    return (
        <>
            <div className={styles.homeContainer}>
                <div className={styles.searchBar}>
                    <span className="left-pan">
                        <i className="fa fa-microphone" />
                    </span>
                    <input
                        type="text"
                        className="form-control form-input"
                        placeholder="Tìm bài viết"
                        value={kw}
                        onChange={e => setKW(e.target.value)}
                    />
                    <i className="fa fa-search" />
                </div>

                <ul className={styles.ul}>
                    {posts.map((post) => (
                        <li className={styles.li} key={post.id} >
                            <Link style={{ textDecoration: "none" }} to={`/${post.urlSlug}`}>

                            <h1 className={styles.postTitle}>{post.title}</h1>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default SearchBar;
    