import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "./logInPage.module.css"
// import { DOMAIN } from "../Domain/DomainBlog";
import Navbar from "../navbar/navbar";
// import { DOMAIN_BACKEND, TOKEN_API } from "../../utils/constant";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DOMAIN } from "../../utils/constant";

export default function Login() {


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    let navigate = useNavigate();

    const loadDataProfile = (username) => {
        console.log("toi day r")
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("accessToken"));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        // fetch('/api/v1/users', requestOptions)
        fetch(DOMAIN + '/api/v1/users', requestOptions)
            .then(response => response.json())
            .then(result => {
                sessionStorage.setItem("NameUser", username)
                if (result.data.userRoles.includes("ROLE_ADMIN")) {
                    setTimeout(() => {
                        navigate('/admin');
                    }, 1500)

                }
                else {
                    setTimeout(() => {
                        navigate('/');

                    }, 1500)
                }
            })
            .catch(error => console.log('error', error));
    }


    const handleUserSubmit = () => {

        const user = JSON.stringify({
            username: username,
            password: password,
        });
        fetch(DOMAIN + '/auth/generateToken', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: user,
        })
            .then((response) => {
                if (response.ok) {
                    return response.text()
                }
                throw Error(response.status)
            }
            )
            .then((data) => {
                toast.success("Login thành công", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000
                });
                sessionStorage.setItem("accessToken", data)
                loadDataProfile(username);

            })
            .catch((error) => {
                console.error("Error:", error)
                toast.error("Login không thành công", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000
                });
            });



    };

    return (
        <>
            <ToastContainer />

            <Navbar />
            <div className={styles.loginContainer}>
                <h2>Đăng nhập</h2>
                <div className={styles.inputContainer}>
                    <label className={styles.label}>Tên đăng nhập</label>
                    <input
                        type="text"
                        className={styles.formInput}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className={styles.inputContainer}>
                    <label className={styles.label}>Mật khẩu</label>
                    <input
                        type="password"
                        className={styles.formInput}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleUserSubmit();
                            }
                        }}
                    />
                </div>
                <div className={styles.buttonContainer}>
                    <button onClick={handleUserSubmit} className={styles.loginButton}>
                        Đăng nhập
                    </button>
                </div>
            </div>
        </>
    );
}