// import React from "react";
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import styles from "./navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import imageWeb from "./logoweb.ico"
const Navbar = () => {
    let navigate = useNavigate();
    let NameUser = sessionStorage.getItem("NameUser");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Kiểm tra trạng thái đăng nhập khi component được tạo
    useEffect(() => {
        const token = sessionStorage.getItem("accessToken"); // Kiểm tra xem có token đăng nhập hay không
        if (token) {
            setIsLoggedIn(true); // Nếu có token, đặt trạng thái đăng nhập thành true
        }
    }, []);

    const logout = _ => {
        setIsLoggedIn(false);
        sessionStorage.clear();
        sessionStorage.clear();
        // navigate("/Login");
    }

    return (
        <nav className={styles.container}>
            <div className={styles.action_wrapper}>
                <ul className={styles.action_list}>
                    <li >
                        <img style={{ width: "50px", height: "50px" }} src={imageWeb} alt='logo'></img>
                    </li>
                    <li>
                        {/* <a href="http://localhost:9080/DQBlog/" className={styles.link_style}>
                            Trang chủ
                        </a> */}
                        <Link className={styles.link_style} to="/"> Trang chủ</Link>
                    </li>
                    {!isLoggedIn ? (
                        <>

                        </>
                    ) : (
                        <>
                            <li>
                                {/* <a href="/postnews" className={styles.link_style}>
                                    Đăng bài
                                </a> */}
                                <Link className={styles.link_style} to="/postnews"> Đăng bài</Link>

                            </li>
                            <li>
                                {/* <a href="/GetPostUserApi" className={styles.link_style}>
                                    Quản lý bài viết
                                </a> */}
                                <Link className={styles.link_style} to="/GetPostUserApi"> Quản lý bài viết</Link>

                            </li>
                        </>
                    )}
                    {!isLoggedIn ? (
                        <>
                            <li>
                                {/* <a href="http://localhost:9080/DQBlog/login" className={styles.link_style}>
                                    Welcome to my blog
                                </a> */}
                                <Link className={styles.link_style} to="/login"> Welcome to my blog</Link>

                            </li>
                        </>
                    ) : (
                        <>

                        </>
                    )}


                </ul>
            </div>



            <div className={styles.auth_wrapper}>
                <ul className={styles.action_list}>

                    <li>
                        {/* <a href="/" className={styles.link_style}>
                            {NameUser}
                        </a> */}
                        <Link className={styles.link_style} to="/"> {NameUser}</Link>
                        {/* <p className={styles.auth_wrapper}></p> */}
                    </li>
                    {!isLoggedIn ? (
                        <>
                            <li>
                                {/* <a href="/login" onClick={logout} className={styles.link_style}>
                                    Đăng Nhập
                                </a> */}
                                <Link className={styles.link_style} to="/login" onClick={logout}> Đăng Nhập</Link>

                            </li>
                            <li>
                                {/* <a href="/signup" className={styles.link_style}>
                                    Đăng ký
                                </a> */}
                                <Link className={styles.link_style} to="/signup"> Đăng ký</Link>

                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                {/* <a href="/login" onClick={logout} className={styles.link_style}>
                                    Đăng xuất
                                </a> */}
                                <Link className={styles.link_style} onClick={logout} to="/login"> Đăng xuất</Link>
                            </li>
                        </>
                    )}

                </ul>
            </div>

        </nav>
    );
};

export default Navbar;