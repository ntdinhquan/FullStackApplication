import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import styles from "./SignUp.module.css"
// import { DOMAIN_BACKEND } from './DomainBe';
// import { DOMAIN } from '../Domain/DomainBlog';
import Navbar from '../navbar/navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DOMAIN } from '../../utils/constant';

const SignUser = () => {
    let navigate = useNavigate();

    const [UserNew, setUserNew] = useState({
        userName: '',
        userPassword: '',
        userRoles: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserNew({
            ...UserNew,
            userRoles: 'ROLE_USER',
            [name]: value
        });
    }

    const handleSubmit = (e) => {

        fetch(DOMAIN + '/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(UserNew)
        })
            .then(response => response.json())
            .then(data => {
                toast.success("Đăng ký thành công, mời bạn đăng nhập", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000 // Thời gian hiển thị thông báo
                });
                console.log('User created:', data);
                setUserNew({
                    userName: '',
                    userPassword: '',
                    userRoles: ''
                });
                setTimeout(() => {
                    navigate('/login');
                }, 3000)
            })
            .catch(error => console.error('Error:', error));

    }

    return (
        <>
            <ToastContainer />

            <Navbar />
            <div className={styles.loginContainer}>
                <h2>Đăng ký</h2>
                <div className={styles.inputContainer}>
                    <label className={styles.label}>Tên đăng ký</label>
                    <input
                        type="text"
                        name="userName"

                        className={styles.formInput}
                        value={UserNew.userName}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.inputContainer}>
                    <label className={styles.label}>Mật khẩu</label>
                    <input
                        className={styles.formInput}
                        type='password'
                        name="userPassword"
                        value={UserNew.userPassword}
                        onChange={handleChange}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSubmit();
                            }
                        }}
                    />
                </div>
                <div className={styles.buttonContainer}>
                    <button onClick={handleSubmit} className={styles.loginButton}>
                        Đăng ký
                    </button>
                </div>
            </div>
            {/* <div className={styles.container}>
                <h1>Sign up user </h1>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label>User Name:</label>
                        <input
                            type="text"
                            name="userName"
                            value={UserNew.userName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Password:</label>
                        <input
                            type='password'
                            name="userPassword"
                            value={UserNew.userPassword}
                            onChange={handleChange}
                        />
                    </div>


                    <button type="submit">Submit</button>
                </form>
            </div> */}
        </>
    );
}

export default SignUser;