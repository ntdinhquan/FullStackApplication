import React, { useState } from 'react';
import GetAllPost from './adminPost';
import GetAllUser from './adminUser';
import styles from './Admin.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faNewspaper, faPeopleRoof, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Admin() {
    const [selectedTab, setSelectedTab] = useState('user'); 
    let navigate = useNavigate();

    const handleTabClick = (tab) => {
        setSelectedTab(tab);
    };
    const logout = _ => {
        sessionStorage.clear();
        sessionStorage.clear();
        navigate("/login");
    }

    return (
        <div className={styles.Container}>
            <div className={styles.sideBar}>
                <div className={styles.titlesideBar}>
                    <FontAwesomeIcon icon={faPeopleRoof} /> Quản trị
                </div>
                <div className={styles.titlesideBar}> Hello Admin</div>

                <div className={styles.subtitlesideBar}>Quản lý Website</div>

                <button
                    className={`${styles.funcSidebar} ${selectedTab === 'user' ? styles.selectedButton : ''}`}
                    onClick={() => handleTabClick('user')}>
                    <div className={styles.iconUser}>
                        <FontAwesomeIcon icon={faUsers} />
                    </div>
                    <div className={styles.element}>
                        Người dùng
                    </div>
                </button>

                <button
                    className={`${styles.funcSidebar} ${selectedTab === 'post' ? styles.selectedButton : ''}`}
                    onClick={() => handleTabClick('post')}>
                    <div className={styles.iconPost}>
                        <FontAwesomeIcon icon={faNewspaper} />
                    </div>
                    <div className={styles.element}>
                        Bài viết
                    </div>
                </button>
                <button
                    className={`${styles.funcSidebar}`}
                    onClick={() => logout()}>
                    <div className={styles.iconPost}>
                        <FontAwesomeIcon icon={faSignOut} />
                    </div>
                    <div className={styles.element}>
                        Đăng xuất
                    </div>
                </button>
            </div>
            <div className={styles.contentInner}>{selectedTab === 'user' ? <GetAllUser /> : <GetAllPost />}</div>
        </div>
    );
}

export default Admin;